-- Generation time: Thu, 10 Sep 2020 11:55:44 +0000
-- Host: mysql.hostinger.ro
-- DB name: u574849695_23
/*!40030 SET NAMES UTF8 */;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `artist_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `birth_date` date DEFAULT NULL,
  `cover_img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `likes` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `artists` VALUES ('1','Toby','Kilback','1991-02-24',NULL,'1986-11-28 14:22:39','0'),
('2','Pat','Denesik','2018-08-12',NULL,'1979-04-23 11:51:02','0'),
('3','Garret','Marquardt','1976-10-28',NULL,'1976-02-27 00:09:39','0'),
('4','Lavada','Kunze','2016-12-12',NULL,'1997-06-14 06:28:42','0'),
('5','Litzy','Donnelly','2001-05-19',NULL,'2007-05-28 04:44:37','0'),
('6','Leo','Haley','2006-07-11',NULL,'1990-12-03 18:10:23','0'),
('7','Reba','Nikolaus','2019-08-02',NULL,'2009-02-28 17:36:08','0'),
('8','Linda','Leannon','2003-10-11',NULL,'1974-04-05 16:19:23','0'),
('9','Bret','Lebsack','1984-04-09',NULL,'2012-06-25 20:04:47','0'),
('10','Alayna','Herman','1977-10-14',NULL,'1982-03-01 03:32:54','0'),
('11','Winifred','Cummerata','1992-08-09',NULL,'2020-07-03 13:17:41','0'),
('12','Jo','Harvey','1984-11-02',NULL,'1988-10-06 12:16:15','0'),
('13','Hosea','Bartell','1997-11-17',NULL,'1998-10-29 16:42:37','0'),
('14','Erich','Schneider','1999-01-25',NULL,'1998-11-12 11:31:36','0'),
('15','Cornell','Carroll','2018-12-30',NULL,'1976-06-30 08:36:16','0'),
('16','Katharina','Kuhn','1999-04-14',NULL,'1977-09-19 05:37:11','0'),
('17','Era','Marvin','2002-07-23',NULL,'2001-08-24 14:20:56','0'),
('18','Pietro','Fahey','1991-06-26',NULL,'1977-05-09 23:21:08','0'),
('19','Shirley','Hamill','2004-07-21',NULL,'1985-09-26 09:08:24','0'),
('20','Arne','Ratke','2018-01-31',NULL,'1999-05-22 18:30:40','0'),
('21','Norbert','Shields','2018-01-08',NULL,'1980-07-18 01:38:30','0'),
('22','John','Kris','2004-10-18',NULL,'1975-04-11 10:26:57','0'),
('23','Ophelia','Weber','1975-01-14',NULL,'1988-04-11 08:05:42','0'),
('24','Kenton','Roberts','2006-11-17',NULL,'2006-12-13 00:34:30','0'),
('25','Oswald','Grimes','1986-06-26',NULL,'1981-11-02 02:26:53','0'),
('26','Bradford','Cole','2016-10-06',NULL,'1971-12-08 10:39:31','0'),
('27','Anahi','Spencer','1996-05-02',NULL,'2002-01-06 09:12:31','0'),
('28','Skyla','Ward','2006-03-31',NULL,'2005-10-03 21:48:05','0'),
('29','Joan','Windler','1999-06-09',NULL,'2009-09-24 20:17:10','0'),
('30','Greyson','Cormier','2012-03-10',NULL,'2014-02-24 19:53:49','0'),
('31','Katlyn','Hagenes','1975-02-01',NULL,'2012-08-26 05:15:53','0'),
('32','Hilario','Wisozk','2013-12-06',NULL,'1994-12-20 17:24:16','0'),
('33','Craig','Hansen','1977-04-16',NULL,'2011-10-24 15:54:01','0'),
('34','Ellie','McDermott','1991-09-23',NULL,'2013-03-20 07:41:45','0'),
('35','Chadrick','Morar','1975-05-13',NULL,'2015-09-26 08:03:35','0'),
('36','Eldridge','Lubowitz','1977-03-31',NULL,'2006-07-02 05:58:59','0'),
('37','Kaylie','Rau','2000-04-18',NULL,'1999-02-11 19:03:40','0'),
('38','Erin','Purdy','1981-03-03',NULL,'1976-08-27 21:13:43','0'),
('39','Peggie','Cormier','1987-06-04',NULL,'2003-10-23 13:37:37','0'),
('40','Benton','Hintz','1979-06-18',NULL,'2002-11-14 14:42:35','0'),
('41','Devon','Prosacco','1976-12-18',NULL,'1987-12-05 19:02:09','0'),
('42','Jordan','Schowalter','2015-12-30',NULL,'1987-08-14 00:14:50','0'),
('43','Hanna','Rodriguez','1982-01-28',NULL,'1995-11-09 21:04:09','0'),
('44','Marcos','Von','1999-07-27',NULL,'1996-08-17 02:32:58','0'),
('45','Kurtis','Howell','2012-12-01',NULL,'1979-05-18 06:47:14','0'),
('46','Enos','Greenfelder','2014-12-22',NULL,'1988-12-31 02:08:41','0'),
('47','Bettie','Mraz','2019-03-09',NULL,'1984-06-30 14:20:08','0'),
('48','Barney','Zieme','2003-10-23',NULL,'2017-12-20 01:55:14','0'),
('49','Marc','Veum','2018-04-18',NULL,'2003-02-19 13:19:32','0'),
('50','Amanda','Smitham','2016-09-23',NULL,'2007-02-03 05:02:57','0'); 




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

