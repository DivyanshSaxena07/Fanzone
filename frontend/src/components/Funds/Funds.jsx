import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Funds.css";

const Funds = () => {
  const [funds, setFunds] = useState(0);
  const [amount, setAmount] = useState("");

  const handleAddFunds = () => {
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      setFunds(funds + Number(amount));
      setAmount("");
      alert("Funds added successfully!");
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div className="add-funds-container">
      <div className="content-box">
        <h1 className="title">Add Funds</h1>
        <div className="funds-display">
          <p>Available Funds: <span className="funds-amount">₹{funds}</span></p>
        </div>
        <TextField
          label="Enter Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
        />
        <Button
          variant="contained"
          color="primary"
          className="add-funds-button"
          onClick={handleAddFunds}
        >
          Add Funds
        </Button>
      </div>
    </div>
  );
};

export default Funds;
