-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: twitter_clone
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) DEFAULT NULL,
  `pid` varchar(45) DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT 'http://127.0.0.1:3000/profiles/default_profile.png',
  `comments` varchar(1000) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `inserted_at` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'','2','http://127.0.0.1:3000/profiles/default_profile.png','hgfjuygtfuytdfryurtduyrttttttttttttttttttttttttttttttddddde','test','2023-03-21 05:42:49'),(2,'','1','http://127.0.0.1:3000/profiles/default_profile.png','harshpatel','test','2023-03-21 05:42:57'),(3,'30','2','http://127.0.0.1:3000/profiles/default_profile.png','hgfjuygtfuytdfryurtduyrttttttttttttttttttttttttttttttddddde','test','2023-03-21 05:43:48'),(4,'30','1','http://127.0.0.1:3000/profiles/default_profile.png','hgfjuygtfuytdfryurtduyrttttttttttttttttttttttttttttttdddddehgfjuygtfuytdfryurtduyrttttttttttttttttttttttttttttttddddde','test','2023-03-21 05:44:07'),(5,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','time pass comment','harsh','2023-03-21 05:44:34'),(6,'29','1','http://127.0.0.1:3000/profiles/1679388551717.jpg','time pass comment','harsh','2023-03-21 05:44:46'),(7,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','harmil','harsh','2023-03-21 05:46:40'),(8,'29','1','http://127.0.0.1:3000/profiles/1679388551717.jpg','harmil sangvi','harsh','2023-03-21 05:47:01'),(9,'29','1','http://127.0.0.1:3000/profiles/1679388551717.jpg','derawtesa','harsh','2023-03-21 05:47:10'),(10,'29','1','http://127.0.0.1:3000/profiles/1679388551717.jpg','harshpatel','harsh','2023-03-21 05:49:25'),(11,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','ytfiuygi','harsh','2023-03-21 05:52:02'),(12,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','111','harsh','2023-03-21 05:56:57'),(13,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','111','harsh','2023-03-21 05:59:23'),(14,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','time pass comment','harsh','2023-03-21 06:06:35'),(15,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','ytfiuygi','harsh','2023-03-21 06:17:02'),(16,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','time pass comment','harsh','2023-03-21 06:17:16'),(17,'30','3','http://127.0.0.1:3000/profiles/default_profile.png','time pass comment','test','2023-03-21 06:20:43'),(18,'28','3','http://127.0.0.1:3000/profiles/1679287609299.png','harsh','vijay','2023-03-21 06:52:12'),(19,'28','2','http://127.0.0.1:3000/profiles/1679287609299.png','time pass comment','vijay','2023-03-21 06:57:17'),(20,'28','2','http://127.0.0.1:3000/profiles/1679287609299.png','[k]','vijay','2023-03-21 06:57:24'),(21,'28','3','http://127.0.0.1:3000/profiles/1679287609299.png','hgfjuygtfuytdfryurtduyrttttttttttttttttttttttttttttttddddde','vijay','2023-03-21 06:57:38'),(22,'28','2','http://127.0.0.1:3000/profiles/1679287609299.png','gj','vijay','2023-03-21 06:59:56'),(23,'28','1','http://127.0.0.1:3000/profiles/1679287609299.png','osm','vijay','2023-03-21 07:25:33'),(24,'28','3','http://127.0.0.1:3000/profiles/1679287609299.png','harshpatel','vijay','2023-03-21 07:50:59'),(25,'28','1','http://127.0.0.1:3000/profiles/1679287609299.png','nice','vijay','2023-03-21 07:53:28'),(26,'29','2','http://127.0.0.1:3000/profiles/1679388551717.jpg','harshpatel','harsh','2023-03-21 07:54:46'),(27,'33','27','http://127.0.0.1:3000/profiles/1679389415433.jpeg','hiuihoihoik','harshpatel123','2023-03-21 09:20:08'),(28,'33','27','http://127.0.0.1:3000/profiles/1679389415433.jpeg','gfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhh','harshpatel123','2023-03-21 09:20:30'),(29,'33','27','http://127.0.0.1:3000/profiles/1679389415433.jpeg','gfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhh','harshpatel123','2023-03-21 09:20:45'),(30,'33','27','http://127.0.0.1:3000/profiles/1679389415433.jpeg','gfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhhgfsdhhhhhhh','harshpatel123','2023-03-21 09:20:52'),(31,'34','27','http://127.0.0.1:3000/profiles/1679390607021.png','jgfjkjhgf','om modi','2023-03-21 09:23:03'),(32,'34','29','http://127.0.0.1:3000/profiles/1679390607021.png','utgfkugtf','om modi','2023-03-21 09:23:11'),(33,'35','30','http://127.0.0.1:3000/profiles/default_profile.png','hfbhsdfhsdfhdef','harshpatel','2023-03-21 09:39:13'),(34,'33','30','http://127.0.0.1:3000/profiles/1679389415433.jpeg','mvknvjknvjkn','harshpatel123','2023-03-21 10:46:29'),(35,'36','35','http://127.0.0.1:3000/profiles/1679401970732.png','jihu8gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggo','om','2023-03-21 13:08:55'),(36,'36','35','http://127.0.0.1:3000/profiles/1679401970732.png','gyuooooooooooooooooooooooooooooooo','om','2023-03-21 13:09:04'),(37,'36','35','http://127.0.0.1:3000/profiles/1679401970732.png','lkxnjklsdjiksdjickvdi','om','2023-03-21 13:09:13');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `tab_id` int NOT NULL AUTO_INCREMENT,
  `f_id` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `u_profile_pic` varchar(255) DEFAULT NULL,
  `u_email` varchar(45) DEFAULT NULL,
  `f_username` varchar(45) DEFAULT NULL,
  `f_email` varchar(45) DEFAULT NULL,
  `f_profile_pic` varchar(255) DEFAULT NULL,
  `rm_follower` int DEFAULT NULL,
  PRIMARY KEY (`tab_id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,'27',33,'harshpatel123',0,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','khushi','khushi@gmail.com','http://127.0.0.1:3000/profiles/1679142163999.png',1),(2,'28',33,'harshpatel123',0,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','vijay','vijay@gmail.com','http://127.0.0.1:3000/profiles/1679308290606.png',1),(3,'29',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','kartik','kartikmodi598@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1),(4,'30',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','vijayrathod8452@gmail.com','vijayrathod8452@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1),(5,'31',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','rathodv2012001@gmail.com','rathodv2012001@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1),(6,'32',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','jaini','mehtajaini179@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1),(7,'33',34,'om modi',1,'http://127.0.0.1:3000/profiles/1679390607021.png','om@gmail.com','harshpatel123','h@gmail.com','http://127.0.0.1:3000/profiles/1679389415433.jpeg',0),(8,'27',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','khushi','khushi@gmail.com','http://127.0.0.1:3000/profiles/1679142163999.png',1),(9,'34',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','om modi','om@gmail.com','http://127.0.0.1:3000/profiles/1679390607021.png',1),(10,'35',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','harshpatel','harsh.patel@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1),(11,'36',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','om','om.modi.023@gmail.com','http://127.0.0.1:3000/profiles/1679401970732.png',1),(12,'37',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','kinjal','kinjal@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1),(13,'38',33,'harshpatel123',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','h@gmail.com','kinjal123','kinjal123@gmail.com','http://127.0.0.1:3000/profiles/default_profile.png',1);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `liked` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (26,25,27,1),(27,25,28,0),(28,27,28,1),(29,26,28,0),(30,28,28,1),(31,28,33,0),(32,26,33,1),(33,27,33,0),(34,30,33,1),(35,35,33,0),(36,34,33,0),(37,33,33,0),(38,32,33,0),(39,36,33,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retweets`
--

DROP TABLE IF EXISTS `retweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tweet_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `tweet_id` (`tweet_id`),
  CONSTRAINT `retweets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `retweets_ibfk_2` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retweets`
--

LOCK TABLES `retweets` WRITE;
/*!40000 ALTER TABLE `retweets` DISABLE KEYS */;
/*!40000 ALTER TABLE `retweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweets`
--

DROP TABLE IF EXISTS `tweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tweet_text` varchar(255) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT '0',
  `username` varchar(45) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES (25,27,'heyyy',NULL,1,'khushi','http://127.0.0.1:3000/profiles/default_profile.png','2023-03-18 12:26:43',NULL),(26,28,'',NULL,1,'vijay','http://127.0.0.1:3000/profiles/1679286595269.png','2023-03-20 05:19:43',NULL),(27,28,'hello it\'s just piece of cake',NULL,1,'vijay','http://127.0.0.1:3000/profiles/1679286595269.png','2023-03-20 05:20:07',NULL),(28,28,'????',NULL,1,'vijay','http://127.0.0.1:3000/profiles/1679308290606.png','2023-03-20 13:17:40',NULL),(29,33,'harshpatel????',NULL,0,'harshpatel123','http://127.0.0.1:3000/profiles/1679389415433.jpeg','2023-03-21 08:28:49',NULL),(30,33,'harmil sanghavi',NULL,1,'harshpatel123','http://127.0.0.1:3000/profiles/1679389415433.jpeg','2023-03-21 08:28:56',NULL),(32,36,'','http://127.0.0.1:3000/uploads/1679401292661.png',0,'om','http://127.0.0.1:3000/profiles/1679401970732.png','2023-03-21 12:21:32',NULL),(33,36,'harshpatel????','http://127.0.0.1:3000/uploads/1679403241774.png',0,'om','http://127.0.0.1:3000/profiles/default_profile.png','2023-03-21 12:54:01',NULL),(34,36,'','http://127.0.0.1:3000/uploads/1679403588398.png',0,'om','http://127.0.0.1:3000/profiles/default_profile.png','2023-03-21 12:59:48',NULL),(35,36,'harshpatel????',NULL,0,'om','http://127.0.0.1:3000/profiles/default_profile.png','2023-03-21 13:06:05',NULL),(36,33,'mvnkdnvjkdnvgjkn?','http://127.0.0.1:3000/uploads/1679471700092.png',1,'harshpatel123','http://127.0.0.1:3000/profiles/1679389415433.jpeg','2023-03-22 07:55:00',NULL);
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activation_token` varchar(255) DEFAULT NULL,
  `activated` tinyint DEFAULT '0',
  `profile_pic` varchar(255) DEFAULT 'http://127.0.0.1:3000/profiles/default_profile.png',
  `dob` varchar(45) DEFAULT NULL,
  `bio` varchar(160) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `otp` varchar(45) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (27,'khushi','khushi@gmail.com','$2b$10$w4H648XnIVDaTMGCeJU8jue3h8t.hyuvgrmlO0v2RuG2k8/DxdQUO','rb4372oby2',1,'http://127.0.0.1:3000/profiles/1679142163999.png','','','','0','2023-03-18 12:21:07',NULL),(28,'vijay','vijay@gmail.com','$2b$10$6NFu.I5Z53t1swqB4giRquQb5jfCTovKN6wYcDLVBW9agESZw2G2i','p1w2k321f4b',1,'http://127.0.0.1:3000/profiles/1679308290606.png','2023-03-01','vijay','bhavnagar','0105','2023-03-20 03:46:23','Mon Mar 20 2023 16:01:30 GMT+0530 (India Standard Time)'),(29,'kartik','kartikmodi598@gmail.com','$2b$10$xepINx8CSZGcdfzPnj/23.GX9vd7yqrQ6SHMLnqUhntuOaLWFDCpW','m5oqnzyowjo',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'3148','2023-03-20 11:37:24',NULL),(30,'vijayrathod8452@gmail.com','vijayrathod8452@gmail.com','$2b$10$Nx.Jm/1PY45pUW6Cx6Ljlebij455w2vtUnJkT5HBFoyoAm3st3Kbe','trby6g5qomj',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'3698','2023-03-20 12:04:50',NULL),(31,'rathodv2012001@gmail.com','rathodv2012001@gmail.com','$2b$10$qlYJAggc27jotWe/Q60Ieezqv5rfuO1mBt44PO4RfQ2z7Q67xGAhO','wygfrailcfs',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'0895','2023-03-20 12:06:53',NULL),(32,'jaini','mehtajaini179@gmail.com','$2b$10$z6YBQm7EEG26/c0RCCgDruJogbdLIUsO2T0ULOJsjYeSsZR7D8wzC','3s9dwud7vnd',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'0740','2023-03-20 13:27:06',NULL),(33,'harshpatel123','h@gmail.com','$2b$10$eskaT9MDKA5vNGEgkN0IROybZgN1b.xb5Ih.bwj3T6fuX2qp8D6lS','lxepz7oywzr',1,'http://127.0.0.1:3000/profiles/1679389415433.jpeg','','','','0','2023-03-21 08:27:20','Tue Mar 21 2023 14:33:35 GMT+0530 (India Standard Time)'),(34,'om modi','om@gmail.com','$2b$10$yHD08wVMm4Y/wT3jGgg24eeHFzDLNxxuKxke4cKmB1LzgwE46.du6','06h1ouj5o9l8',1,'http://127.0.0.1:3000/profiles/1679390607021.png','','','','0','2023-03-21 09:21:53','Tue Mar 21 2023 14:53:27 GMT+0530 (India Standard Time)'),(35,'harshpatel','harsh.patel@gmail.com','$2b$10$KvEKW.cd80Q.Y6BuzZJ17.Mv92yr4upBikJSMMXMsClzgdu1lXady','ipctxcg6y49',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'4539','2023-03-21 09:35:00',NULL),(36,'om','om.modi.023@gmail.com','$2b$10$kD7Ud6eca6/qWcgjGf7on.ZFswazvXMnyWtOFSjMsFzlq4e4RIPai','3ovmiacqad4',1,'http://127.0.0.1:3000/profiles/1679401970732.png','','','','2247','2023-03-21 12:17:36','Tue Mar 21 2023 18:02:50 GMT+0530 (India Standard Time)'),(37,'kinjal','kinjal@gmail.com','$2b$10$7G5AnCoPsnow7zp8JOmKW.CJQd.Zeonnin/zgWeseAPUigRfDiiy.','nb9pqu4uzim',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'0','2023-03-22 04:15:53',NULL),(38,'kinjal123','kinjal123@gmail.com','$2b$10$JvcYTWT2YUKiYwpnhAOmPebYZHhoD7yQzgh7td1IYWWHjRYIfE7Be','8xj8qd6d4fi',1,'http://127.0.0.1:3000/profiles/default_profile.png',NULL,NULL,NULL,'0','2023-03-22 10:18:21',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-22 18:18:19
