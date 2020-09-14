import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';

import Claims from './containers/pages/items';
import ClaimAdd from './containers/pages/itemAdd';

import reducers from './state/reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <Provider store={store}>
    <div className="container">
      <h1 className="h2 text-center mt-4 mb-0">Acme Insurance</h1>
      <h2 className="h5 text-center mt-2 mb-4">Claims Portal</h2>
      <Router>
        <Route exact path="/" component={Claims} />
        <Route path="/add" component={ClaimAdd} />
      </Router>
    </div>
  </Provider>
);


export default App;
