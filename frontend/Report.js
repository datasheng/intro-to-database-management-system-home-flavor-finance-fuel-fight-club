import React from 'react';

function App() {
    const handleGenerateCSV = () => {
        fetch('/generate-csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.csv');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('Error generating CSV:', error);
            });
    };

    return (
        <div>
            <button onClick={handleGenerateCSV}>Generate CSV</button>
        </div>
    );
}

export default App;

