import { PortfolioData } from "./types";
import { parsePortfolio } from "./schema";

const DATA_URL =
  "https://pub-806f9db98b004ba495cbef45c5e11b06.r2.dev/data.json";

/* -----------------------------
   Fetch + Schema Guard Layer
------------------------------ */

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const res = await fetch(DATA_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio data: ${res.status}`);
  }

  const raw = await res.json();

  // 🔥 schema validation layer (核心升級)
  const parsed = parsePortfolio(raw);

  return parsed as PortfolioData;
}
