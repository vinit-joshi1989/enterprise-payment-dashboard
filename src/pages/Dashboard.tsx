import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import { getPayments } from "../services/paymentService";
import type { Payment } from "../types/Payment";
import PaymentsTable from "../components/PaymentsTable";

function Dashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.error("Failed to load payments:", error);
      }
    };

    loadPayments();
  }, []);
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        Enterprise Payment Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Monitor and manage payment transactions.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard title="Total Payments" value={payments.length} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Completed"
            value={
              payments.filter((payment) => payment.status === "COMPLETED")
                .length
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Pending"
            value={
              payments.filter((payment) => payment.status === "PENDING").length
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DashboardCard
            title="Failed"
            value={
              payments.filter((payment) => payment.status === "FAILED").length
            }
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <PaymentsTable payments={payments} />
      </Box>
    </Box>
  );
}

export default Dashboard;
