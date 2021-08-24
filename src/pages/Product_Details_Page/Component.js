import React from "react";

import {
  Grid,
  Typography,
  Container,
  Button,
  // Card,
  // CardContent,
  // CardActionArea,
} from "@material-ui/core";

import Meta from "components/Meta";

import useStyles from "./styles";

function ProductDetailPage(props) {
  const classes = useStyles();
  console.log(props.location.trxProps.trxType);
  return (
    <>
      <Meta title="ProductDetailPage" description="ProductDetailPage" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid direction="column" container spacing={1}>
          <Grid item xs={12}>
            <Button onClick={() => props.history.goBack()}>{"<-"}</Button>
            <Typography variant="h6">Detail Transaksi</Typography>

            <Grid container className={classes.rowDetail} xs={12}>
              <Grid xs={6}>
                <Typography variant="body1">ID Produk</Typography>
              </Grid>
              <Grid xs={6}>
                <p>{props.match.params.batchId}</p>
              </Grid>
            </Grid>

            <Grid container className={classes.rowDetail} xs={12}>
              <Grid xs={6}>
                <Typography variant="body1">Kategori Transaksi</Typography>
              </Grid>
              <Grid xs={6}>
                <p>{props.location.trxProps.trxType}</p>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={classes.rowDetail} xs={12}>
            <Grid xs={6}>
              <Typography variant="body1">Tanggal dilaporkan</Typography>
            </Grid>
            <Grid xs={6}>
              <p>
                {props.location.trxProps.trxDate}{" "}
                {props.location.trxProps.trxTime}
              </p>
              <p></p>
            </Grid>
          </Grid>

          <Grid container className={classes.rowDetail} xs={12}>
            <Grid xs={6}>
              <Typography variant="body1">Pelaku Transaksi</Typography>
            </Grid>
            <Grid xs={6}>
              <p> {props.location.trxProps.trxSender}</p>
            </Grid>
          </Grid>

          {/* <Grid container className={classes.rowDetail} xs={12}>
            <Grid xs={6}>
              <Typography variant="body1">ID Produk</Typography>
            </Grid>
            <Grid xs={6}>
              <p>{props.match.params.batchId}</p>
            </Grid>
          </Grid> */}

          <Button
            className={{ width: "300px", marginTop: 10 }}
            variant="contained"
            color="primary"
          >
            Konfirmasi Transaksi
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetailPage;
