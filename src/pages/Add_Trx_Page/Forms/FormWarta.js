import React from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";
// import InputRupiah from "../../Sign_Up/FormFields/InputRupiah";

export default function FormWarta(props) {
  const {
    WartaFields: {
      noLayanan,
      tandaPendaftaranKapal,
      callSign,
      bendera,
      noVoyagge,
      jenisKapal,
      tahunPembuatan,
      noInmarsat,
      namaCSO,
      telpCSO,
      gtTon,
      dwtTon,
      loaMeter,
      lebarMeter,
      draftMaxMeter,
      drafDepanMeter,
      drafBelakangMeter,
      ketinggianUdaraMeter,
      domisiliKeagenan,
      jenisPelayaran,
      minimumSafeManning,
      tenagaPendorong,
      namaOperator,
      pjOperator,
      siupalOperator,
      alamatOperator,
      namaAgen,
      pjAgen,
      siupalAgen,
      alamatAgen,
      pelabuhanAsal,
      tanggalTiba,
      lokasiLabuh,
      tugBoat,
      jenisTrayek,
      noTrayek,
      lintasan,
    },
  } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputField name={noLayanan.name} label={noLayanan.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={tandaPendaftaranKapal.name}
            label={tandaPendaftaranKapal.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={callSign.name} label={callSign.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={bendera.name} label={bendera.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={noVoyagge.name} label={noVoyagge.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={jenisKapal.name}
            label={jenisKapal.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={tahunPembuatan.name}
            label={tahunPembuatan.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={noInmarsat.name}
            label={noInmarsat.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={namaCSO.name} label={namaCSO.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={telpCSO.name} label={telpCSO.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputKilogram name={gtTon.name} label={gtTon.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={dwtTon.name} label={dwtTon.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={loaMeter.name} label={loaMeter.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={lebarMeter.name}
            label={lebarMeter.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={draftMaxMeter.name}
            label={draftMaxMeter.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={drafDepanMeter.name}
            label={drafDepanMeter.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={drafBelakangMeter.name}
            label={drafBelakangMeter.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={ketinggianUdaraMeter.name}
            label={ketinggianUdaraMeter.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={domisiliKeagenan.name}
            label={domisiliKeagenan.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={jenisPelayaran.name}
            label={jenisPelayaran.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={minimumSafeManning.name}
            label={minimumSafeManning.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={tenagaPendorong.name}
            label={tenagaPendorong.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={namaOperator.name}
            label={namaOperator.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={pjOperator.name}
            label={pjOperator.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={siupalOperator.name}
            label={siupalOperator.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={alamatOperator.name}
            label={alamatOperator.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={namaAgen.name} label={namaAgen.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={pjAgen.name} label={pjAgen.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={siupalAgen.name}
            label={siupalAgen.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={alamatAgen.name}
            label={alamatAgen.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={pelabuhanAsal.name}
            label={pelabuhanAsal.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={tanggalTiba.name} label={telpCSO.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={lokasiLabuh.name}
            label={lokasiLabuh.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={tugBoat.name} label={tugBoat.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={jenisTrayek.name}
            label={jenisTrayek.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={noTrayek.name} label={noTrayek.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={lintasan.name} label={lintasan.label} fullWidth />
        </Grid>

        {/* <Grid item xs={12}>
          <InputRupiah
            name={hargaBenihPerKg.name}
            label={hargaBenihPerKg.label}
            fullWidth
          />
        </Grid> */}
        {/* <Grid item xs={12}>
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
        </Grid> */}
      </Grid>
    </div>
  );
}
