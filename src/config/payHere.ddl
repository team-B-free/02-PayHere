/**
 * @author 최예진
 * @version 1.0 22.7.5 최초 작성

 * @author 박성용
 * @version 1.1 22.7.6 ddl 코드 수정
 */

DROP DATABASE IF EXISTS 데이터베이스이름;
CREATE DATABASE IF NOT EXISTS 데이터베이스이름;
USE 데이터베이스이름;



CREATE TABLE IF NOT EXISTS USER (
  id int NOT NULL AUTO_INCREMENT,
  nickname varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  email varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  mbti varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  deleted_at datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE IF NOT EXISTS MONEYBOOK (
  id int NOT NULL,
  title varchar(20) NOT NULL,
  is_shared varchar(20) NOT NULL DEFAULT 'N',
  view_id int NOT NULL DEFAULT '0',
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  deleted_at datetime DEFAULT NULL,
  user_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT moneybook_ibfk_1 FOREIGN KEY (user_id) REFERENCES USER (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE IF NOT EXISTS MONEYBOOK_DETAIL (
  id int NOT NULL AUTO_INCREMENT,
  money int NOT NULL,
  memo text COLLATE utf8mb4_general_ci,
  money_type int NOT NULL,
  occured_at datetime NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  deleted_at datetime DEFAULT NULL,
  moneybook_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY moneybook_id (moneybook_id),
  CONSTRAINT moneybook_detail_ibfk_1 FOREIGN KEY (moneybook_id) REFERENCES MONEYBOOK (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE IF NOT EXISTS COMMENT (
  id int NOT NULL AUTO_INCREMENT,
  content varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  deleted_at datetime DEFAULT NULL,
  moneybook_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY moneybook_id (moneybook_id),
  CONSTRAINT comment_ibfk_1 FOREIGN KEY (moneybook_id) REFERENCES MONEYBOOK (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




--  * mysql -u root -p < src/config/payHere.ddl
--  * 데이터베이스와 테이블을 생성합니다. * /

