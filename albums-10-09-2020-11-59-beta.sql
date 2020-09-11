-- Generation time: Thu, 10 Sep 2020 11:59:00 +0000
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

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
  `album_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `artist_id` int(10) unsigned DEFAULT NULL,
  `published_at` date DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `likes` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`album_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `albums` VALUES ('1','enim','1','1987-03-23','2013-05-11 16:15:05','0'),
('2','delectus','2','2011-12-07','1988-04-19 10:04:56','0'),
('3','sit','3','1980-11-30','1992-03-10 20:29:07','0'),
('4','laudantium','4','2008-11-22','1970-02-23 00:04:41','0'),
('5','ut','5','1971-12-19','2015-10-28 19:19:19','0'),
('6','magni','6','1970-05-10','1998-01-04 17:05:02','0'),
('7','a','7','1982-12-17','1983-10-22 21:54:09','0'),
('8','voluptate','8','1999-05-15','2008-06-22 13:25:03','0'),
('9','qui','9','1989-04-19','1972-11-08 09:03:51','0'),
('10','dolores','10','2015-06-12','2001-08-26 17:02:05','0'),
('11','soluta','11','1987-10-04','1996-09-29 05:55:51','0'),
('12','qui','12','1992-12-07','2007-03-28 17:59:57','0'),
('13','blanditiis','13','1994-09-10','2005-12-19 12:31:32','0'),
('14','ab','14','1986-03-13','1991-03-08 14:25:07','0'),
('15','dolor','15','2004-02-25','1999-10-22 18:01:15','0'),
('16','deserunt','16','1972-04-18','2007-04-19 23:09:54','0'),
('17','corporis','17','1978-12-03','1999-08-17 10:51:46','0'),
('18','consequatur','18','2017-07-09','1980-03-18 09:47:38','0'),
('19','perferendis','19','2020-09-09','1987-03-13 00:59:38','0'),
('20','nemo','20','1998-06-28','1984-10-07 14:23:48','0'),
('21','quia','21','1972-03-11','1996-11-28 19:27:12','0'),
('22','ducimus','22','1973-09-17','1990-06-26 11:28:32','0'),
('23','occaecati','23','2003-04-10','1997-11-16 18:49:48','0'),
('24','ipsam','24','2006-07-01','2005-01-03 04:01:41','0'),
('25','quia','25','1979-12-07','2011-01-21 13:36:51','0'),
('26','deserunt','26','1994-03-24','1989-01-08 00:17:27','0'),
('27','dolorum','27','2010-05-31','1991-02-14 06:21:58','0'),
('28','est','28','1998-10-05','1994-11-05 16:32:35','0'),
('29','et','29','2006-04-29','1999-01-11 20:52:11','0'),
('30','est','30','1986-07-26','1974-07-05 04:38:50','0'),
('31','esse','31','2006-12-11','1987-01-10 05:02:18','0'),
('32','autem','32','1986-01-31','1981-10-30 10:12:48','0'),
('33','libero','33','1975-11-05','1996-07-12 07:25:33','0'),
('34','odio','34','2016-10-03','1993-10-19 03:20:22','0'),
('35','esse','35','1986-10-03','2001-03-07 07:48:55','0'),
('36','nihil','36','2006-05-02','1994-11-21 11:18:18','0'),
('37','temporibus','37','1974-01-07','1987-01-04 21:34:35','0'),
('38','consequatur','38','1983-11-25','1974-07-09 01:47:40','0'),
('39','nostrum','39','2019-09-04','2014-06-18 14:00:51','0'),
('40','assumenda','40','1980-10-10','2014-06-22 14:20:12','0'),
('41','omnis','41','2014-12-03','1996-06-28 19:52:53','0'),
('42','odit','42','1992-02-26','2016-08-04 21:58:15','0'),
('43','aut','43','1974-05-27','1981-02-08 21:42:36','0'),
('44','ipsum','44','2014-06-23','1991-08-30 12:13:15','0'),
('45','et','45','1999-04-23','1985-12-08 00:04:17','0'),
('46','laudantium','46','1987-10-31','1980-01-14 07:50:11','0'),
('47','doloremque','47','2010-08-08','1992-09-16 01:01:14','0'),
('48','earum','48','2019-08-07','1973-08-12 16:47:27','0'),
('49','dolores','49','2019-01-08','1993-04-19 04:28:23','0'),
('50','iusto','50','1991-12-07','2015-05-04 07:02:42','0'); 




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

