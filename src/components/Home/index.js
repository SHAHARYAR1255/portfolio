import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import {Grid, Header, Segment, Image } from "semantic-ui-react";

export default function HomePage() {
  // const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  // //   const handleChange = (event) => {
  // //     setSpacing(Number(event.target.value));
  // //   };
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [maal, setMaal] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const project = await db.collection("projects");
        const projects = await project.get();
        const mal = [];
        if (!projects.empty) {
          projects.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            mal.push(doc.data());
            return;
          });
          setMaal(mal);
          setLoading(false);
          console.log(maal, "maala");
        }
        console.log(projects);
      } catch {}
    }
    fetchProjects();
  }, [maal]);

  return (  
    loading ? (
      <Segment loading>
      <Image src='https://react.semantic-ui.comhttps://firebasestorage.googleapis.com/v0/b/roadtofirebase-ae0cc.appspot.com/o/drawkit-server-woman-monochrome-400px.png?alt=media&token=4f5a43b4-eb8f-402a-a928-c512f4325168' />
    </Segment>
    ) : (
      <div className="ui container">
          <Header as="h1" color="red" background-color="black" textAlign="center"><b><i>Site In Making  </i></b></Header>
        <Header textAlign="center" as="h1" color="purple">
          My Projects
        </Header>
        <div className="ui cards">
          {console.log("container")}
          {maal &&
            maal.map((maa, index) => {
              //   console.log("card");
              return (
                <div key={index} class="card">
                  <div class="blurring dimmable image">
                    <img src={maa.image} alt={maa.name} />
                  </div>
                  <div class="content">
                    <a href={maa.link} class="header">{maa.name}</a>
                    <div class="meta">
                      <span class="date"><a href={maa.link}>{maa.link}</a></span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <hr />
        
        <Grid>
    <Grid.Row>
      <Grid.Column textAlign="center" verticalAlign="middle" width={8}>
          <Header as='h2' image='/images/icons/school.png' content='Learn More' />
      </Grid.Column>
      <Grid.Column width={8}>
        <Image src='https://firebasestorage.googleapis.com/v0/b/roadtofirebase-ae0cc.appspot.com/o/drawkit-server-woman-monochrome-400px.png?alt=media&token=4f5a43b4-eb8f-402a-a928-c512f4325168' />
      </Grid.Column>
    </Grid.Row>

  
  </Grid>
      </div>
    )
  );
}
