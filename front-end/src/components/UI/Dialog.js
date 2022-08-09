import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppbarSpacer } from "../layout/Layout";

export default function ResponsiveDialog(props) {
   const { open, setOpen, children, dialogActions, dialogTitle, dialogHint } =
      props;
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Dialog
         fullScreen={fullScreen}
         open={open}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
         fullWidth
      >
         {fullScreen && <AppbarSpacer />}
         <DialogTitle id="responsive-dialog-title">
            <Box display="flex" alignItems="center">
               <Typography variant="h5" flexGrow={1}>
                  {dialogTitle}
               </Typography>

               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                     color: (theme) => theme.palette.grey[500],
                  }}
               >
                  <CloseIcon />
               </IconButton>
            </Box>
         </DialogTitle>
         <DialogContent dividers>
            {dialogHint && (
               <>
                  <DialogContentText>{dialogHint}</DialogContentText>
                  <br />
               </>
            )}
            {children}
         </DialogContent>
         {dialogActions && (
            <DialogActions>
               {dialogActions}
               {/* <Button autoFocus onClick={handleClose}>
               Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
               Agree
            </Button> */}
            </DialogActions>
         )}
      </Dialog>
   );
}
