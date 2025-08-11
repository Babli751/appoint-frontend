import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stack,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import {
  ArrowBack,
  Schedule,
  Person,
  Star,
  AccessTime,
  LocationOn,
  Phone,
  History,
  Favorite,
  Settings
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const upcomingAppointments = [
    {
      id: 1,
      barberName: 'Mehmet Kaya',
      shopName: 'Elite Barber Shop',
      service: 'Saç Kesimi + Sakal',
      date: '15 Ocak 2024',
      time: '14:30',
      price: '₺120',
      status: 'confirmed',
      barberImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      address: 'Çankaya Mahallesi, Atatürk Caddesi'
    },
    {
      id: 2,
      barberName: 'Ali Demir',
      shopName: 'Modern Kuaför',
      service: 'Saç Kesimi',
      date: '18 Ocak 2024',
      time: '16:00',
      price: '₺75',
      status: 'pending',
      barberImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      address: 'Kızılay Mahallesi, Atatürk Bulvarı'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      barberName: 'Osman Yılmaz',
      shopName: 'Classic Barber',
      service: 'Sakal Tıraşı + Masaj',
      date: '10 Ocak 2024',
      time: '15:30',
      price: '₺90',
      status: 'completed',
      barberImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      reviewed: true
    },
    {
      id: 4,
      barberName: 'Mehmet Kaya',
      shopName: 'Elite Barber Shop',
      service: 'Saç Kesimi',
      date: '5 Ocak 2024',
      time: '11:00',
      price: '₺80',
      status: 'completed',
      barberImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 4,
      reviewed: false
    }
  ];

  const favoriteBarbers = [
    {
      id: 1,
      name: 'Mehmet Kaya',
      shopName: 'Elite Barber Shop',
      rating: 4.8,
      visits: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Osman Yılmaz',
      shopName: 'Classic Barber',
      rating: 4.7,
      visits: 3,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Onaylandı';
      case 'pending': return 'Beklemede';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ 
        bgcolor: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
        background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)'
      }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Panelim
          </Typography>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        {/* User Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#6b46c1', color: 'white' }}>
              <Schedule sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {upcomingAppointments.length}
              </Typography>
              <Typography variant="body1">
                Yaklaşan Randevu
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fbbf24', color: 'white' }}>
              <History sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {pastAppointments.length}
              </Typography>
              <Typography variant="body1">
                Geçmiş Randevu
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#10b981', color: 'white' }}>
              <Favorite sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {favoriteBarbers.length}
              </Typography>
              <Typography variant="body1">
                Favori Berber
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Yaklaşan Randevular" />
              <Tab label="Geçmiş Randevular" />
              <Tab label="Favori Berberler" />
            </Tabs>
          </Box>

          {/* Upcoming Appointments */}
          <TabPanel value={tabValue} index={0}>
            {upcomingAppointments.length > 0 ? (
              <List>
                {upcomingAppointments.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem sx={{ px: 3, py: 2 }}>
                      <ListItemAvatar>
                        <Avatar src={appointment.barberImage} sx={{ width: 60, height: 60 }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {appointment.barberName}
                            </Typography>
                            <Chip 
                              label={getStatusText(appointment.status)}
                              sx={{ 
                                bgcolor: getStatusColor(appointment.status),
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.shopName}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {appointment.service}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTime sx={{ fontSize: 16, mr: 0.5, color: '#6b46c1' }} />
                                <Typography variant="body2">
                                  {appointment.date} - {appointment.time}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#6b46c1' }} />
                                <Typography variant="body2">
                                  {appointment.address}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6b46c1' }}>
                                {appointment.price}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <Button 
                                  variant="outlined" 
                                  size="small"
                                  sx={{ color: '#ef4444', borderColor: '#ef4444' }}
                                >
                                  İptal Et
                                </Button>
                                <Button 
                                  variant="contained" 
                                  size="small"
                                  sx={{ bgcolor: '#6b46c1' }}
                                  onClick={() => navigate(`/barber/${appointment.barberId}`)}
                                >
                                  Detaylar
                                </Button>
                              </Stack>
                            </Box>
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < upcomingAppointments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Schedule sx={{ fontSize: 60, color: '#d1d5db', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Yaklaşan randevunuz bulunmuyor
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/')}
                  sx={{ bgcolor: '#6b46c1' }}
                >
                  Randevu Al
                </Button>
              </Box>
            )}
          </TabPanel>

          {/* Past Appointments */}
          <TabPanel value={tabValue} index={1}>
            <List>
              {pastAppointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  <ListItem sx={{ px: 3, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar src={appointment.barberImage} sx={{ width: 60, height: 60 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {appointment.barberName}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6b46c1' }}>
                            {appointment.price}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.shopName}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {appointment.service}
                          </Typography>
                          <Typography variant="body2">
                            {appointment.date} - {appointment.time}
                          </Typography>
                          {appointment.rating && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Typography variant="body2">Verilen puan:</Typography>
                              <Star sx={{ color: '#fbbf24', fontSize: 16 }} />
                              <Typography variant="body2">{appointment.rating}/5</Typography>
                              {!appointment.reviewed && (
                                <Button size="small" sx={{ ml: 'auto', color: '#6b46c1' }}>
                                  Yorum Yap
                                </Button>
                              )}
                            </Box>
                          )}
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < pastAppointments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </TabPanel>

          {/* Favorite Barbers */}
          <TabPanel value={tabValue} index={2}>
            <List>
              {favoriteBarbers.map((barber, index) => (
                <React.Fragment key={barber.id}>
                  <ListItem sx={{ px: 3, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar src={barber.image} sx={{ width: 60, height: 60 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {barber.name}
                        </Typography>
                      }
                      secondary={
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            {barber.shopName}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Star sx={{ color: '#fbbf24', fontSize: 16, mr: 0.5 }} />
                              <Typography variant="body2">{barber.rating}</Typography>
                            </Box>
                            <Typography variant="body2">
                              {barber.visits} randevu
                            </Typography>
                          </Box>
                          <Button 
                            variant="contained" 
                            size="small"
                            sx={{ 
                              bgcolor: '#6b46c1',
                              mt: 1,
                              alignSelf: 'flex-start'
                            }}
                            onClick={() => navigate(`/barber/${barber.id}`)}
                          >
                            Randevu Al
                          </Button>
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < favoriteBarbers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
