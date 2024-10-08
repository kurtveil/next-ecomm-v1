/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        esmExternals: 'loose',
        serverComponentsExternalPackages: ['mongoose'],
    }
};

export default nextConfig;
