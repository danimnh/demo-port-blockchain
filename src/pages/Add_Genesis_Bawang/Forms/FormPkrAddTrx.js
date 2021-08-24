import React from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import InputRupiah from "../../Sign_Up/FormFields/InputRupiah";
import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormPkrAddTrx(props) {
  const {
    PkrAddTrxFields: {
      varietas,
      kuantitasBenihKg,
      hargaBenihPerKg,
      umurBenih,
      umurPanen,
    },
  } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField name={varietas.name} label={varietas.label} fullWidth />
        </Grid>
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
      </Grid>
    </>
  );
}
