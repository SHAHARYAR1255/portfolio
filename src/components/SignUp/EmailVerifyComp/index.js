import React from "react";

function EmailVerifyComp({email}) {
    const [resend, setResend] = useState(false);
    const [timer, setTimer] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const { sendVerificationEmail } = useAuth();
    const history = useHistory();
    
    const resendEmail = (e) => {
        e.preventDefault();
        sendVerificationEmail(email);
        console.log("resent email");
        setTimer(!timer);
        setTimeout(() => {
          setTimer(true);
        }, 60000);
        setSeconds(60);
        setResend(!resend);
      };

  return (
    <div>
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
    </div>
  );
}

export default EmailVerifyComp;
