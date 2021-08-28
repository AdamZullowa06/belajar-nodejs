const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts');

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Adam Zullowa',
            email: 'adamzullowa06@gmail.com'
        },
        {
            nama: 'Mega',
            email: 'gaga@gmail.com'
        },
        {
            nama: 'Ravi',
            email: 'Ravi@gmail.com'
        }
    ]
    res.render('index', {
        title: 'Express JS',
        layout: 'layouts/main',
        nama: 'Adam Zullowa',
        mahasiswa
    });
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About', 
        layout: 'layouts/main'
    });
})

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', { 
        title: 'Contact', 
        layout: 'layouts/main',
        contacts
    });
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    
    res.render('detail', { 
        title: 'Detail Contact', 
        layout: 'layouts/main',
        contact
    });
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('404');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
