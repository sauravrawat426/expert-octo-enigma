import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TrustCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TrustCard = ({ icon: Icon, title, description }: TrustCardProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="space-y-4">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="font-heading text-lg">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
