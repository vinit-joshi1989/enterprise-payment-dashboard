import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import { getPayments } from "../services/paymentService";
import type { Payment } from "../types/Payment";
import PaymentsTable from "../components/PaymentsTable";
import CreatePaymentDialog from "../components/CreatePaymentDialog";

function Dashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  useEffect(() => {
    let cancelled = false;

    const loadInitialPayments = async () => {
      try {
        const data = await getPayments();

        if (!cancelled) {
          setPayments(data);
        }
      } catch (error) {
        console.error("Failed to load payments:", error);
      }
    };

    void loadInitialPayments();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshPayments = async () => {
    try {
      const data = await getPayments();

      setPayments(data);
      setPage(0);
    } catch (error) {
      console.error("Failed to refresh payments:", error);
    }
  };
  const handlePaymentCreated = async (errorMessage?: string) => {
    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    await refreshPayments();

    setSnackbarMessage("Payment created successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const filteredPayments = payments
    .filter((payment) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch =
        payment.transactionReference.toLowerCase().includes(normalizedSearch) ||
        payment.customerId.toLowerCase().includes(normalizedSearch) ||
        payment.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "ALL" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((firstPayment, secondPayment) => {
      let comparison = 0;

      if (sortBy === "amount") {
        comparison = firstPayment.amount - secondPayment.amount;
      }

      if (sortBy === "createdAt") {
        comparison =
          new Date(firstPayment.createdAt).getTime() -
          new Date(secondPayment.createdAt).getTime();
      }

      if (sortBy === "transactionReference") {
        comparison = firstPayment.transactionReference.localeCompare(
          secondPayment.transactionReference,
        );
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  const paginatedPayments = filteredPayments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Enterprise Payment Dashboard
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Monitor and manage payment transactions.
          </Typography>
        </Box>

        <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
          New Payment
        </Button>
      </Box>

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
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPage(0);
          }}
          fullWidth
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>

          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="ALL">All statuses</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>

          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort By"
            onChange={(event) => {
              setSortBy(event.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="transactionReference">
              Transaction Reference
            </MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          exclusive
          value={sortDirection}
          onChange={(_, value: "asc" | "desc" | null) => {
            if (value !== null) {
              setSortDirection(value);
              setPage(0);
            }
          }}
        >
          <ToggleButton value="desc">Desc</ToggleButton>
          <ToggleButton value="asc">Asc</ToggleButton>
        </ToggleButtonGroup>
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
        <PaymentsTable payments={paginatedPayments} />

        <TablePagination
          component="div"
          count={filteredPayments.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
        />
      </Box>
      <CreatePaymentDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreated={handlePaymentCreated}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
