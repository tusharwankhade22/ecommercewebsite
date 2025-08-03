import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Button,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100%', sm: 400 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          bgcolor: '#f9f9f9',
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>🛒 Your Basket</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider />

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">Your cart is empty.</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    mb: 2,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    alt={item.title}
                    sx={{ width: 100, height: 100, borderRadius: 2 }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        flexWrap: 'wrap',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                          borderRadius: '20px',
                          px: 1,
                        }}
                      >
                        <IconButton size="small" onClick={() => decreaseQty(item.id)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => increaseQty(item.id)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" fontWeight={500}>
                        £{item.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        £{(item.price * item.quantity).toFixed(2)}
                      </Typography>

                      <IconButton size="small" onClick={() => removeFromCart(item.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Footer */}
            <Box mt="auto">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                flexWrap="wrap"
                gap={1}
              >
                <Typography fontWeight={600}>Total: £{getTotal()}</Typography>
                <Button
                  onClick={clearCart}
                  color="error"
                  variant="outlined"
                  size="small"
                >
                  Clear Cart
                </Button>
              </Box>

              {/* Checkout + Continue Shopping Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={onClose}
                  sx={{
                    borderColor: '#7c3aed',
                    color: '#7c3aed',
                    '&:hover': {
                      backgroundColor: '#ede9fe',
                      borderColor: '#7c3aed',
                    },
                  }}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#7c3aed',
                    '&:hover': {
                      backgroundColor: '#6b21a8',
                    },
                  }}
                  onClick={() => alert('Proceeding to checkout...')}
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
