-- AlterTable
ALTER TABLE "configsite" ADD COLUMN     "apiUrl" TEXT,
ADD COLUMN     "scripts" JSONB;

-- CreateTable
CREATE TABLE "analytics_log" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT,
    "metadata" JSONB,
    "veiculoId" INTEGER,
    "criadoem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "analytics_log" ADD CONSTRAINT "analytics_log_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
