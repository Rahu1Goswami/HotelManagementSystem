import express from "express";
import db from './database/connection.js';

const app = express();
const port = 4000;

app.use(express.json()); // To parse JSON bodies

// Helper function to query rooms
const getRoom = (tier, MaximumOccupency) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM rooms WHERE tier = ? AND MaximumOccupency = ? AND Status = ? LIMIT 1`;
    db.query(query, [tier, MaximumOccupency, "Available"], (err, results) => {
      if (err) {
        return reject('Error fetching rooms');
      }
      if (results.length > 0) {
        resolve(results[0].id);  // resolve with roomId
      } else {
        reject('No available rooms found');
      }
    });
  });
};

// Route to handle booking
app.post('/booking', async (req, res) => {
  let status = "Closed";
  const { firstName, middleName, lastName, dob, gender, phone, email, identityProof, checkin, checkout, tier, MaximumOccupency } = req.body;
  console.log(req.body);
  
  // Validate input data
  if (!firstName || !lastName || !dob || !gender || !phone || !email || !identityProof || !checkin || !checkout || !tier || !MaximumOccupency) {
    return res.status(400).json({ error: 'Please fill in all the required fields' });
  }

  // Insert into guests table
  const sql = `INSERT INTO guests (FirstName, MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, IdProof)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [firstName, middleName, lastName, dob, gender, phone, email, identityProof], async (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: 'Database error while inserting guest' });
    }
    const guestId = result.insertId;  // result.insertId gives the ID of the last inserted row
    console.log('Inserted Guest ID:', guestId);
    try {
      // Use async/await to get the roomId
      const roomId = await getRoom(tier, MaximumOccupency);
      console.log(roomId);

      // Insert into transactions table
      const sql1 = `INSERT INTO transactions (guest_id, room_id, check_in, check_out, status)
                    VALUES (?, ?, ?, ?, ?)`;
      db.query(sql1, [guestId, roomId, checkin, checkout, status], (err1, result1) => {
        if (err1) {
          console.error('Error inserting data into MySQL:', err1);
          return res.status(500).json({ error: 'Database error while inserting transaction' });
        }

        // Send success response after everything is done
        res.json({ message: 'Booking saved successfully' });
      });

      const sql2 = `UPDATE rooms set status = "Occupied" WHERE id = ?`;
      db.query(sql2, roomId, (err1, result2) => {
        if (err1) {
          console.error('Error Updating data into rooms:', err1);
          return res.status(500).json({ error: 'Database error while updating rooms' });
        }});
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: error });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
