import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  plugins: [
    // MDX support with enhanced processing
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight
      ],
      providerImportSource: '@mdx-js/react'
    }),
    // React support
    react({
      include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),
  ],
  
  // Path aliases for clean imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/esds': resolve(__dirname, 'src/components/esds'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/styles': resolve(__dirname, 'src/styles'),
      '@/content': resolve(__dirname, 'src/content'),
      '@/assets': resolve(__dirname, 'src/assets'),
    },
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  
  // Build configuration for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      external: ['@inform-elevate/elevate-cdk'],
    },
  },
  
  // Environment variables
  define: {
    __ELEVATE_DOCSITE__: JSON.stringify(process.env.ELEVATE_DOCSITE || ''),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  
  // Optimize dependencies for better development experience
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lit',
      '@mdx-js/react',
    ],
    exclude: ['@inform-elevate/elevate-core-ui', '@inform-elevate/elevate-design-tokens', '@inform-elevate/elevate-icons']
  },
  
  // CSS processing
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Base path for deployment (GitHub Pages)
  base: process.env.NODE_ENV === 'production' ? '/elevate-docsite/' : '/',
})