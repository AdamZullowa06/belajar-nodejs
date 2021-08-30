const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact } = require('./utils/contacts');
const { body, validationResult, check, cookie } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('secret'));
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})
);

app.use(flash());

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
        contacts,
        msg: req.flash('msg')
    });
})

app.get('/contact/add', (req, res) => {
    res.render('add', {
        title: 'Tambah Kontak',
        layout: 'layouts/main'
    })
});

app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat) {
            throw new Error('Nama kontak sudah ada!');
        }
        return true; 
    }),
    check('email', 'email tidak valid').isEmail(), 
    check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('add', {
            title: 'Tambah kontak', 
            layout: 'layouts/main',
            errors: errors.array()
        })
    } else {
        addContact(req.body);
        req.flas('msg', 'Kontak berhasil ditambahkan');
        res.redirect('/contact');
    }
});

app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    if(!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Kontak berhasil dihapus!');
        res.redirect('/contact');
    }
})

app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit', {
        title: 'Edit Kontak',
        layout: 'layouts/main',
        contact
    })
});

app.post('/contact/update', [
    body('nama').custom((value, {req}) => {
        const duplikat = cekDuplikat(value);
        if(value !== req.body.oldNama && duplikat) {
            throw new Error('Nama contact sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('edit', {
            title: 'Edit Kontak',
            layout: 'layouts/main',
            errors: errors.array(),
            contact: req.body
        })
    } else {
        updateContact(req.body);
        req.flash('msg', 'Kontak berhasil diubah!');
        res.redirect('/contact');
    }
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
