import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';
import { Row, Column, Grid } from '../Grid';

import {
  wrapper,
  link,
  direction,
  name,
  linkContainer,
  grid,
  isHomepage as isHomepageStyles,
} from './NextPrevious.module.scss';

const NextPreviousContainer = ({ previousItem = {}, nextItem = {}, isHomepage = false }) => {
  // Ensure we have valid objects for SSR safety
  const safePrevi = previousItem || {};
  const safeNext = nextItem || {};
  
  return (
    <div className={wrapper}>
      <Grid className={grid}>
        <Row className={linkContainer}>
          {safePrevi.to && safePrevi.name && (
            <Column
              className={cx(link, { [isHomepageStyles]: isHomepage })}
              colLg={6}
              colMd={4}
              colSm={2}>
              <Link to={safePrevi.to}>
                <div className={direction}>Previous</div>
                <div className={name}>{safePrevi.name}</div>
              </Link>
            </Column>
          )}
          {safeNext.to && safeNext.name && (
            <Column className={link} colLg={6} colMd={4} colSm={2}>
              <Link to={safeNext.to}>
                <div className={direction}>Next</div>
                <div className={name}>{safeNext.name}</div>
              </Link>
            </Column>
          )}
        </Row>
      </Grid>
    </div>
  );
};

export default NextPreviousContainer;
