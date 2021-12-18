import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUploaderDND from './FileUploaderDND';
import Preview from './Preview';
import { Stack, Button } from '@mui/material';

function App() {
  const [images, set_images] = useState<string[]>([])
  const onload = async (base64: string) => {
    if (!images.includes(base64)) {
      set_images(old => [...old, base64])
    }
  }
  useEffect(() => {
    console.log(images)
  }, [images])
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={2}>
          <FileUploaderDND onload={onload} />
          {images.map(img => {
            return <Preview key={img} base64={img} />
          })}
          <Button variant="contained" onClick={() => {
            set_images([])
          }}>clean</Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
