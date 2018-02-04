import React from 'react';
import { connect } from 'react-redux';

import { changeCurrentPage } from '../../actions/currentPage';

class MainPage extends React.Component {
  componentDidMount() {
    this.props.onPageTitleChange('Главная');
  }

  render() {
    return (
      <h1>Main-page</h1>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPageTitleChange: title => dispatch(changeCurrentPage(title))
  }
}

export default connect(null, mapDispatchToProps)(MainPage);
