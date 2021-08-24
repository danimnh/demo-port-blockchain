import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function FormUserValid(props) {
  const {
    formField: { noKK, noNPWP, nik },
  } = props;

  return (
    <>
      <Typography style={{ marginBottom: 20 }}>Input Data Identitas</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            name={noKK.name}
            label={noKK.label}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={noNPWP.name}
            label={noNPWP.label}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={nik.name}
            label={nik.label}
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
