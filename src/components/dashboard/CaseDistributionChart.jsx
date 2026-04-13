import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const CaseDistributionChart = () => {
  const data = [
    { id: 0, value: 35, label: 'Financial', color: '#D71E28' },
    { id: 1, value: 25, label: 'Legal', color: '#FFCD41' },
    { id: 2, value: 20, label: 'Corporate', color: '#6366f1' },
    { id: 3, value: 20, label: 'Internal', color: '#10b981' },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Distribution
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Cases by department
        </Typography>
        <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center' }}>
          <PieChart
            series={[
              {
                data,
                innerRadius: 80,
                outerRadius: 120,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            height={300}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'center' },
                padding: 0,
                labelStyle: {
                  fontSize: 12,
                  fontWeight: 500
                }
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CaseDistributionChart;
