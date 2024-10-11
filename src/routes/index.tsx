import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { HomePage } from "../pages/HomePage";

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
