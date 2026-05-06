import { z } from "zod";

const stringWithDefault = (defaultValue = "") =>
  z.preprocess(
    (value) => (value === null || value === undefined ? undefined : value),
    z.coerce.string().optional().default(defaultValue)
  );

const ImageListSchema = z.preprocess((value) => {
  if (value === null || value === undefined || value === "") return [];
  if (Array.isArray(value)) return value;

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}, z.array(z.string()).default([]));

/* -----------------------------
   Project Schema (CORE FIXED)
------------------------------ */

export const ProjectSchema = z.object({
  project_name: stringWithDefault("Untitled Project"),
  company: stringWithDefault("Unknown"),
  industry: stringWithDefault(),
  role: stringWithDefault(),
  date: stringWithDefault(),

  short_description: stringWithDefault(),

  situation: stringWithDefault(),
  task: stringWithDefault(),
  actions: stringWithDefault(),
  impact: stringWithDefault(),
  result: stringWithDefault(),

  Tags: stringWithDefault(),
  phase: stringWithDefault(),

  img_project: ImageListSchema,
  img_situation: ImageListSchema,
  img_task: ImageListSchema,
  img_actions: ImageListSchema,
  img_impact: ImageListSchema,
  img_result: ImageListSchema,
});

export const ProfileSchema = z.object({
  name: stringWithDefault("Aries Liu"),
  headline: stringWithDefault("I Build the [Right] Thing, then [Scale It]."),
  titles: stringWithDefault("Product Owner, Project Lead, AI Builder"),
  summary: stringWithDefault("Product Leader (8 yrs Product, 4+ yrs Leadership) across FinTech, Gaming, MarTech, and Healthcare."),
  contact_email: stringWithDefault("ariesccliu@gmail.com"),
  linkedin_url: stringWithDefault("linkedin.com/in/ariesliu"),
});

/* -----------------------------
   Portfolio Schema
------------------------------ */

export const PortfolioSchema = z.object({
  Dynamic: z.array(ProjectSchema).optional().default([]),
  Static: z.array(ProfileSchema).optional().default([]),
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
