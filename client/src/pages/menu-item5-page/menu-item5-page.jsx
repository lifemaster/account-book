import React from 'react';
import { connect } from 'react-redux';

import { changeCurrentPage } from '../../actions';

class MenuItem5Page extends React.Component {
  componentDidMount() {
    this.props.onPageTitleChange('Menu item 5 page');
  }

  render() {
    return (
      <h1>Menu item 5 page</h1>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPageTitleChange: title => dispatch(changeCurrentPage(title))
  }
}

export default connect(null, mapDispatchToProps)(MenuItem5Page);
