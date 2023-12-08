// next.config.js
module.exports = {
  // ... rest of the configuration.
  images: {
    domains: ['avatars.githubusercontent.com', 'web.whatsapp.com', 'localhost'],
  },
  output: 'standalone',
  productionBrowserSourceMaps: true,
};
