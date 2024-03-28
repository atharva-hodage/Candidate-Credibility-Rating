// import React, { useState, ChangeEvent, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const UploadImage = () => {
//   const accessToken = Cookies.get('accessToken');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     axios
//       .get('/46/view-image', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         setImageUrl(response.data.imageUrl);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [accessToken]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       axios
//         .post('/46/upload-image', formData, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         .then((response) => {
//           console.log(response.data);
//           // After successful upload, fetch and update the image URL
//           axios
//             .get('/46/view-image-url', {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             })
//             .then((response) => {
//               setImageUrl(response.data.imageUrl);
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } else {
//       console.error('No file selected');
//     }
//   };


// const handleViewImage = () => {
//     if (imageUrl) {
//       window.open(imageUrl, '_blank');
//     } else {
//       console.error('Image URL is null.');
//     }
//   };
  
  

//   return (
//     <div>
//       <h2>Upload Image</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {imageUrl && (
//         <div>
//           <button onClick={handleViewImage}>View Image</button>
//           <img src={imageUrl} alt="Uploaded" style={{ marginTop: '10px', maxWidth: '100%' }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadImage;


import React from 'react'

const UploadImage = () => {
  return (
    <div>UploadImage</div>
  )
}

export default UploadImage
