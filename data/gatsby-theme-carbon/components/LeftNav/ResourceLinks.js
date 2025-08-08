import React from 'react';
import LeftNavResourceLinks from './LeftNavResourceLinks';

const links = [
  {
    title: 'ELEVATE Core UI',
    href: 'https://github.com/inform-elevate/elevate-core-ui',
  },
  {
    title: 'Design Tokens',
    href: 'https://github.com/inform-elevate/elevate-design-tokens',
  },
  {
    title: 'Storybook',
    href: 'https://elevate-core-ui.inform-cloud.io',
  },
  {
    title: 'INFORM Software',
    href: 'https://www.inform-software.com',
  },
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <LeftNavResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
