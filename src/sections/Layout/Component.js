import React, { useEffect } from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

import Content from "sections/Content";
import Copyright from "sections/Copyright";
import Navigation from "sections/Navigation";

import useStyles from "./styles";
const Layout = () => {
  const localLoggedIn = localStorage.getItem("isLoggedIn");
  const classes = useStyles();
  const [logoutVisible, setLogoutVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(localLoggedIn);
  const [user, setUser] = React.useState([]);
  const history = useHistory();

  const handleLogin = async (user) => {
    setIsLoading(true);
    try {
      const resp = await axios.post("login", user);
      await console.log(resp);
      await setIsLoading(false);
      await setLoggedIn(true);
      await alert(resp.data.message);
      if (resp.data.user.username === undefined) {
        return;
      }
      await localStorage.setItem("token", resp.data.token);
      await localStorage.setItem("username", resp.data.user.username);
      await localStorage.setItem("isLoggedIn", true);
      await history.replace("/");
    } catch (err) {
      alert(err.response.data.message);
      history.push("/login");
      setIsLoading(false);
      setLoggedIn(false);
    }
  };

  const handleSignUp = async (value) => {
    setIsLoading(true);
    try {
      const resp = await axios.post("register", value);
      await console.log(resp);
      await setIsLoading(false);
      await localStorage.setItem("token", resp.data.message.token);
      await alert(resp.data.message.message);
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      };

      let arrayValue = [JSON.stringify(value)];

      let body = {
        fcn: "CreateUser",
        peers: [
          "peer0.penangkar.example.com",
          "peer0.petani.example.com",
          "peer0.pengumpul.example.com",
          "peer0.pedagang.example.com",
        ],
        chaincodeName: "bawangmerah_cc",
        channelName: "mychannel",
        args: arrayValue,
      };
      const respBM = await axios.post(
        "sc/channels/mychannel/chaincodes/bawangmerah_cc/",
        body,
        config
      );
      await console.log(respBM);
      await history.replace("/login");
      await localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const dialogLogout = async () => {
    setLogoutVisible(true);
  };

  const handleLogout = async () => {
    //props:user
    try {
      // const resp = await axios.get("logout", user);
      // await console.log(resp);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("orgName");

      setLoggedIn(false);
      setUser([]);
      localStorage.setItem("isLoggedIn", false);
      // await alert(JSON.stringify(resp.data.message));
      history.replace("/");

      setLogoutVisible(false);
    } catch (err) {
      alert(err);
      history.replace("/");
      setLogoutVisible(false);
    }
  };

  const getUser = async () => {
    setIsLoading(true);
    if (localStorage.getItem("token") == null) {
      setLoggedIn(false);
      setIsLoading(false);
      return;
    }
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const resp = await axios.get("user", config);
      console.log("Berhasil login sebagai " + resp.data.data.orgName);
      localStorage.setItem("orgName", resp.data.data.orgName);
      await setIsLoading(false);
      await setLoggedIn(true);
      await localStorage.setItem("isLoggedIn", true);
      await setUser(resp.data.data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setUser([]);
      setLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
      localStorage.removeItem("orgName");
      localStorage.removeItem("token");
    }
  };

  const refreshLayout = () => {
    getUser();
  };

  useEffect(() => {}, []);
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}
      {/* debug login */}
      {isLoggedIn && (
        <Navigation
          handleLogout={handleLogout}
          dialogLogout={dialogLogout}
          user={user}
        />
      )}
      <Box component="main" className={classes.wrapper}>
        <Box className={classes.spacer} />
        <Box className={classes.content}>
          <Content
            user={user}
            isLoggedIn={isLoggedIn}
            refreshLayout={refreshLayout}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
          />
          <Copyright />
        </Box>
      </Box>

      <Dialog
        open={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Keluar dari Blockchain Port?"}
        </DialogTitle>

        <DialogActions>
          <Button variant="outlined" onClick={() => setLogoutVisible(false)}>
            Batal
          </Button>
          <Button variant="outlined" onClick={() => handleLogout()} autoFocus>
            Keluar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
