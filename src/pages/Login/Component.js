import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../Sign_Up/FormFields/InputField";

import InputRadioField from "../Sign_Up/FormFields/InputRadioField";
import InputPasswordField from "../Sign_Up/FormFields/InputPasswordField";

import Meta from "components/Meta";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

function LoginPage(props) {
  const classes = useStyles();
  const refreshingLayout = props.refreshLayout;

  useEffect(() => {
    refreshingLayout();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta title="Login Page" description="Login Page" />
      <Container maxWidth="sm" className={classes.root}>
        <div className={classes.headline}>
          <Typography variant="h4" align="center">
            Halaman Login
          </Typography>
          <Typography variant="h4" align="center">
            Demo Blockchain Port
          </Typography>
        </div>

        <Formik
          initialValues={{ username: "", password: "", orgName: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username tidak boleh kosong";
            } else if (!values.password) {
              errors.password = "Password tidak boleh kosong";
            }
            return errors;
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              console.log(values);
              props.handleLogin(values);
            }, 500);
          }}
        >
          {({ submitForm, values }) => (
            <Form>
              <Grid>
                <Grid item xs={12}>
                  <InputField
                    className={classes.button}
                    name="username"
                    type="username"
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputPasswordField
                    className={classes.button}
                    name="password"
                    label="Password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputRadioField
                    name="orgName"
                    label="orgName"
                    title="Login sebagai :"
                    values={["Agen Pelayaran", "Bidang Lala", "Syahbandar"]}
                  />
                </Grid>
              </Grid>

              <Button
                className={classes.button}
                disabled={
                  values.password.length < 6 ||
                  values.username.length < 4 ||
                  values.orgName < 6
                }
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                Masuk
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/"
          className={classes.button}
        >
          kembali ke halaman awal
        </Button>
      </Container>
    </>
  );
}

export default LoginPage;
