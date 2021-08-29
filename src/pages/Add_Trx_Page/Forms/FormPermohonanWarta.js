import React from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import SelectionField from "../../Sign_Up/FormFields/SelectionField";

export default function FormPermohonanWarta(props) {
  const {
    PermohonanWartaFields: { trayek, wartaType, noRPK },
  } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SelectionField
            name={wartaType.name}
            label={wartaType.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={trayek.name} label={trayek.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={noRPK.name} label={noRPK.label} fullWidth />
        </Grid>
      </Grid>
    </div>
  );
}
