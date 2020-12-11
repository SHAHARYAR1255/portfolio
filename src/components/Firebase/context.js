import React, { useContext, useState, useEffect } from "react";
import { auth, db, GoogleProvider, FacebookProvider } from "./firebase";
import * as ROLES from "../../constants/roles";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const sendVerificationEmail = (email) => {
    auth.currentUser
      .sendEmailVerification({
        url: "http://localhost:3000",
      })
      .then(function () {
        console.log("email sent check your inbox");
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        console.log(window.localStorage.getItem("emailForSignIn"));
      })
      .catch(function (error) {
        console.log(error);
        // Some error occurred, you can inspect the code: error.code
      });
  };

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(GoogleProvider)
      .then((result) => {
        const token = result.credential.accessToken;
        console.log(token, "token");
        const user = result.user;
        console.log(user, "user");
        generateUserDocument(user.email, false, user.displayName);
        console.log(currentUser);
      })
      .catch((err) => setError(err));
  };
  const signInWithFacebook = () => {  
    auth
      .signInWithPopup(FacebookProvider)
      .then((result) => {
        const token = result.credential.accessToken;
        console.log(token, "token");
        const user = result.user;
        console.log(user, "user");
        generateUserDocument(user.email, false, user.displayName);
        console.log(currentUser);
      })
      .catch((err) => setError(err));
  };
  const generateUserDocument = (email, isAdmin, username) => {
    const roles = [ROLES.USER];
    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    db.collection("users").add({
      email,
      username,
      roles,
    });
  };

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        console.log(user);
        user = {
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        };
        console.log(user, "after");
      }
      console.log(null);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    generateUserDocument,
    signInWithGoogle,
    signInWithFacebook,
    sendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// import React from "react";
// const FirebaseContext = React.createContext(null);
// export const withFirebase = (Component) => (props) => (
//   <FirebaseContext.Consumer>
//     {(firebase) => <Component {...props} firebase={firebase} />}
//   </FirebaseContext.Consumer>
// );
// export default FirebaseContext;

// // import React, { Component, createContext } from "react";
// // import { auth } from "./firebase";

// // export const UserContext = createContext({ user: null });

// // class UserProvider extends Component {

// //   state = {
// //     user: null
// //   };

// //   // componentDidMount = async () => {
// //   // console.log('comp did mount');
// //   //   // auth.onAuthStateChanged(async userAuth => {
// //   //   //   const user = await generateUserDocument(userAuth);
// //   //   //   this.setState({ user });
// //   //   // });
// //   //   auth.onAuthStateChanged(async authUser =>{
// //   //     if(authUser){
// //   //       this.user(authUser.uid)
// //   //       .once('value')
// //   //       .then(snapshot =>{
// //   //         const dbUser = snapshot.val();
// //   //         if (!dbUser.roles) {
// //   //           dbUser.roles = [];
// //   //         }

// //   //         // merge auth and db user
// //   //         authUser = {
// //   //           uid: authUser.uid,
// //   //           email: authUser.email,
// //   //           emailVerified: authUser.emailVerified,
// //   //           providerData: authUser.providerData,
// //   //           ...dbUser,
// //   //         };

// //   //         next(authUser);
// //   //       })
// //   //     }else{
// //   //       fallback();
// //   //     }
// //   //   })
// //   // };
// //   render() {
// //     return (
// //       <UserContext.Provider value={this.state.user}>
// //         {this.props.children}
// //       </UserContext.Provider>
// //     );
// //   }
// // }
// // export default UserProvider;

// // //  onAuthUserListener = (next, fallback) =>
// // //     this.auth.onAuthStateChanged(authUser => {
// // //       if (authUser) {
// // //         this.user(authUser.uid)
// // //           .once('value')
// // //           .then(snapshot => {
// // //             const dbUser = snapshot.val();

// // //             // default empty roles
// // //             if (!dbUser.roles) {
// // //               dbUser.roles = [];
// // //             }

// // //             // merge auth and db user
// // //             authUser = {
// // //               uid: authUser.uid,
// // //               email: authUser.email,
// // //               emailVerified: authUser.emailVerified,
// // //               providerData: authUser.providerData,
// // //               ...dbUser,
// // //             };

// // //             next(authUser);
// // //           });
// // //       } else {
// // //         fallback();
// // //       }
// // //     });
