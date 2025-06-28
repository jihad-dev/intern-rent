import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertySelectionFlow } from "./screens/PropertySelectionFlow/PropertySelectionFlow";
import CondominiumInfo from "./screens/CondominiumInfo";
import { ProofOfOwnership } from "./screens/ProofOfOwnership";
import { Summary } from "./screens/CondominiumInfo";
import PlanSelection from "./screens/PlanSelection/PlanSelection";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertySelectionFlow />} />
        <Route path="/condominium-info" element={<CondominiumInfo />} />
        <Route path="/proof-of-ownership" element={<ProofOfOwnership />} />
        <Route path="/condominium-summary" element={<Summary />} />
        <Route path="/plan-selection" element={<PlanSelection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);