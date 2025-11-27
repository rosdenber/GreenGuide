const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Create a connection to the database server (without specifying a database)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
});

// Read the schema file
const schemaPath = path.join(__dirname, 'config', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Split the schema into individual statements
const statements = schema.split(';').filter(stmt => stmt.trim() !== '');

// Connect to the database and execute the schema
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  
  console.log('Successfully connected to the database server.');
  
  // Execute each statement individually
  let currentIndex = 0;
  
  function executeNextStatement() {
    if (currentIndex >= statements.length) {
      console.log('All schema statements executed successfully.');
      console.log('GreenGuide database and tables created.');
      console.log('Sample data inserted.');
      connection.end();
      return;
    }
    
    const statement = statements[currentIndex].trim();
    if (statement === '') {
      currentIndex++;
      executeNextStatement();
      return;
    }
    
    console.log(`Executing statement ${currentIndex + 1}/${statements.length}`);
    
    connection.query(statement, (err, results) => {
      if (err) {
        console.error(`Error executing statement ${currentIndex + 1}:`, err);
        connection.end();
        return;
      }
      
      currentIndex++;
      executeNextStatement();
    });
  }
  
  executeNextStatement();
});