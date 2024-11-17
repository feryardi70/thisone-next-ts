-- CreateTable
CREATE TABLE `departures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `airline` VARCHAR(191) NOT NULL,
    `flightnumber` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `departdate` VARCHAR(191) NOT NULL,
    `departtime` VARCHAR(191) NOT NULL,
    `gate` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arrivals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `airline` VARCHAR(191) NOT NULL,
    `flightnumber` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `arrivedate` VARCHAR(191) NOT NULL,
    `arrivetime` VARCHAR(191) NOT NULL,
    `baggage` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
