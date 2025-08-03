import React from 'react';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart(); // ✅ Correct usage from context

  return (
    <Card
      sx={{
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 2,
        overflow: 'hidden',
        height: '100%',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          '& img': {
            transform: 'scale(1.03)',
          },
        },
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          height: 200,
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.4s ease',
          }}
          className="product-img"
        />
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flexGrow: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: '#333',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 44,
          }}
        >
          {product.title.split(' ').slice(0, 4).join(' ')}...
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: '#7c3aed', fontWeight: 'bold', mb: 0.5 }}
        >
          ${product.price}
        </Typography>

        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: '#7c3aed',
              color: '#7c3aed',
              fontWeight: 500,
              fontSize: 14,
              borderRadius: 2,
              padding: '10px 16px',
            }}
            onClick={() => {
              console.log('Clicked View Details:', product.title);
              onViewDetails();
            }}
          >
            View Details
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#7c3aed',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 2,
              padding: '12px 16px',
              '&:hover': {
                backgroundColor: '#7c3aed',
              },
            }}
            startIcon={<ShoppingCartIcon />}
            onClick={() => {
              addToCart(product); // ✅ Now correctly calling addToCart
              console.log('Added to cart:', product.title);
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
