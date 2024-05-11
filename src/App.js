// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [billName, setBillName] = useState('');
//   const [billCategory, setBillCategory] = useState('');
//   const [billAmount, setBillAmount] = useState('');
//   const [billFile, setBillFile] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Predefined bill category options
//   const billCategories = ['Groceries', 'Utilities', 'Entertainment', 'Healthcare'];

//   const handleFileChange = (e) => {
//     setBillFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation and sanitization
//     if (!billName || !billCategory || !billAmount || !billFile) {
//       setErrorMessage('All fields are required');
//       return;
//     }

//     if (!billCategories.includes(billCategory)) {
//       setErrorMessage('Invalid bill category');
//       return;
//     }

//     // Sanitize bill amount
//     const sanitizedAmount = parseFloat(billAmount);

//     if (isNaN(sanitizedAmount) || sanitizedAmount <= 0) {
//       setErrorMessage('Please enter a valid amount');
//       return;
//     }

//     // File type validation (optional)
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (!allowedTypes.includes(billFile.type)) {
//       setErrorMessage('Invalid file type. Only JPEG, JPG, and PNG files are allowed.');
//       return;
//     }

//     // File size validation (optional)
//     if (billFile.size > 1024 * 1024) { // 1MB
//       setErrorMessage('File is too large. Maximum size allowed is 1MB.');
//       return;
//     }

//     // Create FormData object
//     const formData = new FormData();
//     formData.append('billName', billName.trim()); // Trim leading and trailing spaces
//     formData.append('billCategory', billCategory);
//     formData.append('billAmount', sanitizedAmount);
//     formData.append('file', billFile);

//     // Submit form
//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//       // Reset form fields and error message on successful upload
//       setBillName('');
//       setBillCategory('');
//       setBillAmount('');
//       setBillFile(null);
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error uploading file:', error.response.data.error);
//       setErrorMessage('Failed to upload file. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Bill</h1>
//       {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Bill Name:</label>
//           <input type="text" value={billName} onChange={(e) => setBillName(e.target.value)} />
//         </div>
//         <div>
//           <label>Bill Category:</label>
//           <select value={billCategory} onChange={(e) => setBillCategory(e.target.value)}>
//             <option value="">Select Bill Category</option>
//             {billCategories.map((category) => (
//               <option selected key={category} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Bill Amount:</label>
//           <input type="text" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
//         </div>
//         <div>
//           <label>Upload Bill:</label>
//           <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import Webcam from 'react-webcam';

// function App() {
//   const [billName, setBillName] = useState('');
//   const [billCategory, setBillCategory] = useState('');
//   const [billAmount, setBillAmount] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const webcamRef = useRef(null);

//   // Predefined bill category options
//   const billCategories = ['Groceries', 'Utilities', 'Entertainment', 'Healthcare'];

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     // handle captured image
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation and sanitization
//     if (!billName || !billCategory || !billAmount) {
//       setErrorMessage('All fields are required');
//       return;
//     }

//     if (!billCategories.includes(billCategory)) {
//       setErrorMessage('Invalid bill category');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('billName', billName.trim());
//     formData.append('billCategory', billCategory);
//     formData.append('billAmount', parseFloat(billAmount));

//     // Capture image from webcam
//     const imageSrc = webcamRef.current.getScreenshot();

//     // Convert base64 image to Blob
//     const blob = await fetch(imageSrc).then((res) => res.blob());

//     // Append the image file to the form data with the key 'file'
//     formData.append('file', blob, 'captured_image.jpeg');

//     // Print file properties on console
//     console.log('File Properties:');
//     console.log('File name:', blob.name);
//     console.log('File type:', blob.type);
//     console.log('File size:', blob.size, 'bytes');

//     // Submit form
//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//       // Reset form fields and error message on successful upload
//       setBillName('');
//       setBillCategory('');
//       setBillAmount('');
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error uploading file:', error.response.data.error);
//       setErrorMessage('Failed to upload file. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Bill</h1>
//       {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Bill Name:</label>
//           <input type="text" value={billName} onChange={(e) => setBillName(e.target.value)} />
//         </div>
//         <div>
//           <label>Bill Category:</label>
//           <select value={billCategory} onChange={(e) => setBillCategory(e.target.value)}>
//             <option value="">Select Bill Category</option>
//             {billCategories.map((category) => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Bill Amount:</label>
//           <input type="text" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
//         </div>
//         <div>
//           <label>Upload Bill:</label>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//           />
//           <button onClick={capture}>Capture</button>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

function App() {
  const [billName, setBillName] = useState('');
  const [billCategory, setBillCategory] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'webcam'
  const webcamRef = useRef(null);
  const [billFile, setBillFile] = useState(null);

  // Predefined bill category options
  const billCategories = ['Groceries', 'Utilities', 'Entertainment', 'Healthcare'];

  const handleFileChange = (e) => {
    setUploadMode('file');
    setBillFile(e.target.files[0]);
  };

  const capture = () => {
    setUploadMode('webcam');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation and sanitization
    if (!billName || !billCategory || !billAmount) {
      setErrorMessage('All fields are required');
      return;
    }

    if (!billCategories.includes(billCategory)) {
      setErrorMessage('Invalid bill category');
      return;
    }

    // Choose appropriate upload method based on upload mode
    if (uploadMode === 'file') {
      // Handle file upload
      if (!billFile) {
        setErrorMessage('Please select a file');
        return;
      }
      const formData = new FormData();
      formData.append('billName', billName.trim());
      formData.append('billCategory', billCategory);
      formData.append('billAmount', parseFloat(billAmount));
      formData.append('file', billFile);
      // Submit form with file
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        // Reset form fields and error message on successful upload
        setBillName('');
        setBillCategory('');
        setBillAmount('');
        setBillFile(null);
        setErrorMessage('');
      } catch (error) {
        console.error('Error uploading file:', error.response.data.error);
        setErrorMessage('Failed to upload file. Please try again later.');
      }
    } else if (uploadMode === 'webcam') {
      // Handle webcam capture
      const imageSrc = webcamRef.current.getScreenshot();
      // Convert imageSrc to Blob
      const blob = await fetch(imageSrc).then((res) => res.blob());
      // Handle image blob
      const formData = new FormData();
      formData.append('billName', billName.trim());
      formData.append('billCategory', billCategory);
      formData.append('billAmount', parseFloat(billAmount));
      formData.append('file', blob, 'webcam_image.jpeg');
      // Submit form with webcam image
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        // Reset form fields and error message on successful upload
        setBillName('');
        setBillCategory('');
        setBillAmount('');
        setErrorMessage('');
      } catch (error) {
        console.error('Error uploading webcam image:', error.response.data.error);
        setErrorMessage('Failed to upload webcam image. Please try again later.');
      }
    }
  };

  const switchMode = () => {
    if (uploadMode === 'file') {
      // Clear webcam image when switching back to file upload mode
      setBillFile(null);
    }
    setUploadMode(uploadMode === 'file' ? 'webcam' : 'file');
  };

  return (
    <div>
      <h1>Upload Bill</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bill Name:</label>
          <input type="text" value={billName} onChange={(e) => setBillName(e.target.value)} />
        </div>
        <div>
          <label>Bill Category:</label>
          <select value={billCategory} onChange={(e) => setBillCategory(e.target.value)}>
            <option value="">Select Bill Category</option>
            {billCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Bill Amount:</label>
          <input type="text" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
        </div>
        <div>
          <label>Upload Bill:</label>
          {uploadMode === 'file' && (
            <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange} />
          )}
          {uploadMode === 'webcam' && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
          <button type="button" onClick={switchMode}>Switch to {uploadMode === 'file' ? 'Webcam' : 'File'}</button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
