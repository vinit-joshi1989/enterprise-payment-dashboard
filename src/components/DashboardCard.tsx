import { Card, CardContent, Typography } from "@mui/material";

type DashboardCardProps = {
  title: string;
  value: number;
};

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" fontWeight={700} sx={{ marginTop: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
