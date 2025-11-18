import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, StopCircle, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VideoRecordingStepProps {
  onContinue: () => void;
  onDisagree: () => void;
  language: "en" | "hi";
  proposalNumber: string;
}

const content = {
  en: {
    title: "Record Verification Video",
    instructions: "Choose a place with ambient light and position yourself to face the light sources. Place the device on a stable platform to avoid shaking.",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    retake: "Retake Video",
    confirm: "Confirm & Continue",
    disagree: "Disagree",
    uploading: "Uploading video...",
  },
  hi: {
    title: "सत्यापन वीडियो रिकॉर्ड करें",
    instructions: "परिवेशीय प्रकाश वाली जगह चुनें और खुद को प्रकाश स्रोतों की ओर रखें। हिलने से बचने के लिए डिवाइस को स्थिर सतह पर रखें।",
    startRecording: "रिकॉर्डिंग शुरू करें",
    stopRecording: "रिकॉर्डिंग बंद करें",
    retake: "वीडियो फिर से लें",
    confirm: "पुष्टि करें और आगे बढ़ें",
    disagree: "असहमत",
    uploading: "वीडियो अपलोड हो रहा है...",
  },
};

export const VideoRecordingStep = ({ onContinue, onDisagree, language, proposalNumber }: VideoRecordingStepProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const t = content[language];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8,opus",
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      toast.error("Failed to start recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setHasRecorded(true);

      const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
      tracks?.forEach((track) => track.stop());
    }
  };

  const retake = () => {
    chunksRef.current = [];
    setHasRecorded(false);
    setIsRecording(false);
  };

  const confirmAndUpload = async () => {
    if (chunksRef.current.length === 0) return;

    setIsUploading(true);
    try {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const fileName = `${proposalNumber}_${Date.now()}.webm`;

      const { error } = await supabase.storage
        .from("verification-videos")
        .upload(fileName, blob);

      if (error) throw error;

      toast.success("Video uploaded successfully");
      onContinue();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-foreground text-center">{t.title}</h2>

      <p className="text-sm text-muted-foreground text-center">{t.instructions}</p>

      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        {isRecording && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            Recording
          </div>
        )}
      </div>

      <div className="space-y-3">
        {!isRecording && !hasRecorded && (
          <Button onClick={startRecording} className="w-full" size="lg">
            <Camera className="h-5 w-5 mr-2" />
            {t.startRecording}
          </Button>
        )}

        {isRecording && (
          <Button onClick={stopRecording} variant="destructive" className="w-full" size="lg">
            <StopCircle className="h-5 w-5 mr-2" />
            {t.stopRecording}
          </Button>
        )}

        {hasRecorded && (
          <>
            <Button onClick={retake} variant="outline" className="w-full">
              <RotateCcw className="h-5 w-5 mr-2" />
              {t.retake}
            </Button>
            <Button onClick={confirmAndUpload} disabled={isUploading} className="w-full" size="lg">
              {isUploading ? t.uploading : t.confirm}
            </Button>
          </>
        )}
      </div>

      <Button variant="outline" onClick={onDisagree} className="w-full">
        {t.disagree}
      </Button>
    </div>
  );
};
