import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Transactions } from "../../services/transactions";
import InfoIcon from "@mui/icons-material/Info";
import ModalInfos from "./modal-infos";
import IconButton from "@mui/material/IconButton";
import { Users } from "../../services/user";

export default function TableTransactions() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows]: Array<any> = useState();
  const [openModalInfos, setOpenModalInfos] = useState(false);
  const [dadosUser, setDadosUser]: Array<any> = useState();
  let idUser: any;

  useEffect(() => {
    getTransactions();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getTransactions() {
    Transactions.getTransactionsFromId(Number(localStorage.getItem("id")))
      .then((data) => {
        setRows(data.data.transaction);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function findUser() {
    if (idUser) {
      Users.getUsername(Number(idUser))
        .then((data) => {
          setDadosUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ModalInfos
          openModalInfos={openModalInfos}
          setOpenModalInfos={setOpenModalInfos}
          idUser={idUser}
          dadosUser={dadosUser}
        />
        <TableContainer component={Paper} style={{ marginTop: "10vh" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ fontWeight: 700, backgroundColor: "#C0C0C0" }}
                >
                  Debited
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 700, backgroundColor: "#C0C0C0" }}
                >
                  Credited
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 700, backgroundColor: "#C0C0C0" }}
                >
                  Valor
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 700, backgroundColor: "#C0C0C0" }}
                >
                  Data
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ? rows.map((row: any) => (
                    <TableRow>
                      <TableCell align="center">
                        <div style={{ fontWeight: 700, display: "inline" }}>
                          ID:{" "}
                        </div>
                        {row.debitedaccountid}
                        <IconButton
                          onClick={() => (
                            (idUser = row.debitedaccountid),
                            findUser(),
                            setOpenModalInfos(true)
                          )}
                        >
                          <InfoIcon
                            style={{
                              fontSize: 15,
                              color: "#00BFFF",
                            }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <div style={{ fontWeight: 700, display: "inline" }}>
                          ID:{" "}
                        </div>
                        {row.creditedaccountid}
                        <InfoIcon
                          style={{
                            cursor: "pointer",
                            fontSize: 15,
                            color: "#00BFFF",
                          }}
                          onClick={() => (
                            (idUser = row.creditedaccountid),
                            findUser(),
                            setOpenModalInfos(true)
                          )}
                        />
                      </TableCell>
                      <TableCell align="center">{row.value}</TableCell>
                      <TableCell align="center">
                        {`${row.createdat?.substring(
                          8,
                          10
                        )}/${row.createdat?.substring(
                          5,
                          7
                        )}/${row.createdat?.substring(
                          0,
                          4
                        )} - ${row.createdat?.substring(11, 19)}`}
                      </TableCell>
                    </TableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
