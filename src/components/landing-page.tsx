import React, { useState } from "react";
import TableTransactions from "./table/table-transacoes";
import Navbar from "./navbar/navbar";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import NavbarLogin from "./navbar/navbar-login";

function LandingPage() {
  const [balance, setBalance] = useState(0);

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
        main: "#000000",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          {" "}
          <Navbar balance={balance} setBalance={setBalance} />
          <TableTransactions />{" "}
        </>
      ) : (
        <>
          <NavbarLogin />
          <ThemeProvider theme={theme}>
            <div style={{ fontSize: "24px", marginTop: "40vh" }}>
              Faça login para acessar o site.
            </div>
          </ThemeProvider>
        </>
      )}
    </>
  );
}

export default LandingPage;
