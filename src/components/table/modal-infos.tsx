import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalInfos({
  openModalInfos,
  setOpenModalInfos,
  dadosUser,
}: any) {
  return (
    <div>
      <Dialog
        open={openModalInfos}
        onClose={() => setOpenModalInfos(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Informações"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ID: {dadosUser ? dadosUser.user[0].id : ""}
            <br />
            Username: {dadosUser ? dadosUser.user[0].username : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModalInfos(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
