import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const fields = [
  { key: "propertyAddress", label: "Property address", required: true },
  { key: "petFees", label: "Pet fees", required: false, sub: "Optional, add fees if you allow pet" },
  { key: "leasingInfo", label: "Leasing info", required: true },
  { key: "parking", label: "Parking", required: false, sub: "Optional" },
  { key: "charges", label: "Charges", required: true },
  { key: "nearestEducation", label: "Nearest educational institution", required: false, sub: "Optional but recommended" },
  { key: "rentReminder", label: "Rent frequency & payment reminder", required: true },
  { key: "nearestStations", label: "Nearest stations", required: false, sub: "Optional but recommended" },
  { key: "applicationAgreement", label: "Application agreement", required: false, sub: "Optional" },
  { key: "nearestLandmark", label: "Nearest landmark", required: false, sub: "Optional but recommended" },
  { key: "aboutProperty", label: "About the property", required: false, sub: "Optional" },
  { key: "utilitiesProvider", label: "Utilities provider", required: false, sub: "Optional but recommended" },
  { key: "communityAmenity", label: "Community's amenity/features", required: false, sub: "Optional but recommended" },
];

export const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.data || {};
  const [data, setData] = useState(initialData);
  const [visibleFields, setVisibleFields] = useState(fields.map(f => f.key));

  // Split fields into two columns, but only include visible fields
  const leftFields = fields.filter((f, i) => i % 2 === 0 && visibleFields.includes(f.key));
  const rightFields = fields.filter((f, i) => i % 2 === 1 && visibleFields.includes(f.key));

  const handleDelete = (key: string) => {
    setVisibleFields(prev => prev.filter(k => k !== key));
  };

  const renderField = (f: any) => (
    <div key={f.key} className="flex flex-col border border-[#e0e0e0] rounded-lg px-4 py-3 bg-white mb-2 relative">
      <span className="font-medium text-[#272b35]">
        {f.label}
        {f.required && <span className="text-red-500 ml-1">(Required)</span>}
        {!f.required && <span className="text-gray-400 ml-1">{f.sub ? `(${f.sub})` : "(Optional)"}</span>}
      </span>
      <div className="mt-2 text-sm text-gray-700 whitespace-pre-line min-h-[32px] flex items-center">
        {data[f.key] ? (
          <>
            <span>{data[f.key]}</span>
            <button
              className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
              title="Delete"
              onClick={() => handleDelete(f.key)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 3h6a2 2 0 012 2v2H7V5a2 2 0 012-2z" />
              </svg>
            </button>
          </>
        ) : (
          <span className="text-gray-400">No data</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-4 border-b border-[#e0e0e0] bg-white">
        <img className="w-[147px] h-[39px] object-cover" alt="RentYard Logo" src="" />
        <Button variant="outline" className="px-6 py-3 rounded-xl font-medium">Save & Exit</Button>
      </header>
      <main className="flex flex-col items-center px-2 py-8">
        <Card className="w-full max-w-6xl border-2 border-[#316eed] rounded-xl shadow-none">
          <CardContent className="p-6">
            <h2 className="font-bold text-xl mb-4">Condominiums information</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
              {leftFields.map(renderField)}
              {rightFields.map(renderField)}
            </div>
          </CardContent>
        </Card>
      </main>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-12 py-6 bg-white border-t z-10">
        <Button variant="link" className="text-[#272b35] underline p-0 h-auto font-medium" onClick={() => navigate(-1)}>Back</Button>
        <Button className="px-8 py-3 rounded-xl bg-[#316eed] text-white font-semibold text-lg" onClick={() => navigate('/plan-selection')}>Next</Button>
      </footer>
    </div>
  );
};

export default Summary; 