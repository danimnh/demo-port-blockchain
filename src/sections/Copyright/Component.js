import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import { copyright } from "config";

import useStyles from "./styles";

function Copyright() {
  const classes = useStyles();

  return (
    <Box pb={2} pt={2}>
      <Typography
        className={classes.copyright}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {copyright.title}
        <Link color="inherit">{copyright.link}</Link> {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Copyright;
