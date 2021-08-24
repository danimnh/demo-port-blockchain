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

import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormUpdateGenesis(props) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = React.useState(0);

  const {
    UpdateGenesisFields: {
      kuantitasBawangKg,
      ukuranUmbi,
      pestisida,
      kadarAirPersen,
      perlakuan,
      produktivitas,
    },
  } = props;

  return (
    <div>
      <Grid container spacing={1}>
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
                      Tanggal ditanam :{" "}
                      {moment.unix(genesis.Record.createdAt).format("LLL")}
                    </Typography>
                    <Typography>
                      Kuantitas Benih ditanam :{" "}
                      {genesis.Record.kuantitasBenihKg} Kg
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBawangKg.name}
            label={kuantitasBawangKg.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={ukuranUmbi.name}
            label={ukuranUmbi.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={pestisida.name} label={pestisida.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            type="number"
            name={kadarAirPersen.name}
            label={kadarAirPersen.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={perlakuan.name} label={perlakuan.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={produktivitas.name}
            label={produktivitas.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}
