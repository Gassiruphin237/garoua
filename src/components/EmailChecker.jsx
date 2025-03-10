import React, { useState } from "react";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

const EmailChecker = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCheckEmail = async () => {
    if (!email || !phone) {
      setResponseMessage("L'email et le numéro de téléphone sont requis.");
      return;
    }

    const newEntry = { email, phone, message, date: new Date().toISOString() };

    try {
      const response = await fetch("https://api-garoua.onrender.com/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      const result = await response.json();
      setResponseMessage(result.message || result.error);

      if (result.message.includes("✅")) {
        setMessage("Vous êtes de cette session ✅");
      } else {
        setMessage("Vous n'êtes pas de cette session ❌");
      }

    } catch (error) {
      setResponseMessage("Erreur lors de l'envoi des données.");
      console.log(error);
    }
  };

  const isButtonDisabled = !(email && phone); // Désactiver le bouton si l'email ou le téléphone est vide

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h5" gutterBottom>Vérification d'email</Typography>
      <br />
      <span>Entrez votre adresse email utilisée lors de l'inscription au TCF Canada</span>
      <br /><br />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
        required
      />

      <TextField
        label="Numéro WhatsApp"
        variant="outlined"
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
        required
      />

      <Button 
        onClick={handleCheckEmail} 
        variant="contained" 
        color="primary" 
        style={{ marginBottom: "20px" }}
        disabled={isButtonDisabled} // Désactiver le bouton si le champ est vide
      >
        Vérifier
      </Button>

      {responseMessage && (
        <Alert
          icon={responseMessage.includes("❌") ? <ErrorIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />}
          severity={responseMessage.includes("❌") ? "error" : "success"}
        >
          {responseMessage}
        </Alert>
      )}
    </Container>
  );
};

export default EmailChecker;
