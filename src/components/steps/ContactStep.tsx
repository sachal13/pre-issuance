import { Phone, Mail } from "lucide-react";
import bandhanLogo from "@/assets/bandhan-logo.jpg";

interface ContactStepProps {
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Contact Bandhan Life",
    tollFree: "Toll Free No",
    timings: "Mon-Sat: 9 AM to 7 PM",
    email: "Email ID",
  },
  hi: {
    title: "बंधन लाइफ से संपर्क करें",
    tollFree: "टोल फ्री नंबर",
    timings: "सोमवार-शनिवार: सुबह 9 बजे से शाम 7 बजे तक",
    email: "ईमेल आईडी",
  },
};

export const ContactStep = ({ language }: ContactStepProps) => {
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div className="text-center">
          <img src={bandhanLogo} alt="Bandhan Life" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-6">{t.title}</h1>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-primary/20 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Phone className="h-6 w-6" />
              <span className="font-semibold">{t.tollFree}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1800-209-9090</p>
            <p className="text-sm text-muted-foreground">{t.timings}</p>
          </div>

          <div className="border-2 border-primary/20 rounded-lg p-6 space-y-2">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Mail className="h-6 w-6" />
              <span className="font-semibold">{t.email}</span>
            </div>
            <p className="text-lg font-semibold text-foreground break-all">
              customercare@bandhanlife.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
