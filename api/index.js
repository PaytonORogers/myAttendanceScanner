const express = require("express");

const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

// Let the user know the API is running... YO
app.get('/', (req, res) => {
  res.status(200).send('The API is running... YO!')
})

// Get all instructors
app.get('/instructor_login', (req, res) => {
  knex
  .select('*')
  .from('instructor_login')
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(400).json(err))
});

// Get a single instructor by dodid
app.get('/instructor_login/:dodid', (req, res) => {
  knex
  .select('*')
  .from('instructor_login')
  .where(`instructor_login.edipi = ${req.params.dodid}`)
  .then((instructor) => {
    if (instructor) {
      res.status(200).send(instructor.json())
    }
    else {
      res.status(404).send(`No instructor found with EDIPI of ${req.params.dodid}`)
    }
  })
  .catch((err) => {
    if (err){
      res.status(404).send('Something went wrong... YO')
    }
  })
})

// Get all attendees
app.get('/attendees', (req, res) => {
  knex
  .select('*')
  .from('attendees')
  .then(attendees => res.status(200).send(attendees.json()))
  .catch(err => res.status(404).send(err))
})

// Get a single attendee by dodid
app.get('/attendees/:dodid', (req, res) => {
  knex
  .select('*')
  .from('attendees')
  .where(`attendees.attendees_edipi = ${}`)
  .then(attendees => res.status(200).send(attendees.json()))
  .catch(err => res.status(404).send(err))
})

// Get all classes
app.get('/classes', () => {
  knex
  .select('*')
  .from('classes')
  .then(classes => res.status(200).send(classes.json()))
  .catch(err => res.status(404).send(err))
})

// Get a all classes per dodid of attendee
app.get('/classes/:dodid'){
  knex
  .select('*')
  .from('classes')
  .join('classes_attendees', 'classes_attendees.class_id = classes.class_id')
  .join('attendees', 'classes attendees.attendee_edipi = attendees.attendees_edipi')
  .where(`attendees.attendees_edipi = ${req.params.dodid}`)
  .then((attendee) => {
    if (attendee){
      res.status(200).send(attendee.json())
    }
    else {
      res.status(404).send(`No classes attended by attendee or no attendee with dodid of ${req.params.dodid}`)
    }
  })
  .catch(err => res.status(404).send(err))
}

// TODO - THIS WAS COPYPASTAD FROM ABOVE
// Get all attendees of class by class id
app.get('/attendee/:dodid/classes'){
  knex
  .select('*')
  .from('classes')
  .join('classes_attendees', 'classes_attendees.class_id = classes.class_id')
  .join('attendees', 'classes attendees.attendee_edipi = attendees.attendees_edipi')
  .where(`attendees.attendees_edipi = ${req.params.dodid}`)
  .then((attendee) => {
    if (attendee){
      res.status(200).send(attendee.json())
    }
    else {
      res.status(404).send(`No classes attended by attendee or no attendee with dodid of ${req.params.dodid}`)
    }
  })
  .catch(err => res.status(404).send(err))
}
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});