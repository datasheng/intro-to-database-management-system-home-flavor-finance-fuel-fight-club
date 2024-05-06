connection.query('CALL totalRevenue()', (error, results, fields) => {
    if (error) {
      console.error('Error calling stored procedure:', error);
      return;
    }
    // Process the results and generate CSV
  });


const { createObjectCsvWriter } = require('csv-writer');

const csvWriter = createObjectCsvWriter({
  path: 'report.csv',
  header: [
    { id: 'column1', title: 'Column 1' },
    { id: 'column2', title: 'Column 2' },
    // Add more columns as needed
  ]
});

csvWriter.writeRecords(results)
  .then(() => console.log('CSV file generated successfully'))
  .catch(err => console.error('Error writing CSV:', err));

  app.get('/generate-csv', (req, res) => {
    // Query MySQL and generate CSV
    // Send CSV file as response
    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv'); // File name
    // Send CSV data
  });
  