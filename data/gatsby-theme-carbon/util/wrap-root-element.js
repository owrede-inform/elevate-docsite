import React from 'react';
import { NavContextProvider } from './context/NavContext';
import MDXProvider from '../components/MDXProvider';

const wrapRootElement = ({ element, children }) => (
  <NavContextProvider>
    <MDXProvider>{children || element}</MDXProvider>
  </NavContextProvider>
);

export default wrapRootElement;
