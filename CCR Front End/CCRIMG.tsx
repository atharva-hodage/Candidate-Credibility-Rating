import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import UploadImage from './Components/UploadImage';


const CCRIMG: React.FC = () => {
  const accessToken = Cookies.get("accessToken");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile as File);
  
      const response = await axios.post(`/api/images`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      //  console.log('Server Response:', response.data);
  
      setImageURL(response.data.url);
      console.log('Image Uploaded');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const handleViewImage = async () => {
    try {
      const imageId =6;
  
      const response = await axios.get(`/api/images/${imageId}`, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const arrayBufferView = new Uint8Array(response.data);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      const reader = new FileReader();
  
      reader.onload = () => {
        setImageURL(reader.result as string);
      };
  
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error retrieving image:', error);
    }
  };
  

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button onClick={handleUpload}>Upload Image</button>
        <button onClick={handleViewImage}>View Image</button>
      </div>
      {imageURL && (
        <>
          {console.log('Image URL:', imageURL)}
          <img src={imageURL} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </>
      )}
    </div>
  );
};

export default CCRIMG;
