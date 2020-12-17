import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { Header, Segment, Image } from "semantic-ui-react";

export default function HomePage() {
  // const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  // //   const handleChange = (event) => {
  // //     setSpacing(Number(event.target.value));
  // //   };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    };
    fetchProjects();
  }, []);

  return (
    // <Grid container className={classes.root} spacing={5}>
    //   <Grid item xs={12}>
    //     <Grid container justify="center" spacing={9}>
    //       { maal.map((value) => (
    //         <Grid key={value.id} item>
    //           {/* <Paper variant="outlined" className={classes.paper} /> */}
    //           <Card className={classes.root}>
    //             <CardHeader />
    //             <CardMedia />
    //             <CardContent>
    //               <Typography
    //                 className={classes.title}
    //                 color="textSecondary"
    //                 gutterBottom
    //               >
    //                 {value.name}{" "}
    //               </Typography>
    //               <Typography variant="h5" component="h2">
    //                 be{bull}nev{bull}o{bull}lent
    //               </Typography>
    //               <Typography className={classes.pos} color="textSecondary">
    //                 adjective
    //               </Typography>
    //               <Typography variant="body2" component="p">
    //                 well meaning and kindly.
    //                 <br />
    //                 {'"a benevolent smile"'}
    //               </Typography>
    //             </CardContent>
    //             <CardActions>
    //               <Button size="small">Learn More</Button>
    //             </CardActions>
    //           </Card>
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Grid>
    // </Grid>
    loading ? (
      <Segment loading>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment>
    ) : (
      <div className="ui container">
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
                    <img src={maa.image} />
                  </div>
                  <div class="content">
                    <a class="header">{maa.name}</a>
                    <div class="meta">
                      <span class="date">{maa.link}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="ui container"></div>
      </div>
    )
  );
}
