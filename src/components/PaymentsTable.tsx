import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import type { Payment } from "../types/Payment";

type PaymentsTableProps = {
  payments: Payment[];
};

function PaymentsTable({ payments }: PaymentsTableProps) {
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
                {new Date(payment.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PaymentsTable;
