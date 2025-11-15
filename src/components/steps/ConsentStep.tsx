import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const ConsentStep = ({ onContinue, onBack }: ConsentStepProps) => {
  const [consents, setConsents] = useState({
    checked: false,
    disclosed: false,
    understood: false,
  });

  const allConsentsChecked = consents.checked && consents.disclosed && consents.understood;

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-border">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-muted" />
          </div>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            Live
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Proposer Name</p>
          <p className="font-semibold text-foreground mb-2">Mr Niraj Test</p>
          <p className="text-sm text-muted-foreground mb-1">Plan Name</p>
          <p className="text-sm text-foreground">Bandhan Life iGuarantee Vishwas</p>
        </div>
      </div>

      {/* Customer Consent */}
      <h3 className="font-semibold text-foreground mb-6">Customer Consent</h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="checked"
            checked={consents.checked}
            onCheckedChange={(checked) => 
              setConsents({ ...consents, checked: checked as boolean })
            }
            className="mt-1"
          />
          <label htmlFor="checked" className="text-sm text-foreground cursor-pointer">
            I have checked all the details provided in the proposal form
          </label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="disclosed"
            checked={consents.disclosed}
            onCheckedChange={(checked) => 
              setConsents({ ...consents, disclosed: checked as boolean })
            }
            className="mt-1"
          />
          <label htmlFor="disclosed" className="text-sm text-foreground cursor-pointer">
            I have disclosed all the information correctly
          </label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="understood"
            checked={consents.understood}
            onCheckedChange={(checked) => 
              setConsents({ ...consents, understood: checked as boolean })
            }
            className="mt-1"
          />
          <label htmlFor="understood" className="text-sm text-foreground cursor-pointer">
            This is a life insurance policy and is not linked to any fixed deposit, loan, or bank product.
          </label>
        </div>
      </div>

      <p className="text-sm text-center text-muted-foreground mb-6">
        Please review the above information and check all boxes to proceed.
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={onContinue} 
          className="flex-1"
          disabled={!allConsentsChecked}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
