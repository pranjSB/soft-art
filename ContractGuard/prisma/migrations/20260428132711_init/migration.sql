-- CreateTable
CREATE TABLE "ApiContract" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "schema" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationResult" (
    "id" SERIAL NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "errors" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ValidationResult_pkey" PRIMARY KEY ("id")
);
