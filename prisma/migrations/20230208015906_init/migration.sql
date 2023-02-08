-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phoneNr" TEXT,
    "email" TEXT,
    "profilePictureId" INTEGER,
    CONSTRAINT "Contact_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "ProfilePicture" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfilePicture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_profilePictureId_key" ON "Contact"("profilePictureId");
