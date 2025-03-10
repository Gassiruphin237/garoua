import { useState } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import emailList from "./emails.json"; // 📌 Liste locale des emails autorisés

const API_URL = "https://67cef6a9823da0212a80e5e6.mockapi.io/v1/users";

const EmailChecker = () => {
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleCheckEmail = async () => {
    if (!email || !telephone) {
      setResponseMessage("L'email et le numéro sont requis.");
      setMessageType("error");
      return;
    }

    // 📌 Vérifier si l'email existe dans `emails.json`
    const emailExists = emailList.includes(email.toLowerCase());
    const verificationMessage = emailExists
      ? "Vous êtes de cette session ✅"
      : "Vous n'êtes pas de cette session ❌";

    setResponseMessage(verificationMessage);
    setMessageType(emailExists ? "success" : "error");

    // 📌 Enregistrer les données dans MockAPI
    const newEntry = {
      email,
      telephone,
      message: verificationMessage,
      date: Math.floor(Date.now() / 1000), // Timestamp en secondes
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }

    // 📌 Réinitialiser les champs après enregistrement
    setEmail("");
    setTelephone("");
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h5" gutterBottom>Vérification de Session</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "20px" }}
        required
      />
      <TextField
        label="Numéro WhatsApp"
        variant="outlined"
        fullWidth
        type="number"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        style={{ marginBottom: "20px" }}
        required
      />
      <Button onClick={handleCheckEmail} variant="contained" color="primary">
        Vérifier
      </Button>
      <br/>   <br/>
      
      {responseMessage && (
        <Alert icon={messageType === "error" ? <ErrorIcon /> : <CheckIcon />} severity={messageType}>
          {responseMessage}
        </Alert>
      )}

    </Container>
  );
};

export default EmailChecker;
