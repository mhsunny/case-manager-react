import React from 'react';
import { 
  Card, 
  CardContent, 
  Stack, 
  Divider, 
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Box,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Analytics = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
        >
          <MuiLink underline="hover" color="inherit" href="/" sx={{ fontSize: '0.875rem' }}>
            Home
          </MuiLink>
          <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            Analytics
          </Typography>
        </Breadcrumbs>
      </Stack>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Performance Analytics
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'MTTR (Mean Time to Resolve)', value: '4.2 Days', change: '-12%', trend: 'up', color: '#10b981' },
          { title: 'Customer Satisfaction', value: '98%', change: '+0.5%', trend: 'up', color: '#6366f1' },
          { title: 'Case Volume', value: '4,281', change: '+3.2%', trend: 'up', color: '#D71E28' },
          { title: 'Budget Utilization', value: '72%', change: '-1.2%', trend: 'down', color: '#FFCD41' }
        ].map((stat, idx) => (
          <Grid key={idx} size={{ xs: 12, sm: 6, lg: 3 }}><Card sx={{ border: '1px solid #f0f0f0' }}><CardContent><Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>{stat.title}</Typography><Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{stat.value}</Typography><Stack direction="row" spacing={1} alignItems="center">{stat.trend === 'up' ? <TrendingUpIcon sx={{ color: '#10b981', fontSize: '1rem' }} /> : <TrendingDownIcon sx={{ color: '#ef4444', fontSize: '1rem' }} />}<Typography variant="caption" sx={{ fontWeight: 700, color: stat.trend === 'up' ? '#10b981' : '#ef4444' }}>{stat.change}</Typography><Typography variant="caption" color="text.secondary">vs last quarter</Typography></Stack></CardContent></Card></Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%', border: '1px solid #f0f0f0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Case Volume Over Time</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Total inbound cases categorized by month</Typography>
            <Box sx={{ height: 400 }}>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                series={[
                  { data: [4, 3, 5, 2, 1, 6, 4, 8, 5, 7, 9, 11], label: 'Personal', color: '#D71E28' },
                  { data: [1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 1, 3], label: 'Corporate', color: '#6366f1' },
                ]}
                height={400}
              />
            </Box>
          </Paper>
        </Grid><Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%', border: '1px solid #f0f0f0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Resource Allocation</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Distribution cross-departments</Typography>
            <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 35, label: 'Lending', color: '#D71E28' },
                      { id: 1, value: 25, label: 'Wealth', color: '#FFCD41' },
                      { id: 2, value: 40, label: 'Retail', color: '#6366f1' },
                    ],
                    innerRadius: 60,
                    outerRadius: 120,
                    paddingAngle: 5,
                    cornerRadius: 10,
                  },
                ]}
                height={400}
                slotProps={{ legend: { direction: 'column', position: { vertical: 'bottom', horizontal: 'middle' } } }}
              />
            </Box>
          </Paper>
        </Grid><Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Regional Load Balacing</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Comparison of case resolve times across regions</Typography>
            <Box sx={{ height: 400 }}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['North America', 'EMEA', 'APAC', 'LATAM'] }]}
                series={[
                  { data: [42, 34, 45, 28], label: 'Inbound', color: '#D71E28' },
                  { data: [38, 30, 42, 25], label: 'Resolved', color: '#10b981' },
                ]}
                height={400}
                borderRadius={8}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
