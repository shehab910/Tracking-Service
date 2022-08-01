import { Chip, Tooltip } from "@mui/material";
import { firstLetterUpper } from "../../utils/utils";
import { getStatusProps } from "./statusData";

/** @param {{status: Status}} */
function StatusChip({ status }) {
   const { mainColor: statusColor } = getStatusProps(status);
   return (
      <Tooltip title="Status">
         <Chip
            sx={{
               color: "#fcfcfc",
               background: `${statusColor}`,
               minWidth: "120px",
               fontWeight: "bold",
               letterSpacing: "0.3px",
            }}
            label={firstLetterUpper(status).replace("-", " ")}
         />
      </Tooltip>
   );
}

export default StatusChip;
