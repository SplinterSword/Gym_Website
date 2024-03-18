//Modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const port = 80;

//Express Specific Stuff
const app = express()
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//Pug Specific Stuff
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))


//Mongoose Specific Stuff
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const contact = mongoose.model('contact', contactSchema);

//End Points
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
});

// Start The Server
app.listen(port,()=>{
    console.log(`This app started successfully on port ${port}`);
})