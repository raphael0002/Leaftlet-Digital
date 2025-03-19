/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    // Alternatively, you can use the more modern remotePatterns approach:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     pathname: '**',
    //   },
    // ],
  },
};

export default nextConfig;
