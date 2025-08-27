const express = require("express");

const app = express();
const port = 8080;
const cors = require("cors");


app.use(cors());
app.use(express.json());

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

// Let the user know the API is running... YO
app.get('/', (req, res) => {
  res.status(200).send('The API is running... YO!')
})

// Get all instructors
app.get('/instructors', (req, res) => {
  knex
    .select('*')
    .from('instructor_login')
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err))
});

// Get a single instructor by dodid
app.get('/instructors/edipi/:dodid', (req, res) => {
  knex
    .select('*')
    .from('instructor_login')
    .where('instructor_login.edipi', '=', `${req.params.dodid}`)
    .then((instructor) => {
      if (instructor) {
        res.status(200).send(instructor)
      }
      else {
        res.status(404).send(`No instructor found with EDIPI of ${req.params.dodid}`)
      }
    })
    .catch((err) => {
      if (err) {
        res.status(404).send(err)
      }
    })
})

// Get all attendees
app.get('/attendees', (req, res) => {
  knex
    .select('*')
    .from('attendees')
    .then(attendees => res.status(200).send(attendees))
    .catch(err => res.status(404).send(err))
})

// Get a single attendee by dodid
app.get('/attendees/:dodid', (req, res) => {
  knex
    .select('*')
    .from('attendees')
    .where('attendees.attendees_edipi', '=', `${req.params.dodid}`)
    .then(attendees => res.status(200).send(attendees))
    .catch(err => res.status(404).send(err))
})

// Get all classes
app.get('/classes', (req, res) => {
  knex
    .select('*')
    .from('classes')
    .then(classes => res.status(200).send(classes))
    .catch(err => res.status(404).send(err))
})

app.get('/classes/:id', (req, res) => {
  knex
    .select('*')
    .from('classes')
    .where('class_id', '=', `${req.params.id}`)
    .then(classes => res.status(200).send(classes))
    .catch(err => res.status(404).send(err))
})

app.get('/classes/instructor/:instructor_username', (req, res) => {
  knex
  .select('*')
  .from('classes')
  .where('instructor_username', '=', `${req.params.instructor_username}`)
  .then((data) => {
    console.log(data)
    if (data.length === 0){
      res.status(404).send(`No classes found for ${req.params.instructor_username}`)
    }
    else{
      res.status(200).send(data)
    }
  })
  .catch(err => res.status(500).send(err))
})

app.post('/classes', (req, res) => {
  let newClass = req.body;
  let dateToAdd;

  if (!Object.hasOwn(newClass, "class_title")){
    res.status(400).send("Must provide class_title property")
  }
  if (!Object.hasOwn(newClass, "instructor_username")){
    res.status(400).send("Must provide instructor_username property")
  }
  if (!Object.hasOwn(newClass, "date")){
    newClass.date = new Date()
  }

  knex('classes')
  .insert(newClass, ['class_title'])
  .then((data) => res.status(200).send(data))

})


app.get('/instructors/username/:username', (req, res) => {
  let queriedUsername = req.params.username
  console.log(queriedUsername)
  if (queriedUsername) {
    knex
      .select('*')
      .from('instructor_login')
      .where('instructor_login.username', '=', `${queriedUsername}`)
      .then((info) => res.status(200).send(info))
  }
  else {
    res.status(400).send('You must supply a username in the body of the request')
  }
})

// Must send with body of full instructor object. Example:
// {
//     "edipi": 53241,
//     "username": "hurlingkirbiez69",
//     "hashed_password": "password2",
//     "email": "kirby@mail.com",
//     "first_name": "bill",
//     "middle_initial": "f",
//     "last_name": "kirby",
//     "date_of_birth": "1990-09-16",
//     "branch": "ARRRRRMMMY",
//     "rank": "E6",
//     "card_expiration": "20260101"
// }
app.post('/instructor_login', async (req, res) => {
  let addedInstructor = req.body




  const existingUser = await knex.select('*').from('instructor_login').where('username', '=', addedInstructor.username);
  console.log(existingUser)

  if (addedInstructor && Object.hasOwn(addedInstructor, 'username') && Object.hasOwn(addedInstructor, 'hashed_password')) {
    // ADD CHECK FOR IF INSTRUCTOR ALREADY HAS LOGIN
    // SHOULD PROMPT FOR ACCOUNT RESET OR PASSWORD RESET OR SOMETHING I DUNNO

    if (existingUser[0]) {
      return res.status(409).send("User already exists");
    }

    knex('instructor_login')
      .insert(addedInstructor, ['username', 'hashed_password'])
      .then((info) => res.status(200).send(info))
  } else {
    res.status(400).send('Missing required properties')
  }
})

// Get a all classes per dodid of attendee
// app.get('/classes/:dodid', (req, res) => {
//   knex
//   .select('*')
//   .from('classes')
//   .join('classes_attendees', 'classes_attendees.class_id', '=', 'classes.class_id')
//   .join('attendees', 'classes_attendees.attendees_edipi', '=', 'attendees.attendees_edipi')
//   .where('attendees.attendees_edipi', '=', `${req.params.dodid}`)
//   .then((attendee) => {
//     if (attendee){
//       res.status(200).send(attendee)
//     }
//     else {
//       res.status(404).send(`No classes attended by attendee or no attendee with dodid of ${req.params.dodid}`)
//     }
//   })
//   .catch(err => res.status(404).send(`test ${err}`))
// })

// TODO - THIS WAS COPYPASTAD FROM ABOVE
// Get all attendees of class by class id
// app.get('/attendee/:dodid/classes', (req, res) => {
//   knex
//   .select('*')
//   .from('classes')
//   .join('classes_attendees', 'classes_attendees.class_id', '=', 'classes.class_id')
//   .join('attendees', 'classes attendees.attendee_edipi', '=', attendees.attendees_edipi)
//   .where('attendees.attendees_edipi', '=', req.params.dodid)
//   .then((attendee) => {
//     if (attendee){
//       res.status(200).send(attendee.)
//     }
//     else {
//       res.status(404).send(`No classes attended by attendee or no attendee with dodid of ${req.params.dodid}`)
//     }
//   })
//   .catch(err => res.status(404).send(err))
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});