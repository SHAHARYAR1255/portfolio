// // import React, { Component } from 'react';
// // import TypeIn from './Components/Typein';

// // function App() {

// //   return (
// //     <div>
// // {/*
// //       <TypeIn
// //           text={`The quick brown fox jump over the lazy dog`}
// //           type='letter' // word or letter
// //           animation='in-left' // in-left, in-down or leave it empty
// //           repeat={true} // true or false
// //           delay='3000' // delay after each cycle
// //           speed='200' // more number, more slow
// //           onComplete={() => console.log('complete')} // any function to class after every cycle
// //           class='custom-text-style' // any custom class you created in type.css
// //           show={true} // true or false
// //         /> */}
// //     </div>
// //   )
// // }

// // export default App

// import React, { Component } from "react";
// import CreateLink from "./Components/CreateLink";
// import LinkList from "./Components/LinkList";
// import Header from './Components/Header'
// import { Switch, Route, Redirect } from 'react-router-dom';
// import Login from './Components/Login';
// import Search from './Components/Search';

// class App extends Component {
//   render() {
//     return (
//       <div className='center w85'>
//         <Header />
//         <div className='ph3 pv1 background-gray'>
//           <Switch>
//             <Route exact path='/' render={() => <Redirect to='/new/1' />} />
//             <Route exact path='/create' component={CreateLink} />
//             <Route exact path='/login' component={Login} />
//             <Route exact path='/search' component={Search} />
//             <Route exact path='/top' component={LinkList} />
//             <Route exact path='/new/:page' component={LinkList} />
//           </Switch>
//         </div>
//       </div>
//     )
//   }
// }

// export default App;
