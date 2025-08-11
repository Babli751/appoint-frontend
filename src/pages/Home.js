import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Stack
} from '@mui/material';
import {
  Search,
  LocationOn,
  Star,
  AccessTime,
  Person,
  Notifications,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchService, setSearchService] = useState('');

  const popularServices = [
    'Saç Kesimi', 'Sakal Tıraşı', 'Maşa', 'Yıkama', 'Boya', 'Masaj'
  ];

  const featuredBarbers = [
    {
      id: 1,
      name: 'Mehmet Kaya',
      shopName: 'Elite Barber Shop',
      rating: 4.8,
      reviewCount: 245,
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      specialties: ['Saç Kesimi', 'Sakal Tıraşı'],
      nextAvailable: '14:30',
      price: '₺80'
    },
    {
      id: 2,
      name: 'Ali Demir',
      shopName: 'Modern Kuaför',
      rating: 4.9,
      reviewCount: 189,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      specialties: ['Saç Kesimi', 'Boya'],
      nextAvailable: '15:00',
      price: '₺75'
    },
    {
      id: 3,
      name: 'Osman Yılmaz',
      shopName: 'Classic Barber',
      rating: 4.7,
      reviewCount: 312,
      distance: '0.5 km',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      specialties: ['Sakal Tıraşı', 'Masaj'],
      nextAvailable: '16:15',
      price: '₺90'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <AppBar position="static" sx={{ 
        bgcolor: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
        background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)'
      }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            BarberPro
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <Avatar sx={{ ml: 1, bgcolor: '#fbbf24' }}>U</Avatar>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
        color: 'white',
        py: 6
      }}>
        <Container>
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            textAlign: 'center'
          }}>
            En İyi Berberleri Keşfedin
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 4, 
            textAlign: 'center',
            opacity: 0.9
          }}>
            Yakınınızdaki profesyonel berberlerden hemen randevu alın
          </Typography>

          {/* Search Box */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            maxWidth: 600, 
            mx: 'auto',
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            <TextField
              placeholder="Hizmet ara (Saç kesimi, Sakal tıraşı...)"
              value={searchService}
              onChange={(e) => setSearchService(e.target.value)}
              sx={{ 
                flex: 1,
                bgcolor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#6b46c1' }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Konum"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              sx={{ 
                flex: 1,
                bgcolor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: '#6b46c1' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#fbbf24',
                color: 'black',
                fontWeight: 'bold',
                px: 4,
                '&:hover': { bgcolor: '#f59e0b' }
              }}
            >
              Ara
            </Button>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        {/* Popular Services */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1f2937' }}>
            Popüler Hizmetler
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {popularServices.map((service) => (
              <Chip
                key={service}
                label={service}
                onClick={() => setSearchService(service)}
                sx={{
                  bgcolor: '#ede9fe',
                  color: '#6b46c1',
                  fontWeight: 'medium',
                  '&:hover': { bgcolor: '#ddd6fe' }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Featured Barbers */}
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
            Öne Çıkan Berberler
          </Typography>
          <Grid container spacing={3}>
            {featuredBarbers.map((barber) => (
              <Grid item xs={12} md={4} key={barber.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(107, 70, 193, 0.15)'
                    }
                  }}
                  onClick={() => navigate(`/barber/${barber.id}`)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={barber.image}
                      alt={barber.name}
                    />
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'white',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <Star sx={{ color: '#fbbf24', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {barber.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {barber.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {barber.shopName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 16, color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                          {barber.distance}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        ({barber.reviewCount} yorum)
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                      {barber.specialties.map((specialty) => (
                        <Chip
                          key={specialty}
                          label={specialty}
                          size="small"
                          sx={{
                            bgcolor: '#fef3e2',
                            color: '#92400e',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Sonraki müsait
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 16, color: '#6b46c1' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6b46c1' }}>
                            {barber.nextAvailable}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                          {barber.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          başlangıç
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: '#6b46c1',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#553c9a' }
                      }}
                    >
                      Randevu Al
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
            Hızlı İşlemler
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Card sx={{ p: 3, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f9fafb' } }}>
                <Person sx={{ fontSize: 40, color: '#6b46c1', mb: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Favori Berberim
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ p: 3, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f9fafb' } }}>
                <AccessTime sx={{ fontSize: 40, color: '#6b46c1', mb: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Randevularım
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
