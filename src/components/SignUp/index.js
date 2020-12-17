import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
// import {withFirebase} from '../Firebase/context';
// import { compose } from 'recompose';
import { useAuth } from "../Firebase/context";
// import * as Ons from "react-onsenui";
import {
  Button,
  Form,
  Grid,
  Header,
  Checkbox,
  Segment,
  Message,
} from "semantic-ui-react";

const SignUpPage = () => <SignUpFormBase />;

function SignUpFormBase() {
  const history = useHistory();
  const { signup, signInWithGoogle, sendVerificationEmail, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState();

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
        console.log(error);
        if(error.code === 'auth/email-already-in-use'){error = {...error , message: "User is Already Registered!"}}
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
    <Grid centered columns={2}>
      <Grid.Column>
        <Header
          as="h2"
          textAlign="center"
          content="Create your account"
          style={{ marginBottom: "16px" }}
        ></Header>
        <Segment>
          <Form size="large">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Display Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
            />

            <Segment clearing>
              <Checkbox size="large" floated="left" label="Not a Robot" />
              <Button
                floated="right"
                color="blue"
                size="large"
                disabled={!isValid}
                onClick={onSubmit}
              >
                Sign In
              </Button>
            </Segment>
          </Form>
        </Segment>
        {error && <Message color="red">{error.message}</Message>}
        <Message>
          Already registered ? <Link to="/signIn">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;

// export const SignUpLink = () => (
//   <p>
//     Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
//   </p>
// );
