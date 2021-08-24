import React from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

// import ListItemIcon from "@material-ui/core/ListItemIcon";
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
  // const [selectedIndex, setSelectedIndex] = React.useState(0);

  // const handleListItemClick = (index) => {
  //   onClose();
  //   setSelectedIndex(index);
  // };

  const handleClickPending = () => {
    setOpenPending(!openPending);
  };
  const handleClickConfirmed = () => {
    setOpenConfirmed(!openConfirmed);
  };
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
          {/* <ListItemIcon>
            <WelcomeIcon />
          </ListItemIcon> */}
          <ListItemText primary="Halaman Utama" />
        </StyledMenuItem>
        <StyledMenuItem
          selected={selectedIndex === 1}
          onClick={() => handleListItemClick(1)}
          component={RouterLink}
          to="/create_transaction"
        >
          <ListItemText primary="Tambah Transaksi" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClickPending}>
          <ListItemText primary="Transaksi Masuk" />
          {openPending ? <ExpandLess /> : <ExpandMore />}
        </StyledMenuItem>
        <Collapse in={openPending} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              className={classes.nested}
              button
              selected={selectedIndex === 2}
              onClick={() => handleListItemClick(2)}
              component={RouterLink}
              to="/transactions/inbox/pending"
            >
              <ListItemText primary="Transaksi Tertunda" />
            </ListItem>
            <ListItem
              className={classes.nested}
              button
              selected={selectedIndex === 3}
              onClick={() => handleListItemClick(3)}
              component={RouterLink}
              to="/transactions/inbox/confirmed"
            >
              <ListItemText primary="Transaksi Terkonfirmasi" />
            </ListItem>
          </List>
        </Collapse>
        <StyledMenuItem onClick={handleClickConfirmed}>
          <ListItemText primary="Transaksi Keluar" />
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
              to="/transactions/sent/pending"
            >
              <ListItemText primary="Transaksi Tertunda" />
            </ListItem>
            <ListItem
              className={classes.nested}
              button
              selected={selectedIndex === 5}
              onClick={() => handleListItemClick(5)}
              component={RouterLink}
              to="/transactions/sent/confirmed"
            >
              <ListItemText primary="Transaksi Terkonfirmasi" />
            </ListItem>
          </List>
        </Collapse>
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
