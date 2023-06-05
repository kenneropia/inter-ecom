/*
  Warnings:

  - Added the required column `successful` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" INTEGER NOT NULL,
    "creatorId" TEXT NOT NULL,
    "successful" BOOLEAN NOT NULL,
    "tx_id" TEXT NOT NULL,
    CONSTRAINT "Order_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("creatorId", "id", "price", "tx_id") SELECT "creatorId", "id", "price", "tx_id" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_tx_id_key" ON "Order"("tx_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
