import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import Footer from '../Footer'
import {AccountProtection} from "../Account";
import AdminPage from "../Admin";
import EmailVerifyComp from '../SignUp/EmailVerifyComp'
import * as ROUTES from "../../constants/routes";
const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountProtection} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.EmailVerifyComp} component={EmailVerifyComp} />
        <hr />
        <Footer />
      </div>
    </Router>
  );
};
export default App;
