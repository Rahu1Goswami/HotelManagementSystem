import express, { json } from "express";
import db from './database/connection.js';

const app = express();
const port = 4000;

app.use(express.json());
const getRoom = (tier, MaximumOccupency) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM rooms WHERE tier = ? AND MaximumOccupency = ? AND Status = ? LIMIT 1`;
    db.query(query, [tier, MaximumOccupency, "Available"], (err, results) => {
      if (err) {
        return reject('Error fetching rooms');
      }
      if (results.length > 0) {
        resolve(results[0].id);
      } else {
        reject('No available rooms found');
      }
    });
  });
};

app.post('/booking', async (req, res) => {
  let status = "Checked-in";
  let { firstName, middleName, lastName, dob, gender, phone, email, identityProof, checkin, checkout, tier, MaximumOccupency } = req.body;
  
  if (!firstName || !lastName || !dob || !gender || !phone || !email || !identityProof || !checkin || !checkout || !tier || !MaximumOccupency) {
    return res.status(400).json({ error: 'Please fill in all the required fields' });
  }
  const sql = `INSERT INTO guests (FirstName, MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, IdProof)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [firstName, middleName, lastName, dob, gender, phone, email, identityProof], async (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: 'Database error while inserting guest' });
    }


    const sql11 = `update guests set MiddleName = NULL WHERE MiddleName = ''`;
    db.query(sql11, async (err, result11) => {
    if (err) {
      console.error('Error inserting setting MiddleName to NULL into MySQL:', err);
      return res.status(500).json({ error: 'Database error while inserting Middle name into guest' });
    }
  });

    const guestId = result.insertId;
    try {
      const roomId = await getRoom(tier, MaximumOccupency);

      const sql1 = `INSERT INTO transactions (guest_id, room_id, check_in, check_out, status)
                    VALUES (?, ?, ?, ?, ?)`;
      db.query(sql1, [guestId, roomId, checkin, checkout, status], (err1, result1) => {
        if (err1) {
          console.error('Error inserting data into MySQL:', err1);
          return res.status(500).json({ error: 'Database error while inserting transaction' });
        }

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

app.post('/emp', async (req, res) => {
  const {firstName, middleName, lastName, dob, gender, phone, email, address, jobtitle, salary} = req.body;
  if (!firstName || !middleName || !lastName || !dob || !gender || !phone || !email || !address || !jobtitle || !salary) {
    return res.status(400).json({ error: 'Please fill in all the required fields' });
  }
  const sql6 = `INSERT INTO employees (FirstName, MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, Address, JobTitle, salary)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  console.log(sql6);
  db.query(sql6, [firstName, middleName, lastName, dob, gender, phone, email, address, jobtitle, salary], async (err, result) => {
    if (err) {
      console.error('Error inserting data into employees in MySQL:', err);
      
      return res.status(500).json({ error: 'Database error while inserting employees' });
    }
  });
  });


app.post('/', async (req, res) => {
  const sql7 = `SELECT 
                 t.id,
                 t.room_id, 
                 g.FirstName, 
                 IFNULL(MiddleName, '') AS MiddleName,
                 g.LastName, 
                 t.check_in, 
                 t.check_out, 
                 t.status 
                FROM transactions t 
                JOIN guests g ON t.guest_id = g.id`;
                
  db.query(sql7, (err, result6) => {
    if (err) {
      console.error('Error fetching data from transactions join guests MySQL:', err);
      return res.status(500).json({ error: 'Database error while fetching reservations' });
     }
    res.json(result6);
  });

  const sql4 = `Update rooms set status = "Available" WHERE id in (SELECT room_id FROM transactions WHERE check_out < CURDATE())`;
db.query(sql4,(err1, result2) => {
  if (err1) {
    console.error('Error Updating data into rooms:', err1);
    return res.status(500).json({ error: 'Database error while updating rooms' });
  }});
const sql5 = `Update transactions set status = "Closed" WHERE check_out < CURDATE()`;
db.query(sql5,(err1, result2) => {
  if (err1) {
    console.error('Error Updating data into rooms:', err1);
    return res.status(500).json({ error: 'Database error while updating rooms' });
}});


});

app.post('/employee', async (req, res) => {
  const sql8 = `select id, FirstName, IFNULL(MiddleName, '') AS MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, Address, jobtitle, salary from employees`;
                
  db.query(sql8, (err, result7) => {
    if (err) {
      console.error('Error fetching data from employees MySQL:', err);
      return res.status(500).json({ error: 'Database error while fetching emoployees' });
    }
    
    console.log(JSON.stringify(result7, null, 2));
    res.json(result7); // Send the result to the client
  });
});

app.post('/guests', async (req, res) => {
  const sql9 = `SELECT id, FirstName, IFNULL(MiddleName, '') AS MiddleName, LastName, DOB, Gender, PhoneNo, EmailId, IdProof FROM guests`;
                
  db.query(sql9, (err, result8) => {
    if (err) {
      console.error('Error fetching data from guests MySQL:', err);
      return res.status(500).json({ error: 'Database error while fetching guests' });
    }
    
    res.json(result8); // Send the result to the client
  });
});

app.post('/room', async (req, res) => {
  const sql10 = `select * from rooms`;
                
  db.query(sql10, (err, result9) => {
    if (err) {
      console.error('Error fetching data from rooms MySQL:', err);
      return res.status(500).json({ error: 'Database error while fetching rooms' });
    }
    res.json(result9); // Send the result to the client
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});