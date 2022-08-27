-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(60) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professionals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `crp` VARCHAR(20) NOT NULL,
    `cellphone` VARCHAR(14) NULL,
    `approach` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `professionals_crp_key`(`crp`),
    UNIQUE INDEX `professionals_userId_key`(`userId`),
    INDEX `user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `gender` VARCHAR(15) NOT NULL,
    `cellphone` VARCHAR(14) NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `professionalId` INTEGER NOT NULL,

    UNIQUE INDEX `patients_cpf_key`(`cpf`),
    UNIQUE INDEX `patients_email_key`(`email`),
    UNIQUE INDEX `patients_professionalId_key`(`professionalId`),
    INDEX `professional`(`professionalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(150) NOT NULL,
    `type` VARCHAR(30) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `schedule_type` VARCHAR(150) NOT NULL,
    `duration` INTEGER NOT NULL,
    `session_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `professionalId` INTEGER NOT NULL,

    INDEX `professional`(`professionalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionId` INTEGER NOT NULL,
    `patientId` INTEGER NOT NULL,

    INDEX `session`(`sessionId`),
    INDEX `patient`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `professionals` ADD CONSTRAINT `professionals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `professionals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `professionals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_session` ADD CONSTRAINT `patients_session_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients_session` ADD CONSTRAINT `patients_session_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
