import React, { useState } from "react";
import { useAuth } from "../Firebase/context";
import { useHistory } from "react-router-dom";
import { VerificationEmailComponent } from "../SignUp";

function SignInPage() {
  const history = useHistory();
  const { login, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [error, setError] = useState();
  const [verificationComp, setVerificationComp] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, passwordOne)
      .then((authUser) => {
        console.log("login", authUser);
        if (currentUser.emailVerified) {
          history.push("/");
        } else {
          setError({
            ...error,
            message: "please verify your email address first",
          });
          setVerificationComp(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };
  const isInvalid = email === "" || passwordOne === "";
  if (verificationComp) {
    return <VerificationEmailComponent />;
  } else {
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <button type="submit" disabled={isInvalid}>
            Sign In
          </button>
          {error && <p>{error.message}</p>}
        </form>{" "}
      </div>
    );
  }
}
export default SignInPage;
