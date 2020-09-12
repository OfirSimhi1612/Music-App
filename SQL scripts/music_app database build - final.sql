CREATE DATABASE music_app;
USE music_app;
CREATE TABLE `users`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(15) NOT NULL,
    `last_name` VARCHAR(15) NOT NULL,
    `user_name` VARCHAR(15) NOT NULL,
    `password` VARCHAR(15) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_Admin` BOOLEAN NOT NULL DEFAULT FALSE,
    `preferences` JSON NOT NULL,
    `remember_token` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id)
);

CREATE TABLE `playlists`(
    `playlist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `cover_img` VARCHAR(255),
    `created_at` DATE,
    `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `genre` VARCHAR(15) NOT NULL,
    PRIMARY KEY(playlist_id)
);

CREATE TABLE `artists`(
    `artist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(15) NOT NULL,
    `last_name` VARCHAR(15) NOT NULL,
    `birth_date` DATE,
    `cover_img` VARCHAR(255),
    `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `likes` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (artist_id)
);

CREATE TABLE `albums`(
    `album_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `artist_id` INT UNSIGNED,
    `published_at` DATE,
    `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `likes` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (album_id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE `songs`(
    `song_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `artist_id` INT UNSIGNED,
    `album_id` INT UNSIGNED,
    `lyrics` TEXT,
    `length` INT NOT NULL,
    `created_at` DATE,
    `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `youtube_link` VARCHAR(255),
    `track_number` INT NOT NULL,
    `likes` INT NOT NULL,
    PRIMARY KEY (song_id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id)
);

CREATE TABLE `songs_in_playlists`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `song_id` INT UNSIGNED NOT NULL,
    `playlist_id` INT UNSIGNED NOT NULL,
    `index` INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id)
);

CREATE TABLE `user_playlist_con`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `playlist_id` INT UNSIGNED NOT NULL,
    `added_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id)
);

CREATE TABLE `plays_history`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL,
    `played_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `number_of_plays` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);








