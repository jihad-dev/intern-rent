import React, { useState, useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

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

const initialData = Object.fromEntries(fields.map(f => [f.key, ""]));

const propertyAddressInitial = {
  propertyName: "",
  totalUnits: "",
  website: "",
  country: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
};

const leasingInfoInitial = {
  managerName: "",
  phoneCountry: "BD",
  phone: "",
  email: "",
  sameAddress: false,
};

const chargesInitial = {
  applicationFee: "",
  applicantType: "All 18+ applicant",
  adminFee: "",
};

const rentReminderInitial = {
  frequency: "Monthly",
  reminderDate: "",
  dueDate: "",
};

const applicationAgreementInitial = {
  file: null as File | null,
  acceptImmigrant: false,
};

const aboutPropertyInitial = {
  message: "",
};

const amenitiesList = [
  { key: 'air', label: 'Air conditioning', icon: '🌬️' },
  { key: 'cable', label: 'Cable ready', icon: '📺' },
  { key: 'ceilingFan', label: 'Ceiling fan', icon: '🌀' },
  { key: 'highCeilings', label: 'High ceilings', icon: '🏢' },
  { key: 'privateBalcony', label: 'Private balcony', icon: '🏖️' },
  { key: 'refrigerator', label: 'Refrigerator', icon: '🧊' },
  { key: 'woodedViews', label: 'Wooded views', icon: '🌳' },
  { key: 'wdHookup', label: 'W/D hookup', icon: '🧺' },
  { key: 'hardwood', label: 'Hardwood Floor (home)', icon: '🪵' },
  { key: 'fireplace', label: 'Fireplace (home)', icon: '🔥' },
  { key: 'firstAid', label: 'First aid kit', icon: '🩹' },
  { key: 'carbonMonoxide', label: 'Carbon monoxide alarm', icon: '🚨' },
  { key: 'expandedPatios', label: 'Expanded patios (home)', icon: '🏡' },
  { key: 'freeParking', label: 'Free parking on premises', icon: '🅿️' },
  { key: 'fireExtinguisher', label: 'Fire extinguisher', icon: '🧯' },
];

const communityAmenityInitial = {
  selected: [] as string[],
  search: '',
};

const petFeesInitial = {
  petType: '',
  maxWeight: '',
  oneTimeFee: '',
  securityDeposit: '',
  monthlyRent: '',
};

const parkingInitial = {
  time: '',
  overview: '',
};

const nearestEducationInitial = {
  type: '',
  distance: '',
  unit: 'Mile',
  name: '',
};

const nearestStationInitial = {
  type: '',
  distance: '',
  unit: 'Mile',
  name: '',
};

const nearestLandmarkInitial = {
  type: '',
  distance: '',
  unit: 'Mile',
  name: '',
};

const utilitiesProviderInitial = {
  type: '',
  company: '',
};

interface PropertyAddressModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof propertyAddressInitial) => void;
  value: typeof propertyAddressInitial;
}

const PropertyAddressModal: React.FC<PropertyAddressModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof propertyAddressInitial>(value || propertyAddressInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Property addresss</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Property name as identifier<span className="text-red-500">*</span></label>
            <input name="propertyName" value={form.propertyName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Total apartment unit<span className="text-red-500">*</span></label>
            <input name="totalUnits" value={form.totalUnits} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Property website<span className="text-gray-400">(optional)</span></label>
            <input name="website" value={form.website} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Country/Region<span className="text-red-500">*</span></label>
            <select name="country" value={form.country} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Choose country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Street address<span className="text-red-500">*</span></label>
            <input name="street" value={form.street} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Apt, suite, unit <span className="text-gray-400">(if applicable)</span></label>
            <input name="apt" value={form.apt} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">City/Town<span className="text-red-500">*</span></label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">State/Territory<span className="text-red-500">*</span></label>
            <select name="state" value={form.state} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Choose state</option>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Zip code<span className="text-red-500">*</span></label>
            <input name="zip" value={form.zip} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface LeasingInfoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof leasingInfoInitial) => void;
  value: typeof leasingInfoInitial;
}

const LeasingInfoModal: React.FC<LeasingInfoModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof leasingInfoInitial>(value || leasingInfoInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Leasing info</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Leasing manager name<span className="text-red-500">*</span></label>
            <input name="managerName" value={form.managerName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1 flex items-end gap-2">
            <div className="flex items-center border rounded px-2 py-1 bg-gray-100">
              <span className="text-xl mr-1">🇧🇩</span>
              <select name="phoneCountry" value={form.phoneCountry} onChange={handleChange} className="bg-transparent outline-none border-none text-sm">
                <option value="BD">+880</option>
                <option value="US">+1</option>
                <option value="IN">+91</option>
              </select>
            </div>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Phone number" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Leasing manager email<span className="text-red-500">*</span></label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-1 flex items-center mt-6">
            <input type="checkbox" name="sameAddress" checked={form.sameAddress} onChange={handleChange} className="mr-2" />
            <label className="text-sm">Address(same as property)</label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface ChargesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof chargesInitial) => void;
  value: typeof chargesInitial;
}

const ChargesModal: React.FC<ChargesModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof chargesInitial>(value || chargesInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Charges</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Application fee(one-time)<span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input name="applicationFee" value={form.applicationFee} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              <select name="applicantType" value={form.applicantType} onChange={handleChange} className="border rounded px-2 py-2">
                <option value="All 18+ applicant">All 18+ applicant</option>
                <option value="All applicants">All applicants</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Admin fee(one-time)<span className="text-red-500">*</span></label>
            <input name="adminFee" value={form.adminFee} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-4 mt-2">Type 0 if charges not applicable</div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface RentReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof rentReminderInitial) => void;
  value: typeof rentReminderInitial;
}

const RentReminderModal: React.FC<RentReminderModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof rentReminderInitial>(value || rentReminderInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Rent frequency & payment reminder</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="flex gap-4 mb-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Rent payment frequency<span className="text-red-500">*</span></label>
            <select name="frequency" value={form.frequency} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none">
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Rent Reminder/Statement date<span className="text-red-500">*</span></label>
            <div className="relative">
              <input name="reminderDate" value={form.reminderDate} onChange={handleChange} className="w-full border rounded px-3 h-12 pr-10 focus:outline-none" placeholder="25th Every month" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none" /><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" stroke="currentColor" fill="none" /></svg>
              </span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Rent due date<span className="text-red-500">*</span></label>
            <div className="relative">
              <input name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full border rounded px-3 h-12 pr-10 focus:outline-none" placeholder="5th Every month" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none" /><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" stroke="currentColor" fill="none" /></svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface ApplicationAgreementModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof applicationAgreementInitial) => void;
  value: typeof applicationAgreementInitial;
}

const ApplicationAgreementModal: React.FC<ApplicationAgreementModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof applicationAgreementInitial>(value || applicationAgreementInitial);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, file: e.target.files![0] }));
    }
  };
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, acceptImmigrant: e.target.checked }));
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Application agreement<span className='text-gray-400'>(optional)</span></h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload agreement</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-16 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
            <span className="flex items-center gap-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span>{form.file ? form.file.name : <span className="text-gray-400"> <span className="text-lg">⇧</span> (Pdf only)</span>}</span>
            </span>
          </label>
        </div>
        <div className="mb-6 flex items-center">
          <input type="checkbox" id="acceptImmigrant" checked={form.acceptImmigrant} onChange={handleCheckbox} className="mr-2" />
          <label htmlFor="acceptImmigrant" className="text-sm">Accept immigrant & international student application</label>
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface AboutPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof aboutPropertyInitial) => void;
  value: typeof aboutPropertyInitial;
}

const AboutPropertyModal: React.FC<AboutPropertyModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof aboutPropertyInitial>(value || aboutPropertyInitial);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, message: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">About the property<span className='text-gray-400'>(optional)</span></h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="mb-6">
          <textarea
            className="w-full border rounded-lg p-4 min-h-[140px] resize-none focus:outline-none"
            placeholder="Type message here"
            value={form.message}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface CommunityAmenityModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof communityAmenityInitial) => void;
  value: typeof communityAmenityInitial;
}

const CommunityAmenityModal: React.FC<CommunityAmenityModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof communityAmenityInitial>(value || communityAmenityInitial);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, search: e.target.value }));
  const handleToggle = (label: string) => {
    setForm(f => f.selected.includes(label)
      ? { ...f, selected: f.selected.filter(l => l !== label) }
      : { ...f, selected: [...f.selected, label] });
  };
  const filtered = amenitiesList.filter(a => a.label.toLowerCase().includes(form.search.toLowerCase()));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Community's amenity/features</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="mb-4">
          <div className="relative mb-4">
            <input
              className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none"
              placeholder="Search amenities"
              value={form.search}
              onChange={handleSearch}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto">
            {filtered.map(a => (
              <button
                key={a.label}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition text-sm ${form.selected.includes(a.label) ? 'border-[#316eed] bg-[#f8faff] text-[#316eed]' : 'border-gray-200 bg-white text-gray-700'} focus:outline-none`}
                onClick={() => handleToggle(a.label)}
              >
                <span>{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface PetFeesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof petFeesInitial) => void;
  value: typeof petFeesInitial;
}

const PetFeesModal: React.FC<PetFeesModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof petFeesInitial>(value || petFeesInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pet fees</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Pet type<span className="text-red-500">*</span></label>
            <select name="petType" value={form.petType} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none">
              <option value="">Select</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Max weight(LB)<span className="text-red-500">*</span></label>
            <input name="maxWeight" value={form.maxWeight} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">One time pet fee<span className="text-red-500">*</span></label>
            <input name="oneTimeFee" value={form.oneTimeFee} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="$100" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Pet Security Deposit<span className="text-red-500">*</span></label>
            <input name="securityDeposit" value={form.securityDeposit} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="$100" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Monthly pet rent<span className="text-red-500">*</span></label>
            <input name="monthlyRent" value={form.monthlyRent} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="$100" />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface ParkingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof parkingInitial) => void;
  value: typeof parkingInitial;
}

const ParkingModal: React.FC<ParkingModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof parkingInitial>(value || parkingInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const charLimit = 200;
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Parking</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Guest vehicle parking time</label>
          <select name="time" value={form.time} onChange={handleChange} className="w-60 border rounded px-3 h-12 focus:outline-none">
            <option value="">Select</option>
            <option value="1H">1H</option>
            <option value="2H">2H</option>
            <option value="4H">4H</option>
            <option value="24H">24H</option>
          </select>
        </div>
        <div className="mb-6 relative">
          <textarea
            name="overview"
            className="w-full border rounded-lg p-4 min-h-[100px] resize-none focus:outline-none"
            placeholder="Write parking overview"
            maxLength={charLimit}
            value={form.overview}
            onChange={handleChange}
          />
          <span className="absolute bottom-2 right-4 text-gray-400 text-xs">{form.overview.length}/{charLimit}</span>
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface NearestEducationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof nearestEducationInitial) => void;
  value: typeof nearestEducationInitial;
}

const NearestEducationModal: React.FC<NearestEducationModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof nearestEducationInitial>(value || nearestEducationInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add nearest educational institution</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Educational institution type<span className="text-red-500">*</span></label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none">
              <option value="">Select</option>
              <option value="High school">High school</option>
              <option value="College">College</option>
              <option value="University">University</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Distance from property<span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input name="distance" value={form.distance} onChange={handleChange} className="w-2/3 border rounded px-3 h-12 focus:outline-none" />
              <select name="unit" value={form.unit} onChange={handleChange} className="w-1/3 border rounded px-2 h-12 focus:outline-none">
                <option value="Mile">Mile</option>
                <option value="Km">Km</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Educational institution name<span className="text-red-500">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="Enter name" />
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface NearestStationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof nearestStationInitial) => void;
  value: typeof nearestStationInitial;
}

const NearestStationModal: React.FC<NearestStationModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof nearestStationInitial>(value || nearestStationInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add nearest station</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Nearest station type<span className="text-red-500">*</span></label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none">
              <option value="">Select</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Metro">Metro</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Distance from property<span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input name="distance" value={form.distance} onChange={handleChange} className="w-2/3 border rounded px-3 h-12 focus:outline-none" />
              <select name="unit" value={form.unit} onChange={handleChange} className="w-1/3 border rounded px-2 h-12 focus:outline-none">
                <option value="Mile">Mile</option>
                <option value="Km">Km</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Nearest station name<span className="text-red-500">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="Enter name" />
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface NearestLandmarkModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof nearestLandmarkInitial) => void;
  value: typeof nearestLandmarkInitial;
}

const NearestLandmarkModal: React.FC<NearestLandmarkModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof nearestLandmarkInitial>(value || nearestLandmarkInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add landmark</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Landmark type<span className="text-red-500">*</span></label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none">
              <option value="">Select</option>
              <option value="Museum">Museum</option>
              <option value="Park">Park</option>
              <option value="Mall">Mall</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Distance from property<span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input name="distance" value={form.distance} onChange={handleChange} className="w-2/3 border rounded px-3 h-12 focus:outline-none" />
              <select name="unit" value={form.unit} onChange={handleChange} className="w-1/3 border rounded px-2 h-12 focus:outline-none">
                <option value="Mile">Mile</option>
                <option value="Km">Km</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Landmark name<span className="text-red-500">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="Enter name" />
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface UtilitiesProviderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: typeof utilitiesProviderInitial) => void;
  value: typeof utilitiesProviderInitial;
}

const UtilitiesProviderModal: React.FC<UtilitiesProviderModalProps> = ({ open, onClose, onSave, value }) => {
  const [form, setForm] = useState<typeof utilitiesProviderInitial>(value || utilitiesProviderInitial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Utilities provider</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">×</button>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Utility type<span className="text-red-500">*</span></label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none">
              <option value="">Select</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Gas">Gas</option>
              <option value="Internet">Internet</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Provider company name<span className="text-red-500">*</span></label>
            <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded px-3 h-12 focus:outline-none" placeholder="Enter name" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-lg bg-[#316eed] text-white font-semibold" onClick={() => { onSave(form); onClose(); }}>Add</Button>
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: any) => void;
  label: string;
  value: any;
  field: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, onSave, label, value, field }) => {
  if (field === "propertyAddress") {
    return <PropertyAddressModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "leasingInfo") {
    return <LeasingInfoModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "charges") {
    return <ChargesModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "rentReminder") {
    return <RentReminderModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "applicationAgreement") {
    return <ApplicationAgreementModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "aboutProperty") {
    return <AboutPropertyModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "communityAmenity") {
    return <CommunityAmenityModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "petFees") {
    return <PetFeesModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "parking") {
    return <ParkingModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "nearestEducation") {
    return <NearestEducationModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "nearestStations") {
    return <NearestStationModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "nearestLandmark") {
    return <NearestLandmarkModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  if (field === "utilitiesProvider") {
    return <UtilitiesProviderModal open={open} onClose={onClose} onSave={onSave} value={value} />;
  }
  const [input, setInput] = useState(value || "");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      {/* DEFAULT MODAL FORM */}
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Add {label}</h2>
        <input
          className="w-full border rounded p-2 mb-4"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onSave(input); onClose(); }}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export const CondominiumInfo = () => {
  const [data, setData] = useState(initialData);
  const [modal, setModal] = useState<{ open: boolean; field: string | null }>({ open: false, field: null });
  const [propertyAddress, setPropertyAddress] = useState<typeof propertyAddressInitial | null>(null);
  const [leasingInfo, setLeasingInfo] = useState<typeof leasingInfoInitial | null>(null);
  const [charges, setCharges] = useState<typeof chargesInitial | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [morePhotos, setMorePhotos] = useState<(File | null)[]>([null, null, null, null]);
  const [optionalPhotos, setOptionalPhotos] = useState<(File | null)[]>(Array(8).fill(null));
  const [video, setVideo] = useState<File | null>(null);

  // Refs for file inputs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const morePhotoRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const optionalPhotoRefs = Array(8).fill(null).map(() => useRef<HTMLInputElement>(null));
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleAdd = (field: string) => setModal({ open: true, field });
  const handleSave = (value: any) => {
    if (modal.field === "propertyAddress") {
      setPropertyAddress(value);
      setData(d => ({ ...d, [modal.field as string]: (value.propertyName ? value.propertyName : "") + (value.street ? ", " + value.street : "") }));
    } else if (modal.field === "leasingInfo") {
      setLeasingInfo(value);
      setData(d => ({ ...d, [modal.field as string]: (value.managerName ? value.managerName : "") + (value.phone ? " (" + value.phone + ")" : "") }));
    } else if (modal.field === "charges") {
      setCharges(value);
      setData(d => ({ ...d, [modal.field as string]: `App: $${value.applicationFee || 0}, Admin: $${value.adminFee || 0}` }));
    } else if (modal.field === "rentReminder") {
      setData(d => ({ ...d, [modal.field as string]: (value.frequency ? value.frequency : "") + (value.dueDate ? ", Due: " + value.dueDate : "") }));
    } else if (modal.field === "applicationAgreement") {
      setData(d => ({ ...d, [modal.field as string]: (value.file ? value.file.name : "No file") + (value.acceptImmigrant ? " (Accepts immigrant)" : "") }));
    } else if (modal.field === "aboutProperty") {
      setData(d => ({ ...d, [modal.field as string]: value.message }));
    } else if (modal.field === "communityAmenity") {
      setData(d => ({ ...d, [modal.field as string]: value.selected.join(', ') }));
    } else if (modal.field === "petFees") {
      setData(d => ({ ...d, [modal.field as string]: (value.petType ? value.petType : "") + (value.oneTimeFee ? `, Fee: $${value.oneTimeFee}` : "") }));
    } else if (modal.field === "parking") {
      setData(d => ({ ...d, [modal.field as string]: (value.time ? value.time : "") + (value.overview ? `, ${value.overview}` : "") }));
    } else if (modal.field === "nearestEducation") {
      setData(d => ({ ...d, [modal.field as string]: (value.type ? value.type : "") + (value.name ? `: ${value.name}` : "") + (value.distance ? ` (${value.distance} ${value.unit})` : "") }));
    } else if (modal.field === "nearestStations") {
      setData(d => ({ ...d, [modal.field as string]: (value.type ? value.type : "") + (value.name ? `: ${value.name}` : "") + (value.distance ? ` (${value.distance} ${value.unit})` : "") }));
    } else if (modal.field === "nearestLandmark") {
      setData(d => ({ ...d, [modal.field as string]: (value.type ? value.type : "") + (value.name ? `: ${value.name}` : "") + (value.distance ? ` (${value.distance} ${value.unit})` : "") }));
    } else if (modal.field === "utilitiesProvider") {
      setData(d => ({ ...d, [modal.field as string]: (value.type ? value.type : "") + (value.company ? `: ${value.company}` : "") }));
    } else if (modal.field) {
      setData(d => ({ ...d, [modal.field as string]: value || "" }));
    }
  };

  // Handlers for file inputs
  const handleCoverPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setCoverPhoto(e.target.files[0]);
  };
  const handleMorePhoto = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMorePhotos(arr => arr.map((f, i) => i === idx ? e.target.files![0] : f));
    }
  };
  const handleOptionalPhoto = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOptionalPhotos(arr => arr.map((f, i) => i === idx ? e.target.files![0] : f));
    }
  };
  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setVideo(e.target.files[0]);
  };

  // Remove handlers
  const removeCoverPhoto = () => setCoverPhoto(null);
  const removeMorePhoto = (idx: number) => setMorePhotos(arr => arr.map((f, i) => i === idx ? null : f));
  const removeOptionalPhoto = (idx: number) => setOptionalPhotos(arr => arr.map((f, i) => i === idx ? null : f));
  const removeVideo = () => setVideo(null);

  // Split fields into two columns
  const leftFields = fields.filter((_, i) => i % 2 === 0);
  const rightFields = fields.filter((_, i) => i % 2 === 1);

  const navigate = useNavigate();

  // Validation logic
  const isFormValid = () => {
    // Check required fields
    const requiredFields = fields.filter(f => f.required);
    const missingRequiredFields = requiredFields.filter(f => !data[f.key] || data[f.key].trim() === "");

    // Check if cover photo is uploaded (required)
    if (!coverPhoto) {
      return false;
    }

    return missingRequiredFields.length === 0;
  };


  return (
    <div className="relative min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-4 border-b border-[#e0e0e0] bg-white">
        <h3>RentYard Logo</h3>
        <Button variant="outline" className="px-6 py-3 rounded-xl font-medium">Save & Exit</Button>
      </header>
      <main className="flex flex-col items-center px-2 py-8">
        <Card className="w-full max-w-6xl border-2 border-[#316eed] rounded-xl shadow-none">
          <CardContent className="p-6">
            <h2 className="font-bold text-xl mb-4">Condominiums information</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
              {leftFields.map((f, idx) => (
                <div key={f.key} className={`flex items-center border rounded-lg px-4 py-3 bg-white mb-2 ${f.required && (!data[f.key] || data[f.key].trim() === "")
                  ? "border-red-300 bg-red-50"
                  : "border-[#e0e0e0]"
                  }`}>
                  <div className="flex-1">
                    <span className="font-medium text-[#272b35]">
                      {f.label}
                      {f.required && <span className="text-red-500 ml-1">(Required)</span>}
                      {!f.required && <span className="text-gray-400 ml-1">{f.sub ? `(Optional${f.sub.includes('recommended') ? ' but recommended' : ''})` : '(Optional)'}</span>}
                    </span>
                    {f.sub && !f.required && (
                      <div className="text-xs text-gray-400 mt-0.5">{f.sub}</div>
                    )}
                  </div>
                  {data[f.key] ? (
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-[#316eed]">{data[f.key]}</span>
                      <Button size="sm" variant="outline" onClick={() => handleAdd(f.key)}>Edit</Button>
                    </span>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-[#316eed] font-semibold" onClick={() => handleAdd(f.key)}>
                      + Add
                    </Button>
                  )}
                </div>
              ))}
              {rightFields.map((f, idx) => (
                <div key={f.key} className={`flex items-center border rounded-lg px-4 py-3 bg-white mb-2 ${f.required && (!data[f.key] || data[f.key].trim() === "")
                  ? "border-red-300 bg-red-50"
                  : "border-[#e0e0e0]"
                  }`}>
                  <div className="flex-1">
                    <span className="font-medium text-[#272b35]">
                      {f.label}
                      {f.required && <span className="text-red-500 ml-1">(Required)</span>}
                      {!f.required && <span className="text-gray-400 ml-1">{f.sub ? `(Optional${f.sub.includes('recommended') ? ' but recommended' : ''})` : '(Optional)'}</span>}
                    </span>
                    {f.sub && !f.required && (
                      <div className="text-xs text-gray-400 mt-0.5">{f.sub}</div>
                    )}
                  </div>
                  {data[f.key] ? (
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-[#316eed]">{data[f.key]}</span>
                      <Button size="sm" variant="outline" onClick={() => handleAdd(f.key)}>Edit</Button>
                    </span>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-[#316eed] font-semibold" onClick={() => handleAdd(f.key)}>
                      + Add
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {/* Property Gallery */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Featured photos<span className="text-red-500">*</span></h3>
                <span className="text-sm text-gray-400">More photos<span className="text-gray-400">(optional)</span></span>
              </div>
              <div className="flex gap-2 mb-2">
                {/* Cover photo */}
                <div className={`border-2 border-dashed rounded-lg w-32 h-32 flex flex-col items-center justify-center text-center cursor-pointer relative ${!coverPhoto
                  ? "border-red-300 bg-red-50"
                  : "border-[#316eed] bg-[#f8faff]"
                  }`} onClick={() => coverInputRef.current?.click()}>
                  {coverPhoto ? (
                    <>
                      <img src={URL.createObjectURL(coverPhoto)} alt="cover" className="w-full h-full object-cover rounded-lg" />
                      <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow" onClick={e => { e.stopPropagation(); removeCoverPhoto(); }}>
                        ×
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">+</span>
                      <span className="text-xs mt-1 text-gray-500">Upload cover photo<br />(jpg, png only)</span>
                    </>
                  )}
                  <input ref={coverInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleCoverPhoto} />
                </div>
                {!coverPhoto && (
                  <div className="text-red-500 text-xs mt-1">Cover photo is required</div>
                )}
                {/* 4 more featured photos */}
                {morePhotos.map((photo, i) => (
                  <div key={i} className="border-2 border-dashed border-[#316eed] rounded-lg w-32 h-32 flex items-center justify-center cursor-pointer bg-[#f8faff] relative" onClick={() => morePhotoRefs[i].current?.click()}>
                    {photo ? (
                      <>
                        <img src={URL.createObjectURL(photo)} alt={`photo${i}`} className="w-full h-full object-cover rounded-lg" />
                        <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow" onClick={e => { e.stopPropagation(); removeMorePhoto(i); }}>
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-2xl text-[#316eed]">+</span>
                    )}
                    <input ref={morePhotoRefs[i]} type="file" accept="image/png,image/jpeg" className="hidden" onChange={e => handleMorePhoto(i, e)} />
                  </div>
                ))}
                {/* 8 optional photos */}
                {optionalPhotos.map((photo, i) => (
                  <div key={i} className="border-2 border-dashed border-[#316eed] rounded-lg w-16 h-16 flex items-center justify-center cursor-pointer bg-[#f8faff] relative" onClick={() => optionalPhotoRefs[i].current?.click()}>
                    {photo ? (
                      <>
                        <img src={URL.createObjectURL(photo)} alt={`optional${i}`} className="w-full h-full object-cover rounded-lg" />
                        <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow" onClick={e => { e.stopPropagation(); removeOptionalPhoto(i); }}>
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-xl text-[#316eed]">+</span>
                    )}
                    <input ref={optionalPhotoRefs[i]} type="file" accept="image/png,image/jpeg" className="hidden" onChange={e => handleOptionalPhoto(i, e)} />
                  </div>
                ))}
              </div>
              {/* Video upload */}
              <div className="flex items-center gap-2 mt-2">
                <div className="border-2 border-dashed border-[#316eed] rounded-lg w-32 h-16 flex items-center justify-center cursor-pointer bg-[#f8faff] relative" onClick={() => videoInputRef.current?.click()}>
                  {video ? (
                    <>
                      <span className="truncate text-xs">{video.name}</span>
                      <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow" onClick={e => { e.stopPropagation(); removeVideo(); }}>
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">Videos (optional)</span>
                  )}
                  <input ref={videoInputRef} type="file" accept="video/mp4" className="hidden" onChange={handleVideo} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-12 py-6 bg-white border-t z-10">
        <Button variant="link" className="text-[#272b35] underline p-0 h-auto font-medium">Back</Button>
        <Button
          className={`px-8 py-3 rounded-xl text-white font-semibold text-lg ${!isFormValid() ? "opacity-[0.32] bg-gray-400 cursor-not-allowed" : "bg-[#316eed]"
            }`}
          disabled={!isFormValid()}
          onClick={() => {
            if (isFormValid()) {
              navigate("/condominium-summary", { state: { data } });
            }
          }}
        >
          Next
        </Button>
      </footer>
      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false, field: null })}
        onSave={handleSave}
        label={fields.find(f => f.key === modal.field)?.label || ""}
        value={modal.field ? data[modal.field] || "" : ""}
        field={modal.field || ""}
      />
    </div>
  );
};

export default CondominiumInfo; 