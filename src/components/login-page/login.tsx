import React, { useState } from "react";
import NavbarLogin from "../navbar/navbar-login";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { CircularProgress, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import ModalCadastro from "./modal/modal-cadastro";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Users } from "../../services/user";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({
    password: false,
    cadastro: false,
    username: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    password: "",
    cadastro: "",
    username: "",
  });
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        main: "#000000",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function onClickLogin() {
    console.log("aaa", user, password);
    const dataUser = { username: user, password: password, token: "" };
    setIsLoading(true);
    Users.login(dataUser)
      .then((data) => {
        console.log("data", data);
        setIsLoading(false);
        setUser("");
        setPassword("");
        console.log();
        localStorage.setItem("username", user);
        localStorage.setItem("id", `${data.id}`);
        localStorage.setItem("token", `${data.token}`);
        navigate("/home");
      })
      .catch((err) => {
        console.log("aaa", err);
        setError({ ...error, cadastro: true });
        setErrorMsg({ ...errorMsg, cadastro: `${err.response.data.message}` });
        setIsLoading(false);
      });
  }

  return (
    <>
      <ModalCadastro
        openModal={openModal}
        setOpenModal={setOpenModal}
        error={error}
        setError={setError}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setSucesso={setSucesso}
        setMsgSucesso={setMsgSucesso}
      />
      {error.cadastro === true ? (
        <>
          <Snackbar
            open={error.cadastro}
            autoHideDuration={4000}
            onClose={() => setError({ ...error, cadastro: false })}
          >
            <Alert severity="error">
              {errorMsg.cadastro !== "" ? errorMsg.cadastro : ""}
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
      <NavbarLogin />
      <ThemeProvider theme={theme}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Paper
            elevation={24}
            style={{
              display: "flex",
              width: "40vw",
              height: "45vh",
              marginLeft: "30vw",
              flexDirection: "column",
              marginTop: "20vh",
              backgroundColor: "#FFE066",
            }}
          >
            <div style={{ marginTop: "3vh" }}>Login</div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "5vh",
              }}
            >
              <TextField
                style={{
                  width: "15vw",
                  alignSelf: "center",
                  marginBottom: "2vh",
                  boxShadow: "0px 2px 5px black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => setUser(e.target.value)}
              />

              <TextField
                style={{
                  width: "15vw",
                  alignSelf: "center",
                  boxShadow: "0px 2px 5px black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
                id="outlined-basic"
                label="Senha"
                variant="outlined"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "5vh",
              }}
            >
              <Button
                onClick={() => onClickLogin()}
                style={{
                  backgroundColor: "#FFCC00",
                  borderRadius: "40px",
                  boxShadow: "0px 2px 5px black",
                }}
              >
                {isLoading === true ? <CircularProgress size={22} /> : "Login"}
              </Button>
              <Button
                onClick={() => setOpenModal(true)}
                style={{
                  backgroundColor: "#FFCC00",
                  borderRadius: "40px",
                  boxShadow: "0px 2px 5px black",
                }}
              >
                Cadastrar
              </Button>
            </div>
          </Paper>
        </div>
      </ThemeProvider>
    </>
  );
}
