import React, { useEffect } from "react";

import {
  Typography,
  Container,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";

import useStyles from "./styles";
import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";

import PermohonanFields from "./Form_Models/PermohonanModel";

import WartaFields from "./Form_Models/WartaModel";

import FormPermohonanWarta from "./Forms/FormPermohonanWarta";

import FormWarta from "./Forms/FormWarta";

import DialogConfirmation from "../../sections/Dialog_Confirmation";

const { PermohonanFormFields } = PermohonanFields;

const { WartaFormFields } = WartaFields;

function _renderStepContent(listType) {
  switch (listType) {
    case "permohonan":
      return (
        <FormPermohonanWarta PermohonanWartaFields={PermohonanFormFields} />
      );
    case "warta":
      return <FormWarta WartaFields={WartaFormFields} />;
    default:
  }
}

function AddTrx(props) {
  const classes = useStyles();
  const { listType } = props.match.params;
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isSelected, setIsSelected] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [modalContent, setModalContent] = React.useState([]);

  // const [asset, setAsset] = React.useState([]);
  // const [selectedAsset, setSelectedAsset] = React.useState([]);

  const rowsPermohonan = [
    createData("Diteruskan kepada", modalContent.usernamePenerima),
    createData("Jenis Warta", modalContent.wartaType),
    createData("Trayek", modalContent.trayek),
    createData("No. RPK/PKKA/PPKN", modalContent.noRPK),
  ];

  function createData(name, value) {
    return { name, value };
  }

  // const [prevID, setPrevID] = React.useState("");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    console.log(values, actions);
    setModalContent(values);
    setVisible(true);
  }
  function _handleSubmit(values, actions) {
    if (listType === "permohonan") {
      values.usernamePenerima = "Bidang LaLa";
    }

    _submitForm(values, actions);
    setIsLoading(false);
  }
  const initialValue = {
    usernamePenerima: "",
    // gtTon: 10,
  };
  useEffect(() => {
    setIsLoading(true);
    getUsername()
      .then((result) => {
        let stateCopy = user;
        stateCopy.username = result;
        setUser(stateCopy);
      })
      .finally(() => {
        getUserOrgName()
          .then((result) => {
            let stateCopy = user;
            stateCopy.orgName = result;
            setUser(stateCopy);
          })
          .finally(() => {
            if (listType === "permohonan") {
              setIsLoading(false);
            } else if (listType === "warta") {
              console.log("fetch all approved permohonan");
              setIsLoading(false);
            }
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
      <Container maxWidth="sm">
        <Typography variant="h6">Buat Dokumen</Typography>
        {listType === "permohonan" && (
          <Typography variant="h6">Permohonan Warta</Typography>
        )}
        {listType === "warta" && <Typography variant="h6">Warta</Typography>}
        {/* <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{user.orgName}</strong>
            </p>
          </Grid>
        </Grid> */}

        <Formik initialValues={initialValue} onSubmit={_handleSubmit}>
          {/* { values, setFieldValue } */}
          {() => (
            <Form>
              <>
                {_renderStepContent(listType)}

                <Button
                  className={classes.confirm}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Konfirmasi
                </Button>
              </>
              {user.orgName === "Agen Pelayaran" && (
                <DialogConfirmation
                  rows={rowsPermohonan}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Buat Dokumen Permohonan Warta"
                  fcnName="CreatePermohonanWarta"
                  user={user.username}
                />
              )}
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddTrx;
