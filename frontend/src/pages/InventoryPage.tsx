import { Box, Button, Paper } from "@mui/material";
import ProductsList from "../components/inventory/ProductsList";
import { useState } from "react";
import AddProductForm from "../components/inventory/AddProductForm";

export default function InventoryPage() {
  const [addForm, setAddForm] = useState<boolean>(false);

  return (
    <Paper sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyItems: 'center',
      padding: '2em',
      margin: '2em 2em 2em 2em',
      backgroundColor: '#8FC0C7'
    }}
    >
      <ProductsList />
      <Button onClick={() => setAddForm(true)} 
        variant="contained"
        sx={{ marginTop: '5em'}}>
        Add
      </Button>
      {addForm &&
        <AddProductForm setAddForm={setAddForm} />
      }
    </Paper>
  )
}


