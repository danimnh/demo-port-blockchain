import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";

import {
  Grid,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import QRCode from "qrcode.react";
import Meta from "components/Meta";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

function Layanan(props) {
  const classes = useStyles();
  const { listType } = props.match.params;
  const [rowsType, setRowsType] = React.useState("");
  const [inboxTrx, setInboxTrx] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visibleReject, setVisibleReject] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState("");
  const [modalContent, setModalContent] = React.useState([]);
  const history = useHistory();

  const downloadQRCode = () => {
    console.log(modalContent.id);
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL);
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download =
      "QR_" +
      modalContent.usernamePengirim +
      "_" +
      moment.unix(modalContent.createdAt).format("DDMMYYYY_hhmm") +
      ".png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  function createData(name, value) {
    return { name, value };
  }
  const rowsPermohonan = [
    createData("Diteruskan kepada", "Bidang Lala"),
    createData("Jenis Warta", modalContent.wartaType),
    createData("Trayek", modalContent.trayek),
    createData("No. RPK/PKKA/PPKN", modalContent.noRPK),
    createData("Status", modalContent.IsPKApproved ? "Disetujui" : "Tertunda"),
  ];
  const rowsWarta = [
    createData("Diteruskan kepada", "Bidang Lala & Syahbandar"),
    createData("Jenis Warta", modalContent.wartaType),
    createData(
      "Bidang Lala",
      modalContent.IsPKKVerified ? "Disetujui" : "Tertunda"
    ),
    createData(
      "Syahbandar",
      modalContent.IsSPMApproved ? "Disetujui" : "Tertunda"
    ),
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

  const handleClose = () => {
    setVisible(false);
  };

  const handleRejectClose = () => {
    setVisibleReject(false);
  };

  const handleRejectChange = (event) => {
    setRejectReason(event.target.value);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const fetchAllInboxTrx = async (listType) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetDokumenForQuery",
          args:
            '["' +
            '{\\"selector\\":{\\"wartaType\\":\\"' +
            listType[0].toUpperCase() +
            listType.slice(1) +
            '\\"' +
            "}}" +
            '"]',
        },
      };
      console.log(config.params.args);
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bcport_cc",
        config
      );
      console.log(resp);
      console.log(config.params);
      return resp.data.result;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const rejectTrxByID = async (
    sourceTrxId,
    kuantitas,
    rejectTxId,
    rejectReason
  ) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let body = {
      fcn: "RejectTrxByID",
      peers: [
        "peer0.penangkar.example.com",
        "peer0.petani.example.com",
        "peer0.pengumpul.example.com",
        "peer0.pedagang.example.com",
      ],
      chaincodeName: "bawangmerah_cc",
      channelName: "mychannel",
      args: [sourceTrxId, rejectTxId, kuantitas, rejectReason],
    };
    try {
      const resp = await axios.post(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        body,
        config
      );
      console.log(resp);
      await alert("Transaksi berhasil ditolak");
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (listType === "kedatangan") {
      fetchAllInboxTrx(listType).then((result) => {
        let sorted = result;
        const after = sorted.sort((a, b) =>
          a.Record.createdAt > b.Record.createdAt ? -1 : 1
        );
        setInboxTrx([]);
        setInboxTrx(after);
      });
    } else if (listType === "keberangkatan") {
      fetchAllInboxTrx(listType).then((result) => {
        let sorted = result;
        const after = sorted.sort((a, b) =>
          a.Record.createdAt > b.Record.createdAt ? -1 : 1
        );
        setInboxTrx([]);
        setInboxTrx(after);
      });
    }

    // eslint-disable-next-line
  }, [listType]);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Layanan</Typography>

        {props.match.params.listType === "kedatangan" ? (
          <Typography variant="h6">Kedatangan Kapal</Typography>
        ) : (
          <Typography variant="h6">Keberangkatan Kapal</Typography>
        )}

        {inboxTrx.length !== 0 ? (
          <p>Menampilkan {inboxTrx.length} transaksi</p>
        ) : (
          <p>Tidak ada catatan</p>
        )}

        {inboxTrx.map((trx) => {
          return (
            <>
              <Card
                id={trx.Key}
                key={trx.Record.id}
                style={{ marginBottom: "20px", width: "100%" }}
              >
                <CardActionArea
                  onClick={() => {
                    console.log(trx.Record);

                    console.log(trx.Record.IsSPMApproved);
                    console.log(trx.Record.IsPKKVerified);

                    console.log(
                      trx.Record.IsSPMApproved & trx.Record.IsPKKVerified
                    );

                    setModalContent(trx.Record);
                    if (trx.Record.wartaID !== "") {
                      setRowsType("Warta");
                    } else {
                      setRowsType("Permohonan");
                    }
                    setVisible(true);
                  }}
                >
                  <CardContent>
                    <Grid
                      direction="row"
                      container
                      style={{ justifyContent: "space-between" }}
                    >
                      <Grid>
                        {trx.Record.wartaID === "" ? (
                          <Typography className={classes.title}>
                            Permohonan Warta
                          </Typography>
                        ) : (
                          <Typography className={classes.title}>
                            Warta {trx.Record.wartaType}
                          </Typography>
                        )}

                        <Typography>
                          {moment.unix(trx.Record.createdAt).format("LLL")}
                        </Typography>
                        {trx.Record.wartaID === "" ? (
                          <Typography>
                            {trx.Record.IsPKApproved ? "Disetujui" : "Tertunda"}
                          </Typography>
                        ) : (
                          <Typography>
                            {trx.Record.IsSPMApproved & trx.Record.IsPKKVerified
                              ? "Disetujui"
                              : "Tertunda"}
                          </Typography>
                        )}
                      </Grid>
                      <QRCode value={trx.Record.id} size={52} />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          );
        })}
        <Dialog open={visible} onClose={handleClose}>
          <DialogTitle>Detail Dokumen</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Atribut</StyledTableCell>
                    <StyledTableCell align="left">Informasi</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {rowsType === "Permohonan" &&
                    rowsPermohonan.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.value}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}

                  {rowsType === "Warta" &&
                    rowsWarta.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.value}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  <StyledTableCell align="left">ID Transaksi</StyledTableCell>
                  <StyledTableCell align="left">
                    <QRCode id="qrCodeEl" value={modalContent.id} size={128} />
                    <Button
                      variant="outlined"
                      onClick={(txid) => downloadQRCode(txid)}
                    >
                      Simpan QR
                    </Button>
                  </StyledTableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
            >
              Tutup
            </Button>
            {modalContent.wartaID === "" && modalContent.IsPKApproved === true && (
              <Button
                component={RouterLink}
                to={"/create/warta/" + modalContent.id}
                onClick={() => {
                  console.log(modalContent.id);
                }}
                variant="contained"
                color="primary"
              >
                Buat Warta
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
      <Dialog open={visibleReject} onClose={handleRejectClose}>
        <DialogTitle>Alasan penolakan</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              aria-label="rejectReason"
              name="rejectReason"
              value={rejectReason}
              onChange={handleRejectChange}
            >
              <FormControlLabel
                value="Harga tidak sesuai"
                control={<Radio />}
                label="Harga tidak sesuai"
              />
              <FormControlLabel
                value="Kuantitas tidak sesuai"
                control={<Radio />}
                label="Kuantitas tidak sesuai"
              />
              <FormControlLabel
                value="Atribut tidak sesuai"
                control={<Radio />}
                label="Atribut tidak sesuai"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={rejectReason === ""}
            variant="contained"
            color="secondary"
            onClick={() => {
              rejectTrxByID(modalContent.id);

              console.log("reject");
            }}
          >
            Tolak Transaksi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Layanan;
