import React from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";
import InputRupiah from "../../Sign_Up/FormFields/InputRupiah";

export default function FormPkrAddTrx(props) {
  const {
    PkrAddTrxFields: {
      usernamePenerima,
      kuantitasBenihKg,
      umurBenih,
      umurPanen,
      lamaPenyimpanan,
      hargaBenihPerKg,
    },
  } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBenihKg.name}
            label={kuantitasBenihKg.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputRupiah
            name={hargaBenihPerKg.name}
            label={hargaBenihPerKg.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={umurBenih.name} label={umurBenih.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={umurPanen.name} label={umurPanen.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={lamaPenyimpanan.name}
            label={lamaPenyimpanan.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={usernamePenerima.name}
            label={usernamePenerima.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}
