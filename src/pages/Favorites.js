import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Rating,
  Stack,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Star,
  Phone,
  Favorite,
  Schedule
} from '@mui/icons-material';

const Favorites = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();

  // Mock favorite barbers data - in real app this would come from API
  const [favoriteBarbers, setFavoriteBarbers] = useState([
    {
      id: 1,
      name: 'Marco Rossi',
      shopName: 'Milano Barber Studio',
      rating: 4.8,
      reviewCount: 245,
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=250&fit=crop',
      specialties: ['Classic Cut', 'Beard Trim', 'Hot Towel'],
      nextAvailable: '14:30',
      price: '€35',
      city: 'Milan, Italy'
    },
    {
      id: 3,
      name: 'Hans Mueller',
      shopName: 'Berlin Barbershop',
      rating: 4.7,
      reviewCount: 312,
      distance: '0.5 km',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622034409709-bb8e94e6d9c7?w=400&h=250&fit=crop',
      specialties: ['Precision Cut', 'Fade', 'Grooming'],
      nextAvailable: '16:15',
      price: '€38',
      city: 'Berlin, Germany'
    }
  ]);

  const translations = {
    title: language === 'en' ? 'My Favorites' : language === 'tr' ? 'Favorilerim' : 'Мои избранные',
    noFavorites: language === 'en' ? 'You haven\'t added any favorite barbers yet.' : language === 'tr' ? 'Henüz favori berber eklemediniz.' : 'Вы еще не добавили избранных парикмахеров.',
    exploreBarbers: language === 'en' ? 'Explore Barbers' : language === 'tr' ? 'Berberleri Keşfet' : 'Исследовать парикмахеров',
    bookAppointment: language === 'en' ? 'Book Appointment' : language === 'tr' ? 'Randevu Al' : 'Записаться',
    removeFromFavorites: language === 'en' ? 'Remove from Favorites' : language === 'tr' ? 'Favorilerden Çıkar' : 'Удалить из избранного',
    reviews: language === 'en' ? 'reviews' : language === 'tr' ? 'değerlendirme' : 'отзывов',
    nextAvailable: language === 'en' ? 'Next Available' : language === 'tr' ? 'Müsait Zaman' : 'Следующий доступный',
    today: language === 'en' ? 'Today' : language === 'tr' ? 'Bugün' : 'Сегодня'
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleRemoveFromFavorites = (barberId) => {
    setFavoriteBarbers(prev => prev.filter(barber => barber.id !== barberId));
  };

  const handleBookAppointment = (barberId) => {
    navigate(`/barber/${barberId}`);
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)'
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
            {translations.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 2, md: 4 } }}>
        {favoriteBarbers.length === 0 ? (
          // Empty state
          <Paper sx={{ 
            p: { xs: 4, md: 6 }, 
            textAlign: 'center',
            mt: 4 
          }}>
            <Favorite sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              {translations.noFavorites}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{ 
                bgcolor: '#00a693',
                '&:hover': { bgcolor: '#007562' }
              }}
            >
              {translations.exploreBarbers}
            </Button>
          </Paper>
        ) : (
          // Favorites grid
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {favoriteBarbers.map((barber) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={barber.id}>
                <Card sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 166, 147, 0.15)'
                  }
                }}>
                  {/* Cover Image */}
                  <Box sx={{ position: 'relative', height: { xs: 140, sm: 160, md: 180 } }}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "140" : "180"}
                      image={barber.coverImage}
                      alt={barber.shopName}
                    />
                    
                    {/* City Badge */}
                    <Chip
                      label={barber.city}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'rgba(0, 166, 147, 0.9)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                    
                    {/* Rating Badge */}
                    <Box sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      bgcolor: 'rgba(0,0,0,0.8)',
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <Star sx={{ color: '#fbbf24', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {barber.rating}
                      </Typography>
                    </Box>

                    {/* Remove from Favorites */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromFavorites(barber.id);
                      }}
                    >
                      <Favorite sx={{ color: '#00a693' }} />
                    </IconButton>

                    {/* Barber Avatar */}
                    <Avatar
                      src={barber.image}
                      sx={{
                        width: { xs: 60, md: 70 },
                        height: { xs: 60, md: 70 },
                        position: 'absolute',
                        bottom: { xs: -30, md: -35 },
                        left: { xs: 16, md: 20 },
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ pt: { xs: 5, md: 6 }, pb: 3, px: { xs: 2, md: 3 } }}>
                    {/* Header */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {barber.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {barber.shopName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating value={barber.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          ({barber.reviewCount} {translations.reviews})
                        </Typography>
                      </Box>
                    </Box>

                    {/* Distance */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <LocationOn sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                        {barber.distance}
                      </Typography>
                    </Box>

                    {/* Specialties */}
                    <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                      {barber.specialties.slice(0, 2).map((specialty) => (
                        <Chip
                          key={specialty}
                          label={specialty}
                          size="small"
                          sx={{
                            bgcolor: '#e6f7f5',
                            color: '#00a693',
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Stack>

                    {/* Next Available */}
                    <Box sx={{
                      bgcolor: '#e6f7f5',
                      border: '1px solid #b3ece6',
                      borderRadius: 2,
                      p: 1.5,
                      mb: 2
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {translations.nextAvailable}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 16, color: '#00a693' }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00a693' }}>
                          {translations.today} {barber.nextAvailable}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Price and Action */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                          {barber.price}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: '#00a693',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#007562' }
                        }}
                        onClick={() => handleBookAppointment(barber.id)}
                      >
                        {translations.bookAppointment}
                      </Button>
                      <IconButton 
                        sx={{ 
                          border: 1, 
                          borderColor: '#00a693',
                          color: '#00a693',
                          '&:hover': { bgcolor: '#e6f7f5' }
                        }}
                      >
                        <Phone />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Favorites;
