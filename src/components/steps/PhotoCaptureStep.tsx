import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoCaptureStepProps {
  onBack: () => void;
}

export const PhotoCaptureStep = ({ onBack }: PhotoCaptureStepProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState({
    light: false,
    face: false,
    liveness: false,
  });
  const { toast } = useToast();

  // Simulate detection checks
  useEffect(() => {
    if (cameraReady) {
      setTimeout(() => setDetectionStatus(prev => ({ ...prev, light: true })), 500);
      setTimeout(() => setDetectionStatus(prev => ({ ...prev, face: true })), 1000);
      setTimeout(() => setDetectionStatus(prev => ({ ...prev, liveness: true })), 1500);
    }
  }, [cameraReady]);

  const handleTakePhoto = useCallback(() => {
    if (!detectionStatus.light || !detectionStatus.face || !detectionStatus.liveness) {
      toast({
        title: "Detection incomplete",
        description: "Please wait for all checks to complete",
        variant: "destructive",
      });
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      toast({
        title: "Photo captured!",
        description: "Your submission has been recorded successfully",
      });
    }
  }, [detectionStatus, toast]);

  return (
    <div className="p-6">
      <h3 className="font-semibold text-foreground mb-6">Capture Photo</h3>

      {/* Detection Status Indicators */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <DetectionBadge 
          label="Light Detected" 
          detected={detectionStatus.light}
        />
        <DetectionBadge 
          label="Face Detected" 
          detected={detectionStatus.face}
        />
        <DetectionBadge 
          label="Liveness Detected" 
          detected={detectionStatus.liveness}
        />
      </div>

      {/* Camera Feed */}
      <div className="relative rounded-lg overflow-hidden bg-muted aspect-video mb-4">
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Loading camera...</p>
            </div>
          </div>
        )}
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          onUserMedia={() => setCameraReady(true)}
          className="w-full h-full object-cover"
          mirrored
        />
        
        {/* Live indicator */}
        {cameraReady && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Live
          </div>
        )}

        {/* Face detection box overlay */}
        {detectionStatus.face && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-4 border-primary rounded-lg" />
        )}
      </div>

      {/* Instructions */}
      <p className="text-sm text-center text-muted-foreground mb-6">
        Please position your face in the box for detection and smile for the liveness check.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleTakePhoto} 
          className="flex-1"
          disabled={!detectionStatus.light || !detectionStatus.face || !detectionStatus.liveness}
        >
          Take Photo
        </Button>
      </div>
    </div>
  );
};

const DetectionBadge = ({ label, detected }: { label: string; detected: boolean }) => (
  <div className={`
    flex flex-col items-center gap-1 p-3 rounded-lg transition-colors
    ${detected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
  `}>
    {detected ? (
      <Check className="w-5 h-5" />
    ) : (
      <div className="w-5 h-5 border-2 border-current rounded-full" />
    )}
    <span className="text-xs font-medium text-center leading-tight">{label}</span>
  </div>
);
