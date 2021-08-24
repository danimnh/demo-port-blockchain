import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputRadioField from "../FormFields/InputRadioField";

export default function FormUserJob(props) {
  const {
    formField: { orgName },
  } = props;

  return (
    <>
      <Typography style={{ marginBottom: 20, marginLeft: -10 }}>
        Informasi Pekerjaan
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputRadioField
            name={orgName.name}
            label={orgName.label}
            title=""
            values={["Penangkar", "Petani", "Pengumpul", "Pedagang"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
