import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const API_URL = "https://67cef6a9823da0212a80e5e6.mockapi.io/v1/users";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erreur lors du chargement des données", error));
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Typography variant="h5" align="center" style={{ margin: "10px" }}>Liste des utilisateurs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.telephone}</TableCell>
              <TableCell>{user.message}</TableCell>
              <TableCell>{new Date(user.date * 1000).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
