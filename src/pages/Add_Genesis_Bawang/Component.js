import React, { useEffect } from "react";
import NumberFormat from "react-number-format";

import {
  Grid,
  Typography,
  Container,
  Button,
  // Card,
  // CardContent,
  // CardActionArea,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";

import useStyles from "./styles";
import DialogConfirmation from "../../sections/Dialog_Confirmation";
import PkrAddTrxFields from "./Form_Models/PkrAddTrxModels";
import FormPkrAddTrx from "./Forms/FormPkrAddTrx";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
// todo : do this next
function _renderStepContent() {
  return <FormPkrAddTrx PkrAddTrxFields={PkrAddTrxFormFields} />;
}

function Add_Genesis(props) {
  const classes = useStyles();
  const [modalContent, setModalContent] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  function createData(name, value) {
    return { name, value };
  }

  const rowsGenesis = [
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBenihKg + " Kg"),
    createData(
      "Harga Benih",
      <NumberFormat
        displayType="text"
        value={modalContent.hargaBenihPerKg}
        decimalSeparator={","}
        thousandSeparator={"."}
        isNumericString
        prefix="Rp. "
      />
    ),
    createData("Umur Benih", modalContent.umurBenih + " Hari"),
    createData("Umur Panen", modalContent.umurPanen + " Hari"),
  ];

  const refreshingLayout = props.refreshLayout;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    setModalContent(values);
    setVisible(true);
    actions.setSubmitting(false);
  }
  function _handleSubmit(values, actions) {
    values.hargaBenihPerKg = parseInt(values.hargaBenihPerKg);
    console.log(values);
    _submitForm(values, actions);
  }
  useEffect(() => {
    refreshingLayout();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta title="Add_Transaction" description="Add_Transaction" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Registrasi Benih Baru</Typography>
        <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{props.user.orgName}</strong>
            </p>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            varietas: "",
            kuantitasBenihKg: "",
            hargaBenihPerKg: "",
            umurBenih: "",
            umurPanen: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.varietas) {
              errors.varietas = "Varietas tidak boleh kosong";
            } else if (!values.kuantitasBenihKg) {
              errors.kuantitasBenihKg = "Kuantitas tidak boleh kosong";
            } else if (!values.hargaBenihPerKg) {
              errors.hargaBenihPerKg = "Harga Benih tidak boleh kosong";
            } else if (Number(values.hargaBenihPerKg) === 0) {
              errors.hargaBenihPerKg = "Harga Benih tidak boleh kosong";
            } else if (!values.umurBenih) {
              errors.umurBenih = "Umur Benih tidak boleh kosong";
            } else if (!values.umurPanen) {
              errors.umurPanen = "Umur Panen tidak boleh kosong";
            }
            return errors;
          }}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              {_renderStepContent(props.user.memberType)}
              {/* TO-DO : Confirmation Popup */}
              <div className={classes.center}>
                <Button
                  className={classes.confirm}
                  disabled={!(isValid && dirty) || isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Registrasi Benih
                </Button>
              </div>
              <DialogConfirmation
                rows={rowsGenesis}
                isVisible={visible}
                modalContent={modalContent}
                handleClose={() => {
                  setVisible(false);
                }}
                dialogTitle="Tambah Benih Baru"
                fcnName="CreateBenih"
                user={props.user.username}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default Add_Genesis;
