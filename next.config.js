const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      require('rehype-autolink-headings'),
      require('rehype-highlight')
    ],
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Configure basePath for GitHub Pages if needed
  // basePath: '/elevate-docsite',
  
  // MDX configuration
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Environment variables
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  
  // Webpack configuration for Lit components
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    // Handle Lit components
    config.module.rules.push({
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    })
    
    return config
  },
  
  // Experimental features
  experimental: {
    mdxRs: true,
  },
}

module.exports = withMDX(nextConfig)