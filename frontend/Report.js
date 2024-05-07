import React from 'react';
const db = require('../config/database');


function DownloadButton() {
  const handleDownload = async () => {
    try {
      const response = await fetch('/generate-csv'); // Assuming your server route for generating CSV is '/generate-csv'
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download CSV</button>
  );
}

export default DownloadButton;
