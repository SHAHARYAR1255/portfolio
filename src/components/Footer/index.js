import React from "react";
import { Container, Icon, Popup } from "semantic-ui-react";

function Footer() {
  return (
    <Container background-color="red" textAlign="center">
      <p color="purple">POWERED BY SHAHARYAR MALIK</p>
      <Popup
        content="face book off"
        trigger={
          <Icon size="large" color="blue" bordered name="facebook official" />
        }
      ></Popup>
      <Popup
        content="instagram hanlde"
        trigger={
          <Icon size="large" color="blue" bordered name="instagram" />
        }
      ></Popup>{" "}
      <Popup
        content="email address"
        trigger={
          <Icon size="large" color="blue" bordered name="mail" />
        }
      ></Popup>
      <Popup
        content="linkedin handle"
        trigger={
          <Icon size="large" color="blue" bordered name="linkedin" />
        }
      ></Popup>
      
    </Container>
  );
}

export default Footer;
