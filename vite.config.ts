import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

// Plugin to suppress specific warnings
const suppressWarningsPlugin = () => ({
  name: 'suppress-warnings',
  configureServer(server) {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const message = args.join(' ');
      // Skip qr-creator sourcemap warnings (from Shoelace dependency)
      if (message.includes('qr-creator') && message.includes('points to missing source files')) {
        return;
      }
      originalWarn.apply(console, args);
    };
  },
})

export default defineConfig({
  plugins: [
    // Suppress annoying third-party sourcemap warnings
    suppressWarningsPlugin(),
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
      '@/config': resolve(__dirname, 'src/config'),
      '@inform-elevate/elevate-cdk': resolve(__dirname, 'src/lib/cdk-stub.ts'),
    },
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
    fs: {
      // Suppress warning about missing source files for third-party packages
      strict: false,
      // Deny access to sensitive files
      deny: ['.env', '.env.*', '*.{pem,crt,key}'],
    },
  },
  
  // Build configuration for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
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
    exclude: [
      '@inform-elevate/elevate-core-ui', 
      '@inform-elevate/elevate-design-tokens', 
      '@inform-elevate/elevate-icons', 
      '@inform-elevate/elevate-cdk',
      'qr-creator'
    ]
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