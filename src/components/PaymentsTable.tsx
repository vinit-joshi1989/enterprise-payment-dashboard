import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";

import type { Payment } from "../types/Payment";

type PaymentsTableProps = {
  payments: Payment[];
  onChangeStatus: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
};

function PaymentsTable({
  payments,
  onChangeStatus,
  onDelete,
}: PaymentsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Reference</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.transactionReference}</TableCell>
              <TableCell>{payment.customerId}</TableCell>
              <TableCell>
                {payment.amount.toFixed(2)} {payment.currency}
              </TableCell>
              <TableCell>
                <Chip label={payment.status} size="small" />
              </TableCell>
              <TableCell>
                {new Date(payment.createdAt).toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: "center" }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onChangeStatus(payment)}
                  >
                    Change Status
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(payment)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PaymentsTable;
