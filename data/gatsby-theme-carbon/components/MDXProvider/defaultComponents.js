import React from 'react';

import { P, H1, H2, H3, H4, H5, H6, Ul, Ol, Li, Blockquote, Abbr, Sup } from '../markdown';
import PageTable from '../PageTable';
import Code from '../Code';
import PageDescription from '../PageDescription';
import Video from '../Video';
import DoDontExample from '../DoDontExample';
import DoDont from '../DoDontRow/DoDont';
import DoDontRow from '../DoDontRow/DoDontRow';
import Caption from '../Caption';
import ResourceCard2 from '../../../components/ResourceCard2';
import ArticleCard from '../ArticleCard';
import Aside from '../Aside';
import FeatureCard2 from '../../../components/FeatureCard2';
import ImageCard from '../ImageCard';
import ImageGallery from '../ImageGallery';
import ImageGalleryImage from '../ImageGallery/ImageGalleryImage';
import InlineNotification from '../InlineNotification';
import { Row, Column, Grid } from '../Grid';
import { AnchorLink, AnchorLinks } from '../AnchorLinks';
import { Tab, Tabs } from '../Tabs';
import Link from 'gatsby-theme-carbon/src/components/Link';
import { Accordion, AccordionItem } from '../Accordion';
import GifPlayer from '../GifPlayer';
import ArtDirection from '../ArtDirection';
import MediumPosts from '../MediumPosts';
import Title from '../Title';
import { MiniCard, CardGroup } from '../MiniCard';
import SquareCard from '../SquareCard';
import ExpressiveListContainer from '../ExpressiveListContainer';
import ExpressiveList from '../ExpressiveList';

const components = {
  wrapper: function Wrapper({ children, ...props }) {
    return <div {...props}>{children}</div>;
  },
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ol: Ol,
  ul: Ul,
  li: Li,
  blockquote: Blockquote,
  code: Code,
  table: PageTable,
  a: Link,
  sup: Sup,
  abbr: Abbr,
  ArtDirection,
  PageDescription,
  Accordion,
  AccordionItem,
  Video,
  DoDontExample,
  DoDont,
  DoDontRow,
  Row,
  Column,
  GifPlayer,
  Grid,
  Caption,
  ResourceCard: ResourceCard2, // Map old ResourceCard to new ResourceCard2
  ResourceCard2,
  ArticleCard,
  Aside,
  FeatureCard: FeatureCard2, // Map old FeatureCard to new FeatureCard2
  FeatureCard2,
  ImageCard,
  ImageGallery,
  ImageGalleryImage,
  AnchorLink,
  AnchorLinks,
  Tab,
  Tabs,
  InlineNotification,
  MediumPosts,
  Title,
  MiniCard,
  CardGroup,
  SquareCard,
  ExpressiveListContainer,
  ExpressiveList,
};

export default components;