import {
   Button,
   ButtonGroup,
   Card,
   CardActions,
   CardContent,
   InputLabel,
   Stack,
   Tooltip,
   Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { getSocialMessageUrl } from "../../utils/utils";

const testClientData = {
   name: "Shehab",
   phone: "+201223511184",
   email: "example@example.com",
   address: "123 st. Nasr City",
   facebook_id: "fake.account.2022",
   instagram_id: "fake.account.2022",
   cid: "2",
};

const ClientCard = (Client) => {
   Client = { ...testClientData };
   const { name, phone, email, address, facebook_id, instagram_id, cid } =
      Client;
   return (
      <Card variant="outlined" sx={{ m: 2, minWidth: "fit-content" }}>
         <CardContent>
            <Stack gap={2} width="fit-content">
               <Tooltip arrow title="Client Name - ID">
                  <Typography variant="h6" color="text">
                     {name} - {cid}
                  </Typography>
               </Tooltip>
               <Tooltip arrow title="Profits from client">
                  <Typography sx={{ fontSize: 14 }} color="green">
                     EGP 20.00
                  </Typography>
               </Tooltip>
               <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {address}
               </Typography>
               <Typography
                  component="a"
                  href={`email:${email}`}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
               >
                  {email}
               </Typography>
            </Stack>
         </CardContent>
         <CardActions>
            <Stack gap={1}>
               <Button
                  startIcon={<LocalPhoneIcon />}
                  href={`tel:${phone}`}
                  target="_blank"
                  sx={{ width: "fit-content" }}
                  variant="contained"
               >
                  {phone}
               </Button>
               <InputLabel>Chat on:</InputLabel>
               {/* //! ISSUE: border color needs to be changed */}
               <ButtonGroup variant="contained" fullWidth>
                  <Button
                     sx={{
                        backgroundColor: "#25D366",
                        "&:hover": {
                           backgroundColor: "#25D366cc",
                        },
                     }}
                     startIcon={<WhatsAppIcon />}
                     href={`${getSocialMessageUrl("whatsapp", phone)}`}
                     target="_blank"
                  >
                     WhatsApp
                  </Button>
                  {!!facebook_id && (
                     <Button
                        sx={{
                           backgroundColor: "#4267B2",
                           "&:hover": {
                              backgroundColor: "#4267b2cc",
                           },
                        }}
                        startIcon={<FacebookIcon />}
                        href={`${getSocialMessageUrl("facebook", facebook_id)}`}
                        target="_blank"
                     >
                        Facebook
                     </Button>
                  )}
                  {!!instagram_id && (
                     <Button
                        sx={{
                           background:
                              "linear-gradient(45deg, #fd1d1d,#e1306c,#c13584,#833ab4,#5851db,#405de6);",
                           "&:hover": {
                              background:
                                 "linear-gradient(45deg, #fd1d1dcc,#e1306ccc,#c13584cc,#833ab4cc,#5851dbcc,#405de6cc)",
                           },
                           color: "white",
                        }}
                        // color="inherit"
                        startIcon={<InstagramIcon color="white" />}
                        href={`${getSocialMessageUrl(
                           "instagram",
                           instagram_id
                        )}`}
                        target="_blank"
                     >
                        Instagram
                     </Button>
                  )}
               </ButtonGroup>
            </Stack>
         </CardActions>
      </Card>
   );
};

export default ClientCard;
