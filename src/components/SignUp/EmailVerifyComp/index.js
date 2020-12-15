import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useAuth } from "../../Firebase/context";
import { useHistory } from "react-router-dom";

function EmailVerifyComp({ email }) {
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const { sendVerificationEmail, currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setTimer(!timer);
    }
  }, [seconds]);

  const resendEmail = (e) => {
    e.preventDefault();
    sendVerificationEmail(email);
    console.log("resent email");
    setTimer(!timer);
    setSeconds(60);
    setTimeout(() => {
      setTimer(!timer);
    }, 60000);
    setResend(!resend);
  };
  const resetForm = () => {
    history.push("/signUp");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {console.log("resend value", resend)}
          <h2>
            {!resend
              ? `Verification Email has sent to your email address ${currentUser.email}`
              : `Verification email is resent to ${currentUser.email}`}
          </h2>
          <Button variant="contained" color="secondary" onClick={resetForm}>
            change your email{" "}
          </Button>
          <p>you can resend verification email in {seconds} seconds</p>
          <Button
            variant="contained"
            color="secondary"
            disabled={!timer}
            onClick={resendEmail}
          >
            Resend Email to {email}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifyComp;
