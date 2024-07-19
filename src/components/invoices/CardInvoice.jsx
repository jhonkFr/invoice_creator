import { Card, Grid, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CardInvoice = ({ invoice }) => {
  // invoice items: user_name, type_invoice, place, total_items, total_payments, invoice_items, invoice_payments,
  const navigate = useNavigate();

  const handleViewInvoice = (id) => {
    navigate(`/invoice/${id}`);
  };
  // console.log(invoice);
  return (
    <Grid item xs={12} sm={6} md={4} key={invoice.$id}>
      <Card
        onClick={() => handleViewInvoice(invoice.$id)}
        style={{ cursos: "pointer" }}
      >
        <CardContent>
          <Typography variant="h5">{invoice.user_name}</Typography>
          <Typography variant="h6">
            ${invoice.invoice_total.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            ${invoice.invoice_payment.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
