// This line is for eslint to ignore not found variable error:
/* global document, DEVELOPMENT */
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Internal components
import Layout from './components/Layout';

// App with redux wrapper
const AppRedux = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

// React render
ReactDOM.render(
  <AppRedux />,
  document.getElementById('app'),
);

// This will be injected in the build module.
if (DEVELOPMENT) {
  if (module.hot) {
    module.hot.accept();
  }
}
