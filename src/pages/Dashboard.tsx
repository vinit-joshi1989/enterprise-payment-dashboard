import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import { getPayments } from "../services/paymentService";
import type { Payment } from "../types/Payment";
import PaymentsTable from "../components/PaymentsTable";

function Dashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
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
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.transactionReference
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
        }}
      >
        Enterprise Payment Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Monitor and manage payment transactions.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          label="Search payments"
          placeholder="Reference, customer, or description"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          fullWidth
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>

          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <MenuItem value="ALL">All statuses</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
        <PaymentsTable payments={filteredPayments} />
      </Box>
    </Box>
  );
}

export default Dashboard;
