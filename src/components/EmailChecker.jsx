import React, { useState } from "react";
import { TextField, Button, Typography, Container, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import emailList from "./emails.json"; // Liste des emails
import ErrorIcon from "@mui/icons-material/Error";

const EmailChecker = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [responseMessage, setResponseMessage] = useState("");  // Message pour la réponse du backend
  const [message, setMessage] = useState("");  // Message pour la vérification de la session

  const handleCheckEmail = async () => {
    if (!Array.isArray(emailList)) {
      setResponseMessage("Erreur : La liste des emails est mal formatée.");
      return;
    }
    if (!email || !phone) {
      setResponseMessage("L'email et le téléphone sont requis.");
      return;
    }

    // Vérification si l'email est dans la liste
    const verificationMessage = emailList.includes(email.toLowerCase())
      ? "Vous êtes de cette session ✅"
      : "Vous n'êtes pas de cette session ❌";

    setMessage(verificationMessage);  // Mettre à jour le message de vérification

    // Préparer l'objet à envoyer au backend
    const newEntry = { email, phone, message: verificationMessage, date: new Date().toISOString() };

    try {
      // Envoi des données au backend
      const response = await fetch("https://api-garoua.onrender.com/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message);  // Message renvoyé par le backend
      } else {
        setResponseMessage(result.message || "Erreur lors de la vérification.");
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
        disabled={isButtonDisabled}
      >
        Vérifier
      </Button>

      {/* Affichage du message de la session */}
      {message && (
        <Alert
          icon={message.includes("❌") ? <ErrorIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />}
          severity={message.includes("❌") ? "error" : "success"}
        >
          {message}
        </Alert>
      )}

      {/* Affichage de la réponse du backend */}
      {/* {responseMessage && (
        <Alert
          icon={responseMessage.includes("❌") ? <ErrorIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />}
          severity={responseMessage.includes("❌") ? "error" : "success"}
        >
          {responseMessage}
        </Alert>
      )} */}
    </Container>
  );
};

export default EmailChecker;
