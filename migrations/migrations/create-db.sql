CREATE SCHEMA IF NOT EXISTS `thesis` DEFAULT CHARACTER SET utf8;

USE `thesis`;

-- -----------------------------------------------------
-- Table `thesis`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(255) NULL,
  `passwordHash` VARCHAR(255) NULL,
  `language` VARCHAR(45) NULL,
  `refreshToken` VARCHAR(45) NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `patronymic` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `lastVisit` DATETIME NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`Machine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Machine` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `partNumber` VARCHAR(45) NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`Detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `partNumber` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`Param`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Param` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `unit` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`DetailParam`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`DetailParam` (
  `detailId` INT NOT NULL,
  `paramId` INT NOT NULL,
  `value` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`detailId`, `paramId`),
  INDEX `fk_Detail_has_Param_Param1_idx` (`paramId` ASC),
  INDEX `fk_Detail_has_Param_Detail_idx` (`detailId` ASC),
  CONSTRAINT `fk_Detail_has_Param_Detail` FOREIGN KEY (`detailId`) REFERENCES `thesis`.`Detail` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Detail_has_Param_Param1` FOREIGN KEY (`paramId`) REFERENCES `thesis`.`Param` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`MachineDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`MachineDetail` (
  `machineId` INT NOT NULL,
  `detailId` INT NOT NULL,
  `count` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`machineId`, `detailId`),
  INDEX `fk_MachineDetail_Detail1_idx` (`detailId` ASC),
  INDEX `fk_MachineDetail_Machine1_idx` (`machineId` ASC),
  CONSTRAINT `fk_MachineDetail_Machine1` FOREIGN KEY (`machineId`) REFERENCES `thesis`.`Machine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_MachineDetail_Detail1` FOREIGN KEY (`detailId`) REFERENCES `thesis`.`Detail` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Address` (
  `id` INT NOT NULL,
  `clientId` INT NOT NULL,
  `index` INT NULL,
  `city` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `building` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Address_User1_idx` (`clientId` ASC),
  CONSTRAINT `fk_Address_User1` FOREIGN KEY (`clientId`) REFERENCES `thesis`.`User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `addressId` INT NOT NULL,
  `clientId` INT NOT NULL,
  `responsibleId` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `comment` VARCHAR(45) NULL,
  `statusCode` INT NOT NULL DEFAULT 0,
  `totalPrice` FLOAT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Order_Address1_idx` (`addressId` ASC),
  INDEX `fk_Order_User1_idx` (`clientId` ASC),
  INDEX `fk_Order_User2_idx` (`responsibleId` ASC),
  CONSTRAINT `fk_Order_Address1` FOREIGN KEY (`addressId`) REFERENCES `thesis`.`Address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_User1` FOREIGN KEY (`clientId`) REFERENCES `thesis`.`User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_User2` FOREIGN KEY (`responsibleId`) REFERENCES `thesis`.`User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`OrderMachine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`OrderMachine` (
  `orderId` INT NOT NULL,
  `machineId` INT NOT NULL,
  `count` INT NOT NULL DEFAULT 0,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`orderId`, `machineId`),
  INDEX `fk_OrderMachine_Machine1_idx` (`machineId` ASC),
  INDEX `fk_OrderMachine_Order1_idx` (`orderId` ASC),
  CONSTRAINT `fk_OrderMachine_Order1` FOREIGN KEY (`orderId`) REFERENCES `thesis`.`Order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrderMachine_Machine1` FOREIGN KEY (`machineId`) REFERENCES `thesis`.`Machine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thesis`.`UserRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `thesis`.`UserRole` (
  `userId` INT NOT NULL,
  `roleId` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`userId`, `roleId`),
  INDEX `fk_UserPosition_Position1_idx` (`roleId` ASC),
  INDEX `fk_UserPosition_User1_idx` (`userId` ASC),
  CONSTRAINT `fk_UserPosition_User1` FOREIGN KEY (`userId`) REFERENCES `thesis`.`User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserPosition_Position1` FOREIGN KEY (`roleId`) REFERENCES `thesis`.`Role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;