import { Button } from "@/components/ui/button";
import bandhanLogo from "@/assets/bandhan-logo.jpg";

interface LanguageSelectionStepProps {
  onSelectLanguage: (language: "en" | "hi") => void;
}

export const LanguageSelectionStep = ({ onSelectLanguage }: LanguageSelectionStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <img src={bandhanLogo} alt="Bandhan Life" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Bandhan Life</h1>
          <p className="text-muted-foreground">Please select your preferred language</p>
          <p className="text-muted-foreground text-sm mt-1">कृपया अपनी पसंदीदा भाषा चुनें</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onSelectLanguage("en")}
            className="w-full h-14 text-lg"
            size="lg"
          >
            English
          </Button>
          <Button
            onClick={() => onSelectLanguage("hi")}
            className="w-full h-14 text-lg"
            variant="outline"
          >
            हिंदी (Hindi)
          </Button>
        </div>
      </div>
    </div>
  );
};
