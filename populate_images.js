const mysql = require('mysql2');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'laptop_store'
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  
  // Clear existing image records
  connection.query('DELETE FROM product_images', (err, results) => {
    if (err) {
      console.error('Error clearing product_images table:', err);
      connection.end();
      return;
    }
    
    console.log('Cleared existing image records');
    
    // Insert sample image records for actual product IDs
    const imageRecords = [
      [1, 'products/bc398237-584d-4d39-9e33-b515aa308aa9.jpg', 'Dell Gaming G15 55112', 0, 1]
    ];
    
    const query = 'INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary, created_at) VALUES ?';
    const values = imageRecords.map(record => [...record, new Date()]);
    
    connection.query(query, [values], (err, results) => {
      if (err) {
        console.error('Error inserting image records:', err);
        connection.end();
        return;
      }
      
      console.log(`Inserted ${results.affectedRows} image records`);
      
      // Verify the inserted data
      connection.query('SELECT * FROM product_images', (err, results) => {
        if (err) {
          console.error('Error querying product_images table:', err);
        } else {
          console.log('Current image records in database:');
          console.table(results);
        }
        
        connection.end();
      });
    });
  });
});