const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(expressLayouts);

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname});
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
    res.render('about', { title: 'About', layout: 'layouts/main'});
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
