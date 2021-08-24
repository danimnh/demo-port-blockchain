import React from "react";
import { useFormikContext } from "formik";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function FormUserTypeDetail(props) {
  const {
    formField: { luasLahanHa, alamatToko, alamatLahan, kelompokTani },
  } = props;
  const { values: formValues } = useFormikContext();
  return (
    <>
      <Typography style={{ marginBottom: 20 }}>
        Input Informasi Pekerjaan
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <p>Info {formValues.orgName}</p>
          {formValues.orgName === "Petani" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  name={luasLahanHa.name}
                  label={luasLahanHa.label}
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name={alamatLahan.name}
                  label={alamatLahan.label}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name={kelompokTani.name}
                  label={kelompokTani.label}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

          {formValues.orgName === "Penangkar" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  name={luasLahanHa.name}
                  label={luasLahanHa.label}
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  name={alamatLahan.name}
                  label={alamatLahan.label}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name={kelompokTani.name}
                  label={kelompokTani.label}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

          {formValues.orgName === "Pengumpul" && (
            <>
              <InputField
                name={alamatToko.name}
                label={alamatToko.label}
                multiline
                rows={4}
                fullWidth
              />
            </>
          )}

          {formValues.orgName === "Pedagang" && (
            <>
              <InputField
                name={alamatToko.name}
                label={alamatToko.label}
                multiline
                rows={4}
                fullWidth
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
