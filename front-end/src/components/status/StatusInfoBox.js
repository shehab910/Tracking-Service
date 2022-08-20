import { getStatusProps } from "./statusData";
import InfoBox from "../InfoBox";
/**
 * @typedef {import Status from '../../types'} Status
 */

/**
 * @param {{status: Status, value: Number, icon: any}} props
 */

const StatusInfoBox = (props) => {
   const { status, value } = props;
   const statusProps = getStatusProps(status);
   return <InfoBox {...{ ...statusProps, title: status, value: value }} />;
};

export default StatusInfoBox;
