import React from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";
import InputRupiah from "../../Sign_Up/FormFields/InputRupiah";

export default function FormPplAddTrx(props) {
  const {
    PplAddTrxFields: {
      usernamePenerima,
      kuantitasBawangKg,
      hargaBawangPerKg,
      // tanggalMasuk,
      teknikSorting,
      metodePengemasan,
    },
  } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBawangKg.name}
            label={kuantitasBawangKg.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputRupiah
            name={hargaBawangPerKg.name}
            label={hargaBawangPerKg.label}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={teknikSorting.name}
            label={teknikSorting.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={metodePengemasan.name}
            label={metodePengemasan.label}
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
