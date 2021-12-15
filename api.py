from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
import base64
from model import Generator
import torch
import gc
from torchvision.transforms.functional import to_tensor, to_pil_image

gc.collect()

net = Generator()
net.load_state_dict(torch.load("./weights/paprika.pt", map_location="cpu"))
net.to("cpu").eval()

app = Flask(__name__,static_url_path='')

@app.route('/')
def hello_world():
    # return 'Nice!'
    return app.send_static_file('index.html')

@app.route('/api/cartoon', methods=['POST'])
def cartoon():
    data = request.data
    print(data)
    im = Image.open(BytesIO(base64.b64decode(data))).convert('RGB')
    # im.save('test.jpg')
    with torch.no_grad():
        image = to_tensor(im).unsqueeze(0) * 2 - 1
        out = net(image.to("cpu"), False).cpu()
        out = out.squeeze(0).clip(-1, 1) * 0.5 + 0.5
        out = to_pil_image(out)
    # out.save('test.jpg')
    output_buffer = BytesIO()
    out.save(output_buffer, format='JPEG')
    byte_data = output_buffer.getvalue()
    base64_str = base64.b64encode(byte_data)
    return base64_str

if __name__ == '__main__':
    app.run('0.0.0.0', 8085, debug=True)
