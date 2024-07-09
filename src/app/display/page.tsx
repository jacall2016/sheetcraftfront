'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Display = () => {
  const [downloadLink, setDownloadLink] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8000/filehandler/download/', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setDownloadLink('http://localhost:8000/filehandler/download/');
        }
      })
      .catch(error => console.error('Error fetching download link:', error));
  }, []);

  return (
    <div>
      <h1>Download Files</h1>
      {downloadLink ? (
        <a href={downloadLink}>Download Generated File</a>
      ) : (
        <p>No file available for download.</p>
      )}
    </div>
  );
}

export default Display;
