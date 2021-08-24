import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import {
  // Grid,
  // Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import Meta from "components/Meta";

import useStyles from "./styles";

function TransactionList() {
  const classes = useStyles();
  const [pendingTrx, setPendingTrx] = React.useState([]);

  const fetchPendingTrx = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      console.log(config);
      const resp = await axios.get("trx/pkr-ptn/unconfirmed", config);
      await setPendingTrx(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmByID = async (_id) => {
    const values = {
      trxID: _id,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      console.log(JSON.stringify(values));
      const resp = await axios.post(
        "trx/pkr-ptn/confirm",
        JSON.stringify(values),
        config
      );
      await console.log(resp);
      await alert("transaksi " + _id + "berhasil dikonfirmasi");
    } catch (err) {
      console.log(err);
    }
  };

  const confirmToIbp = async (trx) => {
    const values = {
      // penangkarId: "string",
      // petaniId: "string",
      // tanggalJual: trx.timestamp,
      // tanggalKirim: "string",
      // metodePengiriman: "string",
      // brutoKg: 0,
      // nettoKg: 0,
      // hargaPerKg: 0,
      // alamatPenangkar: trx.alamatPengirim,
      // alamatPetani: trx.alamatPenerima,
      // umurBenih: trx.umurBenih,
      // varietasBawang: trx.varietas,
      // lamaPenyimpanan: trx.lamaPenyimpanan,
      // umurPanen: "string",
      // batchState: "string",
      penangkarId: "string",
      petaniId: "string",
      tanggalJual: "string",
      tanggalKirim: "string",
      metodePengiriman: "string",
      brutoKg: "0",
      nettoKg: "0",
      hargaPerKg: "0",
      alamatPenangkar: "string",
      alamatPetani: "string",
      umurBenih: "string",
      varietasBawang: "string",
      lamaPenyimpanan: "string",
      umurPanen: "string",
      batchState: "string",
    };

    console.log("values to send is", values);
    const valueJSON = JSON.stringify(values);
    console.log("json", valueJSON);
    try {
      console.log(JSON.stringify(values));
      const resp = await axios({
        method: "post",
        url: "http://13.229.214.74:8080/jualBenih",
        data: valueJSON,
        headers: { "Content-Type": "application/json" },
      });
      await console.log(resp);
      await alert("transaksi " + trx._id + "berhasil dikonfirmasi");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPendingTrx();
  }, []);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Transaksi Pending</Typography>
        {pendingTrx.length === "0" ? (
          <p>Tidak ada transaksi pending</p>
        ) : (
          console.log("false?", pendingTrx)
        )}
        {pendingTrx.map((trx) => {
          return (
            <Card key={trx._id} style={{ marginBottom: "20px", width: "100%" }}>
              <CardActionArea
                onClick={() => {
                  confirmByID(trx._id);
                  confirmToIbp(trx);
                }}
              >
                <CardContent>
                  <Typography>{trx.usernamePengirim}</Typography>
                  <Typography>{trx.timestamp}</Typography>
                  <Typography>{trx._id}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default TransactionList;
