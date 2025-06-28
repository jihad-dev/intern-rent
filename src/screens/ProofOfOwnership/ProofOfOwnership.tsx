import { Upload, AlertCircle, Home, Building2, Building, Key, User, Briefcase } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const ProofOfOwnership = (): JSX.Element => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      }
    }
  };

  const isGetStartedEnabled = uploadedFile && termsAccepted;

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-20 py-4 border-b border-[#e0e0e0]">
        <img
          className="w-[147.28px] h-[38.78px] object-cover"
          alt="RentYard Logo"
          src="/image-4.png"
        />
        <Button variant="outline" className="px-6 py-3 rounded-xl">
          Exit
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col px-20 py-8 gap-8 max-w-4xl">
        {/* Property Type Section */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
            Property type
          </h2>

          <div className="flex gap-6">
            <Card className="flex-1 border border-solid border-[#e0e0e0] rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#f8faff] rounded-lg">
                    <Home className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                      Single House Property
                    </h3>
                    <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                      Single unit house for single family
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border border-solid border-[#e0e0e0] rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#f8faff] rounded-lg">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                      Apartments complex
                    </h3>
                    <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                      Multiple unit house for families
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border border-solid border-[#316eed] bg-[#f8faff] rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#f8faff] rounded-lg">
                    <Building className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                      Condominiums
                    </h3>
                    <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                      Multiple unit house for families
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Role Selection Section */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
            Select your role
          </h2>

          <div className="flex gap-6">
            <Card className="flex-1 border border-solid border-[#316eed] bg-[#f8faff] rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#f8faff] rounded-lg">
                    <Key className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                      Landlord
                    </h3>
                    <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                      Owner of the property
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border border-solid border-[#e0e0e0] rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#f8faff] rounded-lg">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                      Realtor
                    </h3>
                    <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                      Manage property on behalf on owner
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border border-solid border-[#e0e0e0] rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#f8faff] rounded-lg">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                      Property management company
                    </h3>
                    <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                      For management company
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Proof of Ownership Section */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
            Proof of ownership
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                Ownership doc*
              </label>
              
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer ${
                  dragActive 
                    ? "border-[#316eed] bg-[#f8faff]" 
                    : uploadedFile 
                    ? "border-[#316eed] bg-[#f8faff]" 
                    : "border-[#e0e0e0] bg-[#f8f9fa]"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-[#fff3cd] rounded-lg">
                    <Upload className="w-6 h-6 text-[#856404]" />
                  </div>
                  
                  {uploadedFile ? (
                    <div className="text-center">
                      <p className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                        {uploadedFile.name}
                      </p>
                      <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                        File uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35] mb-1">
                        Drop your file here or click to browse
                      </p>
                      <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                        (Pdf only)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#316eed] border-[#e0e0e0] rounded focus:ring-[#316eed]"
              />
              <label 
                htmlFor="terms" 
                className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-[#272b35] cursor-pointer"
              >
                Accept RentYard property adding terms & condition
              </label>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-20 py-6 bg-white shadow-shaddow-1">
        <Button variant="link" className="text-[#272b35] underline p-0 h-auto">
          Back
        </Button>
        <Button
          className={`px-6 py-3 rounded-xl ${!isGetStartedEnabled ? "opacity-[0.32]" : ""}`}
          disabled={!isGetStartedEnabled}
        >
          Get started
        </Button>
      </footer>
    </div>
  );
};