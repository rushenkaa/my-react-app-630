import React from 'react';
import {useState, useEffect} from 'react';
export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  
  useEffect (() => {
    fetchPhoto();
    async function fetchPhoto() {
        const res = await fetch(
            /* `URL HERE` (18 mins) */
        );
        const data = await res.json();
        setPhotoData(data);
        console.log(data);
    }
  }, []);

if (!photoData) return <div />;
  return (
    <div>
        {photoData.media_type === "image" ? (
        <img src={photoData.url} alt={photoData.title} />
          ) : (
            <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className = "photo" 
            />
          )}
          <div>
          <h1>{photoData.title}</h1>
          <p>{photoData.date}</p>
          <p>{photoData.explanation}</p>
    </div>
  </div>
    );

}