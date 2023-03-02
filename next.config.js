/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/ad-space/uploads/**"
      }
    ]
  },
  headers : async () => {
    return [
      {
        // matching all API routes
        source: "https://storage.googleapis.com/ad-space/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  } 
}

module.exports = nextConfig
