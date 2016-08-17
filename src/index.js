import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
// import { ajax } from 'jquery';
import Banking from './components/Banking';

ReactDOM.render(
  <Banking />,
  document.getElementById('root')
)

{/* <Router history={browserHistory}>
<Route path='/' component={Banking} />
</Router>, */}
