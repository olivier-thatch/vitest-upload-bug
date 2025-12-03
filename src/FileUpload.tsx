import React, { useState, type ChangeEvent } from 'react';

interface FileData {
  name: string;
  size: number;
  content: string;
}

export function FileUpload() {
  const [fileData, setFileData] = useState<FileData | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    if (!file) return;

    // We read the file to force the browser to access the blob content
    // This is where the serialization bug usually reveals itself
    const content = await file.text();

    setFileData({
      name: file.name,
      size: file.size, // This might be the size of the "garbage"
      content: content,
    });
  };

  return (
    <div>
      <label htmlFor="upload">Upload File</label>
      <input
        id="upload"
        data-testid="file-input"
        type="file"
        onChange={handleChange}
        multiple
      />

      {fileData && (
        <div data-testid="debug-output">
          <p>Filename: {fileData.name}</p>
          <p>Size: {fileData.size}</p>
          <p>Content: {fileData.content}</p>
        </div>
      )}
    </div>
  );
}
