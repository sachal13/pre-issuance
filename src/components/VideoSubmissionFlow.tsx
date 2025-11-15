import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraRecorder } from "./CameraRecorder";
import { useToast } from "@/hooks/use-toast";

type Step = "personal-info" | "camera" | "review";

export const VideoSubmissionFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>("personal-info");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep("camera");
  };

  const handleVideoRecorded = (blob: Blob) => {
    setVideoBlob(blob);
    setCurrentStep("review");
  };

  const handleFinalSubmit = () => {
    toast({
      title: "Success!",
      description: "Your submission has been recorded",
    });
    // Reset flow
    setCurrentStep("personal-info");
    setFormData({ fullName: "", email: "", phone: "" });
    setVideoBlob(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <StepIndicator step={1} label="Info" active={currentStep === "personal-info"} />
          <div className="flex-1 h-0.5 bg-border mx-2" />
          <StepIndicator step={2} label="Record" active={currentStep === "camera"} />
          <div className="flex-1 h-0.5 bg-border mx-2" />
          <StepIndicator step={3} label="Review" active={currentStep === "review"} />
        </div>

        {/* Step content */}
        {currentStep === "personal-info" && (
          <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <Button type="submit" className="w-full">
              Continue to Recording
            </Button>
          </form>
        )}

        {currentStep === "camera" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Record Your Video</h2>
            <CameraRecorder onVideoRecorded={handleVideoRecorded} />
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep("personal-info")}
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}

        {currentStep === "review" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Review Your Submission</h2>
            
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              {formData.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Video</p>
                <p className="font-medium">✓ Recorded</p>
              </div>
            </div>

            {videoBlob && (
              <video 
                src={URL.createObjectURL(videoBlob)} 
                controls 
                className="w-full rounded-lg"
              />
            )}

            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep("camera")}
                className="flex-1"
              >
                Re-record
              </Button>
              <Button onClick={handleFinalSubmit} className="flex-1">
                Submit
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const StepIndicator = ({ step, label, active }: { step: number; label: string; active: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {step}
    </div>
    <span className={`text-sm font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
      {label}
    </span>
  </div>
);
