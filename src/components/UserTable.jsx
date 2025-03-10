import { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, TextField, TablePagination 
} from "@mui/material";

const API_URL = "https://67cef6a9823da0212a80e5e6.mockapi.io/v1/users";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(""); // Pour la recherche
  const [page, setPage] = useState(0); // Page actuelle
  const [rowsPerPage, setRowsPerPage] = useState(5); // Nombre d'éléments par page

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Supprimer les doublons par numéro de téléphone
        const uniqueUsers = data.reduce((acc, user) => {
          if (!acc.find((u) => u.telephone === user.telephone)) {
            acc.push(user);
          }
          return acc;
        }, []);
        setUsers(uniqueUsers);
      })
      .catch((error) => console.error("Erreur lors du chargement des données", error));
  }, []);

  // Filtrer les utilisateurs selon l'email recherché
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion du changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gestion du changement du nombre d'éléments par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px", padding: "10px" }}>
     <Typography variant="h5" align="center" style={{ marginBottom: "10px" }}>
{users.length} Utilisateurs / 190  aynat repondu
</Typography>


      {/* Champ de recherche */}
      <TextField
        label="Rechercher par email"
        variant="outlined"
        fullWidth
        margin="dense"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tableau */}
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
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>{user.message}</TableCell>
                <TableCell>{new Date(user.date * 1000).toLocaleString()}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UserTable;
