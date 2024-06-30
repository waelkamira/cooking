'use client';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { inputsContext } from './Context';

export default function UploadingAndDisplayingImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { dispatch, imageError } = useContext(inputsContext);

  useEffect(() => {
    handleUpload();
  }, [selectedFile]);
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
        setUploadedImage(data?.data?.link);
        dispatch({ type: 'IMAGE', payload: data?.data?.link });
      } else {
        console.error('Error uploading image:', data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="relative size-56">
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center text-white z-50">
        <label for="file-upload" class="custom-file-upload">
          أضف صورة للطبخة
        </label>
        <input type="file" id="file-upload" onChange={onFileChange} />
        <input
          type="file"
          onChange={onFileChange}
          className="flex justify-center items-center size-72 border-2 border-one rounded-lg placeholder:text-white"
        />
        {/* <button onClick={handleUpload}>حفظ</button> */}
        {imageError?.imageError && (
          <h1 className="text-one text-2xl text-center my-2 w-full animate-bounce font-bold">
            {imageError?.message}
          </h1>
        )}
      </div>
      <div className="absolute top-0 left-0 w-80 h-56 border-2 border-one rounded-lg overflow-hidden z-10">
        {uploadedImage && (
          <div className="relative w-80 h-64">
            <Image
              src={uploadedImage}
              alt="Uploaded"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
