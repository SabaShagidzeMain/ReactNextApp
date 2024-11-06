/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
  publicRuntimeConfig: {
    auth0Domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
    auth0ClientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    auth0RedirectUri: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
  },
};

export default nextConfig;
