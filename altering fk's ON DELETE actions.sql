ALTER TABLE `songs` 
DROP FOREIGN KEY fk_artist_id;  
ALTER TABLE `songs` 
DROP FOREIGN KEY `fk_album_id`;  

ALTER TABLE `songs`  
ADD CONSTRAINT fk_artist_id FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE SET NULL;  
ALTER TABLE `songs`  
ADD CONSTRAINT fk_album_id FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE SET NULL;  



ALTER TABLE `albums` 
DROP FOREIGN KEY fk_artist_id;  

ALTER TABLE `albums`  
ADD CONSTRAINT albums_artist_id FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE SET NULL;  



ALTER TABLE `plays_history` 
DROP FOREIGN KEY plays_history_song_id;  
ALTER TABLE `plays_history` 
DROP FOREIGN KEY plays_history_user_id;  

ALTER TABLE `plays_history`  
ADD CONSTRAINT plays_hisory_song_id FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON DELETE CASCADE;  
ALTER TABLE `plays_history`  
ADD CONSTRAINT plays_history_user_id FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;


ALTER TABLE user_playlist_con 
DROP FOREIGN KEY user_playlist_con_user_id ;  
ALTER TABLE user_playlist_con  
DROP FOREIGN KEY user_playlist_con_playlist_id ;  

ALTER TABLE user_playlist_con  
ADD CONSTRAINT user_playlist_con_user_id FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;  
ALTER TABLE user_playlist_con   
ADD CONSTRAINT user_playlist_con_playlist_id FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`) ON DELETE CASCADE;

ALTER TABLE songs_in_playlists 
DROP FOREIGN KEY songs_in_playlists_playlist_id ;  
ALTER TABLE songs_in_playlists  
DROP FOREIGN KEY songs_in_playlists_song_id ;  

ALTER TABLE songs_in_playlists  
ADD CONSTRAINT songs_in_playlists_song_id FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON DELETE CASCADE;  
ALTER TABLE songs_in_playlists   
ADD CONSTRAINT songs_in_playlists_playlist_id FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`) ON DELETE CASCADE;

  