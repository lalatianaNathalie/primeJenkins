import React from "react";
import { Route, Routes } from "react-router-dom";
import ALayout from "./ALayout";

import Dashboard from "./Dashboard";
import ClientPage from "./ClientPage";
import EmployePage from "./EmployePage";
import TransportAeriennePage from "./TransportAeriennePage";
import TransportMaritimePage from "./TransportMaritimePage";


import Error404 from "../../_utils/Error404";
import MarchandisePage from "./MarchandisePage";
import SuiviExp from "./SuiviExp";
import AgentP from "./AgentP";
import TransactionA from "./TransactionA";
import TransactionM from "./TransactionM";
import MarchandiseHWB from "./MarchandiseHwb";
import TransactionP from "./Transaction";
import TransactionHblP from "./TransactionHblP";
import TransactioHwb from "./TransactionHwb";
import SuiviP from "./Suivi";
import Profil from "./Profil";
import EditProfilP from "./EditProfil";
import TransportPage from "./TransportPage";
import DocumentPage from "./DocumentPage";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ALayout />}>         
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="employe" element={<EmployePage />} />
        <Route path="transportaerienne" element={<TransportAeriennePage />} />
        <Route path="transportmaritime" element={<TransportMaritimePage />} />
        <Route path="marchandise" element={<MarchandisePage />} />
        <Route path="suivi" element={<SuiviExp />} />
        <Route path="agent" element={<AgentP />} />
        <Route path="transport" element={<TransportPage />} />

        <Route path="transaction" element={<TransactionP />} />
        <Route path="transactionaerienne" element={<TransactionA />} />
        <Route path="transactionmaritime" element={<TransactionM />} />
        <Route path="transactionhbl" element={<TransactionHblP />} />
        <Route path="transactionHwb" element={<TransactioHwb />} />
        <Route path="document" element={<DocumentPage />} />


        <Route path="marchandisehwb" element={<MarchandiseHWB />} />

        <Route path="suivi" element={<SuiviP />} />
        <Route path="profil" element={<Profil />} />
        <Route path="profiledit" element={<EditProfilP />} />
        <Route path="*" element={<Error404/>} />

      </Route>
    </Routes>
  );
};

export default AdminRouter;
