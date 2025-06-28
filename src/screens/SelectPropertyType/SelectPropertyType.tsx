import {
  BriefcaseIcon,
  Building2Icon,
  BuildingIcon,
  HomeIcon,
  KeyIcon,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const SelectPropertyType = (): JSX.Element => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const propertyTypes = [
    {
      id: "single-house",
      title: "Single House Property",
      description: "Single unit house for single family",
      icon: <HomeIcon className="w-7 h-7" />,
    },
    {
      id: "apartments",
      title: "Apartments complex",
      description: "Multiple unit house for families",
      icon: <Building2Icon className="w-7 h-7" />,
    },
    {
      id: "condominiums",
      title: "Condominiums",
      description: "Multiple unit house for families",
      icon: <BuildingIcon className="w-7 h-7" />,
    },
  ];

  const roles = [
    {
      id: "landlord",
      title: "Landlord",
      description: "Owner of the property",
      icon: <KeyIcon className="w-7 h-7" />,
    },
    {
      id: "realtor",
      title: "Realtor",
      description: "Manage property on behalf on owner",
      icon: <UserIcon className="w-7 h-7" />,
    },
    {
      id: "management",
      title: "Property management company",
      description: "For management company",
      icon: <BriefcaseIcon className="w-7 h-7" />,
    },
  ];

  const handlePropertyTypeSelect = (id: string) => {
    setSelectedPropertyType(id);
  };

  const handleRoleSelect = (id: string) => {
    setSelectedRole(id);
  };

  const isGetStartedEnabled = selectedPropertyType && selectedRole;

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
      <main className="flex flex-col px-20 py-8 gap-8">
        {/* Property Type Section */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-h2-headline font-[700] text-[24px] text-[#272b35]">
            Property type
          </h2>

          <div className="flex gap-6">
            {propertyTypes.map((property) => (
              <Card
                key={property.id}
                className={`flex-1 border border-solid border-[#e0e0e0] rounded-xl cursor-pointer hover:border-[#316eed] transition-colors ${selectedPropertyType === property.id ? "border-[#316eed] bg-[#f8faff]" : ""}`}
                onClick={() => handlePropertyTypeSelect(property.id)}
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
                className={`flex-1 border border-solid border-[#e0e0e0] rounded-xl cursor-pointer hover:border-[#316eed] transition-colors ${selectedRole === role.id ? "border-[#316eed] bg-[#f8faff]" : ""}`}
                onClick={() => handleRoleSelect(role.id)}
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
