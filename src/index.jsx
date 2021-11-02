import React from 'react';
import ReactDOM from 'react-dom';
import CaldarApp from './CaldarApp';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CaldarApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
