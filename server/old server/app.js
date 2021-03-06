/* eslint-disable linebreak-style */
require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const util = require('util');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('tiny'))

const mysqlCon = mysql.createConnection({
  host: process.env.SQL_HOST, //change
  user: process.env.SQL_USER, //change
  password: process.env.SQL_PASS, //change
  database: process.env.SQL_DATABASE, //change
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) {
    console.log(`error conecting to server: ${err.message}`);
  } else {
    console.log('Connected to SQL server!');
  }
});

const query = util.promisify(mysqlCon.query).bind(mysqlCon);

function newDateToSQL() {
  return new Date().toISOString().slice(0, -5).replace('T', ' ');
}

app.get('/songDetails/:id', (req, res) => {
  mysqlCon.query(`SELECT s.song_id AS id, s.likes AS likes, s.youtube_link AS link, s.title AS name,  ar.name AS artist, al.name AS album, s.length AS length
      FROM songs s
      JOIN artists ar ON s.artist_id = ar.artist_id
      JOIN albums al ON s.album_id = al.album_id
      WHERE s.song_id = ${req.params.id};`, (error, results) => {
    if (error) {
      if (error.errno === 1452) {
        res.status(404).send('an invalid artist id has been submited');
      } else {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(201).json(results);
    }
  });
})

app.get('/MainSearch/:searchInput', async (req, res) => {

  const input = req.params.searchInput
  const searchResults = {};

  try {
    // songs search
    const songsResults = await query(`SELECT s.title AS name, al.name AS album, ar.name AS artist, s.song_id AS id, s.cover_img  
        FROM songs s
        JOIN albums al ON s.album_id = al.album_id
        JOIN artists ar ON s.artist_id = ar.artist_id
        WHERE s.title LIKE '%${input}%'
        ORDER BY s.likes
        LIMIT 6;`)

    //artist search
    const artistsResults = await query(`SELECT ar.name , ar.artist_id AS id, ar.cover_img  
        FROM artists ar
        WHERE ar.name LIKE '%${input}%'
        ORDER BY ar.likes
        LIMIT 6;`)

    //playlist search
    const playlistsResults = await query(`SELECT name, cover_img, playlist_id AS id, genre
        FROM music_app.playlists
        WHERE name LIKE '%${input}%'
        ORDER BY likes
        LIMIT 6;`)

    //album search
    const albumsResults = await query(`SELECT al.name AS name, ar.name AS artist, al.album_id AS id, al.cover_img AS cover_img 
        FROM albums al
        JOIN artists ar ON al.artist_id = ar.artist_id
        WHERE al.name LIKE '%${input}%'
        ORDER BY al.likes
        LIMIT 6;`)

    res.json({
      songs: songsResults.length > 0 ? songsResults : null,
      artists: artistsResults.length > 0 ? artistsResults : null,
      playlists: playlistsResults.length > 0 ? playlistsResults : null,
      albums: albumsResults.length > 0 ? albumsResults : null
    });
  } catch (error) {
    res.status(400).send(error.mesaage);
  }
})

app.get('/searchPlaylists/:searchValue', (req, res) => {
  mysqlCon.query(`SELECT name, cover_img, playlist_id FROM playlists WHERE name LIKE '%${req.params.searchValue}%'`, (error, results) => {
    if (error) {
      return res.status(400).send(error.message);
    } if (results.length === 0) {
      return res.status(404).send(`no playlists found`);
    }
    return res.json(results);
  });
})

app.put('/like/:table/:id', (req, res) => {
  mysqlCon.query(`UPDATE ${req.params.table} SET likes = (likes + 1) WHERE ${req.params.table.slice(0, -1)}_id='${req.params.id}'`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).send(error.message);
    } else {
      res.status(204).end();
    }
  });
});

app.put('/dislike/:table/:id', (req, res) => {
  mysqlCon.query(`UPDATE ${req.params.table} SET likes = (likes - 1) WHERE song_id='${req.params.id}'`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).send(error.message);
    } else {
      res.status(204).end();
    }
  });
});

app.get('/topAlbumsList', (req, res) => {
  mysqlCon.query(`SELECT al.album_id AS id, al.name AS name, al.cover_img AS cover_img, al.likes AS likes, ar.name AS artist
                  FROM albums al
                  JOIN artists ar ON al.artist_id = ar.artist_id
                  ORDER BY -al.likes
                  LIMIT 20;`, (error, results) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.json(results);
    }
  });
});

app.get('/topSongsList', (req, res) => {
  mysqlCon.query(`select s.cover_img, s.likes AS likes, s.song_id AS id, s.title AS name, al.name AS album, ar.name AS artist, s.length AS length, s.youtube_link AS link
                  from songs s 
                  left join artists ar on s.artist_id = ar.artist_id
                  left join albums al on s.album_id = al.album_id
                  ORDER BY -s.likes
                  LIMIT 20;`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(400).send(error.message);
    } else {
      res.json(results);
    }
  });
});

app.get('/albumsOptions/:searchInput', (req, res) => {
  mysqlCon.query(`SELECT album_id, name, likes, cover_img FROM albums WHERE name LIKE '%${req.params.searchInput}%' ORDER BY -likes LIMIT 5`,
    (error, results) => {
      if (error) {
        res.status(400).send(error.message);
      } else if (results.length === 0) {
        res.status(200).send(false);
      } else {
        res.json(results);
      }
    });
});

app.get('/artistsOptions/:searchInput', (req, res) => {
  mysqlCon.query(`SELECT artist_id, name, likes, cover_img FROM artists WHERE name LIKE '%${req.params.searchInput}%' ORDER BY -likes LIMIT 5`,
    (error, results) => {
      if (error) {
        res.status(400).send(error.message);
      } else if (results.length === 0) {
        res.status(200).send(false);
      } else {
        res.json(results);
      }
    });
});

app.get('/songsInPlaylist/:id', (req, res) => {
  mysqlCon.query(`SELECT p.song_index AS 'index', s.title AS name, s.cover_img AS cover_img, ar.name AS artist, al.name AS album, s.length AS length, s.youtube_link AS link, s.song_id AS id
                  FROM songs_in_playlists p 
                  LEFT JOIN songs s ON p.song_id = s.song_id 
                  LEFT JOIN artists ar ON s.artist_id =ar.artist_id
                  LEFT JOIN albums al ON s.album_id = al.album_id 
                  WHERE playlist_id = ${req.params.id};`, (error, results) => {
    if (error) {
      if (error.errno === 1452) {
        res.status(404).send('an invalid playlist id has been submited');
      } else {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(201).json(results);
    }
  });
});

app.get('/songsInAlbum/:id', (req, res) => {
  mysqlCon.query(`SELECT al.name AS album,  s.title AS name,ar.name AS artist, s.cover_img AS cover_img, s.length AS length, s.youtube_link AS link, s.song_id AS id
                  FROM albums al
                  LEFT JOIN songs s ON al.album_id = s.album_id 
                  LEFT JOIN artists ar ON al.artist_id =ar.artist_id 
                  WHERE al.album_id = ${req.params.id};`, (error, results) => {
    if (error) {
      if (error.errno === 1452) {
        res.status(404).send('an invalid album id has been submited');
      } else {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(201).json(results);
    }
  });
});

app.get('/songsInArtist/:id', (req, res) => {
  mysqlCon.query(`SELECT s.title AS name, s.cover_img AS cover_img, s.length AS length, s.youtube_link AS link, s.song_id AS id, al.name AS album
                  FROM artists ar
                  LEFT JOIN songs s ON ar.artist_id = s.artist_id 
                  LEFT JOIN albums al ON al.album_id = s.album_id 
                  WHERE ar.artist_id = ${req.params.id}
                  ORDER BY -s.likes;`, (error, results) => {
    if (error) {
      if (error.errno === 1452) {
        res.status(404).send('an invalid artist id has been submited');
      } else {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(201).json(results);
    }
  });
})

app.get('/artistAlbums/:id', (req, res) => {
  mysqlCon.query(`SELECT al.album_id AS id, al.name AS name, al.published_at, al.cover_img, al.likes
                  FROM artists ar
                  JOIN albums al ON  ar.artist_id = al.artist_id
                  WHERE ar.artist_id = ${req.params.id}`, (error, results) => {
    if (error) {
      if (error.errno === 1452) {
        res.status(404).send('an invalid artist id has been submited');
      } else {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(201).json(results);
    }
  });
})

app.post('/addSongToPlaylist', async (req, res) => {
  const data = req.body;
  const index = await query(`SELECT (COUNT(id) + 1) AS 'index' FROM songs_in_playlists WHERE playlist_id = '${data.playlist_id}' `);
  mysqlCon.query(`INSERT INTO songs_in_playlists (song_id, playlist_id, song_index)
                    VALUES (${data.song_id}, ${data.playlist_id}, ${index[0].index});`,
    (error, results) => {
      if (error) {
        if (error.errno === 1452) {
          res.status(404).send("an invalid song or playlist id's has been submited");
        } else {
          return res.status(400).send(error.message);
        }
      } else {
        return res.send('song added to playlist');
      }
    });
});

app.post('/songPlayed', (req, res) => {
  const data = req.body;

  mysqlCon.query(`INSERT INTO plays_history (user_id, song_id, played_at, is_liked)
    VALUES ('${data.user_id}', '${data.song_id}', '${newDateToSQL()}', '${data.is_liked}')`, (error, results) => {
    if (error) {
      if (error.errno === 1452) {
        res.status(404).send("an invalid user or song id's has been submited");
      } else {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(201).json(data);
    }
  });
});

app.delete('/:tableName/:id', (req, res) => {
  const { id } = req.params;
  const { tableName } = req.params;
  console.log(req.params.id.slice(0, -1));
  mysqlCon.query(`DELETE FROM ${tableName} WHERE ${tableName.slice(0, -1)}_id = ${id}`, (error, results) => {
    if (error) {
      res.status(400).status(error.message);
    } else if (results.affectedRows === 0) {
      res.status(404).send(`invalid ${tableName.slice(0, -1)} id: no ${tableName.slice(0, -1)} with id ${id} found`);
    } else {
      res.send(`${tableName.slice(0, -1)} deleted!`);
    }
  });
});

app.put('/:tableName/:id', (req, res) => {
  const { id } = req.params;
  const { tableName } = req.params;

  const updatedKeys = Object.keys(req.body).reduce((keysToUpdate, key, index) => {
    if (index === 0) {
      return keysToUpdate += `${key} = '${req.body[key]}'`;
    }
    return keysToUpdate += `, ${key} = '${req.body[key]}'`;
  }, '');

  mysqlCon.query(`UPDATE ${tableName} SET ${updatedKeys} WHERE ${tableName.slice(0, -1)}_id = ${id};`, (error, results) => {
    if (error) {
      res.status(400).send(error.message);
    } else if (results.affectedRows === 0) {
      res.status(404).send(`invalid ${tableName.slice(0, -1)} id : no ${tableName.slice(0, -1)} with id ${id} found`);
    } else {
      res.send(`${tableName.slice(0, -1)} updated!`);
    }
  });
});

app.get('/top/:tableName', (req, res) => {
  mysqlCon.query(`SELECT * FROM ${req.params.tableName} ORDER BY -likes LIMIT 20;`, (error, results) => {
    if (error) {
      return res.status(400).send(error.message);
    } if (results.length === 0) {
      return res.status(404).send(`no ${req.params.tableName} found`);
    }
    return res.json(results);
  });
});

app.get('/:tableName/:id', (req, res) => {
  const { id } = req.params;
  const { tableName } = req.params;
  mysqlCon.query(`SELECT * FROM ${tableName} WHERE ${tableName.slice(0, -1)}_id = ${id}`, (error, results, fields) => {
    if (error) {
      return res.status(400).send(error.message);
    } if (results.length === 0) {
      return res.status(404).send(`invalid ${tableName.slice(0, -1)} id : no ${tableName.slice(0, -1)} with id ${id} found`);
    }
    return res.send(results);
  });
});

app.get('/:tableName', (req, res) => {
  const { tableName } = req.params;

  mysqlCon.query(`SELECT * FROM ${tableName}`, (error, results) => {
    if (error) {
      return res.status(400).send(error.message);
    } if (results.length === 0) {
      return res.status(404).send(`no ${tableName}`);
    }
    return res.json(results);
  });
});

app.post('/playlists', (req, res) => {
  const data = req.body;

  mysqlCon.query(`INSERT INTO playlists (name, cover_img, created_at, genre)
                VALUES ('${data.name}', '${data.cover_img}', '${newDateToSQL()}','${data.genre}')`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
      return res.status(201).json(data);
    });
});

app.post('/artists', (req, res) => {
  const data = req.body;

  mysqlCon.query(`INSERT INTO artists (name, birth_date, cover_img, uploaded_at, likes)
                VALUES ('${data.name}', '${data.birth_date}', '${data.cover_img}', '${newDateToSQL()}', '0')`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
      return res.status(201).json(data);
    });
});

app.post('/albums', (req, res) => {
  const data = req.body;
  mysqlCon.query(`INSERT INTO albums (name,  artist_id, published_at, uploaded_at, cover_img,  likes)
                VALUES ('${data.name}', '${data.artist_id}', '${data.published_at}', '${newDateToSQL()}', '${data.cover_img}', '0')`,
    (error, results, fields) => {
      if (error) {
        console.log(error);
        if (error.errno === 1452) {
          res.status(404).send('an invalid artist id has been submited');
        } else {
          return res.status(400).send(error.message);
        }
      } else {
        return res.status(201).json(data);
      }
    });
});

app.post('/songs', (req, res) => {
  const data = req.body;
  mysqlCon.query(`INSERT INTO songs (title, artist_id, album_id, lyrics, length, created_at, uploaded_at, youtube_link, cover_img, track_number, likes)
                  VALUES ("${data.title}", '${data.artist_id}', '${data.album_id}', "${data.lyrics}", '${data.length}', '${data.created_at}', '${newDateToSQL()}', "${data.youtube_link}", "${data.cover_img}", '0', '0')`,
    (error, results, fields) => {
      if (error) {
        console.log(error)
        if (error.errno === 1452) {
          res.status(404).send("an invalid artist or album id's has been submited");
        } else {
          return res.status(400).send(error.sqlMessage);
        }
      } else {
        return res.status(201).json(data);
      }
    });
});

module.exports = app;
