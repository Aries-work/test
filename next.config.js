/** @type {import('next').NextConfig} */
const nextConfig = {
  // 關閉內建圖片優化，配合 R2 靜態圖床使用
  images: { 
    unoptimized: true 
  },
};

module.exports = nextConfig;
