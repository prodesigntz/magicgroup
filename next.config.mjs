/** @type {import('next').NextConfig} */
const nextConfig = {
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
