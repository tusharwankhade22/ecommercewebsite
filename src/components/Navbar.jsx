import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartClick }) => {
  const { cartItems } = useCart(); // ✅ Fix: use cartItems, not cart
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: '#ffffff', color: '#333' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Brand */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              fontSize: '1.4rem',
            }}
          >
            🛍️ SnapShop
          </Typography>

          {/* Cart Icon with Badge */}
          <Box>
            <IconButton onClick={onCartClick}>
              <Badge badgeContent={itemCount} color="error" overlap="circular">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
