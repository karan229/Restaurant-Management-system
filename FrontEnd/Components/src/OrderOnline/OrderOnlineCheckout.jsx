import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const OrderOnlineCheckout = () => {
  const path = useLocation();
  const { cart, totalAmount } = path.state || {};
  const navigate = useNavigate();

  const submitForm = () => {
    e.preventDefault();
    navigate("/order-payment");
  };

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
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="tel"
              fullWidth
              required
              variant="outlined"
              label="Phone Number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Delivery Address"
              fullWidth
              multiline
              variant="outlined"
              required
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
          {Object.values(cart || {}).length > 0 ?(
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
                        <TableRow>
                            <TableCell style={{color: 'white'}}>{dish.name}</TableCell>
                            <TableCell style={{color: 'white'}}>{dish.quantity}</TableCell>
                            <TableCell style={{color: 'white'}}>${dish.price * dish.quantity}</TableCell>
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
          sx={{textAlign: "center",  color: "black", marginTop: "20px"}}
        >
          Total Order Amount: ${totalAmount.toFixed(2)}
        </Typography>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button variant="contained" color="primary" type="submit">
            Pay Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderOnlineCheckout;
