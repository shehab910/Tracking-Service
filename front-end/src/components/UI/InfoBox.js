import React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";

const InfoBox = (props) => {
   const { Icon, title, value, mainColor, bgColor } = props;
   return (
      <Box
         display="flex"
         flexDirection="row"
         alignItems="center"
         gap={4}
         sx={{
            backgroundColor: `${bgColor}`,
            borderRadius: "25px",
            width: "fit-content",
            margin: "0 auto",
            padding: "1rem",
         }}
      >
         <Container
            sx={{
               maxWidth: "fit-content",
               height: "fit-content",
               padding: "0.5rem !important",
               borderRadius: "20px",
               backgroundColor: `${mainColor}`,
               textAlign: "center",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Icon fontSize="large" sx={{ color: "white" }} />
         </Container>
         <Stack justifyContent="space-evenly">
            <Typography fontSize={16} fontWeight="400" variant="p">
               {title}
            </Typography>
            <Typography fontSize={36} fontWeight="600" variant="p">
               {value}
            </Typography>
         </Stack>
      </Box>
   );
};

export default InfoBox;
