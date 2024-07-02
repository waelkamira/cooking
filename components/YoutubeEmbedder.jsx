// // components/YoutubeEmbedder.js

// import React, { useState, useContext } from 'react';
// import { getYoutubeVideoId } from './youtubeUtils';
// import { inputsContext } from './Context';

// const YoutubeEmbedder = () => {
//   const [url, setUrl] = useState('');
//   const [embedLink, setEmbedLink] = useState('');
//   const [error, setError] = useState('');
//   const { dispatch } = useContext(inputsContext);

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setUrl(inputValue);
//     handleGenerateEmbed(inputValue); // Pass inputValue to generate embed link
//   };

//   const handleGenerateEmbed = (inputValue) => {
//     const videoId = getYoutubeVideoId(inputValue);

//     if (videoId) {
//       const youtubeEmbedLink = `https://www.youtube.com/embed/${videoId}`;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem(
//           'youtubeEmbedLink',
//           JSON.stringify(youtubeEmbedLink)
//         );
//       }
//       dispatch({ type: 'VIDEO_LINK', payload: youtubeEmbedLink });
//       setEmbedLink(youtubeEmbedLink);
//       setError('');
//     } else {
//       setEmbedLink('');
//       setError('Invalid YouTube URL');
//     }
//   };

//   return (
//     <div>
//       <h1>YouTube Embedder</h1>
//       <input
//         type="text"
//         placeholder="Paste YouTube link here"
//         value={url}
//         onChange={handleInputChange}
//         style={{ width: '300px', marginRight: '10px' }}
//       />
//       {error && <p>{error}</p>}
//       {embedLink && (
//         <div>
//           <iframe
//             width="560"
//             height="315"
//             src={embedLink}
//             frameBorder="0"
//             allowFullScreen
//             title="Embedded YouTube Video"
//             style={{ marginTop: '20px' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default YoutubeEmbedder;
