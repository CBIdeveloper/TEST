import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime';

import store from './store/store';

import App from './components/App/App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}>
  <BrowserRouter basename="/frontend">
    <App />
  </BrowserRouter>
</Provider>);

// const dom = ReactDOM;

// dom.render(
//   <Provider store={store}>
//     <BrowserRouter basename="/frontend">
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root'),
// );
