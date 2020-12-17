import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Firebase/context";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Checkbox,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";

function SignInPage() {
  const history = useHistory();
  const { login, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [error, setError] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, passwordOne)
      .then((authUser) => {
        console.log("login", authUser);
        console.log("current user", currentUser);
        if (currentUser.emailVerified) {
          history.push("/");
        } else {
          setError({
            ...error,
            message: "please verify your email address first  ",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/wrong-password") {
          err = { ...err, message: "Incorrect Password" };
        }
        if (err.code === "auth/user-not-found") {
          err = { ...err, message: "No User FOund! " };
        }
        setError(err);
      });
  };
  const isInvalid = email === "" || passwordOne === "";

  return (
    <div>
      <Grid centered columns={2}>
        <Grid.Column>
          <Header
            as="h2"
            textAlign="center"
            content="Sign In "
            style={{ marginBottom: "16px" }}
          ></Header>
          <Segment>
            <Form size="large">
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

              <Segment clearing>
                <Checkbox
                  verticalAlign="middle"
                  size="large"
                  floated="left"
                  label="Not a Robot"
                />
                <Button
                  floated="right"
                  color="blue"
                  size="large"
                  disabled={isInvalid}
                  onClick={onSubmit}
                >
                  Sign In
                </Button>
              </Segment>
            </Form>
          </Segment>
          {error && (
            <Message color="red">
              {error.message}
              {error.message === "please verify your email address first  " && (
                <Link to="/email-verify">
                  <b>
                    <i>
                      <h4>verify email</h4>
                    </i>
                  </b>
                </Link>
              )}
            </Message>
          )}
          <Message>
            Not registered yet? <Link to="/signUp">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default SignInPage;
