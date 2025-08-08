import React from 'react';
import { MDXProvider as Provider } from '@mdx-js/react';
import defaultComponents from './defaultComponents';
import Default from 'gatsby-theme-carbon/src/components/Layouts/Default';

const MDXProvider = ({ components = defaultComponents, children, element }) => (
  <Provider components={{ ...components, wrapper: Default }}>
    {children || element}
  </Provider>
);

export default MDXProvider;