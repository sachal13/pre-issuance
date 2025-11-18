import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Mic, MapPin, CheckCircle2, XCircle } from "lucide-react";

interface NewPermissionsStepProps {
  onContinue: () => void;
  onDisagree: () => void;
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Permission & Consent",
    greeting: "Greetings from Bandhan Life. We are verifying your insurance proposal form. Please allow camera, microphone and location permissions to proceed. After granting permissions, please select the checkbox allowing camera recording for policy issuance.",
    camera: "Camera & Microphone",
    location: "Location",
    consent: "I allow camera recording for policy issuance and verification",
    next: "Next",
    disagree: "Disagree",
  },
  hi: {
    title: "अनुमति और सहमति",
    greeting: "बंधन लाइफ की ओर से नमस्कार। हम आपके बीमा प्रस्ताव फॉर्म का सत्यापन कर रहे हैं। कृपया आगे बढ़ने के लिए कैमरा, माइक्रोफ़ोन और स्थान अनुमतियां दें। अनुमति देने के बाद, पॉलिसी जारी करने के लिए कैमरा रिकॉर्डिंग की अनुमति देने वाले चेकबॉक्स का चयन करें।",
    camera: "कैमरा और माइक्रोफ़ोन",
    location: "स्थान",
    consent: "मैं पॉलिसी जारी करने और सत्यापन के लिए कैमरा रिकॉर्डिंग की अनुमति देता/देती हूं",
    next: "आगे बढ़ें",
    disagree: "असहमत",
  },
};

export const NewPermissionsStep = ({ onContinue, onDisagree, language }: NewPermissionsStepProps) => {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const t = content[language];

  const requestCameraAndMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraGranted(true);
    } catch (err) {
      console.error("Permission denied:", err);
    }
  };

  const requestLocation = async () => {
    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLocationGranted(true);
    } catch (err) {
      console.error("Location permission denied:", err);
    }
  };

  const canProceed = cameraGranted && locationGranted && consentChecked;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground text-center">{t.title}</h2>

      <div className="space-y-4">
        {/* Camera & Mic Permission */}
        <div
          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
            cameraGranted ? "border-green-500 bg-green-50" : "border-border"
          }`}
          onClick={!cameraGranted ? requestCameraAndMic : undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <Camera className="h-5 w-5 text-primary" />
                <Mic className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">{t.camera}</span>
            </div>
            {cameraGranted ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Location Permission */}
        <div
          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
            locationGranted ? "border-green-500 bg-green-50" : "border-border"
          }`}
          onClick={!locationGranted ? requestLocation : undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">{t.location}</span>
            </div>
            {locationGranted ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="border-2 border-border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={consentChecked}
              onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
            />
            <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
              {t.consent}
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onDisagree} className="flex-1">
          {t.disagree}
        </Button>
        <Button onClick={onContinue} disabled={!canProceed} className="flex-1">
          {t.next}
        </Button>
      </div>
    </div>
  );
};
