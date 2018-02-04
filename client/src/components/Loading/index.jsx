import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './index.css';

function Loading() {
  return (
    <div className="container">
      <div className="preloader">
        <CircularProgress size={60} thickness={7} />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
