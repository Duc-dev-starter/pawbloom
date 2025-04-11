const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'avatar.vercel.sh',
      'loremflickr.com',
      'img.vietqr.io',
      'upload.wikimedia.org',
      'encrypted-tbn0.gstatic.com',
      'example.com',
      'www.trupanion.com',
      'i.natgeofe.com',
      'res.cloudinary.com'
    ],
  },
  experimental: {
    runtime: 'nodejs',
  },
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
