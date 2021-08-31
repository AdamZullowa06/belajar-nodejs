const { ObjectID } = require('bson');
const { MongoClient} = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'latihan';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, client) => {
    if(error) {
        return console.log('Koneksi gagal');
    }

    // connect database
    const db = client.db(dbName);

    // tambah data
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'Ravi',
    //         email: 'ravi@gmail.com'
    //     },
    //     (error, result) => {
    //         if(error) {
    //             return console.log('gagal menambahkan data');
    //         }

    //         console.log(result);
    //     }
    // );

    // tambah data banyak
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Ravi',
    //             email: 'ravi@gmail.com'
    //         },
    //         {
    //             nama: 'Bagus',
    //             email: 'bagus@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if(error) {
    //             return console.log('gagal menambahkan data');
    //         }

    //         console.log(result);
    //     }
    // );

    // menampilkan semua data
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result);
    // }));

    // menampilkan data berdasarkan kriteria
    // console.log(db.collection('mahasiswa').find({_id: ObjectID('612e2be400d569de9378a7f8')}).toArray((error, result) => {
    //     console.log(result);
    // }));

    // mengubah data berdasarkan id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID('612e50176bcb51a45d7bef97')
    //     },
    //     {
    //         $set: {
    //             nama: 'Kirei',
    //             email: 'kirei@gmail.com'
    //         }
    //     }
    // );

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // mengubah data banyak
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'Ravi'
    //     },
    //     {
    //         $set: {
    //             nama: 'Banteng Merah'
    //         }
    //     }
    // );

    // menghapus data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID('612e50176bcb51a45d7bef97')
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error);
    // });

    // menghapus banyak data
    db.collection('mahasiswa').deleteOne(
        {
            nama: 'Erik Doank'
        })
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
    });
});