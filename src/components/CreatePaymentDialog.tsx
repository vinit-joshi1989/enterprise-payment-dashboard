import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  createPayment,
  type CreatePaymentRequest,
} from "../services/paymentService";

type CreatePaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const initialForm: CreatePaymentRequest = {
  transactionReference: "",
  customerId: "",
  amount: 0,
  currency: "USD",
  description: "",
};

function CreatePaymentDialog({
  open,
  onClose,
  onCreated,
}: CreatePaymentDialogProps) {
  const [form, setForm] = useState<CreatePaymentRequest>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setForm(initialForm);
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.transactionReference.trim()) {
      setError("Transaction reference is required.");
      return;
    }
    if (!form.customerId.trim()) {
      setError("Customer ID is required.");
      return;
    }

    if (form.amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await createPayment({
        ...form,
        transactionReference: form.transactionReference.trim(),
        customerId: form.customerId.trim(),
        currency: form.currency.toUpperCase(),
        description: form.description.trim(),
      });
      onCreated();
      handleClose();
    } catch {
      setError("Failed to create payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Payment</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Transaction Reference"
            placeholder="TXN-2026-001"
            value={form.transactionReference}
            onChange={(event) =>
              setForm({
                ...form,
                transactionReference: event.target.value,
              })
            }
            inputProps={{ maxLength: 100 }}
            required
            fullWidth
          />
          <TextField
            label="Customer ID"
            value={form.customerId}
            onChange={(event) =>
              setForm({
                ...form,
                customerId: event.target.value,
              })
            }
            required
            fullWidth
          />

          <TextField
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(event) =>
              setForm({
                ...form,
                amount: Number(event.target.value),
              })
            }
            inputProps={{ min: 0.01, step: 0.01 }}
            required
            fullWidth
          />

          <TextField
            select
            label="Currency"
            value={form.currency}
            onChange={(event) =>
              setForm({
                ...form,
                currency: event.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </TextField>

          <TextField
            label="Description"
            value={form.description}
            onChange={(event) =>
              setForm({
                ...form,
                description: event.target.value,
              })
            }
            multiline
            minRows={3}
            required
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePaymentDialog;
