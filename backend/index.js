// server.js
import express from "express"
import db from './database/connection.js'
const app = express();
const port = 4000;

app.use(express.json()); // To parse JSON bodies

// Sample route to fetch all records from a table
app.post('/booking', (req, res) => {
    let status = "Closed";
    let customer_id = 176;
    const {firstName, middleName, lastName, dob, gender, phone, email, identityProof, checkin, checkout, tier, MaximumOccupency, roomId} = req.body;
    console.log(roomId);
    if (!firstName || !lastName || !dob || !gender || !phone || !email || !identityProof || !checkin || !checkout || !tier || !MaximumOccupency || !roomId) {
      return res.status(400).json({ error: 'Please fill in all the required fields' });
  }
    const sql = `INSERT INTO guests (FirstName, MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, IdProof)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [firstName, middleName, lastName, dob, gender, phone, email, identityProof], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Booking saved successfully' });
      }
    });
    const sql1 = `INSERT INTO transactions (customer_id, room_id, check_in, check_out, status)
                   VALUES (?, ?, ?, ?, ?)`;
                   db.query(sql1, [customer_id, roomId, checkin, checkout, status], (err, result) => {
                    if (err) {
                      console.error('Error inserting data into MySQL:', err);
                      res.status(500).json({ error: 'Database error' });
                    } else {
                      res.json({ message: 'Booking saved successfully' });
                    }
                  });
  });
app.get('/rooms',(req,res)=>{
  const query = `SELECT * FROM rooms`;
console.log(query);

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rooms:', err);
      return res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  const a=  res.json(results); // Send the entire table as JSON
  console.log(a);
  
  });
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});