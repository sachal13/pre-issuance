import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FixedHeader } from "./FixedHeader";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { LanguageSelectionStep } from "./steps/LanguageSelectionStep";
import { OTPStep } from "./steps/OTPStep";
import { NewPermissionsStep } from "./steps/NewPermissionsStep";
import { DocumentDownloadStep } from "./steps/DocumentDownloadStep";
import { NewPersonalDetailsStep } from "./steps/NewPersonalDetailsStep";
import { NewPolicyDetailsStep } from "./steps/NewPolicyDetailsStep";
import { VideoRecordingStep } from "./steps/VideoRecordingStep";
import { NewConsentStep } from "./steps/NewConsentStep";
import { SubmittedStep } from "./steps/SubmittedStep";
import { ContactStep } from "./steps/ContactStep";

type Step = "language" | "otp" | "permissions" | "document" | "personal" | "policy" | "video" | "consent" | "submitted" | "contact";

const voiceScripts = {
  en: {
    permissions: "Greetings from Bandhan Life. We are verifying your insurance proposal form. Please allow camera, microphone and location permissions to proceed. After granting permissions, please select the checkbox allowing camera recording for policy issuance.",
    document: "Please download and read your policy benefits document carefully. After downloading, click proceed.",
    personal: "Please verify your personal details and address. Your policy document will be sent to this address.",
    policy: "Sum assured: 10 lakh rupees. Policy term: 20 years. Premium amount: 15 thousand rupees. Payment frequency: Yearly. Next due date: 15th December 2024.",
    video: "Choose a place with ambient light and position yourself to face the light sources. Place the device on a stable platform to avoid shaking. Start recording when you are ready.",
    consent: "Please review the above information carefully. To continue, select all three checkboxes.",
  },
  hi: {
    permissions: "बंधन लाइफ की ओर से नमस्कार। हम आपके बीमा प्रस्ताव फॉर्म का सत्यापन कर रहे हैं। कृपया आगे बढ़ने के लिए कैमरा, माइक्रोफ़ोन और स्थान अनुमतियां दें। अनुमति देने के बाद, पॉलिसी जारी करने के लिए कैमरा रिकॉर्डिंग की अनुमति देने वाले चेकबॉक्स का चयन करें।",
    document: "कृपया अपने पॉलिसी लाभ दस्तावेज़ को डाउनलोड करें और ध्यान से पढ़ें। डाउनलोड करने के बाद, आगे बढ़ें पर क्लिक करें।",
    personal: "कृपया अपने व्यक्तिगत विवरण और पते की पुष्टि करें। आपका पॉलिसी दस्तावेज़ इस पते पर भेजा जाएगा।",
    policy: "बीमा राशि: 10 लाख रुपये। पॉलिसी अवधि: 20 साल। प्रीमियम राशि: 15 हज़ार रुपये। भुगतान आवृत्ति: वार्षिक। अगली देय तिथि: 15 दिसंबर 2024।",
    video: "परिवेशीय प्रकाश वाली जगह चुनें और खुद को प्रकाश स्रोतों की ओर रखें। हिलने से बचने के लिए डिवाइस को स्थिर सतह पर रखें। तैयार होने पर रिकॉर्डिंग शुरू करें।",
    consent: "कृपया उपरोक्त जानकारी की ध्यान से समीक्षा करें। जारी रखने के लिए, सभी तीन चेकबॉक्स का चयन करें।",
  },
};

export const InsuranceFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>("language");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [proposalNumber] = useState("ALI00000074910");
  const { speak, replay, currentText, isPlaying } = useTextToSpeech({ language });

  const handleLanguageSelect = (lang: "en" | "hi") => {
    setLanguage(lang);
    setCurrentStep("otp");
  };

  const handleDisagree = () => {
    setCurrentStep("contact");
  };

  const showHeader = currentStep !== "language" && currentStep !== "submitted" && currentStep !== "contact";
  const showCamera = currentStep !== "language" && currentStep !== "otp" && currentStep !== "submitted" && currentStep !== "contact" && currentStep !== "video";

  useEffect(() => {
    if (currentStep in voiceScripts[language]) {
      const script = voiceScripts[language][currentStep as keyof typeof voiceScripts.en];
      speak(script);
    }
  }, [currentStep, language]);

  const handlePolicyHighlight = (index: number) => {
    // Sync with voice - this is handled by the animation in NewPolicyDetailsStep
  };

  if (currentStep === "language") {
    return <LanguageSelectionStep onSelectLanguage={handleLanguageSelect} />;
  }

  if (currentStep === "submitted") {
    return <SubmittedStep language={language} />;
  }

  if (currentStep === "contact") {
    return <ContactStep language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {showHeader && (
        <FixedHeader
          proposerName="Sachal Hablani"
          proposalNumber={proposalNumber}
          planName="Bandhan Life iGuarantee Vishwas"
          currentVoiceText={currentText}
          showCamera={showCamera}
          onReplayVoice={replay}
          isVoicePlaying={isPlaying}
        />
      )}

      <div className="max-w-md mx-auto p-4">
        <Card className="bg-white shadow-lg overflow-hidden">
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
            {currentStep === "otp" && (
              <OTPStep onContinue={() => setCurrentStep("permissions")} language={language} />
            )}
            {currentStep === "permissions" && (
              <NewPermissionsStep
                onContinue={() => setCurrentStep("document")}
                onDisagree={handleDisagree}
                language={language}
              />
            )}
            {currentStep === "document" && (
              <DocumentDownloadStep
                onContinue={() => setCurrentStep("personal")}
                onDisagree={handleDisagree}
                language={language}
              />
            )}
            {currentStep === "personal" && (
              <NewPersonalDetailsStep
                onContinue={() => setCurrentStep("policy")}
                onDisagree={handleDisagree}
                language={language}
              />
            )}
            {currentStep === "policy" && (
              <NewPolicyDetailsStep
                onContinue={() => setCurrentStep("video")}
                onDisagree={handleDisagree}
                language={language}
                onHighlight={handlePolicyHighlight}
              />
            )}
            {currentStep === "video" && (
              <VideoRecordingStep
                onContinue={() => setCurrentStep("consent")}
                onDisagree={handleDisagree}
                language={language}
                proposalNumber={proposalNumber}
              />
            )}
            {currentStep === "consent" && (
              <NewConsentStep
                onContinue={() => setCurrentStep("submitted")}
                onDisagree={handleDisagree}
                language={language}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
