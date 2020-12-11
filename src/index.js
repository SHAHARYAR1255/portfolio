// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap-social/bootstrap-social.css';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import {AuthProvider} from './components/Firebase/context';

// import UserProvider from './components/Firebase';

// import Firebase, { FirebaseContext } from "./components/Firebase";

// ReactDOM.render(
//   <FirebaseContext.Provider >
//     <App />
//   </FirebaseContext.Provider>,
//   document.getElementById("root")
// );
ReactDOM.render(
    <AuthProvider >
      <App />
    </AuthProvider>,
    document.getElementById("root")
  );

serviceWorker.unregister();
