/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/productpage',
          destination: '/',
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: '/:any',
          destination: '/404',
        },
      ], 
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
      ],
    }
  },
}