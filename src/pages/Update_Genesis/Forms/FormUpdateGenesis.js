import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

import useStyles from "../styles";

import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormUpdateGenesis(props) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = React.useState(0);

  const {
    UpdateGenesisFields: { kuantitasBenihKg },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {props.genesisList.map((genesis) => {
            return (
              <Card
                key={genesis.Key}
                className={
                  isSelected === genesis.Key ? classes.selected : classes.card
                }
              >
                <CardActionArea
                  onClick={() => {
                    props.setFieldValue("genesisID", genesis.Key);
                    props.setFieldValue("varietas", genesis.Record.varietas);

                    setIsSelected(genesis.Key);
                  }}
                >
                  <CardContent>
                    <Typography className={classes.title}>
                      {genesis.Record.varietas}
                    </Typography>
                    <Typography>
                      Aset saat ini : {genesis.Record.kuantitasBenihKg} Kg
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              // <Grid item xs={12}>
              //   <Button
              //     key={genesis.Key}
              //     variant="outlined"
              //     className={classes.card}
              //   >
              //     {genesis.Record.varietas}

              //     <Typography alignLeft marginTop={2}>
              //       {genesis.Record.kuantitasBenihKg}
              //     </Typography>
              //   </Button>
              // </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBenihKg.name}
            label={kuantitasBenihKg.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
