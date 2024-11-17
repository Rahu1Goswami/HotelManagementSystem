// server.js
import express from "express"
import db from './database/connection.js'
const app = express();
const port = 4000;

app.use(express.json()); // To parse JSON bodies

// Sample route to fetch all records from a table
app.post('/booking', (req, res) => {
    let room_id = 101;
    let status = "Closed";
    const { id: customer_id, firstName, middleName, lastName, dob, gender, phone, email, identityProof, checkin, checkout, tier } = req.body;
    console.log(customer_id);
    if (!customer_id || !firstName || !lastName || !dob || !gender || !phone || !email || !identityProof || !checkin || !checkout || !tier) {
      return res.status(400).json({ error: 'Please fill in all the required fields' });
  }
    const sql = `INSERT INTO guests (id, FirstName, MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, IdProof)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [customer_id, firstName, middleName, lastName, dob, gender, phone, email, identityProof], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Booking saved successfully' });
      }
    });
    const sql1 = `INSERT INTO transactions (customer_id, room_id, check_in, check_out, status)
                   VALUES (?, ?, ?, ?, ?)`;
                   db.query(sql1, [customer_id, room_id, checkin, checkout, status], (err, result) => {
                    if (err) {
                      console.error('Error inserting data into MySQL:', err);
                      res.status(500).json({ error: 'Database error' });
                    } else {
                      res.json({ message: 'Booking saved successfully' });
                    }
                  });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
