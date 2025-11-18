import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface NewConsentStepProps {
  onContinue: () => void;
  onDisagree: () => void;
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Customer Consent",
    voice: "Please review the above information carefully. To continue, select all three checkboxes.",
    consent1: "I confirm all policy details are correct",
    consent2: "I understand and accept the policy terms",
    consent3: "I allow Bandhan Life to proceed with verification",
    process: "Process Application",
    disagree: "Disagree",
  },
  hi: {
    title: "ग्राहक सहमति",
    voice: "कृपया उपरोक्त जानकारी की ध्यान से समीक्षा करें। जारी रखने के लिए, सभी तीन चेकबॉक्स का चयन करें।",
    consent1: "मैं पुष्टि करता/करती हूं कि सभी पॉलिसी विवरण सही हैं",
    consent2: "मैं पॉलिसी की शर्तों को समझता/समझती और स्वीकार करता/करती हूं",
    consent3: "मैं बंधन लाइफ को सत्यापन के साथ आगे बढ़ने की अनुमति देता/देती हूं",
    process: "आवेदन प्रक्रिया करें",
    disagree: "असहमत",
  },
};

export const NewConsentStep = ({ onContinue, onDisagree, language }: NewConsentStepProps) => {
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);
  const t = content[language];

  const allChecked = consent1 && consent2 && consent3;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground text-center">{t.title}</h2>

      <div className="space-y-4">
        <div className="border-2 border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent1"
              checked={consent1}
              onCheckedChange={(checked) => setConsent1(checked as boolean)}
            />
            <label htmlFor="consent1" className="text-sm text-foreground cursor-pointer flex-1">
              {t.consent1}
            </label>
          </div>
        </div>

        <div className="border-2 border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent2"
              checked={consent2}
              onCheckedChange={(checked) => setConsent2(checked as boolean)}
            />
            <label htmlFor="consent2" className="text-sm text-foreground cursor-pointer flex-1">
              {t.consent2}
            </label>
          </div>
        </div>

        <div className="border-2 border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent3"
              checked={consent3}
              onCheckedChange={(checked) => setConsent3(checked as boolean)}
            />
            <label htmlFor="consent3" className="text-sm text-foreground cursor-pointer flex-1">
              {t.consent3}
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onDisagree} className="flex-1">
          {t.disagree}
        </Button>
        <Button onClick={onContinue} disabled={!allChecked} className="flex-1">
          {t.process}
        </Button>
      </div>
    </div>
  );
};
