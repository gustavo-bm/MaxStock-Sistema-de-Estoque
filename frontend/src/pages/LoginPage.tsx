import { Box, useMediaQuery } from "@mui/material";
import LoginForm from "../components/login";
import inventoryImage from "../assets/InventoryImage.jpg";
import maxStockLogo from "../assets/max_stock_logo.png";

const LoginPage: React.FC = () => {
  const isMediumScreen = useMediaQuery('(max-width:1200px)');

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '100%', md: '50%' },
          p: 2,
        }}
      >
        <img
          src={inventoryImage}
          alt="Inventory"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '90vh',
            borderRadius: '15px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            objectFit: 'cover',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5vw',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '100%', md: '50%' },
          p: 2,
        }}
      >
        <img
          src={maxStockLogo}
          alt="Inventory"
          style={{
            height: isMediumScreen ? '10vh' : '15vh',
            borderRadius: '15px',
          }}
        />
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;


