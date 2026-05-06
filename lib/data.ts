import { PortfolioData } from "./types";
import { parsePortfolio } from "./schema";

const DATA_URL =
  "https://pub-806f9db98b004ba495cbef45c5e11b06.r2.dev/data.json";

export const DEFAULT_PROFILE: PortfolioData["Static"][number] = {
  name: "Aries Liu",
  headline: "I Build the [Right] Thing, then [Scale It].",
  titles: "Product Owner, Project Lead, AI Builder",
  summary:
    "Product Leader (8 yrs Product, 4+ yrs Leadership) across FinTech (Payments/Crypto), Gaming, MarTech, and Healthcare. Combining design excellence with data-driven strategies to integrate complex SaaS, ERP, and Mobile.",
  contact_email: "ariesccliu@gmail.com",
  linkedin_url: "linkedin.com/in/ariesliu",
};

const FALLBACK_DATA: PortfolioData = {
  Static: [
    DEFAULT_PROFILE,
  ],
  Dynamic: [],
};

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const res = await fetch(DATA_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch portfolio data: ${res.status}`);
    }

    const raw = await res.json();

    const parsed = parsePortfolio(raw);

    if (!parsed) {
      throw new Error("Portfolio schema validation failed");
    }

    return parsed;
  } catch (error) {
    console.warn("Using fallback portfolio data:", error);
    return FALLBACK_DATA;
  }
}
