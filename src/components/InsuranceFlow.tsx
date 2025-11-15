import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PermissionsStep } from "./steps/PermissionsStep";
import { PolicyCheckStep } from "./steps/PolicyCheckStep";
import { PersonalDetailsStep } from "./steps/PersonalDetailsStep";
import { PolicyDetailsStep } from "./steps/PolicyDetailsStep";
import { ConsentStep } from "./steps/ConsentStep";
import { PhotoCaptureStep } from "./steps/PhotoCaptureStep";

type Step = "permissions" | "policy-check" | "personal" | "policy" | "consent" | "photo";

export const InsuranceFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>("permissions");
  const [proposalNumber] = useState("ALI00000074910");

  const stepIndicators = [
    { id: "policy-check", label: "Check Policy", number: 1 },
    { id: "personal", label: "Personal Details", number: 2 },
    { id: "policy", label: "Policy Details", number: 3 },
    { id: "consent", label: "Customer Consent", number: 4 },
    { id: "photo", label: "Capture Photo", number: 5 },
  ];

  const getCurrentStepNumber = () => {
    const index = stepIndicators.findIndex(s => s.id === currentStep);
    return index >= 0 ? index + 1 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">BL</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Bandhan Life</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Proposal Number */}
        {currentStep !== "permissions" && (
          <div className="bg-red-100 text-red-900 text-sm px-4 py-2 rounded-md mb-4 text-center">
            Proposal No: {proposalNumber}
          </div>
        )}

        {/* Step Indicator */}
        {currentStep !== "permissions" && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {getCurrentStepNumber()}
              </div>
              <span className="text-foreground font-medium">
                {stepIndicators[getCurrentStepNumber() - 1]?.label}
              </span>
              <span className="ml-auto text-muted-foreground text-sm">
                {getCurrentStepNumber()}/5
              </span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <Card className="bg-white shadow-lg">
          {currentStep === "permissions" && (
            <PermissionsStep onContinue={() => setCurrentStep("policy-check")} />
          )}
          {currentStep === "policy-check" && (
            <PolicyCheckStep onContinue={() => setCurrentStep("personal")} />
          )}
          {currentStep === "personal" && (
            <PersonalDetailsStep 
              onContinue={() => setCurrentStep("policy")}
              onBack={() => setCurrentStep("policy-check")}
            />
          )}
          {currentStep === "policy" && (
            <PolicyDetailsStep 
              onContinue={() => setCurrentStep("consent")}
              onBack={() => setCurrentStep("personal")}
            />
          )}
          {currentStep === "consent" && (
            <ConsentStep 
              onContinue={() => setCurrentStep("photo")}
              onBack={() => setCurrentStep("policy")}
            />
          )}
          {currentStep === "photo" && (
            <PhotoCaptureStep 
              onBack={() => setCurrentStep("consent")}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
