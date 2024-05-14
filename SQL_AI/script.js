
function submitQuery() {
    const inputText = document.getElementById('input').value;
    fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        const sqlQueryHTML = `<h2>The SQL Query is</h2><p>${data.sql_query}</p>`;
        const responseHTML = `<h2>The Response is</h2><p>${data.response}</p>`;
        document.getElementById('response').innerHTML = sqlQueryHTML + responseHTML;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


