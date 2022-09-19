/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "googleusercontent.com", 
      "githubusercontent.com", 
      "localhost"   
    ],
  },
  
}

module.exports = nextConfig
