import { z } from "zod";

/* -----------------------------
   Project Schema (CORE FIXED)
------------------------------ */

export const ProjectSchema = z.object({
  project_name: z.coerce.string().optional().default("Untitled Project"),
  company: z.coerce.string().optional().default("Unknown"),
  industry: z.coerce.string().optional().default(""),
  role: z.coerce.string().optional().default(""),
  date: z.coerce.string().optional().default(""),

  short_description: z.coerce.string().optional().nullable(),

  situation: z.coerce.string().optional().nullable(),
  task: z.coerce.string().optional().nullable(),
  result: z.coerce.string().optional().nullable(),

  Tags: z.coerce.string().optional().nullable(),
  phase: z.coerce.string().optional().nullable(),

  img_project: z.union([z.string(), z.array(z.string())]).optional(),
  img_situation: z.union([z.string(), z.array(z.string())]).optional(),
  img_task: z.union([z.string(), z.array(z.string())]).optional(),
  img_actions: z.union([z.string(), z.array(z.string())]).optional(),
  img_result: z.union([z.string(), z.array(z.string())]).optional(),
});

/* -----------------------------
   Portfolio Schema
------------------------------ */

export const PortfolioSchema = z.object({
  Dynamic: z.array(ProjectSchema).optional().default([]),
  Static: z.array(z.any()).optional().default([]),
});

/* -----------------------------
   Safe parser (NO BUILD CRASH)
------------------------------ */

export function parsePortfolio(data: unknown) {
  const result = PortfolioSchema.safeParse(data);

  if (!result.success) {
    console.warn("Schema validation failed:", result.error.flatten());

    return {
      Dynamic: [],
      Static: [],
    };
  }

  return result.data;
}

/* -----------------------------
   Helper: safe project
------------------------------ */

export function parseProject(project: unknown) {
  const result = ProjectSchema.safeParse(project);

  if (!result.success) {
    console.warn("Project invalid:", result.error.flatten());
    return null;
  }

  return result.data;
}
