import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
// import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./reducers/reducer.js"

// import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer)
console.log("store", store);
console.log("state is", store.getState());

ReactDOM.render(
  <Router>
    <Provider store={store} >
      <App />
    </Provider>
  </Router>, document.getElementById('root'));

// store.dispatch({ type: "@@INIT" })

// registerServiceWorker();
