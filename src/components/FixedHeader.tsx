import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import bandhanLogo from "@/assets/bandhan-logo.jpg";

interface FixedHeaderProps {
  proposerName: string;
  proposalNumber: string;
  planName: string;
  currentVoiceText: string;
  showCamera: boolean;
  onReplayVoice: () => void;
  isVoicePlaying: boolean;
}

export const FixedHeader = ({
  proposerName,
  proposalNumber,
  planName,
  currentVoiceText,
  showCamera,
  onReplayVoice,
  isVoicePlaying,
}: FixedHeaderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (showCamera && !stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => console.error("Camera error:", err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="bg-white shadow-md border-b border-border sticky top-0 z-50">
      <div className="max-w-md mx-auto p-4">
        {/* Logo and Camera Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={bandhanLogo} alt="Bandhan Life" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-foreground text-sm">Bandhan Life</h1>
            </div>
          </div>
          {showCamera && (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-20 h-16 object-cover rounded-lg border-2 border-primary"
              />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Live
              </div>
            </div>
          )}
        </div>

        {/* Proposer Details */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Proposer:</span>
            <span className="font-semibold text-foreground">{proposerName}</span>
          </div>
          <div className="bg-red-100 text-red-900 text-xs px-3 py-1.5 rounded-md text-center">
            Proposal No: {proposalNumber}
          </div>
          <div className="text-xs text-muted-foreground text-center">{planName}</div>
        </div>

        {/* Voice Text Banner */}
        {currentVoiceText && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReplayVoice}
              className="shrink-0 h-8 w-8 p-0"
            >
              {isVoicePlaying ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <p className="text-xs text-foreground flex-1">{currentVoiceText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
