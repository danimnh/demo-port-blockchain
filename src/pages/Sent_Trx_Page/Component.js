import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";

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
} from "@material-ui/core";
import QRCode from "qrcode.react";
import Meta from "components/Meta";
// import { useHistory } from "react-router-dom";

import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";

import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

function SentTrx(props) {
  const classes = useStyles();
  const { listType } = props.match.params;
  const [memberCode, setMemberCode] = React.useState("");
  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [sentTrx, setSentTrx] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  // const history = useHistory();
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
  //To-Do : rows tiap aktor
  const rowsPenangkar = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData("Kuantitas Benih", modalContent.kuantitasBenihKg + " Kg"),
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
    createData(
      "Tanggal Transaksi",
      moment(modalContent.timestamp).format("LLL")
    ),
    createData("Umur Benih", modalContent.umurBenih + " Hari"),
    createData("Umur Panen", modalContent.umurPanen + " Hari"),
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan + " Hari"),
    createData("Varietas", modalContent.varietas),
    createData(
      "Status",
      modalContent.isConfirmed ? "Terkonfirmasi oleh Penerima" : "Tertunda"
    ),
  ];

  const rowsPetani = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData("Kuantitas Bawang", modalContent.kuantitasBawangKg + " Kg"),
    // modalContent.harga
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
      "Tanggal Transaksi",
      moment(modalContent.timestamp).format("LLL")
    ),
    createData("Ukuran Umbi", modalContent.ukuranUmbi),
    createData("Kadar Air Persen", modalContent.kadarAirPersen),
    createData("Pupuk", modalContent.pupuk),
    createData("Pestisida", modalContent.pestisida),
    createData("Perlakuan", modalContent.perlakuan),
    createData("Produktivitas", modalContent.produktivitas),
    createData(
      "Status",
      modalContent.isConfirmed ? "Terkonfirmasi oleh Penerima" : "Tertunda"
    ),
  ];

  const rowsPengumpul = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData("Kuantitas Bawang", modalContent.kuantitasBawangKg + " Kg"),
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
      "Tanggal Transaksi",
      moment(modalContent.timestamp).format("LLL")
    ),
    createData(
      "Tanggal Masuk",
      moment.unix(modalContent.tanggalMasuk).format("LLL")
    ),
    createData("Teknik Sorting", modalContent.teknikSorting),
    createData("Metode Pengemasan", modalContent.metodePengemasan),
    createData(
      "Status",
      modalContent.isConfirmed ? "Terkonfirmasi oleh Penerima" : "Tertunda"
    ),
  ];
  const rowsPedagang = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData("Kuantitas", modalContent.kuantitas),
    createData("Harga", modalContent.harga),
    createData(
      "Tanggal Transaksi",
      moment(modalContent.timestamp).format("LLL")
    ),
    createData("Umur Benih", modalContent.umurBenih),
    createData("Umur Panen", modalContent.umurPanen),
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan),
    createData("Varietas", modalContent.varietas),
    createData("Harga Benih", modalContent.hargaBenih),
    createData("Status", modalContent.status),
    createData("Transaksi ID", modalContent.transaksiID),
    createData("Batch ID", modalContent.batchID),
  ];

  const handleClose = () => {
    setVisible(false);
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

  const fetchAllSentTrx = async (trxType, username, isConfirmed) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetBawangForQuery",
          args:
            '["' +
            '{\\"selector\\":{\\"username' +
            trxType +
            '\\":\\"' +
            username +
            '\\",\\"isAsset\\":false,\\"isConfirmed\\":' +
            isConfirmed +
            ',\\"isRejected\\":false' +
            "}}" +
            '"]',
        },
      };
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
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

  useEffect(() => {
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
            console.log(stateCopy);
            setUser(stateCopy);
          })
          .finally(() => {
            setMemberCode(user.orgName);
            if (listType === "pending") {
              fetchAllSentTrx("Pengirim", user.username, "false").then(
                (result) => {
                  let sorted = result;
                  console.log("SENT PENDING");
                  const after = sorted.sort((a, b) =>
                    a.Record.createdAt > b.Record.createdAt ? -1 : 1
                  );
                  setSentTrx([]);
                  setSentTrx(after);
                }
              );
            } else if (listType === "confirmed") {
              fetchAllSentTrx("Pengirim", user.username, "true").then(
                (result) => {
                  let sorted = result;
                  console.log("SENT CONFIRMED");
                  const after = sorted.sort((a, b) =>
                    a.Record.createdAt > b.Record.createdAt ? -1 : 1
                  );

                  setSentTrx([]);
                  setSentTrx(after);
                }
              );
            }
          });
      });
    // eslint-disable-next-line
  }, [listType]);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Transaksi Keluar</Typography>

        {props.match.params.listType === "pending" ? (
          <Typography variant="h6">Tertunda</Typography>
        ) : (
          <Typography variant="h6">Terkonfirmasi</Typography>
        )}

        {sentTrx.length !== 0 ? (
          <p>Menampilkan {sentTrx.length} transaksi</p>
        ) : (
          <p>Tidak ada transaksi keluar</p>
        )}

        {sentTrx.map((trx) => {
          return (
            <Card
              id={trx.Key}
              key={trx.Record.id}
              style={{ marginBottom: "20px", width: "100%" }}
            >
              <CardActionArea
                onClick={() => {
                  console.log(trx.Record);
                  setModalContent(trx.Record);
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
                      <Typography className={classes.title}>
                        Pengiriman ke {trx.Record.usernamePenerima}
                      </Typography>
                      <Typography>
                        {moment.unix(trx.Record.createdAt).format("LLL")}
                      </Typography>
                      <Typography>{trx.Record.varietas}</Typography>
                    </Grid>
                    <QRCode value={trx.Record.id} size={52} />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}

        <Dialog open={visible} onClose={handleClose}>
          <DialogTitle>Detail Transaksi</DialogTitle>
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
                  {memberCode === "Petani"
                    ? rowsPetani.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : memberCode === "Pengumpul"
                    ? rowsPengumpul.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : memberCode === "Pedagang"
                    ? rowsPedagang.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : rowsPenangkar.map((row) => (
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
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default SentTrx;
