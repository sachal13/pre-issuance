import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPStepProps {
  onContinue: () => void;
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Enter OTP",
    description: "Please enter the 6-digit OTP sent to your mobile",
    mobile: "Mobile: 8600670248",
    resend: "Resend OTP",
    verify: "Verify OTP",
  },
  hi: {
    title: "OTP दर्ज करें",
    description: "कृपया अपने मोबाइल पर भेजा गया 6 अंकों का OTP दर्ज करें",
    mobile: "मोबाइल: 8600670248",
    resend: "OTP पुनः भेजें",
    verify: "OTP सत्यापित करें",
  },
};

export const OTPStep = ({ onContinue, language }: OTPStepProps) => {
  const [otp, setOtp] = useState("");
  const t = content[language];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-foreground">{t.title}</h2>
        <p className="text-sm text-muted-foreground">{t.description}</p>
        <p className="text-sm font-semibold text-foreground">{t.mobile}</p>
      </div>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button variant="link" className="w-full">
        {t.resend}
      </Button>

      <Button
        onClick={onContinue}
        className="w-full"
        disabled={otp.length !== 6}
      >
        {t.verify}
      </Button>
    </div>
  );
};
