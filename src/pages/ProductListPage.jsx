import React, { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  CircularProgress,
  TextField,
  Box,
  Button,
  Typography,
  Stack
} from '@mui/material';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        const uniqueCategories = [...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (searchTerm) {
      updated = updated.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      updated = updated.filter(product => product.category === selectedCategory);
    }

    if (sortOrder === 'price') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'rating') {
      updated.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(updated);
  }, [searchTerm, sortOrder, selectedCategory, products]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const customButtonStyle = {
    borderRadius: '10px',
    padding: '10px 20px',
    margin: '4px',
    fontWeight: 'bold',
    textTransform: 'none',
    border: '1px solid #9c27b0',
    color: '#9c27b0',
    '&:hover': {
      backgroundColor: '#9c27b01a',
    },
  };

  const selectedButtonStyle = {
    ...customButtonStyle,
    backgroundColor: '#9c27b0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#7b1fa2',
    },
  };

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Box mb={3}>
        <TextField
          fullWidth
          placeholder="🔍 Search by title..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '& fieldset': {
                borderColor: '#9c27b0',
              },
              '&:hover fieldset': {
                borderColor: '#7b1fa2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7b1fa2',
                borderWidth: 2,
              },
            },
            input: {
              padding: '10px 20px',
              color: '#333',
              fontSize: '16px',
            },
          }}
        />
      </Box>

      

        {/* Sort */}
        <Stack direction="row" spacing={3} mb={4} flexWrap="wrap" justifyContent="center">
          
          <Button
            onClick={() => setSortOrder('price')}
            sx={sortOrder === 'price' ? selectedButtonStyle : customButtonStyle}
          >
            💵 Price
          </Button>
          <Button
            onClick={() => setSortOrder('rating')}
            sx={sortOrder === 'rating' ? selectedButtonStyle : customButtonStyle}
          >
            ⭐ Rating
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              sx={selectedCategory === cat ? selectedButtonStyle : customButtonStyle}
            >
              {cat}
            </Button>
          ))}
        </Stack>

        {/* Product Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={product}
                onViewDetails={() => handleViewDetails(product)}
                onAddToCart={() => addToCart(product)}
              />
            </Grid>
          ))}
        </Grid>

        {!filteredProducts.length && (
          <Typography variant="h6" mt={5} textAlign="center" color="text.secondary">
            No products found.
          </Typography>
        )}
      </Container>

      {/* Modal */}
      <ProductDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductListPage;
