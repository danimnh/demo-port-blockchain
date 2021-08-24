import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import QrReader from "react-qr-reader";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// import { FaReact as ReactIcon } from "react-icons/fa";
// import ipb_logo from "./ipb-logo.png";
// import arung_logo from "./arung-logo.png";

import Meta from "components/Meta";

import useStyles from "./styles";

function Welcome(props) {
  const [qrRead, setqrRead] = useState("");
  const handleChange = (event) => {
    setqrRead(event.target.value);
  };
  const refreshingLayout = props.refreshLayout;
  const matchSmallScreen = useMediaQuery("(max-width: 600px)");
  const classes = useStyles({ isSmallScreen: matchSmallScreen });
  const handleScan = (data) => {
    if (data) {
      setqrRead(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    refreshingLayout();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta
        title="Blockchain Supply Chain Bawang Merah IPB"
        description="Blockchain Supply Chain IPB"
      />
      <Container maxWidth="sm" className={classes.root}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px" }}
        />
        <p>atau</p>
        <TextField
          variant="outlined"
          placeholder="Masukkan ID Transaksi"
          value={qrRead}
          onChange={handleChange}
          style={{ width: 300 }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={qrRead === ""}
          component={RouterLink}
          to={"/product/" + qrRead}
          className={classes.button}
        >
          Telusuri
        </Button>
        {props.isLoggedIn && (
          <>
            <Typography style={{ marginTop: 20 }}>
              Halo, {props.user.nama}!
            </Typography>
            <Typography>
              Anda terdaftar sebagai <strong>{props.user.orgName}</strong>
            </Typography>
            {props.user.orgName === "Penangkar" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/update_genesis"
                  className={classes.button}
                >
                  Tambah Kuantitas Benih
                </Button>
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
            )}
            {props.user.orgName === "Petani" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/tanam_benih"
                  className={classes.button}
                >
                  Tanam Benih
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/panen_bawang"
                  className={classes.button}
                >
                  Panen Bawang
                </Button>
              </>
            )}
          </>
        )}

        {!props.isLoggedIn && (
          <Button
            variant="outlined"
            component={RouterLink}
            to="/login"
            className={classes.button}
          >
            Masuk
          </Button>
        )}
        {!props.isLoggedIn && (
          <Button
            variant="outlined"
            component={RouterLink}
            to="/daftar"
            className={classes.button}
          >
            Buat Akun
          </Button>
        )}
      </Container>
      <Box pt={2} pb={2}>
        <Box className={classes.content}>
          <Box className={classes.contentHorizontal}>
            <img
              className={classes.logo}
              src={process.env.PUBLIC_URL + "/images/ipb-logo.png"}
              alt="Logo IPB"
            />
            <img
              className={classes.logo}
              src={process.env.PUBLIC_URL + "/images/arung-logo.png"}
              alt="Logo Arung"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Welcome;
