import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Checkbox, 
  Avatar, 
  Chip, 
  Typography, 
  Box, 
  IconButton,
  Stack
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CustomCaseTable = ({ 
  rows, 
  selected, 
  onSelectAll, 
  onSelectOne,
  onActionClick 
}) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Ready': return { color: '#0ea5e9', bgcolor: '#f0f9ff', borderColor: '#bae6fd' };
      case 'Pending': return { color: '#f59e0b', bgcolor: '#fffbeb', borderColor: '#fef3c7' };
      case 'In Review': return { color: '#6366f1', bgcolor: '#f5f3ff', borderColor: '#ddd6fe' };
      default: return { color: 'text.secondary', bgcolor: '#f8fafc', borderColor: '#e2e8f0' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return 'text.secondary';
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 1000 }}>
        <TableHead sx={{ bgcolor: '#f8fafc' }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox 
                indeterminate={selected.length > 0 && selected.length < rows.length}
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={onSelectAll}
                size="small"
              />
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Case Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Case ID</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Date Created ↑↓</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Case Type</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Assigned To</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Business Unit</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Date Updated</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem' }}>Description</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isSelected = selected.indexOf(row.id) !== -1;
            const statusStyle = getStatusStyle(row.status);
            
            return (
              <TableRow 
                key={row.id} 
                hover 
                selected={isSelected}
                sx={{ '&.Mui-selected': { bgcolor: '#f0f9ff' } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox 
                    checked={isSelected}
                    onChange={() => onSelectOne(row.id)}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{row.name}</TableCell>
                <TableCell>
                  <Typography sx={{ color: '#D71E28', fontWeight: 700, fontSize: '0.8rem' }}>
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{row.dateCreated}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{row.type}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    sx={{ 
                      borderRadius: '.625rem', 
                      fontWeight: 700, 
                      fontSize: '0.65rem',
                      height: 24,
                      ...statusStyle,
                      border: '1px solid',
                      borderColor: statusStyle.borderColor
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.65rem', bgcolor: '#f3f4f6', color: 'text.primary', fontWeight: 700 }}>
                      {row.assignedTo.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{row.assignedTo}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.priority} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      borderRadius: 1, 
                      fontWeight: 700, 
                      fontSize: '0.65rem',
                      height: 20,
                      color: getPriorityColor(row.priority),
                      borderColor: 'transparent',
                      bgcolor: 'transparent'
                    }} 
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{row.businessUnit}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{row.dateUpdated}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', color: 'text.secondary', maxWidth: 200, noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.description}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={(e) => onActionClick(e, row)}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomCaseTable;
