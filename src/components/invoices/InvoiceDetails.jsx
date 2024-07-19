// import React from "react";

import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import db from "../../appwrite/databases";
// import Table from "@mui/material/Table";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Button,
} from "@mui/material";

export const loader = ({ params }) => {
  const invoice_data = db.invoice_main.get(params.id);
  return invoice_data;
};

const InvoiceDetails = () => {
  const { id } = useParams();
  const invoice = useLoaderData();
  const navigate = useNavigate();
  const items = invoice.invoice_items;
  const payments = invoice.invoice_payments;
  const deleteInvoice = async () => {
    await db.invoice_main.delete(id);
    navigate("/");
  };
  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              {/* <TableCell align="right">Su</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.$id}>
                <TableCell>{item.item_name}</TableCell>
                <TableCell align="right">{item.item_qnt}</TableCell>
                <TableCell align="right">{item.item_price}</TableCell>
                <TableCell align="right">
                  {item.item_price * item.item_qnt}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{invoice.invoice_total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Pagos
              </TableCell>
              {/* <TableCell align="right">Su</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell align="right">Fecha</TableCell>
              {/* <TableCell>Desc</TableCell> */}
              <TableCell align="right">Forma de pago</TableCell>
              <TableCell align="right">Quien Recibio</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.$id}>
                {/* <TableCell>{payment.$updatedAt}</TableCell> */}
                <TableCell align="right">{payment.$updatedAt}</TableCell>
                <TableCell align="right">{payment.how_payed}</TableCell>
                <TableCell align="right">{payment.who_received}</TableCell>
                <TableCell align="right">{payment.payment}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{invoice.invoice_payment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        onClick={() => navigate(`/invoice/edit/${id}`)}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        style={{ marginLeft: "10px" }}
      >
        Volver
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteInvoice()}
      >
        Eliminar
      </Button>
    </Container>
  );
};

export default InvoiceDetails;
