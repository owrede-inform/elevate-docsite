import React from 'react';

// Import the entire Switcher module to access all exports
const SwitcherModule = require('gatsby-theme-carbon/src/components/Switcher');

// Extract components from the module
const Switcher = SwitcherModule.default || SwitcherModule.Switcher;
const SwitcherLink = SwitcherModule.SwitcherLink;
const SwitcherDivider = SwitcherModule.SwitcherDivider;

const CustomSwitcher = (props) => (
  <Switcher {...props}>
    {/* Main ELEVATE Navigation */}
    <SwitcherLink href="/">
      ELEVATE Design System
    </SwitcherLink>
    <SwitcherLink href="/getting-started">
      Getting Started
    </SwitcherLink>
    
    {/* Core Repositories */}
    <SwitcherDivider>ELEVATE on GitHub</SwitcherDivider>
    <SwitcherLink href="https://github.com/inform-elevate">
          GitHub Organization
    </SwitcherLink>
    <SwitcherLink href="https://github.com/inform-elevate/elevate-core-ui">
      Core UI Components
    </SwitcherLink>
    <SwitcherLink href="https://github.com/inform-elevate/elevate-icons">
      Custom Icons
    </SwitcherLink>
    <SwitcherLink href="https://github.com/inform-elevate/elevate-design-tokens">
      Design Tokens
    </SwitcherLink>
    
    {/* Storybook Documentation */}
    <SwitcherDivider>Storybook Documentation</SwitcherDivider>
    <SwitcherLink href="http://elevate-core-ui.inform-cloud.io/">
      Core UI Library
    </SwitcherLink>
    <SwitcherLink href="http://elevate-icons.inform-cloud.io/">
      Custom Icons
    </SwitcherLink>
    <SwitcherLink href="http://elevate-design-tokens.inform-cloud.io/">
      Design Tokens
    </SwitcherLink>
    
    {/* Documentation & Organization */}
    <SwitcherDivider>Other Resources</SwitcherDivider>
    <SwitcherLink href="https://confluence.inform-software.com/x/5dM6D">
      ELEVATE Confluence Space
    </SwitcherLink>
    <SwitcherLink href="https://confluence.inform-software.com/x/h9ruD">
      Product Design Council Meetings
    </SwitcherLink>
    <SwitcherLink href="https://www.inform-software.design/">
      INFORM Corporate Design
    </SwitcherLink>
  </Switcher>
);

export default CustomSwitcher;