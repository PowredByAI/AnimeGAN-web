import React, { useEffect, useState } from 'react';

const FileUploaderDND = ({ onload }: { onload: Function }) => {
  const [inDropZone, setInDropZone] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([])

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setInDropZone(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setInDropZone(true);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files];
    if (files) {
      setInDropZone(false);
      setFiles(files)
    }
  };

  useEffect(() => {
    if (files) {
      const arr: string[] = []
      files.map((file, index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          const base64data = reader.result;
          if (typeof base64data === "string") {
            onload(base64data.split("base64,")[1])
          }
        };
      });
    }
  }, [files]);

  return (
    <div
      id="fileuploaderdnd-container"
      className="fileuploaderdnd-container"
      onDrop={(event) => handleDrop(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)}
    >
      <div className="fileuploaderdnd-container-button">
        <div className="fileuploaderdnd-container-text">
        👉🏼 drag and drop an image here to see output
        </div>
      </div>
    </div>
  );
}
export default FileUploaderDND