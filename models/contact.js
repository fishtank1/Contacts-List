const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    }
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;


/* 
    STEPS IN CREATING A MONGO DB 
    1. import packages. 
    2. create schema. 
    3. define collection. 
    4. export the db.
*/
