CREATE TABLE IF NOT EXISTS `USER` (`id` INTEGER NOT NULL auto_increment , `nickname` VARCHAR(45) NOT NULL, `email` VARCHAR(45) NOT NULL, `password` VARCHAR(45) NOT NULL, `mbti` VARCHAR(20), `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `deleted_at` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `MONEYBOOK` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(20) NOT NULL, `is_shared` VARCHAR(1) NInnoDB DEFAULT CHRCHAR(45) NOTOT NULL DEFAULT 'N', `view` INTEGER NOT NULL DEFAULT 0, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `deleted_at` DATETIME, `user_id` I                 general_ci;
CREATE TABLE IF NOT EXISTS `MONEYBOOK_DETAIL` (`id` INTEGER NOT NULL auto_increment , `money` INTEGER NOT NULL, `memo` TEXT, `money_type` INTEGER NOT NULL, `occured_at` DATETIME NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `deleted_at` DATETIME, `moneybook_i = 'wanted'      d` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`moneybook_id`) REFERENCES `MONEYBOOK` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHAype` INTEGER NOT NULL, `occureRSET=utf8mb4 COLLATE utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS `COMMENT` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(300) NOT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIMEOT NULL, `updated_at` DATETIME NOT NULL, `deleted_at` DATETIME, `moneybook_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`moneybook_id`) REFERENCES `MONEYELETE SET NULL ON DEFAULT CHARBOOK` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;