import React from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// import { FaHome as WelcomeIcon } from "react-icons/fa";

import { isMobile } from "utils";

import useStyles from "./styles";

const StyledMenuItem = withStyles({ root: { width: "100%" } })((props) => (
  <MenuItem {...props} />
));

function Menu({
  isOpen,
  onClose,
  onOpen,
  props,
  selectedIndex,
  handleListItemClick,
}) {
  const classes = useStyles({
    isOpen,
    isMobile,
  });
  const [openPending, setOpenPending] = React.useState(false);
  const [openConfirmed, setOpenConfirmed] = React.useState(false);

  const handleClickPending = () => {
    setOpenPending(!openPending);
  };
  const handleClickConfirmed = () => {
    setOpenConfirmed(!openConfirmed);
  };
  const orgName = localStorage.getItem("orgName");
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      swipeAreaWidth={30}
      disableBackdropTransition={true}
    >
      <List className={classes.list}>
        <div className={classes.toolbar} />
        <StyledMenuItem
          button
          selected={selectedIndex === 0}
          onClick={() => handleListItemClick(0)}
          component={RouterLink}
          to="/"
        >
          <ListItemText primary="Halaman Utama" />
        </StyledMenuItem>
        {orgName === "Agen Pelayaran" && (
          <>
            {/* <StyledMenuItem
              selected={selectedIndex === 1}
              onClick={() => handleListItemClick(1)}
              component={RouterLink}
              to="/create_transaction"
            >
              <ListItemText primary="Buat Permohonan Warta" />
            </StyledMenuItem> */}
            <StyledMenuItem onClick={handleClickPending}>
              <ListItemText primary="Layanan" />
              {openPending ? <ExpandLess /> : <ExpandMore />}
            </StyledMenuItem>

            <Collapse in={openPending} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 3}
                  onClick={() => handleListItemClick(3)}
                  component={RouterLink}
                  to="/create/permohonan"
                >
                  <ListItemText primary="Buat Permohonan Warta" />
                </ListItem>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 2}
                  onClick={() => handleListItemClick(2)}
                  component={RouterLink}
                  to="/layanan/kedatangan"
                >
                  <ListItemText primary="Kedatangan" />
                </ListItem>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 4}
                  onClick={() => handleListItemClick(4)}
                  component={RouterLink}
                  to="/layanan/keberangkatan"
                >
                  <ListItemText primary="Keberangkatan" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {orgName === "Bidang Lala" && (
          <>
            <StyledMenuItem onClick={handleClickConfirmed}>
              <ListItemText primary="Keagenan" />
              {openConfirmed ? <ExpandLess /> : <ExpandMore />}
            </StyledMenuItem>
            <Collapse in={openConfirmed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 4}
                  onClick={() => handleListItemClick(4)}
                  component={RouterLink}
                  to="/keagenan/pending"
                >
                  <ListItemText primary="Belum diproses" />
                </ListItem>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 5}
                  onClick={() => handleListItemClick(5)}
                  component={RouterLink}
                  to="/keagenan/approved"
                >
                  <ListItemText primary="Sudah diproses" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {orgName === "Syahbandar" && (
          <>
            <StyledMenuItem onClick={handleClickConfirmed}>
              <ListItemText primary="SPM" />
              {openConfirmed ? <ExpandLess /> : <ExpandMore />}
            </StyledMenuItem>
            <Collapse in={openConfirmed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 4}
                  onClick={() => handleListItemClick(4)}
                  component={RouterLink}
                  to="/spm/pending"
                >
                  <ListItemText primary="Belum diproses" />
                </ListItem>
                <ListItem
                  className={classes.nested}
                  button
                  selected={selectedIndex === 5}
                  onClick={() => handleListItemClick(5)}
                  component={RouterLink}
                  to="/spm/approved"
                >
                  <ListItemText primary="Sudah diproses" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
        <StyledMenuItem
          onClick={(onClose, props.dialogLogout)}
          // component={RouterLink}
        >
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </List>
    </SwipeableDrawer>
  );
}

export default Menu;
