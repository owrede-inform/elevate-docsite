import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class PageTable extends React.Component {
  render() {
    const { children } = this.props;
    let gridSize = 4; // default size
    
    // Safely check children structure
    if (children && Array.isArray(children) && children[1] && children[1].props && children[1].props.children) {
      if (Array.isArray(children[1].props.children)) {
        const firstChild = children[1].props.children[0];
        if (firstChild && firstChild.props && firstChild.props.children) {
          gridSize = firstChild.props.children.length;
        }
      } else if (children[1].props.children.props && children[1].props.children.props.children) {
        gridSize = children[1].props.children.props.children.length;
      }
    }

    const classNames = cx({
      [`cds--col-lg-8 cds--col-md-6`]: gridSize < 4,
      [`cds--col-lg-12`]: gridSize > 3,
      [` cds--col-no-gutter`]: true,
      'page-table__container': true,
    });

    return (
      <div className="cds--row">
        <div className={classNames}>
          <div className="page-table">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

PageTable.propTypes = {
  children: PropTypes.node,
};
