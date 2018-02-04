import React from 'react';
import { connect } from 'react-redux';

import { changeCurrentPage } from '../../actions';

class MenuItem3Page extends React.Component {
  componentDidMount() {
    this.props.onPageTitleChange('Menu Item 3 page');
  }

  render() {
    return (
      <h1>Menu item 3 page</h1>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPageTitleChange: title => dispatch(changeCurrentPage(title))
  }
}

export default connect(null, mapDispatchToProps)(MenuItem3Page);
