const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan');
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(morgan('dev'));

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

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
    res.render('contact', { title: 'Contact', layout: 'layouts/main'});
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('404');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
