import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import Title from "../Title/index";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentNotes } from "react-icons/gr";
import { StyledHeader, DivLogo, DivIcon } from "./styles";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openLink = (link) => {
    navigate(link);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookies.remove("reactnotes_authtoken");
    openLink("/login");
  };

  return (
    <StyledHeader>
      <DivLogo onClick={() => openLink("/")}>
        <img
          className="logo"
          src={Logo}
          alt="Logo React Notes"
          loading="lazy"
        />
        <Title marginRight="10px" fontSize="18px">
          React Notes
        </Title>
      </DivLogo>

      <DivIcon>
        <IconButton onClick={handleOpenUserMenu}>
          <AccountCircleIcon
            style={{ color: "#00F39F", width: "50px", height: "50px" }}
          />
        </IconButton>
      </DivIcon>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          disabled={location.pathname === "/profile"}
          className="menu-item"
          onClick={() => openLink("/profile")}
        >
          <FaUserCircle style={{ marginRight: "0.4rem" }} />
          <Typography textAlign="center">Meu perfil</Typography>
        </MenuItem>

        <MenuItem
          disabled={location.pathname === "/"}
          className="menu-item"
          onClick={() => openLink("/")}
        >
          <GrDocumentNotes style={{ marginRight: "0.4rem" }} />
          <Typography textAlign="center">Minhas notas</Typography>
        </MenuItem>

        <MenuItem className="menu-item" onClick={handleLogout}>
          <RxExit style={{ marginRight: "0.4rem" }} />
          <Typography textAlign="center">Sair</Typography>
        </MenuItem>
      </Menu>
    </StyledHeader>
  );
}
