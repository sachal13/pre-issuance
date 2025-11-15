import { Button } from "@/components/ui/button";
import { FileText, Check } from "lucide-react";
import { useState } from "react";

interface PolicyCheckStepProps {
  onContinue: () => void;
}

export const PolicyCheckStep = ({ onContinue }: PolicyCheckStepProps) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <div className="p-6">
      {/* Profile Section */}
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

      {/* Check Policy Details */}
      <h3 className="font-semibold text-foreground mb-4">Check Your Policy Details</h3>

      <p className="text-sm text-muted-foreground mb-6">
        Please download and review before you continue
      </p>

      {/* Download Section */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">Policy Benefits</span>
          </div>
          {downloaded ? (
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-primary"
            >
              Download
            </Button>
          )}
        </div>
      </div>

      {downloaded && (
        <div className="bg-muted/30 text-muted-foreground text-sm p-3 rounded-lg mb-6">
          Starting download without progress notification...
        </div>
      )}

      <Button onClick={onContinue} className="w-full" size="lg">
        Continue
      </Button>
    </div>
  );
};
