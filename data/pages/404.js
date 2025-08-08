import React from 'react';
import { FourOhFour } from 'gatsby-theme-carbon';

const links = [
  { href: '/', text: 'Homepage' },
  { href: '/components', text: 'Components' },
  { href: '/components/button', text: 'Button Component' },
  { href: '/components/card', text: 'Card Component' },
  { href: '/components/avatar', text: 'Avatar Component' },
  { href: '/tokens', text: 'Design Tokens' },
  { href: '/tokens/color', text: 'Color Tokens' },
  { href: '/tokens/typography', text: 'Typography Tokens' },
  { href: '/getting-started', text: 'Getting Started' },
  { href: '/guidelines/principles', text: 'Design Principles' },
];

const Custom404 = () => <FourOhFour links={links} />;

export default Custom404;

export const Head = () => (
  <>
    <title>Page Not Found | ELEVATE Design System</title>
    <meta name="description" content="The page you're looking for could not be found. Explore the ELEVATE Design System documentation instead." />
  </>
);
