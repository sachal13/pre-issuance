import { CheckCircle2 } from "lucide-react";

interface SubmittedStepProps {
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Application Submitted",
    message: "You will receive confirmation within 24 Hours",
  },
  hi: {
    title: "आवेदन जमा किया गया",
    message: "आपको 24 घंटों के भीतर पुष्टि प्राप्त होगी",
  },
};

export const SubmittedStep = ({ language }: SubmittedStepProps) => {
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center space-y-6">
        <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.message}</p>
      </div>
    </div>
  );
};
