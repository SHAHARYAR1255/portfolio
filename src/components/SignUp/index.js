import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
// import {withFirebase} from '../Firebase/context';
// import { compose } from 'recompose';
import { useAuth } from "../Firebase/context";
// import * as Ons from "react-onsenui";
import EmailVerifyComp from "./EmailVerifyComp";
import { Button, Form, Grid, Header } from "semantic-ui-react";

const SignUpPage = () => <SignUpFormBase />;
// export const VerificationEmailComponent = ({resendEmail,reSend, timer, seconds, email, resetForm, }) => {
//   return (
//     <div className="container">
//       <div className="row">
//         {console.log("resend value", reSend)}
//         <h2>
//           {!reSend
//             ? `Verification Email has sent to your email address ${email}`
//             : `Verification email is resent to ${email}`}
//         </h2>
//         <Button variant="contained" color="secondary" onClick={resetForm}>
//           change your email{" "}
//         </Button>
//         <p>you can resend verification email in {seconds} seconds</p>
//         <Button
//           variant="contained"
//           color="secondary"
//           disabled={timer}
//           onClick={resendEmail}
//         >
//           Resend Email to {email}
//         </Button>
//       </div>
//     </div>
//   );
// };

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

  const onSubmit = async (e) => {
    e.preventDefault();

    await signup(email, passwordOne)
      .then(async (authUser) => {
        console.log(authUser, "authUser");
        // await generateUserDocument(email, passwordOne, username, isAdmin);
        await sendVerificationEmail(email);
        console.log("verififcation email sent");
        history.push("/verify-email");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const isValid =
    passwordOne === passwordTwo &&
    passwordOne !== "" &&
    passwordTwo !== "" &&
    email !== "" &&
    username !== "";

  return (
    <>
      {/* <FormGroup>
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

          <Button variant="contained" color="secondary" onClick={logout}>
            logout
          </Button>
        </FormGroup> */}
      <Container>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Header
              as="h2"
              textAlign="center"
              image="/assets/logo_square.svg"
              content="Create your account"
              style={{ marginBottom: "32px" }}
            />
            <Form size="large" textAlign="center" verticalAlign="middle">
              {/* <Form.Group widths="equals"> */}
              <Form.Input
                width={6}
                textAlign="center"
                icon="user"
                iconPosition="left"
                placeholder="Display name"
              />
              {/* </Form.Group> */}
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button
                type="submit"
                color="purple"
                center
                size="large"
                style={{ marginBottom: "32px" }}
              >
                Sign up
              </Button>
            </Form>
            <p>
              Already a member? <Link to="/login">Sign in</Link>
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default SignUpPage;

// export const SignUpLink = () => (
//   <p>
//     Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
//   </p>
// );
