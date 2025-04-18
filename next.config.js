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
      'res.cloudinary.com',
      'images.unsplash.com',
      "i.pravatar.cc",
      "i.pinimg.com",
      "static.wikia.nocookie.net",
      "th.bing.com",
      "motionbgs.com",
      "otakukart.com"
    ],
  },
  experimental: {
    runtime: 'nodejs',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to complete even if there are type errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
