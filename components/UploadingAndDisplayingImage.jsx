'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function UploadingAndDisplayingImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle file input change
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/uploadImageToImgur', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadedImage(data.data.link);
        //يجب عمل dispatch لهذا ال link وارساله الى cookingform لحفظ رابط الصورة وعرضها
      } else {
        console.error('Error uploading image:', data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Upload and Display Image from Imgur</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedImage && (
        <div className="relative size-96">
          <Image
            src={uploadedImage}
            alt="Uploaded"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
}
