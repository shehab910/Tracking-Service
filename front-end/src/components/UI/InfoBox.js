import React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { firstLetterUpper } from "../../utils/utils";

/**
 * @param {{ status: string, value: Number, mainColor: string, secondaryColor: string, icon }} props
 */
const InfoBox = (props) => {
   const { title, value, mainColor, secondaryColor, icon: Icon } = props;
   return (
      <Box
         display="flex"
         flexDirection="row"
         alignItems="center"
         gap={4}
         sx={{
            backgroundColor: `${secondaryColor}`,
            borderRadius: "25px",
            width: "fit-content",
            margin: "0 auto",
            padding: "1rem",
         }}
      >
         <Container
            sx={{
               width: "fit-content",
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
               {firstLetterUpper(title).replace("-", " ")}
            </Typography>
            <Typography fontSize={36} fontWeight="600" variant="p">
               {value}
            </Typography>
         </Stack>
      </Box>
   );
};

export default InfoBox;
