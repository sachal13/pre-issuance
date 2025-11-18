import { Button } from "@/components/ui/button";

interface NewPersonalDetailsStepProps {
  onContinue: () => void;
  onDisagree: () => void;
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Personal Details",
    voice: "Please verify your personal details and address. Your policy document will be sent to this address.",
    fullName: "Full Name",
    dob: "Date of Birth",
    gender: "Gender",
    mobile: "Mobile",
    email: "Email",
    address: "Address",
    pincode: "Pincode",
    city: "City",
    state: "State",
    nominee: "Nominee Name",
    next: "Next",
    disagree: "Disagree",
  },
  hi: {
    title: "व्यक्तिगत विवरण",
    voice: "कृपया अपने व्यक्तिगत विवरण और पते की पुष्टि करें। आपका पॉलिसी दस्तावेज़ इस पते पर भेजा जाएगा।",
    fullName: "पूरा नाम",
    dob: "जन्म तिथि",
    gender: "लिंग",
    mobile: "मोबाइल",
    email: "ईमेल",
    address: "पता",
    pincode: "पिनकोड",
    city: "शहर",
    state: "राज्य",
    nominee: "नामांकित व्यक्ति का नाम",
    next: "आगे बढ़ें",
    disagree: "असहमत",
  },
};

const details = {
  fullName: "Sachal Hablani",
  dob: "22-08-2002",
  gender: "Male",
  mobile: "8600670248",
  email: "sachalhablani@gmail.com",
  address: "Nagpur, Jaripatka",
  pincode: "440014",
  city: "Nagpur",
  state: "Maharashtra",
  nominee: "Ram",
};

export const NewPersonalDetailsStep = ({ onContinue, onDisagree, language }: NewPersonalDetailsStepProps) => {
  const t = content[language];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground text-center">{t.title}</h2>

      <div className="space-y-4">
        <DetailItem label={t.fullName} value={details.fullName} />
        <DetailItem label={t.dob} value={details.dob} />
        <DetailItem label={t.gender} value={details.gender} />
        <DetailItem label={t.mobile} value={details.mobile} />
        <DetailItem label={t.email} value={details.email} />
        <DetailItem label={t.address} value={details.address} />
        <DetailItem label={t.pincode} value={details.pincode} />
        <DetailItem label={t.city} value={details.city} />
        <DetailItem label={t.state} value={details.state} />
        <DetailItem label={t.nominee} value={details.nominee} />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onDisagree} className="flex-1">
          {t.disagree}
        </Button>
        <Button onClick={onContinue} className="flex-1">
          {t.next}
        </Button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-primary font-medium mb-1">{label}</p>
    <p className="text-foreground font-semibold">{value}</p>
  </div>
);
