import {  FaShip,FaPlane } from 'react-icons/fa';
import { RiExportLine, RiImportLine } from 'react-icons/ri';

import { MdOutlineVerified } from 'react-icons/md';
const data = [
    {
        icon: <RiExportLine />,
        heading: "export",
        detail:"exportDetail"   
    },
    {
        icon: <RiImportLine />,
        heading: "import",
        detail:"importDetail"
    },
    {
        icon: <MdOutlineVerified />,
        heading: "customsClearing",
        detail:"customsClearingDetail"
    },
    {
        icon: <FaPlane />,
        heading: "airFreight",
        detail: "airFreightDetail"
    },
    {
        icon: <FaShip />,
        heading:  "seaFreight",
        detail:"seaFreightDetail"
    },

];
export default data;