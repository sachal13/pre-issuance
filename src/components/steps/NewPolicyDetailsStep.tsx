import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NewPolicyDetailsStepProps {
  onContinue: () => void;
  onDisagree: () => void;
  language: "en" | "hi";
  onHighlight: (index: number) => void;
}

const content = {
  en: {
    title: "Policy Details",
    sumAssured: "Sum Assured",
    policyTerm: "Policy Term",
    premiumAmount: "Premium Amount",
    paymentFrequency: "Payment Frequency",
    nextDueDate: "Next Due Date",
    next: "Next",
    disagree: "Disagree",
  },
  hi: {
    title: "पॉलिसी विवरण",
    sumAssured: "बीमा राशि",
    policyTerm: "पॉलिसी अवधि",
    premiumAmount: "प्रीमियम राशि",
    paymentFrequency: "भुगतान आवृत्ति",
    nextDueDate: "अगली देय तिथि",
    next: "आगे बढ़ें",
    disagree: "असहमत",
  },
};

const policyData = {
  sumAssured: "₹10,00,000",
  policyTerm: "20 Years",
  premiumAmount: "₹15,000",
  paymentFrequency: "Yearly",
  nextDueDate: "15-12-2024",
};

export const NewPolicyDetailsStep = ({ onContinue, onDisagree, language, onHighlight }: NewPolicyDetailsStepProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const t = content[language];

  const details = [
    { label: t.sumAssured, value: policyData.sumAssured },
    { label: t.policyTerm, value: policyData.policyTerm },
    { label: t.premiumAmount, value: policyData.premiumAmount },
    { label: t.paymentFrequency, value: policyData.paymentFrequency },
    { label: t.nextDueDate, value: policyData.nextDueDate },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < details.length) {
        setHighlightedIndex(index);
        onHighlight(index);
        index++;
      } else {
        clearInterval(interval);
        setHighlightedIndex(-1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground text-center">{t.title}</h2>

      <div className="space-y-3">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 transition-all duration-300 ${
              highlightedIndex === index
                ? "border-primary bg-primary/10 scale-105"
                : "border-border"
            }`}
          >
            <p className="text-sm text-primary font-medium mb-1">{detail.label}</p>
            <p className="text-lg font-bold text-foreground">{detail.value}</p>
          </div>
        ))}
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
