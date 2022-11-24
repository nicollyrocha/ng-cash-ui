import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { Users } from "../../../services/user";
import CircularProgress from "@mui/material/CircularProgress";

export default function ModalCadastro({
  openModal,
  setOpenModal,
  error,
  setError,
  errorMsg,
  setErrorMsg,
  setSucesso,
  setMsgSucesso,
}: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dataUser = {
    username: username,
    password: password,
    token: "",
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  async function cadastrar() {
    setIsLoading(true);
    Users.createUsers(dataUser)
      .then((data) => {
        console.log("data", data);
        setIsLoading(false);
        setUsername("");
        setPassword("");
        setOpenModal(false);
        setSucesso(true);
        setMsgSucesso("Usuário cadastrado com sucesso!");
      })
      .catch((err) => {
        console.log("aaa", err);
        setError({ ...error, cadastro: true });
        setErrorMsg({ ...errorMsg, cadastro: `${err.response.data.message}` });
        setIsLoading(false);
      });
  }

  function onChangeUsername(e: any) {
    setUsername(e.target.value);
    if (e.target.value.length < 3) {
      setError({ ...error, username: true });
      setErrorMsg({
        ...errorMsg,
        username: "Username deve conter pelo menos 3 caracteres",
      });
    } else {
      setError({ ...error, username: false });
      setErrorMsg({ ...errorMsg, username: "" });
    }
  }

  function onChangePassword(e: any) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const teste = regex.test(e.target.value);
    setPassword(e.target.value);
    if (teste === false) {
      setError({ ...error, password: true });
      setErrorMsg({
        ...errorMsg,
        password:
          "Senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número",
      });
    } else {
      setError({ ...error, password: false });
      setErrorMsg({ ...errorMsg, password: "" });
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
      <ThemeProvider theme={theme}>
        <div style={{ height: "100%", width: "100%" }}>
          <Dialog
            open={openModal}
            onClose={handleClose}
            style={{ height: "100%", width: "100%" }}
            fullWidth
          >
            <DialogTitle style={{ textAlign: "center" }}>Cadastro</DialogTitle>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      onChange={(e) => onChangeUsername(e)}
                      value={username}
                      error={error.username}
                      helperText={errorMsg.username}
                      autoFocus
                      margin="dense"
                      id="user"
                      label="Username"
                      fullWidth
                      variant="outlined"
                      style={{
                        width: "10vw",
                        boxShadow: "0px 2px 5px black",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      }}
                    />
                    <TextField
                      onChange={(e) => onChangePassword(e)}
                      value={password}
                      error={error.password}
                      helperText={errorMsg.password}
                      autoFocus
                      margin="dense"
                      id="senha"
                      label="Senha"
                      fullWidth
                      variant="outlined"
                      type={"password"}
                      style={{
                        width: "10vw",
                        boxShadow: "0px 2px 5px black",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
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
                    onClick={() => cadastrar()}
                    style={{
                      backgroundColor: "#FFCC00",
                      borderRadius: "40px",
                      boxShadow: "0px 2px 5px black",
                    }}
                    disabled={isLoading}
                  >
                    {isLoading === true ? (
                      <CircularProgress size={22} />
                    ) : (
                      "Confirmar"
                    )}
                  </Button>
                  <Button
                    onClick={() => setOpenModal(false)}
                    style={{
                      backgroundColor: "#FFCC00",
                      borderRadius: "40px",
                      boxShadow: "0px 2px 5px black",
                    }}
                  >
                    Cancelar
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
