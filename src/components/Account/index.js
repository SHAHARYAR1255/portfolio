import React, { useEffect } from "react";
import { useAuth } from "../Firebase/context";
import { Button, Box } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import { db } from "../Firebase/firebase";

export const AccountProtection = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <AccountPage />;
  } else {
    return <Redirect to="/signIn" />;
  }
};
function AccountPage() {
  const history = useHistory();
  const { currentUser, generateUserDocument } = useAuth();

  const { displayName, email, emailVerified } = currentUser;

  console.log(emailVerified);
  const fetchUser = async (ev, email, displayName) => {
    if (ev) {
      console.log("2");
      const citiesRef = await db.collection("users");
      const snapshot = await citiesRef.where("email", "==", email).get();
      if (snapshot.empty) {
        console.log("3");
        console.log("No matching documents.");
        return generateUserDocument(email, false, displayName);
      }

      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        return;
      });
      // console.log(snapshot , 'snapshot');
    } else {
      alert("verify your email first");
      history.push("/");
    }
  };
  useEffect(() => {
    fetchUser(emailVerified, email, displayName);
  });
  return (
    <Box component="span" m={1}>
      <h3>{<p>displayName : </p> && displayName}</h3>
      <h3>{<p>email : </p> && email}</h3>
      <h3>{!emailVerified && <p>email not verified</p>}</h3>
      <h3>{emailVerified && <p>email verified</p>}</h3>
    </Box>
  );
}

export default AccountPage;
