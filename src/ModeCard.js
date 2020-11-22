import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TitleOutlined, TitleRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 'auto',
    borderRadius: '40px'
  },
  media: {
    height: 340,
  },
});

export default function ModeCard({title, imgSrc}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgSrc}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
