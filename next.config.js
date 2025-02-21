
const nextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com', 'avatar.vercel.sh', 'loremflickr.com', 'img.vietqr.io'],
  },
  experimental: {
    runtime: 'nodejs', // Chạy trên Node.js runtime thay vì Edge
  },
};
module.exports = nextConfig;
