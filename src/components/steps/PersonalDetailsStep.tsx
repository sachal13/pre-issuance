import { Button } from "@/components/ui/button";

interface PersonalDetailsStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const PersonalDetailsStep = ({ onContinue, onBack }: PersonalDetailsStepProps) => {
  return (
    <div className="p-6">
      {/* Profile Header */}
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

      {/* Personal Details */}
      <h3 className="font-semibold text-foreground mb-6">Personal Details</h3>

      <div className="space-y-4 mb-6">
        <DetailItem label="Life Assured Name" value="Mr Niraj Test" />
        <DetailItem label="Life Assured DOB" value="23-02-1993" />
        <DetailItem label="Life Assured Gender" value="Male" />
        <DetailItem label="Mobile Number" value="8554071293" />
        <DetailItem label="Email" value="manisha.kadam.qualitykiosk@bandhanlife.com" />
        <DetailItem label="Address" value="B-108" />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onContinue} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-primary font-medium mb-1">{label}</p>
    <p className="text-foreground font-semibold">{value}</p>
  </div>
);
