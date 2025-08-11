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
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Fab
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
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [searchLocation, setSearchLocation] = useState('Ankara, Çankaya');
  const [searchService, setSearchService] = useState('');
  const [bookmarked, setBookmarked] = useState(new Set([1, 3]));
  const [language, setLanguage] = useState('en'); // Default to English
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  // Language content
  const content = {
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
      starting: 'starting',
      results: 'results',
      barbers: 'Barbers',
      services: 'Services',
      offers: 'Offers',
      about: 'About',
      login: 'Login',
      signup: 'Sign Up',
      filter: 'Filter',
      sort: 'Sort',
      nearest: 'Nearest',
      popular: 'Most Popular',
      cheapest: 'Most Affordable',
      home: 'Home',
      appointments: 'My Appointments',
      favorites: 'Favorites',
      profile: 'Profile',
      instantApproval: 'Instant Approval',
      happyCustomers: 'Happy Customers',
      instantBooking: 'Instant Booking'
    },
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
      starting: 'başlangıç',
      results: 'sonuç',
      barbers: 'Berberler',
      services: 'Hizmetler',
      offers: 'Fırsatlar',
      about: 'Hakkımızda',
      login: 'Giriş Yap',
      signup: 'Üye Ol',
      filter: 'Filtrele',
      sort: 'Sırala',
      nearest: 'En Yakın',
      popular: 'En Popüler',
      cheapest: 'En Uygun',
      home: 'Ana Sayfa',
      appointments: 'Randevularım',
      favorites: 'Favorilerim',
      profile: 'Profilim',
      instantApproval: 'Anında Onay',
      happyCustomers: 'Mutlu Müşteri',
      instantBooking: 'Anında Randevu'
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
      starting: 'от',
      results: 'результатов',
      barbers: 'Парикмахеры',
      services: 'Услуги',
      offers: 'Предложения',
      about: 'О нас',
      login: 'Войти',
      signup: 'Регистрация',
      filter: 'Фильтр',
      sort: 'Сортировка',
      nearest: 'Ближайшие',
      popular: 'Популярные',
      cheapest: 'Доступные',
      home: 'Главная',
      appointments: 'Мои записи',
      favorites: 'Избранное',
      profile: 'Профиль',
      instantApproval: 'Мгновенное подтверждение',
      happyCustomers: 'Довольных клиентов',
      instantBooking: 'Мгновенная запись'
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
      specialties: [
        language === 'en' ? 'Haircut' : language === 'tr' ? 'Saç Kesimi' : 'Стрижка',
        language === 'en' ? 'Beard Trim' : language === 'tr' ? 'Sakal Tıraş' : 'Стрижка бороды',
        language === 'en' ? 'Massage' : language === 'tr' ? 'Masaj' : 'Массаж'
      ],
      nextAvailable: '14:30',
      price: '₺80',
      originalPrice: '₺100',
      discount: 20,
      isVerified: true,
      instantBooking: true,
      features: ['WiFi', language === 'en' ? 'AC' : language === 'tr' ? 'Klima' : 'Кондиционер', language === 'en' ? 'Parking' : language === 'tr' ? 'Otopark' : 'Парковка'],
      responseTime: language === 'en' ? 'Within 2 min' : language === 'tr' ? '2 dk içinde' : 'В течение 2 мин',
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
      specialties: [
        language === 'en' ? 'Modern Cut' : language === 'tr' ? 'Modern Kesim' : 'Современная стрижка',
        language === 'en' ? 'Coloring' : language === 'tr' ? 'Boya' : 'Окрашивание',
        language === 'en' ? 'Styling' : language === 'tr' ? 'Şekillendirme' : 'Укладка'
      ],
      nextAvailable: '15:00',
      price: '₺75',
      originalPrice: '₺90',
      discount: 15,
      isVerified: true,
      instantBooking: false,
      features: ['WiFi', language === 'en' ? 'Card Payment' : language === 'tr' ? 'Kart Ödeme' : 'Оплата картой'],
      responseTime: language === 'en' ? 'Within 5 min' : language === 'tr' ? '5 dk içinde' : 'В течение 5 мин',
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
      specialties: [
        language === 'en' ? 'Classic Shave' : language === 'tr' ? 'Klasik Tıraş' : 'Классическое бритье',
        language === 'en' ? 'Beard Care' : language === 'tr' ? 'Sakal Bakım' : 'Уход за бородой',
        language === 'en' ? 'Massage' : language === 'tr' ? 'Masaj' : 'Массаж'
      ],
      nextAvailable: '16:15',
      price: '₺90',
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'AC' : language === 'tr' ? 'Klima' : 'Кондиционер', language === 'en' ? 'Parking' : language === 'tr' ? 'Otopark' : 'Парковка'],
      responseTime: language === 'en' ? 'Within 1 min' : language === 'tr' ? '1 dk içinde' : 'В течение 1 мин',
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
      specialties: [
        language === 'en' ? 'VIP Service' : language === 'tr' ? 'VIP Hizmet' : 'VIP обслуживание',
        language === 'en' ? 'Luxury Shave' : language === 'tr' ? 'Lüks Tıraş' : 'Люкс бритье',
        language === 'en' ? 'Skin Care' : language === 'tr' ? 'Cilt Bakımı' : 'Уход за кожей'
      ],
      nextAvailable: '17:00',
      price: '₺150',
      originalPrice: '₺180',
      discount: 17,
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'Luxury Salon' : language === 'tr' ? 'Lüks Salon' : 'Люкс салон', language === 'en' ? 'VIP Room' : language === 'tr' ? 'VIP Oda' : 'VIP комната'],
      responseTime: language === 'en' ? 'Within 1 min' : language === 'tr' ? '1 dk içinde' : 'В течение 1 мин',
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
      specialties: [
        language === 'en' ? 'Trendy Cut' : language === 'tr' ? 'Trendy Kesim' : 'Модная стрижка',
        'Fade',
        'Undercut'
      ],
      nextAvailable: '18:30',
      price: '₺85',
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'Music' : language === 'tr' ? 'Müzik' : 'Музыка', language === 'en' ? 'Coffee' : language === 'tr' ? 'Kahve' : 'Кофе', 'WiFi'],
      responseTime: language === 'en' ? 'Within 3 min' : language === 'tr' ? '3 dk içinde' : 'В течение 3 мин',
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
      specialties: [
        language === 'en' ? 'Traditional Shave' : language === 'tr' ? 'Geleneksel Tıraş' : 'Традиционное бритье',
        language === 'en' ? 'Master Work' : language === 'tr' ? 'Usta İşi' : 'Мастерская работа',
        language === 'en' ? 'Henna' : language === 'tr' ? 'Kına' : 'Хна'
      ],
      nextAvailable: '19:00',
      price: '₺70',
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'Traditional' : language === 'tr' ? 'Geleneksel' : 'Традиционный', language === 'en' ? 'Experienced' : language === 'tr' ? 'Deneyimli' : 'Опытный'],
      responseTime: language === 'en' ? 'Within 2 min' : language === 'tr' ? '2 dk içinde' : 'В течение 2 мин',
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
      {/* Responsive Navigation Bar */}
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
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: 1, 
            minHeight: { xs: '64px', md: '72px' },
            px: { xs: 1, md: 2 }
          }}>
            {/* Left Side - Brand + Mobile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton 
                  edge="start" 
                  onClick={() => setDrawerOpen(true)}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant={isMobile ? "h5" : "h4"} component="div" sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mr: { xs: 1, md: 4 }
              }}>
                {t.brand}
              </Typography>
              
              {/* Desktop Navigation Links */}
              {!isMobile && (
                <Stack direction="row" spacing={4} sx={{ ml: 4 }}>
                  <Button color="inherit" sx={{ fontWeight: 500, color: '#6b46c1' }}>
                    {t.barbers}
                  </Button>
                  <Button color="inherit" sx={{ fontWeight: 500 }}>
                    {t.services}
                  </Button>
                  <Button color="inherit" sx={{ fontWeight: 500 }}>
                    {t.offers}
                  </Button>
                  <Button color="inherit" sx={{ fontWeight: 500 }}>
                    {t.about}
                  </Button>
                </Stack>
              )}
            </Box>

            {/* Right Side - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              {/* Language Selector */}
              <FormControl size="small" sx={{ minWidth: { xs: 80, md: 100 } }}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { py: 1, display: 'flex', alignItems: 'center', fontSize: { xs: '0.8rem', md: '1rem' } }
                  }}
                >
                  <MenuItem value="en">🇺🇸 {isMobile ? 'EN' : 'English'}</MenuItem>
                  <MenuItem value="tr">🇹🇷 {isMobile ? 'TR' : 'Türkçe'}</MenuItem>
                  <MenuItem value="ru">🇷🇺 {isMobile ? 'RU' : 'Русский'}</MenuItem>
                </Select>
              </FormControl>

              {!isMobile && (
                <>
                  <Button variant="outlined" sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}>
                    {t.login}
                  </Button>
                  <Button variant="contained" sx={{ bgcolor: '#6b46c1', color: 'white' }}>
                    {t.signup}
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Responsive Hero Section */}
      <Box sx={{ 
        position: 'relative',
        height: { xs: '70vh', md: '600px' },
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
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h1" component="h1" sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}>
                  {t.heroTitle}
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 4, 
                  opacity: 0.95,
                  fontWeight: 300,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  lineHeight: 1.5
                }}>
                  {t.heroSubtitle}
                </Typography>

                {/* Mobile/Tablet Search Bar */}
                <Box sx={{ 
                  display: { xs: 'block', md: 'flex' },
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
                      mb: { xs: 2, md: 0 },
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
                      mb: { xs: 2, md: 0 },
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
                    fullWidth={isMobile}
                    sx={{ 
                      bgcolor: '#fbbf24',
                      color: 'black',
                      fontWeight: 'bold',
                      px: 4,
                      minWidth: { xs: 'auto', md: 120 },
                      height: '56px',
                      '&:hover': { bgcolor: '#f59e0b' }
                    }}
                  >
                    {t.searchButton}
                  </Button>
                </Box>

                {/* Quick Stats */}
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={4} 
                  sx={{ opacity: 0.9, alignItems: { xs: 'center', md: 'flex-start' } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 20 }} />
                    <Typography variant="body1">500+ {language === 'en' ? 'Barbers' : language === 'tr' ? 'Berber' : 'Парикмахеров'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ fontSize: 20 }} />
                    <Typography variant="body1">25,000+ {t.happyCustomers}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 20 }} />
                    <Typography variant="body1">{t.instantBooking}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Responsive Filter and Sort Bar */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', py: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 0 }
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 'bold', 
              color: '#1f2937',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}>
              {t.featuredBarbers} ({featuredBarbers.length} {t.results})
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, md: 2 }, 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Chip 
                label={t.nearest} 
                variant="filled" 
                color="primary" 
                sx={{ bgcolor: '#6b46c1' }}
                size={isMobile ? "small" : "medium"}
              />
              <Chip label={t.popular} variant="outlined" size={isMobile ? "small" : "medium"} />
              <Chip label={t.cheapest} variant="outlined" size={isMobile ? "small" : "medium"} />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
                size={isMobile ? "small" : "medium"}
              >
                {t.filter}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Sort />}
                sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
                size={isMobile ? "small" : "medium"}
              >
                {t.sort}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Responsive Barber Grid */}
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 2, md: 3 }}>
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
                  <Box sx={{ position: 'relative', height: { xs: 160, md: 200 } }}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "160" : "200"}
                      image={barber.coverImage}
                      alt={barber.shopName}
                    />
                    
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
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
                          label={language === 'en' ? 'Traditional' : language === 'tr' ? 'Geleneksel' : 'Традиционный'}
                          size="small"
                          sx={{ bgcolor: '#92400e', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                    
                    {/* Rating Badge */}
                    <Box sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
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
                        bottom: 8,
                        right: 8,
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
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        position: 'absolute',
                        bottom: { xs: -30, md: -40 },
                        left: { xs: 16, md: 20 },
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ pt: { xs: 5, md: 6 }, pb: 3, px: { xs: 2, md: 3 } }}>
                    {/* Header */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {barber.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {barber.shopName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating value={barber.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          ({barber.reviewCount} {language === 'en' ? 'reviews' : language === 'tr' ? 'yorum' : 'отзывов'})
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
                      {barber.specialties.slice(0, isMobile ? 2 : 3).map((specialty) => (
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
                            label={t.instantApproval}
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

      {/* Footer */}
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: { xs: 4, md: 6 }, mt: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.brand}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
                {language === 'en' 
                  ? 'The most trusted platform for professional barber services. Discover the best barbers and book appointments easily.'
                  : language === 'tr'
                  ? 'Profesyonel berber hizmetleri için en güvenilir platform. En iyi berberleri keşfedin ve kolayca randevu al��n.'
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
                {language === 'en' ? 'Quick Links' : language === 'tr' ? 'Hızlı Bağlantılar' : 'Быстрые ссылки'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {t.barbers}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {t.services}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {t.offers}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Blog' : language === 'tr' ? 'Blog' : 'Блог'}
                </Link>
              </Stack>
            </Grid>

            {/* Company */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'en' ? 'Company' : language === 'tr' ? 'Şirket' : 'Компания'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {t.about}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Careers' : language === 'tr' ? 'Kariyer' : 'Карьера'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Contact' : language === 'tr' ? 'İletişim' : 'Контакты'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Press' : language === 'tr' ? 'Basın' : 'Пресса'}
                </Link>
              </Stack>
            </Grid>

            {/* Support */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'en' ? 'Support' : language === 'tr' ? 'Destek' : 'Поддержка'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Help Center' : language === 'tr' ? 'Yardım Merkezi' : 'Центр помощи'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Contact' : language === 'tr' ? 'İletişim' : 'Контакты'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Security' : language === 'tr' ? 'Güvenlik' : 'Безопасность'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Privacy' : language === 'tr' ? 'Gizlilik' : 'Конфиденциальность'}
                </Link>
              </Stack>
            </Grid>

            {/* Legal */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'en' ? 'Legal' : language === 'tr' ? 'Yasal' : 'Правовая информация'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Terms of Service' : language === 'tr' ? 'Kullanım Şartları' : 'Условия использования'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Privacy Policy' : language === 'tr' ? 'Gizlilik Politikası' : 'Политика конфиденциальности'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'Cookie Policy' : language === 'tr' ? 'Çerez Politikası' : 'Политика файлов cookie'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'en' ? 'GDPR' : language === 'tr' ? 'KVKK' : 'GDPR'}
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Bottom Footer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 2,
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Copyright sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                2024 {t.brand}. {language === 'en' ? 'All rights reserved.' : language === 'tr' ? 'Tüm hakları saklıdır.' : 'Все права защищены.'}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              {language === 'en' ? 'Made in Turkey' : language === 'tr' ? 'Türkiye\'de yapıldı' : 'Сделано в Турции'} 🇹🇷
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6b46c1' }}>
              {t.brand}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={t.home} />
            </ListItem>
            <ListItem button onClick={() => navigate('/dashboard')}>
              <ListItemIcon><Schedule /></ListItemIcon>
              <ListItemText primary={t.appointments} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary={t.favorites} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary={t.profile} />
            </ListItem>
            <Divider sx={{ my: 2 }} />
            <ListItem>
              <Button variant="outlined" fullWidth sx={{ color: '#6b46c1', borderColor: '#6b46c1', mr: 1 }}>
                {t.login}
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" fullWidth sx={{ bgcolor: '#6b46c1', color: 'white' }}>
                {t.signup}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <Box 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            bgcolor: 'white',
            borderTop: '1px solid #e5e7eb'
          }}
        >
          <BottomNavigation
            value={bottomNavValue}
            onChange={(event, newValue) => setBottomNavValue(newValue)}
            sx={{ height: 60 }}
          >
            <BottomNavigationAction 
              label={t.home} 
              icon={<HomeIcon />}
              onClick={() => navigate('/')}
            />
            <BottomNavigationAction 
              label={t.appointments} 
              icon={<Schedule />}
              onClick={() => navigate('/dashboard')}
            />
            <BottomNavigationAction 
              label={t.favorites} 
              icon={<Favorite />}
            />
            <BottomNavigationAction 
              label={t.profile} 
              icon={<AccountCircle />}
            />
          </BottomNavigation>
        </Box>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            bgcolor: '#fbbf24',
            color: 'black',
            '&:hover': { bgcolor: '#f59e0b' }
          }}
          onClick={() => {}}
        >
          <Search />
        </Fab>
      )}
    </Box>
  );
};

export default Home;
