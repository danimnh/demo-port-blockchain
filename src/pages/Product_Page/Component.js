import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import QRCode from "qrcode.react";

// import NumberFormat from "react-number-format";

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
  Backdrop,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Chip,
} from "@material-ui/core";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@material-ui/lab";

import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";

import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

function ProductPage(props) {
  const classes = useStyles();
  const history = useHistory();
  // eslint-disable-next-line
  const [visible, setVisible] = React.useState(false);
  const [visibleReject, setVisibleReject] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState("");

  const handleClose = () => {
    setVisible(false);
  };
  const handleRejectClose = () => {
    setVisibleReject(false);
  };
  const handleRejectChange = (event) => {
    setRejectReason(event.target.value);
  };
  // const [modalDataBlockContent, setModalDataBlockContent] = React.useState([]);

  const [modalContent, setModalContent] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
    createData(
      "Status Dokumen",
      modalContent.IsPKApproved ? "Disetujui" : "Tertunda"
    ),
  ];

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

  // const [dialogCode, setDialogCode] = React.useState("");
  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [dataBlock, setDataBlock] = React.useState({});

  // eslint-disable-next-line
  const fetchDataByID = async (batchID) => {
    setIsLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetDokumenByID",
          args: '["' + batchID + '"]',
        },
      };
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bcport_cc",
        config
      );

      await setIsLoading(false);
      return resp.data.result;
    } catch (err) {
      console.log(err);
      return "Transaksi tidak ditemukan";
    }
  };

  const confirmTrxByID = async (trxId) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log("confirmTrxById");

    let body = {
      fcn: "ConfirmTrxByID",
      peers: [
        "peer0.penangkar.example.com",
        "peer0.petani.example.com",
        "peer0.pengumpul.example.com",
        "peer0.pedagang.example.com",
      ],
      chaincodeName: "bawangmerah_cc",
      channelName: "mychannel",
      args: [trxId],
    };
    try {
      const resp = await axios.post(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        body,
        config
      );
      console.log(resp);
      await alert("Transaksi berhasil dikonfirmasi");
      history.go(0);
    } catch (err) {
      console.log(err);
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
    const batchId = props.match.params.batchId;

    getUsername()
      .then((result) => {
        let stateCopy = user;
        stateCopy.username = result;
        setUser(stateCopy);
      })
      .finally(() => {
        getUserOrgName().then((result) => {
          let stateCopy = user;
          stateCopy.orgName = result;
          setUser(stateCopy);
          if (user.orgName !== undefined) {
            console.log("Berhasil login sebagai " + user.orgName);
          }
        });
      });

    fetchDataByID(batchId).then((result) => {
      console.log(result);

      if (result !== "Transaksi tidak ditemukan") {
        setDataBlock(result);
      } else {
        alert("Transaksi tidak ditemukan");
        history.go(-1);
      }
    });
  }, [props.match.params.batchId, history, user]);
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}

      <Container maxWidth="sm" className={classes.root}>
        <Grid direction="column" container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Detail Transaksi</Typography>

            <Grid container direction="row" item xs={12}>
              <Grid item xs={6}>
                {/* <Typography variant="body1">QR Code</Typography> */}
                {dataBlock.id !== undefined && <QRCode value={dataBlock.id} />}
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>

            <Grid container direction="row" spacing={1} xs={12}>
              {dataBlock.isAsset !== true && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="body1">Status Transaksi</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {dataBlock.isConfirmed ? (
                      <Chip label="Terkonfirmasi" color="primary" />
                    ) : dataBlock.isRejected ? (
                      <Chip
                        label="Transaksi Ditolak"
                        size="small"
                        color="secondary"
                      />
                    ) : (
                      <Chip label="Tertunda" size="small" color="default" />
                    )}
                  </Grid>
                </>
              )}

              {dataBlock.pkRejectReason !== "" && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="body1">Alasan penolakan</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {dataBlock.rejectReason}
                    </Typography>
                  </Grid>
                </>
              )}

              <Grid item xs={6}>
                <Typography variant="body1">Tanggal Transaksi</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {moment.unix(dataBlock.createdAt).format("LLL")}
                </Typography>
              </Grid>
              {dataBlock.isAsset && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="body1">Varietas</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      {dataBlock.varietas}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          {user.orgName === "Petani" ? (
            dataBlock.usernamePenerima === user.username &&
            dataBlock.isConfirmed === false &&
            dataBlock.isRejected === false ? (
              <>
                <Button
                  onClick={() => {
                    console.log(dataBlock.id);
                    confirmTrxByID(dataBlock.id);
                  }}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Konfirmasi Transaksi
                </Button>
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setVisibleReject(true);
                  }}
                >
                  Tolak
                </Button>
              </>
            ) : dataBlock.usernamePenerima === user.username &&
              dataBlock.kuantitasBenihKg > 0 &&
              dataBlock.isConfirmed === true ? (
              <Button
                variant="contained"
                component={RouterLink}
                to="/tanam_benih"
                fullWidth
                color="primary"
              >
                Tanam Benih
              </Button>
            ) : dataBlock.usernamePengirim === user.username &&
              dataBlock.usernamePenerima === "" &&
              dataBlock.kuantitasBawangKg > 0 &&
              dataBlock.isConfirmed === false ? (
              <Button
                variant="contained"
                component={RouterLink}
                to="/create_transaction"
                fullWidth
                color="primary"
              >
                Tambah Transaksi
              </Button>
            ) : dataBlock.usernamePengirim === user.username &&
              dataBlock.usernamePenerima === "" &&
              dataBlock.kuantitasBawangKg === 0 &&
              dataBlock.isConfirmed === false ? (
              <Button
                variant="contained"
                component={RouterLink}
                to="/panen_bawang"
                fullWidth
                color="primary"
              >
                Panen Bawang
              </Button>
            ) : null
          ) : null}

          {user.orgName === "Pengumpul" ? (
            dataBlock.usernamePenerima === user.username ? (
              dataBlock.isConfirmed ? (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/create_transaction"
                  fullWidth
                  color="primary"
                >
                  Tambah Transaksi
                </Button>
              ) : dataBlock.isConfirmed === false &&
                dataBlock.isRejected === false ? (
                <>
                  <Button
                    onClick={() => {
                      console.log(dataBlock.id);
                      confirmTrxByID(dataBlock.id);
                    }}
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    Konfirmasi Transaksi
                  </Button>
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setVisibleReject(true);
                    }}
                  >
                    Tolak
                  </Button>
                </>
              ) : null
            ) : null
          ) : null}

          {user.orgName === "Pedagang" ? (
            dataBlock.usernamePenerima === user.username ? (
              dataBlock.isConfirmed ? (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/create_transaction"
                  fullWidth
                  color="primary"
                >
                  Tambah Transaksi
                </Button>
              ) : dataBlock.isConfirmed === false &&
                dataBlock.isRejected === false ? (
                <>
                  <Button
                    onClick={() => {
                      console.log(dataBlock.id);
                      confirmTrxByID(dataBlock.id);
                    }}
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    Konfirmasi Transaksi
                  </Button>
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setVisibleReject(true);
                    }}
                  >
                    Tolak
                  </Button>
                </>
              ) : null
            ) : null
          ) : null}
          {/* v grid closes */}
        </Grid>
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Timeline Transaksi
        </Typography>

        <Grid container className={classes.timeline}>
          <Timeline>
            {/* {//todo : syahbanndar approve, lala approve} */}
            {dataBlock.wartaID !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        // setDialogCode("Penangkar");
                        // console.log(trxPkr);
                        // setModalContent(trxPkr);
                        // setModalDataBlockContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Warta Kedatangan/Keberangkatan
                        </Typography>
                        <Typography>
                          {/* {moment.unix(trxPkr.createdAt).format("LLL")} */}
                        </Typography>
                        {/* <Typography>{trxPkr.usernamePengirim}</Typography> */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}

            {dataBlock.permohonanID !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        // setDialogCode("AsetBenih");
                        // console.log(permohonanID);
                        setModalContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Permohonan Warta dibuat
                        </Typography>
                        <Typography>
                          {/* {moment.unix(benihAsetId.createdAt).format("LLL")} */}
                        </Typography>
                        {/* <Typography>{benihAsetId.usernamePengirim}</Typography> */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}
          </Timeline>
        </Grid>

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
                  {rowsPermohonan.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.value}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <StyledTableCell align="left">ID Dokumen</StyledTableCell>
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
              if (user.orgName === "Petani") {
                console.log(dataBlock.benihAsetID);
                console.log(dataBlock.kuantitasBenihKg);
                console.log(dataBlock.txID1);
                rejectTrxByID(
                  dataBlock.benihAsetID,
                  dataBlock.kuantitasBenihKg,
                  dataBlock.txID1,
                  rejectReason
                );
              } else if (user.orgName === "Pengumpul") {
                rejectTrxByID(
                  dataBlock.bawangAsetID,
                  dataBlock.kuantitasBawangKg,
                  dataBlock.txID2,
                  rejectReason
                );
              } else if (user.orgName === "Pedagang") {
                rejectTrxByID(
                  dataBlock.txID2,
                  dataBlock.kuantitasBawangKg,
                  dataBlock.txID3,
                  rejectReason
                );
              }
            }}
          >
            Tolak Transaksi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductPage;
