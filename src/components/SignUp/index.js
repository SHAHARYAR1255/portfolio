import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
// import {withFirebase} from '../Firebase/context';
// import { compose } from 'recompose';
import { useAuth } from "../Firebase/context";
// import * as Ons from "react-onsenui";
import {
  Button,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const SignUpPage = () => (
  <>
    <div>
      <SignUpForm />
    </div>
  </>
);
export const VerificationEmailComponent = ({resendEmail,reSend, timer, seconds, email, resetForm, }) => {
  return (
    <div className="container">
      <div className="row">
        {console.log("resend value", reSend)}
        <h2>
          {!reSend
            ? `Verification Email has sent to your email address ${email}`
            : `Verification email is resent to ${email}`}
        </h2>
        <Button variant="contained" color="secondary" onClick={resetForm}>
          change your email{" "}
        </Button>
        <p>you can resend verification email in {seconds} seconds</p>
        <Button
          variant="contained"
          color="secondary"
          disabled={timer}
          onClick={resendEmail}
        >
          Resend Email to {email}
        </Button>
      </div>
    </div>
  );
};

function SignUpFormBase() {
  const history = useHistory();
  const {
    signup,
    generateUserDocument,
    signInWithGoogle,
    sendVerificationEmail,
    logout,
  } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState();
  const [isAdmin, setisAdmin] = useState(false);
  const [send, setSend] = useState(false);
  const [reSend, setReSend] = useState(false);
  const [timer, setTimer] = useState(true);
  const [seconds, setSeconds] = useState(60);
  setTimeout(() => {
    if (seconds > 0 && send) {
      setSeconds(seconds - 1);
    }
    if (seconds > 0 && reSend) {
      setSeconds(seconds - 1);
    }
  }, 1000);

  const onSubmit = async (e) => {
    e.preventDefault();

    await signup(email, passwordOne)
      .then((authUser) => {
        console.log(authUser, "authUser");
        generateUserDocument(email, passwordOne, username, isAdmin);
        sendVerificationEmail(email);
        console.log("verififcation email sent");
        setSend(true);
        setTimeout(() => {
          setTimer(!timer);
        }, 60000);

        // setEmail("");
        // setPasswordOne();
        // setPasswordTwo();
        // setUsername("");
        // history.push("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const resetForm = (e) => {
    e.preventDefault();
    setSend(!send);
    console.log("resetFOrm");
  };
  const resendEmail = (e) => {
    e.preventDefault();
    sendVerificationEmail(email);
    console.log("resent email");
    setTimer(!timer);
    setTimeout(() => {
      setTimer(true);
    }, 60000);
    setSeconds(60);
    setReSend(!reSend);
  };
  const isValid =
    passwordOne === passwordTwo &&
    passwordOne !== "" &&
    passwordTwo !== "" &&
    email !== "" &&
    username !== "";

  if (!send) {
    return (
      <>
        <div>
          <FormGroup>
            <Input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email Address"
            />
            <Input
              name="passwordOne"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Input
              name="passwordTwo"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            <label htmlFor="isAdmin">Admin: </label>
            <Checkbox
              name="isAdmin"
              value={isAdmin}
              onChange={(e) => setisAdmin(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={onSubmit}
              disabled={!isValid}
            >
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}
            <Button
              variant="contained"
              color="secondary"
              onClick={signInWithGoogle}
            >
              Sign In with Google
            </Button>
            {/* <Button
            variant="contained"
            color="secondary"
            onClick={signInWithFacebook}
          >
            Sign In with Facebook
          </Button> */}
            <Button variant="contained" color="secondary" onClick={logout}>
              logout
            </Button>
          </FormGroup>
        </div>
      </>
    );
  } else {
    return <VerificationEmailComponent />;
  }
}
export const SignUpForm = SignUpFormBase;

export default SignUpPage;

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
