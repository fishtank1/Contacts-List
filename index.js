// MODULES HERE
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const contact = require('./models/contact');
const Contact = require('./models/contact');

const app = express();

// MIDDLEWARES HERE
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

// SETTERS FOR PACKAGE.JSON TO CONFIGURE 
app.set('view engine', 'ejs'); //Declairs that we are going to use ejs as template/view engine to the controller/node.
app.set('views', path.join(__dirname, 'views'));

// SERVER ROUTES AND DATA
// var contactList = [
//     {
//         name: "Arpan",
//         phone: "1111111111"
//     }, 
//     {
//         name: "Tony Stark",
//         phone: "9999999999"
//     },
//     {
//         name: "Avengers HQ",
//         phone: "1234567890"
//     }
// ];

// app.get('/', (req, res) => {
//     // console.log(__dirname);
//     return res.render('home', { 
//         title: "My Contacts List"
//     }); //this is how we pass values to views
// });

app.get('/', (req, res) => {
    Contact.find({}, function(err, contacts) {
        if(err) {
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "My Contacts List", 
            contacts: contacts 
        });
    }); 
});

app.post('/create-contact', (req, res) => {
    // contactList.push({name: req.body.name, phone: req.body.phone});
    // return res.redirect('/practice');

    // contactList.push(req.body);

    // Mongo db way
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if(err) { console.log('error in creating a contact'); return; }

        console.log('***********', newContact);
        return res.redirect('back');
    });
});



app.post('/delete-contact', (req, res) => {
    let indx = req.body.deleteId;
    console.log(req.body.deleteId);
    contactList.splice(indx, 1);
    return res.redirect('back');
});

// SERVER LISTENER
app.listen(port, (err) => {
    if(err) {
        console.log('Error running the server', err);
    }
    console.log('Server is up and running at port: ', port);
});