import React from "react";
import { Container, Icon, Popup, Header } from "semantic-ui-react";

function Footer() {
  return (
    <Container background-color="red" textAlign="center">
                <Header as="h1" color="red" background-color="black" textAlign="center"><b><i>Site In Making  </i></b></Header>

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
