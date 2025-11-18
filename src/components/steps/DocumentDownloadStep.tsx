import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";

interface DocumentDownloadStepProps {
  onContinue: () => void;
  onDisagree: () => void;
  language: "en" | "hi";
}

const content = {
  en: {
    title: "Policy Benefits Document",
    voice: "Please download and read your policy benefits document carefully. After downloading, click proceed.",
    download: "Download Document",
    proceed: "Proceed",
    disagree: "Disagree",
    downloaded: "Document Downloaded",
  },
  hi: {
    title: "पॉलिसी लाभ दस्तावेज़",
    voice: "कृपया अपने पॉलिसी लाभ दस्तावेज़ को डाउनलोड करें और ध्यान से पढ़ें। डाउनलोड करने के बाद, आगे बढ़ें पर क्लिक करें।",
    download: "दस्तावेज़ डाउनलोड करें",
    proceed: "आगे बढ़ें",
    disagree: "असहमत",
    downloaded: "दस्तावेज़ डाउनलोड किया गया",
  },
};

export const DocumentDownloadStep = ({ onContinue, onDisagree, language }: DocumentDownloadStepProps) => {
  const [downloaded, setDownloaded] = useState(false);
  const t = content[language];

  const handleDownload = () => {
    // Mock download - in real app, trigger actual file download
    setDownloaded(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground text-center">{t.title}</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center space-y-4">
        <Download className="h-16 w-16 text-primary mx-auto" />
        
        {downloaded ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">{t.downloaded}</span>
          </div>
        ) : (
          <Button onClick={handleDownload} size="lg">
            <Download className="h-5 w-5 mr-2" />
            {t.download}
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onDisagree} className="flex-1">
          {t.disagree}
        </Button>
        <Button onClick={onContinue} disabled={!downloaded} className="flex-1">
          {t.proceed}
        </Button>
      </div>
    </div>
  );
};
