import express from "express";
import { prisma } from "../utils/db";
import { validateResponse, classifyErrors } from "../utils/validator";

const router = express.Router();

// Stores Schema
router.post("/schema", async (req, res) => {
  try {
    const saved = await prisma.apiContract.create({
      data: {
        name: "default",
        schema: req.body
      }
    });

    res.json(saved);
  } catch (error) {
    console.error("Error saving schema:", error);
    res.status(500).json({ error: "Failed to save schema" });
  }
});

// Validates Response
router.post("/validate", async (req, res) => {
  try {
    // Gets latest schema
    const latestSchema = await prisma.apiContract.findFirst({
      orderBy: { createdAt: "desc" }
    });

    if (!latestSchema) {
      return res.status(400).json({ error: "No schema found" });
    }

    const result = validateResponse(latestSchema.schema, req.body);

    // Drift Classification
    const drift = classifyErrors(result.errors ?? []);
    
    const safeErrors = result.errors
      ? JSON.parse(JSON.stringify(result.errors))
      : [];

    // Saves validation result
    await prisma.validationResult.create({
      data: {
        valid: result.valid,
        errors: safeErrors
      }
    });

    // Returns enriched response
    res.json({
      valid: result.valid,
      drift
    });

  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({ error: "Validation failed" });
  }
});

// Drift Report
router.get("/drift-report", async (req, res) => {
  try {
    const results = await prisma.validationResult.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching drift report:", error);
    res.status(500).json({ error: "Failed to fetch report" });
  }
});

export default router;