const { Artist, Song, Album, Playlist, User } = require('../../models');


async function getAllEntities(){

    const allEntities = await Promise.all([
        getAllSongsData(),
        getAllAlbumsData(),
        getAllArtistsData(),
        getAllPlaylistsData()
    ]) 

    return allEntities.map(table => table.sort((e1, e2) => e1.id - e2.id))
}

async function getAllSongsData(){
    const allSongs = await Song.findAll({
        include: [
            {
                model: Artist,
                attributes: ['name']
            },
            {
                model: Album,
                attributes: ['name']
            }
        ],
        attributes: ['title', 'id', 'coverImg', 'artistId', 'albumId']
    })

    const elasticData = allSongs.map(song => {
        return {
            id:song.id,
            name: song.title,
            coverImg: song.coverImg,
            artistId: song.artistId,
            artist: song.Artist.name,
            albumId: song.albumId,
            album: song.Album.name 
        }
    })

    return elasticData
}

async function getAllArtistsData(){
    const allArtists = await Artist.findAll({
        include: [
            {
                model: Album,
                attributes: ['name']
            },
            {
                model: Song,
                attributes: ['title']
            }
        ],
        attributes: ['name', 'id', 'coverImg']
    })

    const elasticData = allArtists.map(artist => {
        return {
            id: artist.id,
            name: artist.name,
            coverImg: artist.coverImg,
            albums: artist.Albums.map(album => album.name),
            songs: artist.Songs.map(song => song.title)
        }
    })
    
    return elasticData
}

async function getAllAlbumsData(){
    const allAlbums = await Album.findAll({
        include: [
            {
                model: Artist,
                attributes: ['name']
            },
            {
                model: Song,
                attributes: ['title']
            }
        ],
        attributes: ['name', 'id', 'coverImg', 'artistId']
    })

    const elasticData = allAlbums.map(album => {
        return {
            id: album.id,
            name: album.name,
            coverImg: album.coverImg,
            artistId: album.artistId,
            artist: album.Artist.name,
            songs: album.Songs.map(song => song.title)
        }
    })
    
    return elasticData
}

async function getAllPlaylistsData(){
    const allPlaylists = await Playlist.findAll({
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Song,
                attributes: ['title']
            }
        ],
        attributes: ['name', 'id', 'coverImg', 'isPublic']
    })
    const elasticData = allPlaylists.map(playlist => {
        return {
            id: playlist.id,
            name: playlist.name,
            creator: playlist.User.firstName + ' ' + playlist.User.lastName,
            coverImg: playlist.coverImg,
            songs: playlist.Songs.map(song => song.title),
            isPublic: playlist.isPublic
        }
    })
    
    return elasticData
}

module.exports = {
    getAllEntities
}