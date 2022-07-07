-- 고객 테이블 생성
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `mbti` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- 가계부 테이블 생성
CREATE TABLE `moneybook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `is_shared` varchar(1) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  `view` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `moneybook_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- 가계부 상세내역 테이블 생성
CREATE TABLE `moneybook_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `money` int NOT NULL,
  `memo` text COLLATE utf8mb4_general_ci,
  `money_type` int NOT NULL,
  `occured_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `moneybook_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `moneybook_id` (`moneybook_id`),
  CONSTRAINT `moneybook_detail_ibfk_1` FOREIGN KEY (`moneybook_id`) REFERENCES `moneybook` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- 가계부 상세내역 댓글 테이블 생성
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `moneybook_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `moneybook_id` (`moneybook_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moneybook_id`) REFERENCES `moneybook` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
