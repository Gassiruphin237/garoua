import React, { useState } from "react";
import emailList from "./emails.json"; // Liste des emails
import { TextField, Button, Typography, Container, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

const EmailChecker = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCheckEmail = async () => {
    if (!Array.isArray(emailList)) {
      setResponseMessage("Erreur : La liste des emails est mal formatée.");
      return;
    }

    const verificationMessage = emailList.includes(email.toLowerCase())
      ? "Vous êtes de cette session ✅"
      : "Vous n'êtes pas de cette session ❌";
    setMessage(verificationMessage);

    const newEntry = { email, phone, message: verificationMessage, date: new Date().toISOString() };

    try {
      const response = await fetch("https://api-garoua.onrender.com//verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      const result = await response.json();
      setResponseMessage(result.message || result.error);
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
      <span>Entrez votre adresse email utilisé lors de l'inscription au TCF Canada </span>
        <br />    <br />
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
        type="tel"
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

      {message && (
        <Alert
          icon={message.includes("❌") ? <ErrorIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />}
          severity={message.includes("❌") ? "error" : "success"}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default EmailChecker;
