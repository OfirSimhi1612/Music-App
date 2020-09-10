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
// a GET request to /top_songs/ returns a list of top 20 songs

// a GET request to /top_artists/ returns a list of top 20 artists

// a GET request to /top_albums/ returns a list of top 20 albums

// a GET request to /top_playlist/ returns a list of top 20 playlist

// a PUT request to /song/123 update the details of song 123

// a PUT request to /artist/123 update the artist 123

// a PUT request to /album/123 update the album 123

// a PUT request to /playlist/123 update the playlist 123

// a DELETE request to /song/123 delete the details of song 123

// a DELETE request to /artist/123 delete the artist 123

// a DELETE request to /album/123 delete the album 123

// a DELETE request to /playlist/123 delete the playlist 123


function newDateToSQL(){
    return new Date().toISOString().slice(0, -5).replace('T', ' ')
}

app.get('/top_playlists', (req, res) => {
    mysqlCon.query(`SELECT * FROM playlists ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            res.status(400).send(error.message);
        } else {
            res.json(results);
        }
    })
});


app.get('/top_artists', (req, res) => {
    mysqlCon.query(`SELECT * FROM artists ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            res.status(400).send(error.message);
        } else {
            res.json(results);
        }
    })
});


app.get('/top_albums', (req, res) => {
    mysqlCon.query(`SELECT * FROM albums ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            res.status(400).send(error.message);
        } else {
            res.json(results);
        }
    })
});


app.get('/top_songs', (req, res) => {
    mysqlCon.query(`SELECT * FROM songs ORDER BY -likes LIMIT 20;`, (error, results) => {
        if(error){
            res.status(400).send(error.message);
        } else {
            res.json(results);
        }
    })
});

app.get('/playlists', (req, res) => { //working
    mysqlCon.query('SELECT * FROM playlists', (error, results) => {
        if (error) {
            res.status(400).send(err.message);
        } else if(results.length === 0){
            res.status(404).send('no playlists')
        } else {
            res.json(results);
        }
      });
});

app.get('/artists', (req, res) => { //working
    mysqlCon.query('SELECT * FROM artists', (error, results) => {
        if (error) {
            res.status(400).send(err.message);
        } else if(results.length === 0){
            res.status(404).send('no artists')
        } else {
            res.json(results);
        }
      });
});

app.get('/albums', (req, res) => { //working
    mysqlCon.query('SELECT * FROM albums', (error, results) => {
        if (error) {
            res.status(400).send(err.message);
        } else if(results.length === 0){
            res.status(404).send('no albums')
        } else {
            res.json(results);
        }
      });
});

app.get('/songs', (req, res) => { //working
    mysqlCon.query('SELECT * FROM songs', (error, results) => {
        if (error) {
            res.status(400).send(err.message);
        } else if(results.length === 0){
            res.status(404).send('no songs')
        } else {
            res.json(results);
        }
      });
});

app.get('/playlists/:id', async (req, res) =>{ //working
    mysqlCon.query(`SELECT * FROM playlists WHERE playlist_id = ${req.params.id}` ,(error, results, fields) => {
        if (error) {
            res.status(400).send(err.message);
            throw error;
        } else if(results.length === 0){
            res.status(404).send('invalid playlist id : no playlist with such id found')
        } else {
            res.send(results);
        }
      });
});

app.get('/artists/:id', async (req, res) =>{ //working
    mysqlCon.query(`SELECT * FROM artists WHERE artist_id = ${req.params.id}` ,(error, results, fields) => {
        if (error) {
            res.status(400).send(err.message);
            throw error;
        } else if(results.length === 0){
            res.status(404).send('invalid artist id : no artist with such id found')
        } else {
            res.send(results);
        }
      });
});

app.get('/albums/:id', async (req, res) =>{ //working
    mysqlCon.query(`SELECT * FROM albums WHERE album_id = ${req.params.id}` ,(error, results, fields) => {
        if (error) {
            res.status(400).send(err.message);
            throw error;
        } else if(results.length === 0){
            res.status(404).send('invalid album id : no album with such id found')
        } else {
            res.send(results);
        }
      });
});

app.get('/songs/:id', async (req, res) =>{ //working
    mysqlCon.query(`SELECT * FROM songs WHERE song_id = ${req.params.id}` ,(error, results, fields) => {
        if (error) {
            res.status(400).send(err.message);
            throw error;
        } else if(results.length === 0){
            res.status(404).send('invalid song id : no song with such id found')
        } else {
            res.send(results);
        }
      });
});

app.post('/playlists', (req, res) => { // working
    const data = req.body;

    mysqlCon.query(`INSERT INTO playlists (name, cover_img, created_at, uploaded_at, genre)
                VALUES ('${data.name}', '${data.cover_img}', '${data.created_at}', '${newDateToSQL()}','${data.genre}')`,
                (error, results, fields) => {
                    if(error){
                        res.status(400).send(error.message);
                        console.log(error)
                    } else {
                        res.status(201).json(data)
                    }
                })
});

app.post('/artists', (req, res) => { //working
    const data = req.body;
    
    mysqlCon.query(`INSERT INTO artists (first_name, last_name, birth_date, cover_img, uploaded_at, likes)
                VALUES ('${data.first_name}', '${data.last_name}', '${data.birth_date}',${data.cover_img}, '${newDateToSQL()}', '${data.likes}')`,
                (error, results, fields) => {
                    if(error){
                       res.status(400).send(error.message);
                    } else {
                        res.status(201).json(data)
                    }
                })
});

app.post('/albums', (req, res) => { // working
    const data = req.body;
    if(data.artist_id){
       return  mysqlCon.query(`SELECT artist_id FROM artists WHERE artist_id = ${data.artist_id}`, (err, results) => {
            if(results.length === 0){
               res.status(404).send('invalid artist id : no artist with such id found');
            }
            if(err){
                res.send(err.message)
            } 
        })
    }
    mysqlCon.query(`INSERT INTO albums (name,  artist_id, published_at, uploaded_at, likes)
                VALUES ('${data.name}', '${data.artist_id}', '${data.published_at}', '${newDateToSQL()}', '${data.likes}')`,
                (error, results, fields) => {
                    if(error){
                       res.status(400).send(error.message);
                    } else {
                        res.status(201).json(data)
                    }
                })
});

app.post('/songs', (req, res) => { // working
    const data = req.body;
    if(data.artist_id){
        return mysqlCon.query(`SELECT artist_id FROM artists WHERE artist_id = ${data.artist_id}`, (err, results) => {
            if(results.length === 0){
                res.status(404).send('invalid artist id : no artist with such id found');
             }
             if(err){
                 res.send(err.message)
             } 
        })
    }
    if(data.album_id){
         return mysqlCon.query(`SELECT album_id FROM albums WHERE album_id = ${data.album_id}`, (err, results) => {
            if(results.length === 0){
                res.status(404).send('invalid album id : no album with such id found');
             }
             if(err){
                 res.send(err.message)
             } 
        })
    }
    mysqlCon.query(`INSERT INTO songs (title, artist_id, album_id, lyrics, length, created_at, uploaded_at, youtube_link, track_number, likes)
                VALUES ('${data.title}', '${data.artist_id}', '${data.album_id}', '${data.lyrics}', '${data.length}', '${data.created_at}', '${newDateToSQL()}', '${data.youtube_link}', '${data.track_number}', '${data.likes}')`,
                (error, results, fields) => {
                    if(error){
                        res.status(400).send(error.message);
                        console.log(error)
                    } else {
                        res.status(201).json(data)
                    }
                })
});



module.exports = app;