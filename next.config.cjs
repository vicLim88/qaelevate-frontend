/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. Use with caution!
    ignoreBuildErrors: false,
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Experimental features
  experimental: {
    // Enable Turbopack for faster development
    turbo: {
      rules: {
        '*.ts': ['ts-loader'],
        '*.tsx': ['ts-loader'],
      },
    },
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
