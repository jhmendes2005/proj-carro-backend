/*
  Warnings:

  - You are about to drop the `ConfigSite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ConfigSite";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Vehicle";

-- CreateTable
CREATE TABLE "vehicle" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "quilometragem" INTEGER,
    "cambio" TEXT,
    "combustivel" TEXT,
    "descricao" TEXT,
    "imagens" JSONB NOT NULL,
    "dadosapi" JSONB,
    "slug" TEXT NOT NULL,
    "criadoem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoem" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configsite" (
    "id" SERIAL NOT NULL,
    "banner" JSONB,
    "sobrenos" TEXT,
    "whatsapp" TEXT,
    "criadoem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configsite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_slug_key" ON "vehicle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
