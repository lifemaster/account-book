import React from 'react';
import { connect } from 'react-redux';

import { changeCurrentPage } from '../../actions';

class MenuItem4Page extends React.Component {
  componentDidMount() {
    this.props.onPageTitleChange('Menu item 4 page');
  }

  render() {
    return (
      <h1>Menu item 4 page</h1>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPageTitleChange: title => dispatch(changeCurrentPage(title))
  };
}

export default connect(null, mapDispatchToProps)(MenuItem4Page);
