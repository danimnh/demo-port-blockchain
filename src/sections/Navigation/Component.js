import React, { useState } from "react";

import AppBar from "sections/AppBar";
import Menu from "sections/Menu";

function Navigation(handleLogout, dialogLogout, user) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index) => {
    handleMenuClose();
    setSelectedIndex(index);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Menu
        isOpen={isMenuOpen}
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
        user={user}
        dialogLogout={dialogLogout}
        onClose={handleMenuClose}
        onOpen={handleMenuOpen}
        props={handleLogout}
      />
      <AppBar
        isMenuOpen={isMenuOpen}
        selectedIndex={selectedIndex}
        onMenuOpen={handleMenuOpen}
        handleListItemClick={handleListItemClick}
        props={handleLogout}
      />
    </>
  );
}

export default Navigation;
