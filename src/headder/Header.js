// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';



const Header = () => {
    // const location = useLocation();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const username = localStorage.getItem('user_name');

    // // Open the menu
    // const handleMenuClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // // Close the menu
    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'secondary.main' }}>
            <Toolbar>
                {/* Add the logo image */}
                <Box sx={{ mr: 2 }}>
                    <img
                        src={`../log3.png`}
                        alt="SaveTax LLC Logo"
                        style={{ height: '50px', width: 'auto' }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
