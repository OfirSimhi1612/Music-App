require('dotenv').config()
const mysql = require('mysql');
const express = require('express');

const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    multipleStatements: true
  });

mysqlCon.connect(err => {
    if(err){
        console.log('error conecting to server: ' + err.message);
    } else {
        console.log("Connected to SQL server!");
    }
});

// Each time user play song it save it as interactions with the user, song, is_liked, play_count, created_at


function newDateToSQL(){
    return new Date().toISOString().slice(0, -5).replace('T', ' ')
}

app.delete('/:tableName/:id', (req, res) => {
    const id = req.params.id;
    const tableName = req.params.tableName;
    console.log(req.params.id.slice(0, -1))
    mysqlCon.query(`DELETE FROM ${tableName} WHERE ${tableName.slice(0, -1)}_id = ${id}` ,(error, results) => {
        if(error){
            res.status(400).status(error.message)
        } else if(results.affectedRows === 0){
            res.status(404).send(`invalid ${tableName.slice(0, -1)} id: no ${tableName.slice(0, -1)} with id ${id} found`);
        } else {
            res.send(`${tableName.slice(0, -1)} deleted!`)
        }
    })
})

app.put('/:tableName/:id', (req, res) => {
    const id = req.params.id;
    const tableName = req.params.tableName;

    const updatedKeys = Object.keys(req.body).reduce((keysToUpdate, key, index) => {
        if(index === 0){
            return keysToUpdate += `${key} = '${req.body[key]}'`
        } 
        return keysToUpdate += `, ${key} = '${req.body[key]}'`
    }, ``)

    mysqlCon.query(`UPDATE ${tableName} SET ${updatedKeys} WHERE ${tableName.slice(0, -1)}_id = ${id};`, (error, results) => {
        if(error){
            res.status(400).send(error.message)
        } else if(results.affectedRows === 0){
            res.status(404).send(`invalid ${tableName.slice(0, -1)} id : no ${tableName.slice(0, -1)} with id ${id} found`)
        } else {
            res.send(`${tableName.slice(0, -1)} updated!`)
        }
    })

})

app.get('/:tableName/:id', (req, res) => {
    const id = req.params.id;
    const tableName = req.params.tableName;
    mysqlCon.query(`SELECT * FROM ${tableName} WHERE ${tableName.slice(0, -1)}_id = ${id}` ,(error, results, fields) => {
        if (error) {
            return res.status(400).send(error.message);
        } else if(results.length === 0){
            return res.status(404).send(`invalid ${tableName.slice(0, -1)} id : no ${tableName.slice(0, -1)} with id ${id} found`)
        } else {
            return res.send(results);
        }
      });

})

app.get('/:tableName', (req, res) => {
    const tableName = req.params.tableName;

    mysqlCon.query(`SELECT * FROM ${tableName}`, (error, results) => {
        if (error) {
            return res.status(400).send(err.message);
        } else if(results.length === 0){
            return res.status(404).send(`no ${tableName}`)
        } else {
            return res.json(results);
        }
      });
})



app.get('/top_playlists', (req, res) => { //working
    mysqlCon.query(`SELECT * FROM playlists ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            return res.status(400).send(error.message);
        } else {
            return res.json(results);
        }
    })
});

app.get('/top_artists', (req, res) => { //working
    mysqlCon.query(`SELECT * FROM artists ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            return res.status(400).send(error.message);
        } else {
            return res.json(results);
        }
    })
});

app.get('/top_albums', (req, res) => { //working
    mysqlCon.query(`SELECT * FROM albums ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            return res.status(400).send(error.message);
        } else {
            return res.json(results);
        }
    })
});

app.get('/top_songs', (req, res) => { //working
    mysqlCon.query(`SELECT * FROM songs ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            return res.status(400).send(error.message);
        } else {
            return res.json(results);
        }
    })
});



app.post('/playlists', (req, res) => { // working
    const data = req.body;

    mysqlCon.query(`INSERT INTO playlists (name, cover_img, created_at, uploaded_at, genre)
                VALUES ('${data.name}', '${data.cover_img}', '${data.created_at}', '${newDateToSQL()}','${data.genre}')`,
                (error, results, fields) => {
                    if(error){
                        return res.status(400).send(error.message);
                    } else {
                        return res.status(201).json(data)
                    }
                })
});

app.post('/artists', (req, res) => { //working
    const data = req.body;
    
    mysqlCon.query(`INSERT INTO artists (first_name, last_name, birth_date, cover_img, uploaded_at, likes)
                VALUES ('${data.first_name}', '${data.last_name}', '${data.birth_date}',${data.cover_img}, '${newDateToSQL()}', '${data.likes}')`,
                (error, results, fields) => {
                    if(error){
                        return res.status(400).send(error.message);
                    } else {
                        return res.status(201).json(data)
                    }
                })
});

app.post('/albums', (req, res) => { // working
    const data = req.body;
    mysqlCon.query(`INSERT INTO albums (name,  artist_id, published_at, uploaded_at, likes)
                VALUES ('${data.name}', '${data.artist_id}', '${data.published_at}', '${newDateToSQL()}', '${data.likes}')`,
                (error, results, fields) => {
                    if(error){
                        if(error.errno === 1452){
                            res.status(404).send("an invalid artist id has been submited")
                        }
                        return res.status(400).send(error.message);
                    } else {
                        return res.status(201).json(data)
                    }
                })
});

app.post('/songs', (req, res) => { // check again
    const data = req.body;
    mysqlCon.query(`INSERT INTO songs (title, artist_id, album_id, lyrics, length, created_at, uploaded_at, youtube_link, track_number, likes)
                VALUES ('${data.title}', '${data.artist_id}', '${data.album_id}', '${data.lyrics}', '${data.length}', '${data.created_at}', '${newDateToSQL()}', '${data.youtube_link}', '${data.track_number}', '${data.likes}')`,
                (error, results, fields) => {
                    if(error){
                        if(error.errno === 1452){
                            res.status(404).send("an invalid artist or album id's has been submited")
                        }
                        return res.status(400).send(error.message);
                    } else {
                        return res.status(201).json(data)
                    }
                })
});

module.exports = app;