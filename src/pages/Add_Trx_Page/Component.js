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

import PermohonanFields from "./Form_Models/PermohonanModel";

import WartaFields from "./Form_Models/WartaModel";

import FormPermohonanWarta from "./Forms/FormPermohonanWarta";

import FormWarta from "./Forms/FormWarta";

import DialogConfirmation from "../../sections/Dialog_Confirmation";
// import fetchAllApprovedPermohonan from "constants/fetchAllApprovedPermohonan";
import fetchDokumenByID from "constants/fetchDokumenByID";

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
  const { listType, prevID } = props.match.params;
  const username = localStorage.getItem("username");
  // const orgName = localStorage.getItem("orgName");
  const [isLoading, setIsLoading] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [modalContent, setModalContent] = React.useState([]);

  const [selectedAsset, setSelectedAsset] = React.useState([]);

  const rowsPermohonan = [
    createData("Diteruskan kepada", modalContent.usernamePenerima),
    createData("Jenis Warta", modalContent.wartaType),
    createData("Trayek", modalContent.trayek),
    createData("No. RPK/PKKA/PPKN", modalContent.noRPK),
  ];

  const rowsWarta = [
    createData("Diteruskan kepada", "Bidang Lala & Syahbandar"),
    createData("Jenis Warta", modalContent.wartaType),
    createData("No. Layanan", modalContent.noLayanan),
    createData("Tanda Pendaftaran Kapal", modalContent.tandaPendaftaranKapal),
    createData("Call Sign", modalContent.callSign),
    createData("Bendera", modalContent.bendera),
    createData("No. Voyage", modalContent.noVoyage),
    createData("Jenis Kapal", modalContent.jenisKapal),
    createData("Tahun Pembuatan", modalContent.tahunPembuatan),
    createData("No. Inmarsat", modalContent.noInmarsat),
    createData("Nama CSO", modalContent.namaCSO),
    createData("Telp CSO", "0" + modalContent.telpCSO),
    createData("GT (Ton)", modalContent.gtTon),
    createData("DWT (Ton)", modalContent.dwtTon),
    createData("LOA (Meter)", modalContent.loaMeter),
    createData("Lebar Meter", modalContent.lebarMeter),
    createData("Draft Max Meter", modalContent.drafMaxMeter),
    createData("Draf Depan Meter", modalContent.drafDepanMeter),
    createData("Draf Belakang Meter", modalContent.drafBelakangMeter),
    createData("Ketinggian Udara Meter", modalContent.ketinggianUdaraMeter),
    createData("Domisili Keagenan", modalContent.domisiliKeagenan),
    createData("Jenis Pelayaran", modalContent.jenisPelayatan),
    createData("Minimum Safe Manning", modalContent.minimumSafeManning),
    createData("Tenaga Pendorong", modalContent.tenagaPendorong),
    createData("Nama Operator", modalContent.namaOperator),
    createData("Siupal Operator", modalContent.siupalOperator),
    createData("Alamat Operator", modalContent.alamatOperator),
    createData("Nama Agen", modalContent.namaAgen),
    createData("PJ Agen", modalContent.pjAgen),
    createData("Siupal Agen", modalContent.siupalAgen),
    createData("Alamat Agen", modalContent.alamatAgen),
    createData("Pelabuhan Asal", modalContent.pelabuhanAsal),

    createData("Tanggal Tiba", modalContent.tanggalTiba),
    createData("Lokasi Labuh", modalContent.tugBoat),
    createData("Tug Boat", modalContent.tugBoat),
    createData("Jenis Trayek", modalContent.jenisTrayek),
    createData("No Trayek", modalContent.noTrayek),
    createData("Lintasan", modalContent.lintasan),
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
    } else if (listType === "warta") {
      values.prevID = prevID;
      values.telpCSO = parseInt(values.telpCSO);
      values.usernamePenerima = "Bidang Lala, Syahbandar";
      values.wartaType = selectedAsset.wartaType;
    }

    _submitForm(values, actions);
    setIsLoading(false);
  }
  const initPermohonan = {
    usernamePenerima: "",
  };

  const initWarta = {
    noLayanan: "MDN.IDJKT.1906.000006",
    tandaPendaftaranKapal: "2011 PPm No. 1799/L",
    callSign: "123567",
    bendera: "ID",
    noVoyage: "SMB9-01",
    jenisKapal: "TONGKANG / BARGE",
    tahunPembuatan: 2011,
    noInmarsat: "",
    namaCSO: "",
    telpCSO: "081298408698",
    gtTon: 1448,
    dwtTon: 30000,
    loaMeter: 70.1,
    lebarMeter: 19.51,
    drafMaxMeter: 15,
    drafDepanMeter: 8,
    drafBelakangMeter: 12,
    ketinggianUdaraMeter: 10,
    domisiliKeagenan: "DKI Jakarta",
    jenisPelayatan: "Tramper",
    minimumSafeManning: 12,
    tenagaPendorong: "",
    namaOperator: "PT. PELAYARAN NASIONAL BAHTERA SETIA",
    pjOperator: "H. MUHAMMAD RAMLI SY, Ir, MBA",
    siupalOperator: "B VVX-437/AL.58",
    alamatOperator: "Jl. Yos Sudarso Blok II / 10",
    namaAgen: "BAHARI SEGARA MARITIM",
    pjAgen: "Satrio Wibisono",
    siupalAgen: "AL.001/68/SPM-SIUPAL/V/2019",
    alamatAgen:
      "Jl. Kamal Raya No. 80 RT.003 RW. 003 Kel. Kamal Muara Kec. Penjaringan DKI Jakarta Utara",
    pelabuhanAsal: "",
    tanggalTiba: "",
    lokasiLabuh: "",
    tugBoat: "",
    jenisTrayek: "TRAMPER",
    noTrayek: "AL.103.2000/31134/30696/19",
    lintasan: "PONTIANAK, KETAPANG, Pangkalan BUN",
  };
  useEffect(() => {
    setIsLoading(true);

    if (listType === "permohonan") {
      setIsLoading(false);
    } else if (listType === "warta") {
      fetchDokumenByID(prevID).then((result) => {
        console.log(result);
        setSelectedAsset(result);
      });
      setIsLoading(false);
    }

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
        {listType === "warta" && (
          <Typography variant="h6">Warta {selectedAsset.wartaType}</Typography>
        )}

        <Formik
          enableReinitialize
          initialValues={listType === "permohonan" ? initPermohonan : initWarta}
          onSubmit={_handleSubmit}
        >
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
              {listType === "permohonan" && (
                <DialogConfirmation
                  rows={rowsPermohonan}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Buat Dokumen Permohonan Warta"
                  fcnName="CreatePermohonanWarta"
                  user={username}
                />
              )}
              {listType === "warta" && (
                <DialogConfirmation
                  rows={rowsWarta}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Buat Dokumen Warta"
                  fcnName="CreateWarta"
                  user={username}
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
