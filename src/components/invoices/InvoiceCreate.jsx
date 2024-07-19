// import React from "react";
import {
  Container,
  List,
  TextField,
  Typography,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// import { getCurrentDate } from "../../utilities/utils";
import { useState } from "react";
const itemBase = {
  item_name: null,
  item_price: null,
  item_qnt: null,
};
const payBase = {
  how_payed: "Efectivo",
  who_received: "Jhon",
  payment: 0,
};
import db from "../../appwrite/databases";
import { useNavigate } from "react-router-dom";
const InvoiceCreate = () => {
  const [userName, setUserName] = useState("");
  const [typeInvoce, setTypeInvoce] = useState("Venta");
  const [items, setItems] = useState([itemBase]);
  const [payments, setPayments] = useState([payBase]);

  const invoice_total = items.reduce(
    (sum, item) => sum + item.item_price * item.item_qnt,
    0
  );
  const invoice_payment = payments.reduce(
    (sum, payment) => sum + payment.payment,
    0
  );

  // console.log(typeInvoce);
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    // console.log(field);
    newItems[index][field] = field === "item_price" ? parseFloat(value) : value;

    newItems[index][field] = field == "item_qnt" ? parseFloat(value) : value;
    setItems(newItems);
  };
  //   console.log(items);
  const addItem = () => {
    setItems([
      ...items,
      {
        item_name: null,
        item_price: null,
        item_qnt: null,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length < 2) {
      setItems([itemBase]);
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const handlePaymentChange = (index, field, value) => {
    const newPayment = [...payments];
    newPayment[index][field] = field === "payment" ? parseFloat(value) : value;
    setPayments(newPayment);
  };
  // console.log(items);
  const addPayment = () => {
    setPayments([
      ...payments,
      {
        how_payed: "Efectivo",
        who_received: "Jhon",
        payment: 0,
      },
    ]);
  };

  const removePayment = (index) => {
    if (payments.length < 2) {
      setPayments([payBase]);
      return;
    }
    setPayments(payments.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const invoice_main = {
      user_name: userName,
      type_invoice: typeInvoce,
      invoice_items: items,
      invoice_payments: payments,
      invoice_total,
      invoice_payment,
    };
    await db.invoice_main.create(invoice_main);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h3">Crear Invoice</Typography>
      <Typography variant="h4">Informacion general</Typography>
      <TextField
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
        label="Nombre"
        value={userName}
        margin="normal"
      />
      <TextField
        onChange={(e) => setTypeInvoce(e.target.value)}
        fullWidth
        label="Tipo de operacion"
        margin="normal"
        value={typeInvoce}
      />

      <Typography variant="h4">Detalles de {typeInvoce}</Typography>

      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <TextField
              label="Descripcion del producto"
              value={item.item_name}
              required
              onChange={(e) =>
                handleItemChange(index, "item_name", e.target.value)
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Cantidad"
              type="number"
              value={item.item_qnt}
              onChange={(e) =>
                handleItemChange(index, "item_qnt", parseFloat(e.target.value))
              }
              inputProps={{
                step: 0.001,
                min: -999999999.999, // Valor mínimo negativo
                max: 999999999.999, // Valor máximo positivo
              }}
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Precio"
              type="number"
              value={item.item_price}
              onChange={(e) =>
                handleItemChange(
                  index,
                  "item_price",
                  parseFloat(e.target.value)
                )
              }
              inputProps={{
                step: 0.001,
                min: -999999999.999, // Valor mínimo negativo
                max: 999999999.999, // Valor máximo positivo
              }}
            />
            <Typography>{(item.item_price * item.item_qnt) | 0}</Typography>
            <IconButton onClick={() => removeItem(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button startIcon={<AddIcon />} onClick={addItem}>
        Agregar Ítem
      </Button>
      <Typography>Total: S/. {invoice_total} </Typography>

      <Typography variant="h4">Detalles de Pagos</Typography>
      <List>
        {payments.map((payment, index) => (
          <ListItem key={index}>
            <TextField
              label="Como se paga"
              value={payment.how_payed}
              onChange={(e) =>
                handlePaymentChange(index, "how_payed", e.target.value)
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Quien recibe"
              //   type=""
              value={payment.who_received}
              onChange={(e) =>
                handlePaymentChange(index, "who_received", e.target.value)
              }
              inputProps={{
                step: 0.001,
                min: -999999999.999, // Valor mínimo negativo
                max: 999999999.999, // Valor máximo positivo
              }}
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Cantidad"
              type="number"
              value={payment.payment}
              onChange={(e) =>
                handlePaymentChange(index, "payment", e.target.value)
              }
            />
            {/* <Typography>{(item.item_price * item.item_qnt) | 0}</Typography> */}
            <IconButton onClick={() => removePayment(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button startIcon={<AddIcon />} onClick={addPayment}>
        Agregar Pago
      </Button>
      <Typography>Total: S/. {invoice_payment} </Typography>
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Regitrar Invoice
      </Button>
    </Container>
  );
};

export default InvoiceCreate;
