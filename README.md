# ELEVATE Documentation Site

A comprehensive documentation site for the ELEVATE Design System by INFORM, built with Next.js, TypeScript, and Lit components.

## Features

- 📖 **MDX Documentation**: Rich documentation with interactive examples
- 🎨 **ELEVATE Components**: Full integration with ELEVATE Core UI library
- 🔧 **Custom ESDS Components**: WebComponent-based custom components with React wrappers
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🔍 **Component Preview**: Interactive code examples with live previews
- 🏷️ **Pattern Library**: Taggable code patterns and examples
- 🔗 **GitHub Integration**: Linkable elements for issue tracking
- ⚡ **Static Generation**: Fast, cached static site deployment

## Tech Stack

- **Framework**: Next.js 14 with static export
- **Language**: TypeScript
- **Components**: Lit WebComponents + React wrappers
- **Styling**: ELEVATE Design Tokens + CSS
- **Content**: MDX with custom components
- **Deployment**: GitHub Pages
- **Fonts**: Inter, Roboto Mono, and optimized code fonts

## Project Structure

```
elevate-docsite/
├── src/
│   ├── components/
│   │   ├── esds/           # Custom ESDS components
│   │   ├── layout/         # Site layout components
│   │   └── patterns/       # Pattern showcase components
│   ├── content/
│   │   ├── components/     # Component documentation
│   │   ├── patterns/       # Pattern examples
│   │   └── guides/         # User role-based guides
│   ├── lib/
│   │   ├── mdx-renderer.ts # MDX processing
│   │   ├── github-links.ts # Issue linking
│   │   └── cache.ts        # Caching system
│   └── styles/
│       ├── tokens.css      # ELEVATE Design Tokens
│       └── fonts.css       # Typography
├── public/
│   └── assets/             # Static assets
└── out/                    # Generated static site
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- GitHub Personal Access Token for ELEVATE packages

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/owrede-inform/elevate-docsite.git
   cd elevate-docsite
   ```

2. Set up environment variables:
   ```bash
   echo "GITHUB_TOKEN=your_github_token_here" > .env.local
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## Navigation Structure

The site provides role-based navigation with two levels:

### Primary Navigation
- **Components**: Component library documentation
- **Patterns**: Reusable code patterns and examples
- **Guides**: Role-based implementation guides

### Secondary Navigation (by Role)
- **Designers**: Visual guidelines, usage principles
- **Frontend Developers**: Implementation details, APIs
- **Product Managers**: Best practices, business impact

## ELEVATE Integration

This site integrates with the ELEVATE Design System packages:

- **@inform-design/elevate-core-ui**: Core component library
- **@inform-design/elevate-design-tokens**: Design tokens and theming
- **@inform-design/elevate-icons**: Icon library + Material Design Icons

## Contributing

1. Create feature branch from `main`
2. Make changes following project conventions
3. Test locally with `npm run dev`
4. Build and verify with `npm run build`
5. Submit pull request

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ by INFORM for the ELEVATE Design System**