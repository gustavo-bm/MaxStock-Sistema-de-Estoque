import { Box, Button } from "@mui/material";
import ProductsList from "../components/inventory/ProductsList";
import { useState } from "react";
import AddProductForm from "../components/inventory/AddProductForm";

export default function InventoryPage() {
  const [addForm, setAddForm] = useState<boolean>(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }} >
        <ProductsList />
        <Button onClick={() => setAddForm(true)}>
          Add
        </Button>
        { addForm && 
          <AddProductForm setAddForm={setAddForm} />
        }
    </Box>
  )
}


