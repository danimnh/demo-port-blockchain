import React from "react";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

import QRCode from "qrcode.react";
import moment from "moment";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Button,
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
  DialogContentText,
} from "@material-ui/core";
import CreatePermohonanWarta from "constants/CreatePermohonanWarta";
import CreateWarta from "constants/CreateWarta";

// import GetUsernameByID from "constants/GetUsernameByID";
// import InvokeTrxPkr from "constants/InvokeTrxPkr";
// import InvokeTrxPtn from "constants/InvokeTrxPtn";
// import InvokeTrxPpl from "constants/InvokeTrxPpl";
// import PlantBenih from "constants/PlantBenih";
// import ConvertBawang from "constants/ConvertBawang";

// import AddBawangKuantitasByID from "constants/AddBawangKuantitasByID";
import { useHistory } from "react-router-dom";

function DialogConfirmation({
  rows,
  isVisible,
  fcnName,
  modalContent,
  dialogTitle,
  handleClose,
  user,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const [txid, setTxid] = React.useState("");

  const downloadQRCode = () => {
    console.log(modalContent);
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
      moment().format("DDMMYYYY_hhmm") +
      ".png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };
  const classes = useStyles();
  const [qrVisible, setQrVisible] = React.useState(false);

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
  return (
    <>
      <Dialog open={isVisible} onClose={handleClose}>
        <DialogTitle>Konfirmasi {dialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Informasi di bawah akan disimpan
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Atribut</StyledTableCell>
                  <StyledTableCell align="right">Informasi</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="left">Pengirim</StyledTableCell>
                  <StyledTableCell align="right">{user}</StyledTableCell>
                </StyledTableRow>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.value}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          {fcnName === "CreatePermohonanWarta" ? (
            <Button
              onClick={() => {
                setIsLoading(true);
                handleClose();
                console.log(modalContent);
                CreatePermohonanWarta(modalContent, fcnName, user)
                  .then((result) => {
                    console.log(result);
                    setTxid(result);
                    setQrVisible(true);
                    // history.go(0);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          ) : fcnName === "CreateWarta" ? (
            <Button
              onClick={() => {
                CreateWarta(modalContent, fcnName, user)
                  .then((result) => {
                    console.log(result);
                    setTxid(result);
                    setQrVisible(true);
                    // history.go(0);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          ) : (
            console.log("end")
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={qrVisible}>
        <DialogTitle>Transaksi Berhasil Disimpan</DialogTitle>
        <DialogContent>
          <DialogContentText>QR Code Transaksi</DialogContentText>
          <QRCode id="qrCodeEl" value={txid} includeMargin={true} />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={(txid) => downloadQRCode(txid)}>
            Download QR
          </Button>
          <Button
            onClick={async () => {
              await setQrVisible(false);
              await alert("Redirecting to product page");
              await history.push("/product/" + txid);
            }}
            variant="outlined"
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}
    </>
  );
}

export default DialogConfirmation;
