/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds:true,
  },
  images: {
    unoptimized: true, ///image optimization
    remotePatterns: [
      {
        hostname: "*firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
