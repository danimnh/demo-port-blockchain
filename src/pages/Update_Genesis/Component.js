import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Typography,
  Container,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";
import getUsername from "../../constants/GetUsername";
import fetchAllGenesis from "../../constants/fetchAllGenesis";
import useStyles from "./styles";
import DialogConfirmation from "../../sections/Dialog_Confirmation";
import UpdateGenesisFields from "./Form_Models/UpdateGenesisModels";
import FormUpdateGenesis from "./Forms/FormUpdateGenesis";

const { UpdateGenesisFormFields } = UpdateGenesisFields;

function Update_Genesis() {
  const classes = useStyles();
  const [user, setUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [genesisList, setGenesisList] = React.useState([]);

  function createData(name, value) {
    return { name, value };
  }

  const rowsGenesis = [
    createData("Varietas", modalContent[2]),
    createData("Penambahan Kuantitas", modalContent[1] + " Kg"),
  ];

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
    let args = [values.genesisID, values.kuantitasBenihKg, values.varietas];
    _submitForm(args, actions);
  }

  useEffect(() => {
    getUsername().then((result) => {
      setIsLoading(true);
      setUser(result);
      fetchAllGenesis(result).then((result) => {
        let sorted = result;
        const after = sorted.sort((a, b) =>
          a.Record.kuantitasBenihKg > b.Record.kuantitasBenihKg ? -1 : 1
        );
        setGenesisList(after);
        setIsLoading(false);
      });
    });

    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}

      <Meta title="Add_Transaction" description="Add_Transaction" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Tambah Kuantitas Benih</Typography>
        {genesisList.length === 0 ? (
          <>
            <p>Anda belum memiliki aset Benih.</p>
            <Button
              variant="outlined"
              component={RouterLink}
              color="primary"
              to="/add_genesis"
              className={classes.button}
            >
              Registrasi Benih Baru
            </Button>
          </>
        ) : (
          <>
            <Formik
              initialValues={{
                genesisID: "",
                kuantitasBenihKg: "",
                varietas: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.genesisID) {
                  errors.varietas = "Varietas tidak boleh kosong";
                } else if (!values.kuantitasBenihKg) {
                  errors.kuantitasBenihKg = "Kuantitas tidak boleh kosong";
                }
                return errors;
              }}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting, dirty, isValid, setFieldValue }) => (
                <Form>
                  <FormUpdateGenesis
                    UpdateGenesisFields={UpdateGenesisFormFields}
                    genesisList={genesisList}
                    setFieldValue={setFieldValue}
                  />
                  <div className={classes.center}>
                    <Button
                      className={classes.confirm}
                      disabled={!(isValid && dirty) || isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Tambah Kuantitas Benih
                    </Button>
                  </div>
                  <DialogConfirmation
                    rows={rowsGenesis}
                    isVisible={visible}
                    modalContent={modalContent}
                    handleClose={() => {
                      setVisible(false);
                    }}
                    dialogTitle="Tambah Kuantitas Benih"
                    fcnName="AddBenihKuantitasByID"
                    user={user}
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
      </Container>
    </>
  );
}

export default Update_Genesis;
