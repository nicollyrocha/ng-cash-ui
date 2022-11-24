import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EastIcon from "@mui/icons-material/East";
import { Transactions } from "../services/transactions";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export default function ModalTransaction({
  balance,
  openModal,
  setOpenModal,
}: any) {
  const [creditedAccount, setCreditedAccount] = useState("");
  const [valueToSend, setValueToSend] = useState(0);
  const [error, setError] = useState({
    value: false,
    transaction: false,
    user: false,
  });
  const [msgError, setMsgError] = useState({
    value: "",
    transaction: "",
    user: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState("");

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function onChangeValue(e: any) {
    let number = e.target.value.replace(/\D/g, "");
    e.target.value = number.slice(0, -2) + "." + number.slice(-2);
    setValueToSend(Number(number.slice(0, -2) + "." + number.slice(-2)));
    if (
      Number(number.slice(0, -2) + "." + number.slice(-2)) > Number(balance)
    ) {
      setError({ ...error, value: true });
      setMsgError({ ...msgError, value: "Saldo insuficiente." });
    } else if (
      Number(number.slice(0, -2) + "." + number.slice(-2)) <= Number(balance)
    ) {
      setError({ ...error, value: false });
      setMsgError({ ...msgError, value: "" });
    }
  }

  function onChangeUser(e: any) {
    if (e.target.value.length < 3) {
      setError({ ...error, user: true });
      setMsgError({
        ...msgError,
        user: "Username deve conter pelo menos 3 caracteres",
      });
    } else {
      setError({ ...error, user: false });
      setMsgError({ ...msgError, user: "" });
      setCreditedAccount(e.target.value);
    }
  }

  async function confirmaTransferencia() {
    if (error.value === false && valueToSend !== 0 && creditedAccount !== "") {
      const dataTransaction = {
        creditedAccount: creditedAccount,
        value: valueToSend,
        debitedAccount: Number(localStorage.getItem("id")),
        balance: balance,
      };
      setIsLoading(true);
      Transactions.transferir(dataTransaction)
        .then((data) => {
          setSucesso(true);
          setMsgSucesso("Transação realizada com sucesso!");
          setIsLoading(false);
          setValueToSend(0);
          setCreditedAccount("");
          setOpenModal(false);
          window.location.reload();
        })
        .catch((err) => {
          setError({ ...error, transaction: true });
          setSucesso(false);
          setMsgSucesso("");
          setMsgError({
            ...msgError,
            transaction: `${err.response.data.message}`,
          });
          setIsLoading(false);
        });
    } else {
      setError({ ...error, transaction: true });
      setMsgError({
        ...msgError,
        transaction: `Preencha todos os campos`,
      });
    }
  }

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
      {error.transaction === true ? (
        <>
          <Snackbar
            open={error.transaction}
            autoHideDuration={4000}
            onClose={() => setError({ ...error, transaction: false })}
          >
            <Alert severity="error">
              {msgError.transaction !== "" ? msgError.transaction : ""}
            </Alert>
          </Snackbar>
        </>
      ) : null}
      {sucesso === true ? (
        <>
          <Snackbar
            open={sucesso}
            autoHideDuration={4000}
            onClose={() => setSucesso(false)}
          >
            <Alert severity="success">
              {msgSucesso !== "" ? msgSucesso : ""}
            </Alert>
          </Snackbar>
        </>
      ) : null}
      <ThemeProvider theme={theme}>
        <div>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            style={{ height: "100%", width: "100%" }}
            fullWidth
          >
            <CancelOutlinedIcon
              onClick={() => setOpenModal(false)}
              style={{
                cursor: "pointer",
                alignSelf: "self-end",
                margin: "1vh",
                marginBottom: 0,
              }}
            />
            <DialogTitle style={{ textAlign: "center" }}>
              Transferir
            </DialogTitle>
            <div
              style={{
                backgroundColor: "#FFE066",
                width: "32vw",
                alignSelf: "center",
                marginBottom: "8vh",
                borderRadius: "11px",
                boxShadow: "0px 2px 5px black",
              }}
            >
              <div
                style={{
                  border: "solid",
                  margin: "5px",
                  borderRadius: "11px",
                  borderWidth: "0.5px",
                }}
              >
                <DialogContent
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    paddingTop: "3vh",
                    paddingBottom: "5vh",
                  }}
                >
                  <TextField
                    autoFocus
                    error={error.value}
                    helperText={msgError.value}
                    onChange={(e) => onChangeValue(e)}
                    margin="dense"
                    id="valor"
                    label="Valor"
                    fullWidth
                    variant="outlined"
                    style={{
                      width: "10vw",
                      boxShadow: "0px 2px 5px black",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  />
                  <EastIcon />
                  <TextField
                    autoFocus
                    error={error.user}
                    helperText={msgError.user}
                    onChange={(e) => onChangeUser(e)}
                    margin="dense"
                    id="user"
                    label="Usuário"
                    fullWidth
                    variant="outlined"
                    style={{
                      width: "10vw",
                      boxShadow: "0px 2px 5px black",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  />
                </DialogContent>
                <DialogActions
                  style={{
                    marginBottom: "1vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={() => confirmaTransferencia()}
                    style={{
                      backgroundColor: "#FFCC00",
                      borderRadius: "40px",
                      boxShadow: "0px 2px 5px black",
                    }}
                  >
                    {isLoading === true ? (
                      <CircularProgress size={22} />
                    ) : (
                      "Confirmar"
                    )}
                  </Button>
                </DialogActions>
              </div>
            </div>
          </Dialog>
        </div>
      </ThemeProvider>
    </>
  );
}
