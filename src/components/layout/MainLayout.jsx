import React from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import FabBot from '../common/FabBot';
import useAppStore from '../../store/useAppStore';

const MainLayout = () => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          // Adjust width based on sidebar
          width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 72}px)` },
        }}
      >
        <Toolbar /> {/* Spacer for Navbar */}
        <Container 
          maxWidth="100%" 
          className='content-container'
          sx={{ 
            mt: 4, 
            mb: 4, 
            flexGrow: 1,
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Outlet />
        </Container>
        <Footer />
      </Box>
      <FabBot />
    </Box>
  );
};

export default MainLayout;
