import React, { useState } from 'react';
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
  Stack,
  Badge,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Link,
  Divider
} from '@mui/material';
import {
  Search,
  LocationOn,
  Star,
  AccessTime,
  Person,
  Notifications,
  Schedule,
  Favorite,
  FilterList,
  Sort,
  LocalOffer,
  TrendingUp,
  Verified,
  Payment,
  Phone,
  Share,
  BookmarkBorder,
  Bookmark,
  MyLocation,
  Wifi,
  AcUnit,
  LocalParking,
  Accessible,
  ContentCut,
  Spa,
  ColorLens,
  Face,
  Language,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Copyright,
  PlayArrow,
  CalendarToday,
  CheckCircle,
  EuroSymbol
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('Ankara, Çankaya');
  const [searchService, setSearchService] = useState('');
  const [bookmarked, setBookmarked] = useState(new Set([1, 3]));
  const [language, setLanguage] = useState('tr');

  // Language content
  const content = {
    tr: {
      brand: 'BarberPro',
      heroTitle: 'En İyi Berber Deneyimi',
      heroSubtitle: 'Yakınınızdaki profesyonel berberlerden hemen randevu alın',
      searchService: 'Hangi hizmeti arıyorsunuz?',
      searchLocation: 'Nerede?',
      searchButton: 'Ara',
      featuredBarbers: 'Öne Çıkan Berberler',
      bookAppointment: 'Randevu Al',
      verified: 'Doğrulanmış',
      new: 'Yeni',
      mostPreferred: 'En Çok Tercih Edilen',
      nextAvailable: 'Sonraki müsait',
      today: 'Bugün',
      starting: 'başlangıç'
    },
    en: {
      brand: 'BarberPro',
      heroTitle: 'Best Barber Experience',
      heroSubtitle: 'Book appointments instantly with professional barbers nearby',
      searchService: 'What service are you looking for?',
      searchLocation: 'Where?',
      searchButton: 'Search',
      featuredBarbers: 'Featured Barbers',
      bookAppointment: 'Book Appointment',
      verified: 'Verified',
      new: 'New',
      mostPreferred: 'Most Preferred',
      nextAvailable: 'Next available',
      today: 'Today',
      starting: 'starting'
    },
    ru: {
      brand: 'BarberPro',
      heroTitle: 'Лучший опыт парикмахера',
      heroSubtitle: 'Записывайтесь мгновенно к профессиональным парикмахерам рядом',
      searchService: 'Какую услугу вы ищете?',
      searchLocation: 'Где?',
      searchButton: 'Поиск',
      featuredBarbers: 'Рекомендуемые парикмахеры',
      bookAppointment: 'Записаться',
      verified: 'Проверено',
      new: 'Новый',
      mostPreferred: 'Самый предпочитаемый',
      nextAvailable: 'Следующий доступный',
      today: 'Сегодня',
      starting: 'от'
    }
  };

  const t = content[language];

  const featuredBarbers = [
    {
      id: 1,
      name: 'Mehmet Kaya',
      shopName: 'Elite Barber Shop',
      rating: 4.8,
      reviewCount: 245,
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=250&fit=crop',
      specialties: ['Saç Kesimi', 'Sakal Tıraş', 'Masaj'],
      nextAvailable: '14:30',
      price: '₺80',
      originalPrice: '₺100',
      discount: 20,
      isVerified: true,
      instantBooking: true,
      features: ['WiFi', 'Klima', 'Otopark', 'Kart Ödeme'],
      responseTime: '2 dk içinde',
      repeatCustomers: 85
    },
    {
      id: 2,
      name: 'Ali Demir',
      shopName: 'Modern Kuaför',
      rating: 4.9,
      reviewCount: 189,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=250&fit=crop',
      specialties: ['Modern Kesim', 'Boya', 'Şekillendirme'],
      nextAvailable: '15:00',
      price: '₺75',
      originalPrice: '₺90',
      discount: 15,
      isVerified: true,
      instantBooking: false,
      features: ['WiFi', 'Kart Ödeme', 'Online Ödeme'],
      responseTime: '5 dk içinde',
      isNew: true,
      repeatCustomers: 78
    },
    {
      id: 3,
      name: 'Osman Yılmaz',
      shopName: 'Classic Barber',
      rating: 4.7,
      reviewCount: 312,
      distance: '0.5 km',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622034409709-bb8e94e6d9c7?w=400&h=250&fit=crop',
      specialties: ['Klasik Tıraş', 'Sakal Bakım', 'Masaj'],
      nextAvailable: '16:15',
      price: '₺90',
      isVerified: true,
      instantBooking: true,
      features: ['Klima', 'Otopark', 'Kart Ödeme', 'Engelli Erişim'],
      responseTime: '1 dk içinde',
      isTopRated: true,
      repeatCustomers: 92
    },
    {
      id: 4,
      name: 'Kemal Özkan',
      shopName: 'Premium Barber',
      rating: 4.9,
      reviewCount: 156,
      distance: '1.5 km',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=250&fit=crop',
      specialties: ['VIP Hizmet', 'Lüks Tıraş', 'Cilt Bakımı'],
      nextAvailable: '17:00',
      price: '₺150',
      originalPrice: '₺180',
      discount: 17,
      isVerified: true,
      instantBooking: true,
      features: ['Lüks Salon', 'VIP Oda', 'İçecek Servisi'],
      responseTime: '1 dk içinde',
      isPremium: true,
      repeatCustomers: 95
    },
    {
      id: 5,
      name: 'Emre Kılıç',
      shopName: 'Trend Barber',
      rating: 4.6,
      reviewCount: 201,
      distance: '2.1 km',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=250&fit=crop',
      specialties: ['Trendy Kesim', 'Fade', 'Undercut'],
      nextAvailable: '18:30',
      price: '₺85',
      isVerified: true,
      instantBooking: true,
      features: ['Müzik', 'Kahve', 'WiFi'],
      responseTime: '3 dk içinde',
      repeatCustomers: 82
    },
    {
      id: 6,
      name: 'Hasan Demir',
      shopName: 'Traditional Barber',
      rating: 4.8,
      reviewCount: 289,
      distance: '0.9 km',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=250&fit=crop',
      specialties: ['Geleneksel Tıraş', 'Usta İşi', 'Kına'],
      nextAvailable: '19:00',
      price: '₺70',
      isVerified: true,
      instantBooking: true,
      features: ['Geleneksel', 'Deneyimli', 'Usta'],
      responseTime: '2 dk içinde',
      isTraditional: true,
      repeatCustomers: 88
    }
  ];

  const handleBookmark = (id) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Top Navigation Bar - Clean Booksy Style */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          borderBottom: '1px solid #e5e7eb',
          color: '#1f2937'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1, minHeight: '72px !important' }}>
            {/* Left Side - Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" component="div" sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mr: 4
              }}>
                {t.brand}
              </Typography>
              
              {/* Navigation Links */}
              <Stack direction="row" spacing={4} sx={{ ml: 4 }}>
                <Button color="inherit" sx={{ fontWeight: 500, color: '#6b46c1' }}>
                  Berberler
                </Button>
                <Button color="inherit" sx={{ fontWeight: 500 }}>
                  Hizmetler
                </Button>
                <Button color="inherit" sx={{ fontWeight: 500 }}>
                  Fırsatlar
                </Button>
                <Button color="inherit" sx={{ fontWeight: 500 }}>
                  Hakkımızda
                </Button>
              </Stack>
            </Box>

            {/* Right Side - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Language Selector */}
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { py: 1, display: 'flex', alignItems: 'center' }
                  }}
                >
                  <MenuItem value="tr">🇹🇷 Türkçe</MenuItem>
                  <MenuItem value="en">🇺🇸 English</MenuItem>
                  <MenuItem value="ru">🇷🇺 Русский</MenuItem>
                </Select>
              </FormControl>

              <Button variant="outlined" sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}>
                Giriş Yap
              </Button>
              <Button variant="contained" sx={{ bgcolor: '#6b46c1', color: 'white' }}>
                Üye Ol
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Full Width Booksy Style */}
      <Box sx={{ 
        position: 'relative',
        height: '600px',
        background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.95) 0%, rgba(147, 51, 234, 0.9) 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        />

        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white' }}>
                <Typography variant="h1" component="h1" sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  fontSize: '3.5rem',
                  lineHeight: 1.2
                }}>
                  {t.heroTitle}
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 4, 
                  opacity: 0.95,
                  fontWeight: 300,
                  fontSize: '1.4rem',
                  lineHeight: 1.5
                }}>
                  {t.heroSubtitle}
                </Typography>

                {/* Main Search Bar */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  maxWidth: 600,
                  mb: 4
                }}>
                  <TextField
                    placeholder={t.searchService}
                    value={searchService}
                    onChange={(e) => setSearchService(e.target.value)}
                    sx={{ 
                      flex: 1,
                      bgcolor: 'white',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        height: '56px'
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
                    placeholder={t.searchLocation}
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    sx={{ 
                      flex: 1,
                      bgcolor: 'white',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        height: '56px'
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
                    size="large"
                    sx={{ 
                      bgcolor: '#fbbf24',
                      color: 'black',
                      fontWeight: 'bold',
                      px: 4,
                      minWidth: 120,
                      height: '56px',
                      '&:hover': { bgcolor: '#f59e0b' }
                    }}
                  >
                    {t.searchButton}
                  </Button>
                </Box>

                {/* Quick Stats */}
                <Stack direction="row" spacing={4} sx={{ opacity: 0.9 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 20 }} />
                    <Typography variant="body1">500+ Berber</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ fontSize: 20 }} />
                    <Typography variant="body1">25.000+ Mutlu Müşteri</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 20 }} />
                    <Typography variant="body1">Anında Randevu</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Filter and Sort Bar */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', py: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              {t.featuredBarbers} ({featuredBarbers.length} sonuç)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Chip 
                label="En Yakın" 
                variant="filled" 
                color="primary" 
                sx={{ bgcolor: '#6b46c1' }}
              />
              <Chip label="En Popüler" variant="outlined" />
              <Chip label="En Uygun" variant="outlined" />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
              >
                Filtrele
              </Button>
              <Button
                variant="outlined"
                startIcon={<Sort />}
                sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
              >
                Sırala
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Barber Grid - Booksy Style */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {featuredBarbers.map((barber) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={barber.id}>
                <Card sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(107, 70, 193, 0.15)'
                  }
                }}>
                  {/* Cover Image */}
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={barber.coverImage}
                      alt={barber.shopName}
                    />
                    
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {barber.isVerified && (
                        <Chip 
                          icon={<Verified sx={{ fontSize: 16 }} />}
                          label={t.verified}
                          size="small"
                          sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isNew && (
                        <Chip 
                          label={t.new}
                          size="small"
                          sx={{ bgcolor: '#3b82f6', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isTopRated && (
                        <Chip 
                          icon={<TrendingUp sx={{ fontSize: 16 }} />}
                          label={t.mostPreferred}
                          size="small"
                          sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isPremium && (
                        <Chip 
                          label="Premium"
                          size="small"
                          sx={{ bgcolor: '#8b5cf6', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isTraditional && (
                        <Chip 
                          label="Geleneksel"
                          size="small"
                          sx={{ bgcolor: '#92400e', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                    
                    {/* Rating Badge */}
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
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

                    {/* Bookmark */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(barber.id);
                      }}
                    >
                      {bookmarked.has(barber.id) ? 
                        <Bookmark sx={{ color: '#6b46c1' }} /> : 
                        <BookmarkBorder />
                      }
                    </IconButton>

                    {/* Barber Avatar */}
                    <Avatar
                      src={barber.image}
                      sx={{
                        width: 80,
                        height: 80,
                        position: 'absolute',
                        bottom: -40,
                        left: 20,
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ pt: 6, pb: 3 }}>
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
                          ({barber.reviewCount} yorum)
                        </Typography>
                      </Box>
                    </Box>

                    {/* Distance and Response Time */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <LocationOn sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                        {barber.distance} • {barber.responseTime}
                      </Typography>
                    </Box>

                    {/* Specialties */}
                    <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                      {barber.specialties.slice(0, 3).map((specialty) => (
                        <Chip
                          key={specialty}
                          label={specialty}
                          size="small"
                          sx={{
                            bgcolor: '#ede9fe',
                            color: '#6b46c1',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Stack>

                    {/* Next Available */}
                    <Box sx={{ 
                      bgcolor: '#f0fdf4', 
                      border: '1px solid #bbf7d0', 
                      borderRadius: 2, 
                      p: 1.5, 
                      mb: 2 
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {t.nextAvailable}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 16, color: '#10b981' }} />
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                            {t.today} {barber.nextAvailable}
                          </Typography>
                        </Box>
                        {barber.instantBooking && (
                          <Chip 
                            label="Anında Onay"
                            size="small"
                            sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 'bold' }}
                          />
                        )}
                      </Box>
                    </Box>

                    {/* Price and Action */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        {barber.discount ? (
                          <Box>
                            <Typography 
                              variant="body2" 
                              sx={{ textDecoration: 'line-through', color: '#6b7280' }}
                            >
                              {barber.originalPrice}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ef4444' }}>
                              {barber.price}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                            {barber.price}
                          </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                          {t.starting}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: '#6b46c1',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#553c9a' }
                        }}
                        onClick={() => navigate(`/barber/${barber.id}`)}
                      >
                        {t.bookAppointment}
                      </Button>
                      <IconButton 
                        sx={{ 
                          border: 1, 
                          borderColor: '#6b46c1',
                          color: '#6b46c1',
                          '&:hover': { bgcolor: '#ede9fe' }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer - Booksy Style */}
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: 6, mt: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.brand}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
                {language === 'tr' 
                  ? 'Profesyonel berber hizmetleri için en güvenilir platform. En iyi berberleri keşfedin ve kolayca randevu alın.'
                  : language === 'en'
                  ? 'The most trusted platform for professional barber services. Discover the best barbers and book appointments easily.'
                  : 'Самая надежная платформа для профессиональных парикмахерских услуг. Откройте для себя лучших парикмахеров и легко записывайтесь на прием.'
                }
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton sx={{ color: '#3b82f6' }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: '#1da1f2' }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: '#e1306c' }}>
                  <Instagram />
                </IconButton>
                <IconButton sx={{ color: '#0077b5' }}>
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Hızlı Bağlantılar
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Berberler
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Hizmetler
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Fırsatlar
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Blog
                </Link>
              </Stack>
            </Grid>

            {/* Company */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Şirket
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Hakkımızda
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Kariyer
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  İletişim
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Basın
                </Link>
              </Stack>
            </Grid>

            {/* Support */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Destek
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Yardım Merkezi
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  İletişim
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Güvenlik
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Gizlilik
                </Link>
              </Stack>
            </Grid>

            {/* Legal */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Yasal
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Kullanım Şartları
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Gizlilik Politikası
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  Çerez Politikası
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  KVKK
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Bottom Footer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Copyright sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                2024 {t.brand}. Tüm hakları saklıdır.
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Türkiye'de yapıldı 🇹🇷
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
