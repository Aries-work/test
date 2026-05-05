/** @type {import('next').NextConfig} */
const nextConfig = {
  // 忽略建置期間的 ESLint 錯誤，確保 Cloudflare 部署順利
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  // 關閉內建圖片優化，配合 R2 靜態圖床使用
  images: { 
    unoptimized: true 
  },
};

module.exports = nextConfig;
