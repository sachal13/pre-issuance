import { Button } from "@/components/ui/button";
import { Camera, Mic, MapPin } from "lucide-react";

interface PermissionsStepProps {
  onContinue: () => void;
}

export const PermissionsStep = ({ onContinue }: PermissionsStepProps) => {
  const requestPermission = async (type: "camera" | "mic" | "location") => {
    try {
      if (type === "camera") {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } else if (type === "mic") {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } else if (type === "location") {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }
    } catch (error) {
      console.error(`${type} permission denied:`, error);
    }
  };

  return (
    <div className="p-8 text-center">
      {/* Avatar with decorative elements */}
      <div className="relative inline-block mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
          <Camera className="w-16 h-16 text-primary" />
        </div>
        {/* Decorative dots */}
        <div className="absolute -top-2 -left-2 w-8 h-8">
          <div className="w-3 h-3 rounded-full bg-blue-400 absolute top-0 left-0" />
          <div className="w-2 h-2 rounded-full bg-blue-500 absolute bottom-0 right-0" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8">
          <div className="w-3 h-3 rounded-full bg-red-400 absolute top-0 right-0" />
          <div className="w-2 h-2 rounded-full bg-red-500 absolute bottom-0 left-0" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8">
          <div className="w-3 h-3 rounded-full bg-blue-500 absolute" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4">
        Allow Permissions
      </h2>

      <p className="text-muted-foreground mb-8">
        Allow camera, mic & location permissions by clicking on each button below:
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => requestPermission("camera")}
          className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Camera className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Allow Camera</span>
        </button>

        <button
          onClick={() => requestPermission("mic")}
          className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Mic className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Allow Mic</span>
        </button>

        <button
          onClick={() => requestPermission("location")}
          className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <MapPin className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">Allow Location</span>
        </button>
      </div>

      <Button
        variant="link"
        className="text-primary underline mb-6"
      >
        View Instructions
      </Button>

      <Button onClick={onContinue} className="w-full" size="lg">
        Continue
      </Button>

      {/* Decorative corner elements */}
      <div className="absolute bottom-4 right-4 flex gap-1">
        <div className="w-6 h-6 border-4 border-blue-400 rounded-tl-full" />
        <div className="w-4 h-4 border-4 border-red-400 rounded-tl-full" />
      </div>
    </div>
  );
};
