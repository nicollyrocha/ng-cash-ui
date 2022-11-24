import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./navbar.css";
import "@fontsource/anton/400.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ModalTransaction from "../modal";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { Users } from "../../services/user";
import { useNavigate } from "react-router-dom";

export default function Navbar({ balance, setBalance }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const usernameLocal = localStorage.getItem("username");
  const navigate = useNavigate();
  const theme = createTheme({
    typography: {
      fontFamily: "Anton, Arial",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Anton';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
      },
    },
    palette: {
      primary: {
        light: "#FFE066",
        main: "#FFCC00",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  useEffect(() => {
    searchBalance();
  });

  async function searchBalance() {
    Users.getBalance(Number(localStorage.getItem("id")))
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async function onClickLogout() {
    Users.logout(Number(localStorage.getItem("id")))
      .then((data) => {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <ModalTransaction
        balance={balance}
        setBalance={setBalance}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div className="balance" style={{ fontSize: "18px" }}>
              Balance{" "}
            </div>
            <div
              className="balance"
              style={{ fontSize: "26px", marginLeft: "0.5vw" }}
            >
              R${balance}
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className="title">NG.CASH</div>
            </Typography>
            <div
              style={{
                color: "black",
                fontSize: "8px",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Button
                color="inherit"
                className="button"
                style={{ fontSize: "12px", marginRight: "1vw" }}
                onClick={() => setOpenModal(true)}
              >
                <CurrencyExchangeIcon />
              </Button>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    className="button"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      padding: 0,
                      width: "3vw",
                      height: "6vh",
                    }}
                  >
                    {usernameLocal ? usernameLocal.substring(0, 1) : ""}
                  </IconButton>
                </Tooltip>
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Button onClick={() => onClickLogout()}>Logout</Button>
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
