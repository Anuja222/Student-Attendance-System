import { Badge, Card } from "@/components/ui";

type MetricCardProps = {
  label: string;
  value: string;
  description: string;
};

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <Badge>{label}</Badge>
      <div className="text-4xl font-semibold tracking-tight">{value}</div>
      <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
    </Card>
  );
}