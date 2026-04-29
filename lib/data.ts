import { PortfolioData } from './types';

const DATA_URL = 'https://pub-806f9db98b004ba495cbef45c5e11b06.r2.dev/data.json';

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const res = await fetch(DATA_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio data: ${res.status}`);
  }

  return res.json();
}
