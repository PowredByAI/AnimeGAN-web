const get = async (/** @type {any} */ base64) => {
    const response = await fetch(
        `/api/cartoon`,
        {
            method: "POST",
            body: base64
        }
    );
    const res = await response.text();
    console.log(res)
    // @ts-ignore
    document.getElementById("out").setAttribute("src", `data:image/png;base64,${res}`)
    // @ts-ignore
    document.getElementById("loading").style.display = "none"
    // @ts-ignore
    document.getElementById("mask").style.display = "none"
}

const handleDragEnter = (/** @type {{ preventDefault: () => void; }} */ event) => {
    event.preventDefault();
};

const handleDragOver = (/** @type {{ preventDefault: () => void; dataTransfer: { dropEffect: string; }; }} */ event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

const handleDrop = (/** @type {{ preventDefault: () => void; dataTransfer: { files: any; }; }} */ event) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files];
    if (files) {
        files.forEach(file => {
            console.log(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                const base64data = reader.result;
                if (typeof base64data === "string") {
                    const base64 = base64data.split("base64,")[1]
                    // @ts-ignore
                    document.getElementById("in").setAttribute("src", `data:image/png;base64,${base64}`)
                    // @ts-ignore
                    document.getElementById("out").setAttribute("src", `data:image/png;base64,${base64}`)
                    // @ts-ignore
                    document.getElementById("loading").style.display = "block"
                    // @ts-ignore
                    document.getElementById("view").style.display = "block"
                    // @ts-ignore
                    document.getElementById("mask").style.display = "block"
                    get(base64)
                }
            };
        })
    }
};