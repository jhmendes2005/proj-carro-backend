/*
  Warnings:

  - You are about to drop the column `ano` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `imagens` on the `vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idExterno]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placa]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chassi]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "ano",
DROP COLUMN "imagens",
ADD COLUMN     "anoFabricacao" INTEGER,
ADD COLUMN     "anoModelo" INTEGER,
ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "chassi" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "cilindrada" TEXT,
ADD COLUMN     "codigoFipe" TEXT,
ADD COLUMN     "cor" TEXT,
ADD COLUMN     "dataAtualizacao" TIMESTAMP(3),
ADD COLUMN     "dataEntradaEstoque" TIMESTAMP(3),
ADD COLUMN     "destaque" INTEGER,
ADD COLUMN     "filialApelido" TEXT,
ADD COLUMN     "fotos" TEXT[],
ADD COLUMN     "idExterno" INTEGER,
ADD COLUMN     "informacoesAdicionais" JSONB,
ADD COLUMN     "motor" TEXT,
ADD COLUMN     "opcionais" TEXT[],
ADD COLUMN     "placa" TEXT,
ADD COLUMN     "portas" INTEGER,
ADD COLUMN     "potencia" TEXT,
ADD COLUMN     "tipo" TEXT,
ADD COLUMN     "valorFipe" DOUBLE PRECISION,
ADD COLUMN     "versao" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_idExterno_key" ON "vehicle"("idExterno");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_placa_key" ON "vehicle"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_chassi_key" ON "vehicle"("chassi");
