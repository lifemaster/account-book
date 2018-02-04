import React from 'react';
import { connect } from 'react-redux';

import { changeCurrentPage } from '../../actions';

class NotFound extends React.Component {
  componentDidMount() {
    this.props.onPageTitleChange('Unknown page');
  }

  render() {
    return (
      <h2>Page not found</h2>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPageTitleChange: title => dispatch(changeCurrentPage(title))
  };
}

export default connect(null, mapDispatchToProps)(NotFound);
