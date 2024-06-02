/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
