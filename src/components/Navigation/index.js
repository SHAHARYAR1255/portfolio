import _ from "lodash";
import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";

// const NavBarMobile = ({
//   children,
//   leftItems,
//   onPusherClick,
//   onToggle,
//   rightItems,
//   visible,
// }) => (
//   <Sidebar.Pushable>
//     <Sidebar
//       as={Menu}
//       animation="overlay"
//       icon="labeled"
//       inverted
//       items={leftItems}
//       vertical
//       visible={visible}
//     />
//     <Sidebar.Pusher
//       dimmed={visible}
//       onClick={onPusherClick}
//       style={{ minHeight: "100vh" }}
//     >
//       <Menu fixed="top" inverted>
//         <Menu.Item>
//           <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
//         </Menu.Item>
//         <Menu.Item onClick={onToggle}>
//           <Icon name="sidebar" />
//         </Menu.Item>
//         <Menu.Menu position="right">
//           {_.map(rightItems, (item) => (
//             <Menu.Item {...item} />
//           ))}
//         </Menu.Menu>
//       </Menu>
//       {children}
//     </Sidebar.Pusher>
//   </Sidebar.Pushable>
// );

const NavBarDesktop = ({ leftItems, rightItems }) => {
  const history = useHistory();
  return (
    <Menu fixed="top" inverted>
      <Menu.Item>
        <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>
      {_.map(leftItems, item => <Menu.Item {...item} onClick={() => history.push(item.click)} />)}
      
      <Menu.Menu position="right">
        {_.map(rightItems, (item) => (
          <Menu.Item {...item} onClick={() => history.push(item.click)} />
        ))}
      </Menu.Menu>
    </Menu>
  );
};
const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class NavBar extends Component {
  // state = {
  //   visible: false,
  // };

  // handlePusher = () => {
  //   const { visible } = this.state;

  //   if (visible) this.setState({ visible: false });
  // };

  // handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, leftItems, rightItems } = this.props;
    // const { visible } = this.state;

    return (
      <div>
        {/* <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile> */}
        {/* <Responsive minWidth={Responsive.onlyTablet.minWidth}> */}
        <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
        <NavBarChildren>{children}</NavBarChildren>
        {/* </Responsive> */}
      </div>
    );
  }
}
const leftItems = [
  { as: "a", content: "Home", key: "home", click:"/home" },
  { as: "a", content: "Account", key: "users", click:'/account' },
  { as: "a", content: "Repos", key: "feature", click:'/landing' },
];
const rightItems = [
  { as: "a", content: "Sign In", key: "login", click:"/signIn" },
  { as: "a", content: "Sign Up", key: "register",  click:"/signUp" },
  { as: "a", content: "Forgot Password", key: "forget",  click:"/pw-forget" },
];

const App = () => (
  <>
  <NavBar leftItems={leftItems} rightItems={rightItems}>
    {/* <Image src="https://react.semantic-ui.com/assets/images/wireframe/paragraph.png" /> */}
  </NavBar>
  </>
);

export default App;
