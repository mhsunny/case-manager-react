import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const WeeklyTrendChart = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Weekly Trend
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Average cases per day
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34, 45, 30, 20], label: 'Cases', color: '#D71E28' }
            ]}
            height={300}
            xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            slotProps={{
              legend: { hidden: true }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeeklyTrendChart;
