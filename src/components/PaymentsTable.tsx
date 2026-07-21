import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import type { Payment } from "../types/Payment";

type PaymentsTableProps = {
  payments: Payment[];
  onChangeStatus: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
};
const getStatusColor = (
  status: Payment["status"],
): "success" | "warning" | "error" | "default" => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "PENDING":
      return "warning";
    case "FAILED":
      return "error";
    default:
      return "default";
  }
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
                <Chip
                  label={payment.status}
                  size="small"
                  color={getStatusColor(payment.status)}
                />
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
                  <Tooltip title="Change Status">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onChangeStatus(payment)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Payment">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => onDelete(payment)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
