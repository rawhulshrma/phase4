import React, { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Drawer,
    TextField,
    Slider,
    Rating,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { styled } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

// Sample product data
const products = [
    { id: 1, name: "Red T-Shirt", description: "Comfortable cotton t-shirt", price: 20, rating: 4.5, category: "Fashion", image: "https://via.placeholder.com/300x200?text=Red+T-Shirt" },
    { id: 2, name: "Blue Jeans", description: "Stylish blue jeans", price: 40, rating: 3.5, category: "Fashion", image: "https://via.placeholder.com/300x200?text=Blue+Jeans" },
    { id: 3, name: "Kids Toy", description: "Fun toy for kids", price: 15, rating: 2.5, category: "Toys", image: "https://via.placeholder.com/300x200?text=Kids+Toy" },
    { id: 4, name: "Fantasy Book", description: "An exciting fantasy novel", price: 25, rating: 4, category: "Books", image: "https://via.placeholder.com/300x200?text=Fantasy+Book" },
    { id: 5, name: "Green T-Shirt", description: "Comfortable cotton t-shirt", price: 22, rating: 3.5, category: "Fashion", image: "https://via.placeholder.com/300x200?text=Green+T-Shirt" },
    { id: 6, name: "Action Figure", description: "Cool action figure", price: 30, rating: 5, category: "Toys", image: "https://via.placeholder.com/300x200?text=Action+Figure" },
    { id: 7, name: "Science Book", description: "An informative science book", price: 28, rating: 4.5, category: "Books", image: "https://via.placeholder.com/300x200?text=Science+Book" },
    { id: 8, name: "Black Sneakers", description: "Stylish black sneakers", price: 50, rating: 4, category: "Fashion", image: "https://via.placeholder.com/300x200?text=Black+Sneakers" },
];

const categories = ["All", "Fashion", "Toys", "Books"];

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    },
}));

const CategoryButton = styled(Button)(({ theme, selected }) => ({
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    backgroundColor: selected ? theme.palette.primary.main : 'transparent',
    color: selected ? theme.palette.primary.contrastText : theme.palette.primary.main,
    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
    },
}));

const FloatingTextField = styled(TextField)(({ theme }) => ({
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
}));

const StyledPaginationButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'rgb(105, 59, 184)',
    color: 'white',
    borderRadius: '5px',
    margin: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'rgb(85, 49, 164)',
    },
}));

const ProductCatalog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [ratingFilter, setRatingFilter] = useState(0);
    
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const filteredProducts = products.filter(product => 
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        product.rating >= ratingFilter
    );

    // Calculate the current products to display
    const currentProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Handle page change
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', my: 4 }}>
                Product Catalog
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <FloatingTextField
                    variant="outlined"
                    placeholder="Search products..."
                    InputProps={{
                        startAdornment: <SearchIcon color="action" />,
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1, mr: 2 }}
                />
                <Button
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    onClick={() => setDrawerOpen(true)}
                    sx={{ backgroundColor: 'rgb(105, 59, 184)', '&:hover': { backgroundColor: 'rgb(85, 49, 164)' } }}
                >
                    Filter
                </Button>
            </Box>

            <Grid container spacing={4}>
                {currentProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <StyledCard>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                    <Rating value={product.rating} precision={0.5} readOnly />
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                        ${product.price}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Enhanced Pagination Component */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Products per page</InputLabel>
                    <Select
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                        label="Products per page"
                    >
                        {[4, 8, 12, 16].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <Box>
                    <StyledPaginationButton 
                        onClick={() => handleChangePage(page - 1)} 
                        disabled={page === 0}
                    >
                        Previous
                    </StyledPaginationButton>
                    <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                        Page {page + 1} of {Math.ceil(filteredProducts.length / rowsPerPage)}
                    </Typography>
                    <StyledPaginationButton 
                        onClick={() => handleChangePage(page + 1)} 
                        disabled={page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1}
                    >
                        Next
                    </StyledPaginationButton>
                </Box>
                
                <Typography variant="body2">
                    Showing {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </Typography>
            </Box>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" gutterBottom>Filters</Typography>
                    
                    <Typography gutterBottom>Category</Typography>
                    {categories.map(category => (
                        <CategoryButton 
                            key={category} 
                            variant="outlined" 
                            onClick={() => setSelectedCategory(category)}
                            selected={selectedCategory === category}
                        >
                            {category}
                        </CategoryButton>
                    ))}

                    <Typography gutterBottom sx={{ mt: 2 }}>Price Range</Typography>
                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                    />

                    <Typography gutterBottom sx={{ mt: 2 }}>Minimum Rating</Typography>
                    <Rating
                        value={ratingFilter}
                        onChange={(_, newValue) => setRatingFilter(newValue)}
                        precision={0.5}
                    />
                </Box>
            </Drawer>
        </Container>
    );
};

export default ProductCatalog;
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Drawer,
//   IconButton,
//   Switch,
//   Snackbar,
//   Alert,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import { Add, Refresh, Close, Edit, MoreVert } from '@mui/icons-material';
// import Loading from "../../ui-component/Loadex";
// import { fetchProducts, addProduct } from '../../../action/product/productAction';
// import { fetchProductCategories } from '../../../action/product/productAction';

// const Products = () => {
//   const dispatch = useDispatch();
//   const { products, loading, status, error } = useSelector((state) => state.products);
//   const { categories } = useSelector((state) => state.productCategories);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState({
//     name: '',
//     category: '',
//     price: '',
//     ratings: '',
//     enabled: true,
//     image: null,
//   });
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchProductCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log('Categories:', categories);
//   }, [categories]);

//   const handleDrawerOpen = () => {
//     setCurrentProduct({
//       name: '',
//       category: '',
//       price: '',
//       ratings: '',
//       enabled: true,
//       image: null,
//     });
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setCurrentProduct((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setCurrentProduct((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', currentProduct.name);
//       formData.append('category', currentProduct.category);
//       formData.append('price', currentProduct.price);
//       formData.append('ratings', currentProduct.ratings);
//       formData.append('enabled', currentProduct.enabled);
//       if (currentProduct.image) {
//         formData.append('image', currentProduct.image);
//       }

//       const resultAction = await dispatch(addProduct(formData));
//       if (addProduct.fulfilled.match(resultAction)) {
//         showSnackbar('Product added successfully', 'success');
//         dispatch(fetchProducts());
//         handleDrawerClose();
//       } else {
//         throw new Error(resultAction.error.message);
//       }
//     } catch (error) {
//       showSnackbar(`Failed to save product: ${error.message}`, 'error');
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const filteredProducts = products?.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Product List
//       </Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: '40%' }}
//         />
//         <Box>
//           <Button
//             startIcon={<Refresh />}
//             onClick={() => dispatch(fetchProducts())}
//             sx={{ mr: 1, backgroundColor: '#693bb8', color: '#fff' }}
//             variant="contained"
//           >
//             Refresh
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleDrawerOpen}
//             sx={{ backgroundColor: '#693bb8', color: '#fff' }}
//           >
//             Add New Product
//           </Button>
//         </Box>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Product Category</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Ratings</TableCell>
//               <TableCell>Enabled</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Loading />
//                 </TableCell>
//               </TableRow>
//             ) : status === 'failed' ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Typography color="error">Error: {error}</Typography>
//                 </TableCell>
//               </TableRow>
//             ) : filteredProducts.length ? (
//               filteredProducts.map((product) => (
//                 <TableRow key={product.id}>
//                   <TableCell>{product.name}</TableCell>
//                   <TableCell>{product.category}</TableCell>
//                   <TableCell>{product.price}</TableCell>
//                   <TableCell>{product.ratings}</TableCell>
//                   <TableCell>
//                     <Switch checked={product.enabled} disabled />
//                   </TableCell>
//                   <TableCell>
//                     <IconButton disabled>
//                       <Edit />
//                     </IconButton>
//                     <IconButton disabled>
//                       <MoreVert />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Typography>No products found</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
//         <Box sx={{ width: 400, p: 3 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6">Add New Product</Typography>
//             <IconButton onClick={handleDrawerClose}>
//               <Close />
//             </IconButton>
//           </Box>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={currentProduct.name}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <Typography gutterBottom>Product Category</Typography>
//           <Select
//             name="category"
//             value={currentProduct.category}
//             onChange={handleChange}
//             fullWidth
//             displayEmpty
//             required
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             {categories.map((category) => (
//               <MenuItem key={category.id} value={category.name}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//           <TextField
//             fullWidth
//             label="Price"
//             name="price"
//             value={currentProduct.price}
//             onChange={handleChange}
//             margin="normal"
//             required
//             type="number"
//           />
//           <TextField
//             fullWidth
//             label="Ratings"
//             name="ratings"
//             value={currentProduct.ratings}
//             onChange={handleChange}
//             margin="normal"
//             required
//             type="number"
//           />
//           <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
//             <Typography>Enabled</Typography>
//             <Switch
//               checked={currentProduct.enabled}
//               onChange={(e) => setCurrentProduct((prev) => ({ ...prev, enabled: e.target.checked }))}
//             />
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography>Product Image</Typography>
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               accept="image/*"
//               style={{ marginTop: 8, width: '100%' }}
//             />
//           </Box>
//           <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
//             Submit
//           </Button>
//         </Box>
//       </Drawer>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
//       >
//         <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Products;
