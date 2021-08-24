import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import QRCode from "qrcode.react";

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
  const [modalDataBlockContent, setModalDataBlockContent] = React.useState([]);

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
  const rowsAsetBenih = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData(
      "Umur Benih",
      modalContent.umurBenih === undefined
        ? "Loading"
        : modalContent.umurBenih + " Hari"
    ),
    createData(
      "Umur Panen",
      modalContent.umurPanen === undefined
        ? "Hari"
        : modalContent.umurPanen + " Hari"
    ),
  ];
  const rowsPenangkar = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData(
      "Kuantitas Benih",
      modalDataBlockContent.kuantitasBenihKg + " Kg"
    ),
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
      moment.unix(modalContent.createdAt).format("LLL")
    ),
    createData("Umur Benih", modalContent.umurBenih + " Hari"),
    createData("Umur Panen", modalContent.umurPanen + " Hari"),
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan + " Hari"),
    createData("Varietas", modalContent.varietas),
    createData(
      "Status",
      modalContent.isConfirmed
        ? "Terkonfirmasi oleh Penerima"
        : modalContent.isRejected
        ? "Transaksi Ditolak"
        : "Tertunda"
    ),
  ];
  const rowsTanam = [
    createData("Username Petani", modalContent.usernamePenerima),
    createData(
      "Kuantitas Benih ditanam",
      modalDataBlockContent.kuantitasBenihKg + " Kg"
    ),
    createData(
      "Tanggal ditanam",
      moment.unix(modalDataBlockContent.tanggalTanam).format("LLL")
    ),
    createData("Lokasi Lahan", modalContent.alamatPenerima),
    createData("Pupuk", modalDataBlockContent.pupuk),
  ];

  const rowsPanen = [
    createData("Username Petani", modalContent.usernamePenerima),
    createData(
      "Kuantitas Benih ditanam",
      modalDataBlockContent.kuantitasBenihKg + " Kg"
    ),
    createData(
      "Kuantitas Bawang dipanen",
      modalDataBlockContent.kuantitasBawangKg + " Kg"
    ),
    createData(
      "Tanggal dipanen",
      moment.unix(modalDataBlockContent.tanggalPanen).format("LLL")
    ),
    createData("Lokasi Lahan", modalContent.alamatPenerima),
    createData("Pupuk", modalDataBlockContent.pupuk),
    createData("Pestisida", modalDataBlockContent.pestisida),
    createData("Kadar Air (%)", modalDataBlockContent.kadarAirPersen + "%"),
    createData("Perlakuan", modalDataBlockContent.perlakuan),
    createData("Produktivitas", modalDataBlockContent.produktivitas),
  ];

  const rowsPetani = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData(
      "Kuantitas Bawang",
      modalDataBlockContent.kuantitasBawangKg + " Kg"
    ),
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
      moment.unix(modalContent.createdAt).format("LLL")
    ),
    createData("Ukuran Umbi", modalContent.ukuranUmbi),
    createData("Pupuk", modalContent.pupuk),
    createData("Pestisida", modalContent.pestisida),
    createData("Kadar Air (%)", modalContent.kadarAirPersen + "%"),
    createData("Perlakuan", modalContent.perlakuan),
    createData("Produktivitas", modalContent.produktivitas),

    createData(
      "Status",
      modalContent.isConfirmed
        ? "Terkonfirmasi oleh Penerima"
        : modalContent.isRejected
        ? "Transaksi Ditolak"
        : "Tertunda"
    ),
  ];
  const rowsPengumpul = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData(
      "Kuantitas Bawang",
      modalDataBlockContent.kuantitasBawangKg + " Kg"
    ),
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
      moment.unix(modalContent.createdAt).format("LLL")
    ),
    createData(
      "Tanggal Masuk",
      moment.unix(modalDataBlockContent.tanggalMasuk).format("LLL")
    ),
    createData("Teknik Sorting", modalContent.teknikSorting),
    createData("Metode Pengemasan", modalContent.metodePengemasan),

    createData(
      "Status",
      modalContent.isConfirmed
        ? "Terkonfirmasi oleh Penerima"
        : modalContent.isRejected
        ? "Transaksi Ditolak"
        : "Tertunda"
    ),
  ];
  // eslint-disable-next-line
  const rowsWarehouse = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData(
      "Kuantitas Bawang",
      modalDataBlockContent.kuantitasBawangKg + " Kg"
    ),
  ];
  const rowsPedagang = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData(
      "Kuantitas Bawang",
      modalDataBlockContent.kuantitasBawangKg + " Kg"
    ),
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
      moment.unix(modalContent.createdAt).format("LLL")
    ),
    createData(
      "Tanggal Masuk",
      moment.unix(modalContent.tanggalMasuk).format("LLL")
    ),
    createData("Alamat Gudang", modalContent.umurPanen),
    createData("Teknik Sorting", modalContent.lamaPenyimpanan),
    createData("Metode Pengemasan", modalContent.varietas),
    createData(
      "Status",
      modalContent.isConfirmed ? "Terkonfirmasi oleh Penerima" : "Tertunda"
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

  const [dialogCode, setDialogCode] = React.useState("");
  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [dataBlock, setDataBlock] = React.useState({});
  const [trxPkr, setTrxPkr] = React.useState({}); //txid1
  const [benihAsetId, setBenihAsetId] = React.useState({}); //benihAsetId
  const [trxPtn, setTrxPtn] = React.useState({}); //txid2
  const [bawangAsetId, setBawangAsetId] = React.useState({}); //benihBawangId

  const [trxPpl, setTrxPpl] = React.useState({}); //txid3

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
          fcn: "GetBawangByID",
          args: '["' + batchID + '"]',
        },
      };
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
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
        if (result.txID1 !== "") {
          fetchDataByID(result.txID1).then((result) => {
            setTrxPkr(result);
          });
        }

        if (result.txID2 !== "") {
          fetchDataByID(result.txID2).then((result) => {
            setTrxPtn(result);
          });
        }

        if (result.txID3 !== "") {
          fetchDataByID(result.txID3).then((result) => {
            setTrxPpl(result);
          });
        }

        if (result.benihAsetID !== "") {
          fetchDataByID(result.benihAsetID).then((result) => {
            setBenihAsetId(result);
          });
        }

        if (result.bawangAsetID !== "") {
          fetchDataByID(result.bawangAsetID).then((result) => {
            setBawangAsetId(result);
          });
        }
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
      {/* <Meta title="Page 4" description="Page 4" /> */}
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
              <Grid item xs={6}>
                <Typography variant="body1">Pencatat Transaksi</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {dataBlock.usernamePengirim}
                </Typography>
              </Grid>
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

              {dataBlock.rejectReason !== "" && (
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
            {dataBlock.txID3 !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        setDialogCode("Pengumpul");
                        setModalContent(trxPpl);
                        setModalDataBlockContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Pengumpul menjual Bawang
                        </Typography>
                        <Typography>
                          {moment.unix(trxPpl.createdAt).format("LLL")}
                        </Typography>
                        <Typography>{trxPpl.usernamePenerima}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}

            {dataBlock.tanggalMasuk !== 0 && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardContent>
                      <Typography className={classes.title}>
                        Pengumpul Warehouse Bawang
                      </Typography>
                      <Typography>
                        {moment.unix(trxPtn.tanggalMasuk).format("LLL")}
                      </Typography>
                      <Typography>{trxPtn.usernamePenerima}</Typography>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}

            {dataBlock.txID2 !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        setDialogCode("Petani");
                        setModalContent(trxPtn);
                        setModalDataBlockContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Petani menjual Bawang
                        </Typography>
                        <Typography>
                          {moment.unix(trxPtn.createdAt).format("LLL")}
                        </Typography>
                        <Typography>{trxPtn.usernamePengirim}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}

            {dataBlock.kuantitasBawangKg !== 0 && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        setDialogCode("PanenBawang");
                        setModalContent(trxPkr);
                        setModalDataBlockContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Petani memanen Bawang
                        </Typography>
                        <Typography>
                          {moment.unix(bawangAsetId.createdAt).format("LLL")}
                        </Typography>
                        <Typography>{bawangAsetId.usernamePengirim}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}
            {dataBlock.pupuk !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        setDialogCode("TanamBenih");
                        setModalContent(trxPkr);
                        setModalDataBlockContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Petani menanam Benih
                        </Typography>
                        <Typography>
                          {moment.unix(bawangAsetId.tanggalTanam).format("LLL")}
                        </Typography>
                        <Typography>{bawangAsetId.usernamePengirim}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}

            {dataBlock.txID1 !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        setDialogCode("Penangkar");
                        console.log(trxPkr);
                        setModalContent(trxPkr);
                        setModalDataBlockContent(dataBlock);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Penangkar Mengirimkan Benih
                        </Typography>
                        <Typography>
                          {moment.unix(trxPkr.createdAt).format("LLL")}
                        </Typography>
                        <Typography>{trxPkr.usernamePengirim}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )}

            {dataBlock.asetBenihID !== "" && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.cardTimeline}>
                    <CardActionArea
                      onClick={() => {
                        setDialogCode("AsetBenih");
                        console.log(benihAsetId);
                        setModalContent(benihAsetId);
                        setVisible(true);
                      }}
                    >
                      <CardContent>
                        <Typography className={classes.title}>
                          Penangkar menambahkan Benih
                        </Typography>
                        <Typography>
                          {moment.unix(benihAsetId.createdAt).format("LLL")}
                        </Typography>
                        <Typography>{benihAsetId.usernamePengirim}</Typography>
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
                  {dialogCode === "Penangkar"
                    ? rowsPenangkar.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : dialogCode === "AsetBenih"
                    ? rowsAsetBenih.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : dialogCode === "TanamBenih"
                    ? rowsTanam.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : dialogCode === "PanenBawang"
                    ? rowsPanen.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.value}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : dialogCode === "Petani"
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
                    : dialogCode === "Pengumpul"
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
                    : dialogCode === "Pedagang"
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
                    : null}
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
