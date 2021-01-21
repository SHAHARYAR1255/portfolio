import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Firebase/context";

function PasswordForgetPage() {
  const { resetPassword } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(() => {
        console.log("resetPassword");
        history.push('/')
      })
      .catch(error =>{
          setError(error.message);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label for="text"> Email : </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" />
      </form>
      { error }
    </div>
  );
}

export default PasswordForgetPage;
