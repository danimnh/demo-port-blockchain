import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";
import InputPasswordField from "../FormFields/InputPasswordField";

import DatePickerField from "../FormFields/DatePickerField";

export default function FormUserDetail(props) {
  const {
    formField: { nama, username, password, noHP, ttl },
  } = props;

  return (
    <>
      <Typography style={{ marginBottom: 20 }}>Input Data Pribadi</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField name={nama.name} label={nama.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            type="number"
            name={noHP.name}
            label={noHP.label}
            fullWidth
          />
        </Grid>
        {/* Username is generated */}
        <Grid item xs={12}>
          <InputField name={username.name} label={username.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputPasswordField
            name={password.name}
            label={password.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <DatePickerField
            name={ttl.name}
            label={ttl.label}
            format="dd/MM/yy"
            openTo="year"
            views={["year", "month", "date"]}
            disableFuture={true}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
