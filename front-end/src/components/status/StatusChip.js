import { Chip } from "@mui/material";
import { firstLetterUpper } from "../../utils/utils";
import { getStatusProps } from "./statusData";

/** @param {{status: Status, sx}} */
function StatusChip({ status, sx }) {
   const { mainColor: statusColor } = getStatusProps(status);
   return (
      <Chip
         sx={{
            color: "#fcfcfc",
            background: `${statusColor}`,
            minWidth: "120px",
            fontWeight: "bold",
            letterSpacing: "0.3px",
            ...sx,
         }}
         label={firstLetterUpper(status).replace("-", " ")}
      />
   );
}

export default StatusChip;
