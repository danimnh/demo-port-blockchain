import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import NumberFormat from "react-number-format";

import {
  Grid,
  Typography,
  Container,
  Button,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";

import useStyles from "./styles";
import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";
import getUserAlamat from "../../constants/GetUserAlamat";

import fetchAllGenesis from "../../constants/fetchAllGenesis";
import fetchAllAssets from "../../constants/fetchAllAssets";

import fetchAllAssetsPetani from "../../constants/fetchAllAssetsPetani";

import PkrAddTrxFields from "./Form_Models/PkrAddTrxModels";
import PtnAddTrxFields from "./Form_Models/PtnAddTrxModels";
import PplAddTrxFields from "./Form_Models/PplAddTrxModels";

import FormPkrAddTrx from "./Forms/FormPkrAddTrx";
import FormPtnAddTrx from "./Forms/FormPtnAddTrx";
import FormPplAddTrx from "./Forms/FormPplAddTrx";

import DialogConfirmation from "../../sections/Dialog_Confirmation";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
const { PtnAddTrxFormFields } = PtnAddTrxFields;
const { PplAddTrxFormFields } = PplAddTrxFields;

function _renderStepContent(orgName) {
  switch (orgName) {
    case "Penangkar":
      return <FormPkrAddTrx PkrAddTrxFields={PkrAddTrxFormFields} />;
    case "Petani":
      return <FormPtnAddTrx PtnAddTrxFields={PtnAddTrxFormFields} />;
    case "Pengumpul":
      return <FormPplAddTrx PplAddTrxFields={PplAddTrxFormFields} />;
    case "Pedagang":
      return <h1>Pedagang</h1>;
    case "admin":
      return <h1>admin</h1>;
    default:
  }
}

function AddTrx() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [modalContent, setModalContent] = React.useState([]);

  const [asset, setAsset] = React.useState([]);
  const [selectedAsset, setSelectedAsset] = React.useState([]);

  const rowsPenangkar = [
    createData("Username Penerima", modalContent.usernamePenerima),
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
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan + " Hari"),
  ];

  const rowsPetani = [
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBawangKg + " Kg"),
    createData(
      "Harga Bawang",
      <NumberFormat
        displayType="text"
        value={modalContent.hargaBawangPerKg}
        decimalSeparator={","}
        thousandSeparator={"."}
        isNumericString
        prefix="Rp. "
      />
    ),
    createData(
      "Tanggal Tanam",
      moment.unix(selectedAsset.tanggalTanam).format("LLL")
    ),
    createData(
      "Tanggal Panen",
      moment.unix(selectedAsset.tanggalPanen).format("LLL")
    ),

    createData("Ukuran Umbi", selectedAsset.ukuranUmbi),
    createData("Pupuk", selectedAsset.pupuk),
    createData("Pestisida", selectedAsset.pestisida),
    createData("Kadar Air (%)", selectedAsset.kadarAirPersen + " %"),
    createData("Perlakuan", selectedAsset.perlakuan),
    createData("Produktivitas", selectedAsset.produktivitas),
  ];

  const rowsPengumpul = [
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBawangKg + " Kg"),
    createData(
      "Harga Bawang",
      <NumberFormat
        displayType="text"
        value={modalContent.hargaBawangPerKg}
        decimalSeparator={","}
        thousandSeparator={"."}
        isNumericString
        prefix="Rp. "
      />
    ),
    createData(
      "Tanggal Masuk",
      moment.unix(selectedAsset.tanggalMasuk).format("LLL")
    ),
    // createData("Alamat Gudang", modalContent.alamatGudang),
    createData("Teknik Sorting", modalContent.teknikSorting),
    createData("Metode Pengemasan", modalContent.metodePengemasan),
  ];

  function createData(name, value) {
    return { name, value };
  }

  const [prevID, setPrevID] = React.useState("");

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
    if (user.orgName === "Penangkar") {
      values.hargaBenihPerKg = parseInt(values.hargaBenihPerKg);
      values.varietas = selectedAsset.varietas;
      values.usernamePengirim = user.username;
    } else if (user.orgName === "Petani") {
      values.hargaBawangPerKg = parseInt(values.hargaBawangPerKg);
      values.varietas = asset[0].Record.varietas;
      values.usernamePengirim = user.username;
    } else if (user.orgName === "Pengumpul") {
      values.hargaBawangPerKg = parseInt(values.hargaBawangPerKg);
      values.varietas = asset[0].Record.varietas;
      values.usernamePengirim = user.username;
      values.tanggalMasuk = asset[0].Record.tanggalMasuk;
    } else if (user.orgName === "Pedagang") {
      values.hargaBawangPerKg = parseInt(values.hargaBawangPerKg);
      values.varietas = asset[0].Record.varietas;
      values.usernamePengirim = user.username;
    }

    getUserAlamat(values.usernamePengirim)
      .then((result) => (values.alamatPengirim = result))
      .finally(
        getUserAlamat(values.usernamePenerima)
          .then((result) => (values.alamatPenerima = result))
          .finally(() => {
            _submitForm(values, actions);
            setIsLoading(false);
          })
      );
  }
  const initialValue = {
    prevID: "",
    usernamePenerima: "",
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
            if (user.orgName === "Penangkar") {
              fetchAllGenesis(user.username).then((result) => {
                let sorted = result;
                const after = sorted.sort((a, b) =>
                  a.Record.kuantitasBenihKg > b.Record.kuantitasBenihKg ? -1 : 1
                );
                setAsset(after);
                setIsLoading(false);
              });
            } else if (user.orgName === "Pedagang") {
              setIsLoading(false);
            } else if (user.orgName === "Petani") {
              fetchAllAssetsPetani(user.username, "Pengirim", false).then(
                (result) => {
                  let sorted = result;
                  const after = sorted.sort((a, b) =>
                    a.Record.kuantitasBawangKg > b.Record.kuantitasBawangKg
                      ? -1
                      : 1
                  );
                  setAsset(after);
                  setIsLoading(false);
                }
              );
            } else {
              fetchAllAssets(user.username, "Penerima", true).then((result) => {
                let sorted = result;
                const after = sorted.sort((a, b) =>
                  a.Record.createdAt > b.Record.createdAt ? -1 : 1
                );
                setAsset(after);
                setIsLoading(false);
              });
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
        <Typography variant="h6">Tambah Transaksi</Typography>
        <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{user.orgName}</strong>
            </p>
          </Grid>
        </Grid>

        <Formik initialValues={initialValue} onSubmit={_handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              {values.prevID === "" &&
                asset.map((asset) => {
                  return (
                    <Card
                      key={asset.Key}
                      className={
                        isSelected === asset.Key
                          ? classes.selected
                          : classes.card
                      }
                    >
                      <CardActionArea
                        onClick={() => {
                          console.log(asset);
                          setPrevID(asset.Key);
                          setSelectedAsset(asset.Record);
                          setIsSelected(asset.Key);
                        }}
                      >
                        <CardContent>
                          <Typography className={classes.title}>
                            {asset.varietas}
                          </Typography>

                          {user.orgName === "Penangkar" ? (
                            <>
                              <Typography className={classes.title}>
                                {asset.Record.varietas}
                              </Typography>
                              <Typography>
                                Aset saat ini : {asset.Record.kuantitasBenihKg}{" "}
                                Kg
                              </Typography>
                            </>
                          ) : user.orgName === "Petani" ? (
                            <>
                              <Typography className={classes.title}>
                                {asset.Record.varietas}
                              </Typography>
                              <Typography>
                                Kuantitas Bawang :{" "}
                                {asset.Record.kuantitasBawangKg} Kg
                              </Typography>
                              <Typography>
                                Tanggal Tanam :{" "}
                                {moment
                                  .unix(asset.Record.tanggalTanam)
                                  .format("LLL")}
                              </Typography>
                              <Typography>
                                Tanggal Panen :{" "}
                                {moment
                                  .unix(asset.Record.tanggalPanen)
                                  .format("LLL")}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography className={classes.title}>
                                {asset.Record.varietas}
                              </Typography>
                              <Typography>
                                Tanggal Pengiriman :{" "}
                                {moment
                                  .unix(asset.Record.createdAt)
                                  .format("LLL")}
                              </Typography>
                              <Typography>
                                Kuantitas Bawang :{" "}
                                {asset.Record.kuantitasBawangKg} Kg
                              </Typography>

                              <Typography>
                                Pengirim : {asset.Record.usernamePengirim}
                              </Typography>
                            </>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}

              {asset.length === 0 ? (
                <>
                  <p>Anda tidak memiliki aset</p>
                  <Button
                    className={classes.confirm}
                    component={RouterLink}
                    to="/"
                    variant="contained"
                    color="primary"
                  >
                    Kembali ke halaman awal
                  </Button>
                </>
              ) : (
                <>
                  {values.prevID === "" ? (
                    <Button
                      onClick={() => {
                        setFieldValue("prevID", prevID);
                      }}
                      className={classes.confirm}
                      variant="contained"
                      color="primary"
                      // type="submit"
                    >
                      Pilih Aset
                    </Button>
                  ) : (
                    <>
                      <Card
                        className={
                          isSelected === selectedAsset.Key
                            ? classes.card
                            : classes.selected
                        }
                      >
                        <CardActionArea
                          onClick={() => {
                            setIsSelected("");
                            setFieldValue("prevID", "");
                          }}
                        >
                          <CardContent>
                            <Typography className={classes.title}>
                              <strong>{selectedAsset.varietas}</strong>
                            </Typography>

                            {user.orgName === "Penangkar" ? (
                              <Typography>
                                Aset saat ini : {selectedAsset.kuantitasBenihKg}{" "}
                                Kg
                              </Typography>
                            ) : (
                              <>
                                <Typography>
                                  Kuantitas Bawang :{" "}
                                  {selectedAsset.kuantitasBawangKg} Kg
                                </Typography>
                              </>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </Card>

                      {values.prevID !== "" && _renderStepContent(user.orgName)}

                      <Button
                        className={classes.confirm}
                        disabled={
                          values.usernamePenerima === "" ||
                          values.kuantitasBenihKg === ""
                        }
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Konfirmasi
                      </Button>
                    </>
                  )}
                </>
              )}
              {user.orgName === "Penangkar" ? (
                <DialogConfirmation
                  rows={rowsPenangkar}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Transaksi Penjualan Benih"
                  fcnName="CreateTrxBawangByPenangkar"
                  user={user.username}
                />
              ) : user.orgName === "Petani" ? (
                <DialogConfirmation
                  rows={rowsPetani}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Transaksi Penjualan Bawang"
                  fcnName="UpdateBawangTrxByPetani"
                  user={user.username}
                />
              ) : user.orgName === "Pengumpul" ? (
                <DialogConfirmation
                  rows={rowsPengumpul}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Transaksi Penjualan Bawang"
                  fcnName="UpdateBawangTrxByPengumpul"
                  user={user.username}
                />
              ) : user.orgName === "Pedagang" ? (
                console.log("pdg")
              ) : (
                console.log("login")
              )}
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddTrx;
