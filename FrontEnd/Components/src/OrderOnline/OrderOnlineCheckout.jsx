import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const OrderOnlineCheckout = () => {
  useEffect(() => {
    document.body.style.display = "block";
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");
    return () => {
      document.body.style.display = "flex";
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  const path = useLocation();
  const { cart, totalAmount } = path.state || {};
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    fullname: "",
    emailAdress: "",
    contact: "",
    address: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { fullname, emailAddress, contact, address } = dataForm;

  if (!fullname || !emailAddress || !contact || !address) {
    alert("Please enter details in all fields.");
    return;
  }
    navigate("/order-payment", {
      state: {
        cart:Object.values(cart),
        totalAmount,
        dataForm,
      },
    });
  };

  const totalDisplay = typeof totalAmount === "number" && !isNaN(totalAmount) ? totalAmount.toFixed(2) : "0.00";

  return (
    <div style={{ marginTop: "15px" }}>
      <Typography
        sx={{ marginBottom: "10px", textAlign: "center", color: "black" }}
        variant="h3"
      >
        Enter Your Details
      </Typography>

      <form onSubmit={submitForm} className="formBox">
        <Grid container sx={{ marginBottom: "20px" }} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              name="fullname"
              required
              value={dataForm.fullname}
              variant="outlined"
              onChange={inputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              fullWidth
              name="emailAddress"
              label="Email"
              required
              value={dataForm.emailAddress}
              variant="outlined"
              onChange={inputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="tel"
              fullWidth
              required
              name="contact"
              variant="outlined"
              value={dataForm.contact}
              label="Phone Number"
              onChange={inputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Delivery Address"
              fullWidth
              multiline
              name="address"
              variant="outlined"
              required
              value={dataForm.address}
              onChange={inputChange}
              rows={4}
            />
          </Grid>
        </Grid>

        <Typography
          sx={{ marginTop: "20px", color: "black", textAlign: "center" }}
          variant="h5"
        >
          Items list
        </Typography>

        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
          {Object.values(cart || {}).length > 0 ? (
            <Table className="table-striped">
              <TableHead>
                <TableRow>
                  <TableCell>Item name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(cart || {}).map((dish, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ color: "white" }}>
                      {dish.name}
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      {dish.quantity}
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      ${dish.price * dish.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body1" sx={{ color: "black" }}>
              No Items
            </Typography>
          )}
        </Grid>

        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "black", marginTop: "20px" }}
        >
          Total Order Amount: ${totalDisplay}
        </Typography>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            onClick={submitForm}
            variant="contained"
            color="primary"
            type="submit"
          >
            Pay Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderOnlineCheckout;
