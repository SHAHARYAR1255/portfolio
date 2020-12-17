import {
  Header,
  Menu,
  Icon,
  Segment,
  Table,
  TableBody,
  Container,
  Image,
  Label,
  Divider,
} from "semantic-ui-react";
import React, { useEffect, useState } from "react";

function LandingPage() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useEffect");
    const fetchRepos = async () => {
      setLoading(true);
      await fetch("https://api.github.com/users/SHAHARYAR1255/repos")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "data");
          setData(data);
          setLoading(false);
          console.log("loading ", loading);
        })
        .catch((err) => {
          setError(err);
          console.log(err, "err");
        });
    };

    fetchRepos();
  }, []);

  return (
    <div>
      <Header as='h2'>GitHub Repositories</Header>
      <Divider />
      {!loading ? (
        <Container>
          <Table color="blue" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Language</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Url</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <ShowDetails data={data} />
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      ) : (
        // </div>
        <Segment loading>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      )}
    </div>
  );
}

export default LandingPage;

const ShowDetails = ({ data }) => {
  console.log(data, "data showDetails");
  if (data !== undefined || null) {
    return (
      <TableBody>
        {data.map((da) => {
          return (
            <Table.Row>
              <Table.Cell>
                <Label ribbon>{da.name}</Label>
              </Table.Cell>
              <Table.Cell>{da.language}</Table.Cell>
              <Table.Cell>
                <a  href={da.html_url} target="blank">{da.html_url}</a>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </TableBody>
    );
  } else {
    return (
      <TableBody>
        <Segment loading>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </TableBody>
    );
  }
};
