import React, { useState } from "react";
import {
  Home,
  Building2,
  Building,
  Key,
  User,
  Briefcase,
  Upload,
  ChevronDown,
  Check
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";

type PropertyType = "single-house" | "apartments" | "condominiums";
type Role = "landlord" | "realtor" | "management";

export const PropertySelectionFlow = (): JSX.Element => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form data states
  const [ownershipDoc, setOwnershipDoc] = useState<File | null>(null);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [realtorDoc, setRealtorDoc] = useState<File | null>(null);
  const [realtorAgreement, setRealtorAgreement] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyIdentifier, setCompanyIdentifier] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [managementAgreement, setManagementAgreement] = useState<File | null>(null);
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptUnit, setAptUnit] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const propertyTypes = [
    {
      id: "single-house" as PropertyType,
      title: "Single House Property",
      description: "Single unit house for single family",
      icon: <Home className="w-7 h-7" />,
    },
    {
      id: "apartments" as PropertyType,
      title: "Apartments complex",
      description: "Multiple unit house for families",
      icon: <Building2 className="w-7 h-7" />,
    },
    {
      id: "condominiums" as PropertyType,
      title: "Condominiums",
      description: "Multiple unit house for families",
      icon: <Building className="w-7 h-7" />,
    },
  ];

  const roles = [
    {
      id: "landlord" as Role,
      title: "Landlord",
      description: "Owner of the property",
      icon: <Key className="w-7 h-7" />,
    },
    {
      id: "realtor" as Role,
      title: "Realtor",
      description: "Manage property on behalf on owner",
      icon: <User className="w-7 h-7" />,
    },
    {
      id: "management" as Role,
      title: "Property management company",
      description: "For management company",
      icon: <Briefcase className="w-7 h-7" />,
    },
  ];

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const FileUploadArea = ({
    file,
    onFileChange,
    label
  }: {
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
        {label}
      </label>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${file
            ? "border-[#316eed] bg-[#f8faff]"
            : "border-[#e0e0e0] hover:border-[#316eed]"
          } ${label.includes('*') && !file ? 'border-red-300 bg-red-50' : ''}`}
        onClick={() => document.getElementById(`file-${label}`)?.click()}
      >
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-[#316eed] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-[#316eed]">{file.name}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-[#f0f0f0] rounded-full flex items-center justify-center">
              <Upload className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-gray-400">Click to upload file</span>
          </div>
        )}
        <input
          id={`file-${label}`}
          type="file"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
      {label.includes('*') && !file && (
        <p className="text-red-500 text-xs">This field is required</p>
      )}
    </div>
  );

  const isFormValid = () => {
    if (!selectedPropertyType || !selectedRole || !termsAccepted) return false;

    switch (selectedRole) {
      case "landlord":
        return !!ownershipDoc;
      case "realtor":
        return licenseNumber.trim() !== "" && !!realtorDoc && !!realtorAgreement;
      case "management":
        return companyName.trim() !== "" &&
          companyIdentifier.trim() !== "" &&
          jobTitle.trim() !== "" &&
          !!managementAgreement &&
          country.trim() !== "" &&
          streetAddress.trim() !== "" &&
          phoneNumber.trim() !== "" &&
          contactEmail.trim() !== "" &&
          city.trim() !== "" &&
          state.trim() !== "" &&
          zipCode.trim() !== "";
      default:
        return false;
    }
  };


  const renderRoleSpecificForm = () => {
    switch (selectedRole) {
      case "landlord":
        return (
          <section className="flex flex-col gap-6">
            <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
              Proof of ownership
            </h2>
            <div className="max-w-md">
              <FileUploadArea
                file={ownershipDoc}
                onFileChange={(e) => handleFileUpload(e, setOwnershipDoc)}
                label="Ownership doc*"
              />
            </div>
          </section>
        );

      case "realtor":
        return (
          <section className="flex flex-col gap-6">
            <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
              Realtor verification
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Lenience number*
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="000000000000"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${licenseNumber.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {licenseNumber.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <FileUploadArea
                file={realtorDoc}
                onFileChange={(e) => handleFileUpload(e, setRealtorDoc)}
                label="Additional documents for realtor"
              />
              <FileUploadArea
                file={realtorAgreement}
                onFileChange={(e) => handleFileUpload(e, setRealtorAgreement)}
                label="Agreement with landlord*"
              />
            </div>
          </section>
        );

      case "management":
        return (
          <section className="flex flex-col gap-6">
            <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
              Company & office info
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {/* Row 1 */}
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Company name*
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Runyan trade center"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${companyName.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {companyName.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Company Identifier(EIN/TIN)*
                </label>
                <input
                  type="text"
                  value={companyIdentifier}
                  onChange={(e) => setCompanyIdentifier(e.target.value)}
                  placeholder="Name"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${companyIdentifier.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {companyIdentifier.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Your job title*
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Manager"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${jobTitle.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {jobTitle.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <FileUploadArea
                file={managementAgreement}
                onFileChange={(e) => handleFileUpload(e, setManagementAgreement)}
                label="Agreement with landlord/owner*"
              />

              {/* Row 2 */}
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Country/Region*
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none appearance-none bg-white ${country.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                      }`}
                  >
                    <option value="">Choose country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {country.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Street address*
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="111 Austin Ave"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${streetAddress.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {streetAddress.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Apt, suit, unit (if applicable)
                </label>
                <input
                  type="text"
                  value={aptUnit}
                  onChange={(e) => setAptUnit(e.target.value)}
                  placeholder="3050"
                  className="px-4 py-3 border border-[#e0e0e0] rounded-xl focus:border-[#316eed] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Phone number*
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 py-3 border border-r-0 border-[#e0e0e0] rounded-l-xl bg-gray-50">
                    <div className="w-6 h-4 bg-red-500 rounded-sm mr-2"></div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+880"
                    className={`flex-1 px-4 py-3 border rounded-r-xl focus:border-[#316eed] focus:outline-none ${phoneNumber.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                      }`}
                  />
                </div>
                {phoneNumber.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>

              {/* Row 3 */}
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Contact email*
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="majarul2025@gmail.com"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${contactEmail.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {contactEmail.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  City/Town*
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Dallas"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${city.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {city.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  State/Territory*
                </label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none appearance-none bg-white ${state.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                      }`}
                  >
                    <option value="">Choose state</option>
                    <option value="TX">Texas</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {state.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                  Zip code*
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="75061"
                  className={`px-4 py-3 border rounded-xl focus:border-[#316eed] focus:outline-none ${zipCode.trim() === "" ? "border-red-300 bg-red-50" : "border-[#e0e0e0]"
                    }`}
                />
                {zipCode.trim() === "" && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-20 py-4 border-b border-[#e0e0e0]">

        <h2>RentYard Logo</h2>
        <Button variant="outline" className="px-6 py-3 rounded-xl">
          Exit
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col px-20 py-8 gap-8 pb-32">
        {/* Property Type Section */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
            Property type
          </h2>

          <div className="flex gap-6">
            {propertyTypes.map((property) => (
              <Card
                key={property.id}
                className={`flex-1 border border-solid border-[#e0e0e0] rounded-xl cursor-pointer hover:border-[#316eed] transition-colors ${selectedPropertyType === property.id ? "border-[#316eed] bg-[#f8faff]" : ""
                  }`}
                onClick={() => setSelectedPropertyType(property.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-[#f8faff] rounded-lg">
                      {property.icon}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                        {property.title}
                      </h3>
                      <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                        {property.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Role Selection Section */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
            Select your role
          </h2>

          <div className="flex gap-6">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`flex-1 border border-solid border-[#e0e0e0] rounded-xl cursor-pointer hover:border-[#316eed] transition-colors ${selectedRole === role.id ? "border-[#316eed] bg-[#f8faff]" : ""
                  }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-[#f8faff] rounded-lg">
                      {role.icon}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-body-body-text-1 font-[600] text-[16px] text-[#272b35]">
                        {role.title}
                      </h3>
                      <p className="font-body-text-subtitle-caption-subtitle-2 font-[500] text-[14px] text-neutralblackblack-300">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Role-specific form */}
        {selectedRole && renderRoleSpecificForm()}

        {/* Terms and Conditions */}
        {selectedRole && (
          <div className="flex items-start gap-3">
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
        )}
      </main>

      {/* Validation Message */}
      {selectedRole && !isFormValid() && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 shadow-lg max-w-md">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="flex-1">
              <p className="text-yellow-800 text-sm font-medium mb-1">
                If you do not complete the required fields, the Next button will not work.
              </p>
              {selectedRole && (
                <div className="text-yellow-700 text-xs">
                  <p className="font-medium mb-1">Missing required fields:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {!selectedPropertyType && <li>Property type selection</li>}
                    {!termsAccepted && <li>Terms and conditions acceptance</li>}
                    {selectedRole === "landlord" && !ownershipDoc && <li>Ownership document</li>}
                    {selectedRole === "realtor" && (
                      <>
                        {!licenseNumber.trim() && <li>License number</li>}
                        {!realtorDoc && <li>Additional documents for realtor</li>}
                        {!realtorAgreement && <li>Agreement with landlord</li>}
                      </>
                    )}
                    {selectedRole === "management" && (
                      <>
                        {!companyName.trim() && <li>Company name</li>}
                        {!companyIdentifier.trim() && <li>Company identifier (EIN/TIN)</li>}
                        {!jobTitle.trim() && <li>Job title</li>}
                        {!managementAgreement && <li>Management agreement</li>}
                        {!country.trim() && <li>Country/Region</li>}
                        {!streetAddress.trim() && <li>Street address</li>}
                        {!phoneNumber.trim() && <li>Phone number</li>}
                        {!contactEmail.trim() && <li>Contact email</li>}
                        {!city.trim() && <li>City/Town</li>}
                        {!state.trim() && <li>State/Territory</li>}
                        {!zipCode.trim() && <li>Zip code</li>}
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-20 py-6 bg-white shadow-shaddow-1">
        <Button variant="link" className="text-[#272b35] underline p-0 h-auto">
          Back
        </Button>
        <Button
          className={`px-6 py-3 rounded-xl ${!isFormValid() ? "opacity-[0.32]" : ""}`}
          disabled={!isFormValid()}
          onClick={() => {
            if (isFormValid()) navigate("/condominium-info");
          }}
        >
          Get started
        </Button>
      </footer>
    </div>
  );
};