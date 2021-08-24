import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import moment from "moment";

import useStyles from "../styles";
import InputField from "../../Sign_Up/FormFields/InputField";

// import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormUpdateGenesis(props) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = React.useState(0);

  const {
    UpdateGenesisFields: { pupuk },
  } = props;

  return (
    <>
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
                    console.log(genesis);
                    props.setFieldValue("prevID", genesis.Key);
                    props.setFieldValue("varietas", genesis.Record.varietas);
                    props.setFieldValue(
                      "kuantitasBenihKg",
                      genesis.Record.kuantitasBenihKg
                    );

                    setIsSelected(genesis.Key);
                  }}
                >
                  <CardContent>
                    <Typography className={classes.title}>
                      {genesis.Record.varietas}
                    </Typography>
                    <Typography>
                      Pengirim : {genesis.Record.usernamePengirim}
                    </Typography>
                    <Typography>
                      Tanggal Transaksi :{" "}
                      {moment.unix(genesis.Record.createdAt).format("LLL")}
                    </Typography>
                    <Typography>
                      Kuantitas Benih : {genesis.Record.kuantitasBenihKg} Kg
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <InputField name={pupuk.name} label={pupuk.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
