import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const FabBot = () => {
  return (
    <Tooltip title="Ask AI Assistant" placement="left">
      <Fab 
        color="primary" 
        aria-label="ai-assistant"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          border: '3px solid #FFCD41',
          width: 64,
          height: 64,
          boxShadow: '0 8px 32px rgba(215, 30, 40, 0.3)',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: '#B11821',
          },
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <SmartToyIcon sx={{ fontSize: 32, color: '#fff' }} />
      </Fab>
    </Tooltip>
  );
};

export default FabBot;
