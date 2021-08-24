import React, { useState, useEffect } from "react";
import { Container, Stepper, Step, StepLabel, Button } from "@material-ui/core";

import Meta from "components/Meta";

import { Formik, Form } from "formik";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import validationSchema from "./Forms/validationSchema";
import checkoutFormModel from "./Forms/checkoutFormModel";
import FormUserDetail from "./Forms/FormUserDetail";
import FormUserValid from "./Forms/FormUserValid";
import FormUserJob from "./Forms/FormUserJob";
import FormUserTypeDetail from "./Forms/FormUserTypeDetail";

const steps = [
  "Data Pribadi",
  "Data Kenegaraan",
  "Pekerjaan",
  "Informasi Pekerjaan",
];
const { formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <FormUserDetail formField={formField} />;
    case 1:
      return <FormUserValid formField={formField} />;
    case 2:
      return <FormUserJob formField={formField} />;
    case 3:
      return <FormUserTypeDetail formField={formField} />;
    case 4:
      return <h1>success</h1>;
    default:
  }
}

function SignUpPage(props) {
  const classes = useStyles();
  const refreshingLayout = props.refreshLayout;
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [validationController, setValidationController] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const nextStep = (values) => {
    setActiveStep(activeStep + 1);
    if (values.orgName === "Penangkar" || values.orgName === "Petani") {
      if (validationController === 2) {
        setValidationController(3);
      } else {
        setValidationController(validationController + 1);
      }
    } else if (
      values.orgName === "Pengumpul" ||
      values.orgName === "Pedagang"
    ) {
      if (validationController === 2) {
        setValidationController(4);
      } else {
        setValidationController(validationController + 1);
      }
    } else {
      setValidationController(validationController + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
    if (validationController === 3) {
      setValidationController(2);
    } else if (validationController === 4) {
      setValidationController(2);
    } else {
      setValidationController(validationController - 1);
    }
  };

  const currentValidationSchema = validationSchema[validationController];

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    props.handleSignUp(values);
    actions.setSubmitting(false);
    history.push("/login");
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      let stringValue = values;
      stringValue.noHP = values.noHP.toString();
      stringValue.luasLahanHa = parseFloat(values.luasLahanHa);
      // stringValue.noKK = values.noKK.toString();
      // stringValue.noNPWP = values.noNPWP.toString();
      // stringValue.nik = values.nik.toString();
      if (values.orgName === "Petani" || values.orgName === "Penangkar") {
        delete stringValue.alamatToko;
      } else if (
        values.orgName === "Pengumpul" ||
        values.orgName === "Pedagang"
      ) {
        delete stringValue.luasLahanHa;
        delete stringValue.alamatLahan;
        delete stringValue.kelompokTani;
      }
      _submitForm(stringValue, actions);
    } else {
      actions.setSubmitting(false);
      nextStep(values);
    }
  }

  function _handleBack() {
    prevStep();
  }
  useEffect(() => {
    refreshingLayout();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta title="Signup Page" description="Signup Page" />
      <Container maxWidth="sm" className={classes.root}>
        <Stepper className={classes.containerStep} activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <h1>SignUp Success</h1>
          ) : (
            <Formik
              initialValues={{
                nama: "",
                username: "",
                password: "",
                noHP: "",
                ttl: "",
                noKK: "",
                noNPWP: "",
                nik: "",
                orgName: "",
                luasLahanHa: "",
                alamatToko: "",
                alamatLahan: "",
                kelompokTani: "",
              }}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {_renderStepContent(activeStep)}

                  <div className={classes.center}>
                    {activeStep === 0 && (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        component={RouterLink}
                        to="/"
                      >
                        Back
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={_handleBack}
                      >
                        Back
                      </Button>
                    )}
                    <div>
                      <Button
                        className={classes.button}
                        disabled={
                          // !(isValid && dirty) && !validStep
                          isSubmitting
                        }
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        {isLastStep ? "Konfirmasi" : "Next"}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </>
      </Container>
    </>
  );
}

export default SignUpPage;
