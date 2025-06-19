import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Service from "./Service";
import Suivie from "./Suivie";
import Contact from "./Contact";
import Layout from "./Layout";
import Error404 from "../../_utils/Error404";

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<Service />} />
        <Route path="suivi" element={<Suivie />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
