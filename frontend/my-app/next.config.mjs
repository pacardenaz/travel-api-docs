/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Deshabilitar features que causan problemas en static export
  trailingSlash: true,
};

export default nextConfig;
