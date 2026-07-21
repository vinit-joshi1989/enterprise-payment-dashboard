import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import type { Payment } from "../types/Payment";
import { updatePaymentStatus } from "../services/paymentService";

type ChangeStatusDialogProps = {
  open: boolean;
  payment: Payment | null;
  onClose: () => void;
  onUpdated: (errorMessage?: string) => void;
};

function ChangeStatusDialog({
  open,
  payment,
  onClose,
  onUpdated,
}: ChangeStatusDialogProps) {
  const [status, setStatus] = useState(payment?.status ?? "");
  const [submitting, setSubmitting] = useState(false);
  const handleSave = async () => {
    if (!payment) {
      return;
    }

    try {
      setSubmitting(true);

      await updatePaymentStatus(payment.id, status);

      onUpdated();
      onClose();
    } catch {
      onUpdated("Failed to update payment status.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Change Payment Status</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Transaction Reference"
            value={payment?.transactionReference ?? ""}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            label="Customer ID"
            value={payment?.customerId ?? ""}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            fullWidth
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={submitting || status === payment?.status}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeStatusDialog;
