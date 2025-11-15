import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Video, Square, Play } from "lucide-react";

interface CameraRecorderProps {
  onVideoRecorded: (blob: Blob) => void;
}

export const CameraRecorder = ({ onVideoRecorded }: CameraRecorderProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [cameraReady, setCameraReady] = useState(false);

  const handleStartCapture = useCallback(() => {
    setCapturing(true);
    setRecordedChunks([]);
    
    const stream = webcamRef.current?.stream;
    if (!stream) return;

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.addEventListener("dataavailable", ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => [...prev, data]);
      }
    });

    mediaRecorderRef.current.start();
  }, []);

  const handleStopCapture = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);

      mediaRecorderRef.current.addEventListener("stop", () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        onVideoRecorded(blob);
      });
    }
  }, [recordedChunks, onVideoRecorded]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-muted aspect-video">
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-12 h-12 mx-auto mb-2 text-muted-foreground animate-pulse" />
              <p className="text-muted-foreground">Loading camera...</p>
            </div>
          </div>
        )}
        <Webcam
          ref={webcamRef}
          audio={true}
          muted={true}
          onUserMedia={() => setCameraReady(true)}
          className="w-full h-full object-cover"
        />
        {capturing && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-destructive-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium">Recording</span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {!capturing ? (
          <Button
            onClick={handleStartCapture}
            disabled={!cameraReady}
            size="lg"
            className="gap-2"
          >
            <Play className="w-5 h-5" />
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={handleStopCapture}
            variant="destructive"
            size="lg"
            className="gap-2"
          >
            <Square className="w-5 h-5" />
            Stop Recording
          </Button>
        )}
      </div>
    </div>
  );
};
