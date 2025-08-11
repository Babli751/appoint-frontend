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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Fab,
  Slider,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  LocationOn,
  Star,
  AccessTime,
  Person,
  Notifications,
  Menu as MenuIcon,
  Home as HomeIcon,
  Schedule,
  Favorite,
  AccountCircle,
  FilterList,
  Sort,
  List as ListIcon,
  LocalOffer,
  Bolt,
  TrendingUp,
  Verified,
  Payment,
  Phone,
  Share,
  BookmarkBorder,
  Bookmark,
  Close,
  MyLocation,
  Wifi,
  AcUnit,
  LocalParking,
  Accessible,
  ContentCut,
  Spa,
  ColorLens,
  Face,
  MobileFriendly,
  Language,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Copyright,
  Business,
  Support,
  Security,
  Help,
  Info,
  PlayArrow
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchLocation, setSearchLocation] = useState('Ankara, Çankaya');
  const [searchService, setSearchService] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedDate, setSelectedDate] = useState('today');
  const [bookmarked, setBookmarked] = useState(new Set([1, 3]));
  const [currentLocation, setCurrentLocation] = useState('Çankaya, Ankara');
  const [notificationCount, setNotificationCount] = useState(3);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [language, setLanguage] = useState('tr');

  // Language content
  const content = {
    tr: {
      brand: 'BarberPro',
      heroTitle: 'Profesyonel Berber Deneyimi',
      heroSubtitle: 'En iyi berberleri keşfedin ve kolayca randevu alın',
      heroDescription: 'Yakınınızdaki en iyi berberlerden hemen randevu alın. Profesyonel hizmet, uygun fiyatlar.',
      searchService: 'Hangi hizmeti arıyorsunuz?',
      searchLocation: 'Nerede?',
      searchButton: 'Ara',
      quickBooking: 'Hızlı Randevu',
      currentLocation: 'Mevcut konum',
      specialOffers: 'Özel Fırsatlar',
      serviceCategories: 'Hizmet Kategorileri',
      nearbyBarbers: 'Yakınınızdaki Berberler',
      results: 'sonuç',
      bookAppointment: 'Randevu Al',
      instantApproval: 'Anında Onay',
      verified: 'Doğrulanmış',
      new: 'Yeni',
      mostPreferred: 'En Çok Tercih Edilen',
      nextAvailable: 'Sonraki müsait randevu',
      today: 'Bugün',
      starting: 'başlangıç',
      home: 'Ana Sayfa',
      appointments: 'Randevularım',
      favorites: 'Favorilerim',
      profile: 'Profilim'
    },
    en: {
      brand: 'BarberPro',
      heroTitle: 'Professional Barber Experience',
      heroSubtitle: 'Discover the best barbers and book appointments easily',
      heroDescription: 'Book appointments instantly with the best barbers nearby. Professional service, affordable prices.',
      searchService: 'What service are you looking for?',
      searchLocation: 'Where?',
      searchButton: 'Search',
      quickBooking: 'Quick Booking',
      currentLocation: 'Current location',
      specialOffers: 'Special Offers',
      serviceCategories: 'Service Categories',
      nearbyBarbers: 'Nearby Barbers',
      results: 'results',
      bookAppointment: 'Book Appointment',
      instantApproval: 'Instant Approval',
      verified: 'Verified',
      new: 'New',
      mostPreferred: 'Most Preferred',
      nextAvailable: 'Next available',
      today: 'Today',
      starting: 'starting',
      home: 'Home',
      appointments: 'My Appointments',
      favorites: 'Favorites',
      profile: 'Profile'
    },
    ru: {
      brand: 'BarberPro',
      heroTitle: 'Профессиональный опыт парикмахера',
      heroSubtitle: 'Откройте для себя лучших парикмахеров и легко записывайтесь на прием',
      heroDescription: 'Записывайтесь на прием мгновенно к лучшим парикмахерам поблизости. Профессиональный сервис, доступные цены.',
      searchService: 'Какую услугу вы ищете?',
      searchLocation: 'Где?',
      searchButton: 'Поиск',
      quickBooking: 'Быстрая запись',
      currentLocation: 'Текущее местоположение',
      specialOffers: 'Специальные предложения',
      serviceCategories: 'Категории услуг',
      nearbyBarbers: 'Ближайшие парикмахеры',
      results: 'результатов',
      bookAppointment: 'Записаться',
      instantApproval: 'Мгновенное подтверждение',
      verified: 'Проверено',
      new: 'Новый',
      mostPreferred: 'Самый предпочитаемый',
      nextAvailable: 'Следующий доступный',
      today: 'Сегодня',
      starting: 'от',
      home: 'Главная',
      appointments: 'Мои записи',
      favorites: 'Избранное',
      profile: 'Профиль'
    }
  };

  const t = content[language];

  const serviceCategories = [
    { 
      id: 'haircut', 
      name: language === 'tr' ? 'Saç Kesimi' : language === 'en' ? 'Haircut' : 'Стрижка', 
      icon: <ContentCut />,
      count: 156
    },
    { 
      id: 'beard', 
      name: language === 'tr' ? 'Sakal & Tıraş' : language === 'en' ? 'Beard & Shave' : 'Борода и бритье', 
      icon: <Face />,
      count: 89
    },
    { 
      id: 'styling', 
      name: language === 'tr' ? 'Şekillendirme' : language === 'en' ? 'Styling' : 'Укладка', 
      icon: <ColorLens />,
      count: 124
    },
    { 
      id: 'treatment', 
      name: language === 'tr' ? 'Bakım' : language === 'en' ? 'Treatment' : 'Уход', 
      icon: <Spa />,
      count: 67
    }
  ];

  const featuredBarbers = [
    {
      id: 1,
      name: 'Mehmet Kaya',
      shopName: 'Elite Barber Shop',
      rating: 4.8,
      reviewCount: 245,
      distance: '0.8 km',
      estimatedTime: '12 dk',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=200&fit=crop',
      specialties: [
        language === 'tr' ? 'Saç Kesimi' : language === 'en' ? 'Haircut' : 'Стрижка',
        language === 'tr' ? 'Sakal Tıraş' : language === 'en' ? 'Beard Trim' : 'Стрижка бороды'
      ],
      nextAvailable: '14:30',
      price: '₺80',
      originalPrice: '₺100',
      discount: 20,
      isVerified: true,
      instantBooking: true,
      features: ['WiFi', language === 'tr' ? 'Klima' : language === 'en' ? 'AC' : 'Кондиционер', language === 'tr' ? 'Otopark' : language === 'en' ? 'Parking' : 'Парковка'],
      responseTime: language === 'tr' ? '2 dk içinde' : language === 'en' ? 'Within 2 min' : 'В течение 2 мин',
      repeatCustomers: 85
    },
    {
      id: 2,
      name: 'Ali Demir',
      shopName: 'Modern Kuaför',
      rating: 4.9,
      reviewCount: 189,
      distance: '1.2 km',
      estimatedTime: '18 dk',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=200&fit=crop',
      specialties: [
        language === 'tr' ? 'Modern Kesim' : language === 'en' ? 'Modern Cut' : 'Современная стрижка',
        language === 'tr' ? 'Boya' : language === 'en' ? 'Coloring' : 'Окрашивание'
      ],
      nextAvailable: '15:00',
      price: '₺75',
      originalPrice: '₺90',
      discount: 15,
      isVerified: true,
      instantBooking: false,
      features: ['WiFi', language === 'tr' ? 'Kart Ödeme' : language === 'en' ? 'Card Payment' : 'Оплата картой'],
      responseTime: language === 'tr' ? '5 dk içinde' : language === 'en' ? 'Within 5 min' : 'В течение 5 мин',
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
      estimatedTime: '8 dk',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622034409709-bb8e94e6d9c7?w=400&h=200&fit=crop',
      specialties: [
        language === 'tr' ? 'Klasik Tıraş' : language === 'en' ? 'Classic Shave' : 'Классическое бритье',
        language === 'tr' ? 'Masaj' : language === 'en' ? 'Massage' : 'Массаж'
      ],
      nextAvailable: '16:15',
      price: '₺90',
      isVerified: true,
      instantBooking: true,
      features: [language === 'tr' ? 'Klima' : language === 'en' ? 'AC' : 'Кондиционер', language === 'tr' ? 'Otopark' : language === 'en' ? 'Parking' : 'Парковка'],
      responseTime: language === 'tr' ? '1 dk içinde' : language === 'en' ? 'Within 1 min' : 'В течение 1 мин',
      isTopRated: true,
      repeatCustomers: 92
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
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa' }}>
      {/* Enhanced Navigation Bar */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          color: '#1f2937',
          boxShadow: '0 1px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                edge="start" 
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                {t.brand}
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
              <Button color="inherit" startIcon={<HomeIcon />}>
                {t.home}
              </Button>
              <Button color="inherit" startIcon={<Schedule />}>
                {t.appointments}
              </Button>
              <Button color="inherit" startIcon={<Favorite />}>
                {t.favorites}
              </Button>
              <Button color="inherit" startIcon={<Help />}>
                {language === 'tr' ? 'Yardım' : language === 'en' ? 'Help' : 'Помощь'}
              </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Language Selector */}
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  startAdornment={<Language sx={{ mr: 1, fontSize: 20 }} />}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { py: 1 }
                  }}
                >
                  <MenuItem value="tr">🇹🇷 TR</MenuItem>
                  <MenuItem value="en">🇺🇸 EN</MenuItem>
                  <MenuItem value="ru">🇷🇺 RU</MenuItem>
                </Select>
              </FormControl>

              <IconButton sx={{ color: '#6b46c1' }}>
                <Badge badgeContent={notificationCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              
              <Avatar 
                sx={{ bgcolor: '#fbbf24', cursor: 'pointer', ml: 1 }}
                onClick={() => navigate('/dashboard')}
              >
                U
              </Avatar>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section with Beautiful Barber Image */}
      <Box sx={{ 
        position: 'relative',
        height: { xs: '70vh', md: '80vh' },
        background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.9) 0%, rgba(147, 51, 234, 0.8) 100%)',
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
        
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.8) 0%, rgba(147, 51, 234, 0.7) 100%)',
            zIndex: 0
          }}
        />

        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white', mb: 4 }}>
                <Typography variant="h2" component="h1" sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}>
                  {t.heroTitle}
                </Typography>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  opacity: 0.95,
                  fontWeight: 300,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}>
                  {t.heroSubtitle}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontSize: '1.1rem',
                  maxWidth: 500
                }}>
                  {t.heroDescription}
                </Typography>

                {/* CTA Buttons */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{ 
                      bgcolor: '#fbbf24',
                      color: 'black',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': { bgcolor: '#f59e0b', transform: 'translateY(-2px)' },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {t.quickBooking}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.1)', 
                        borderColor: 'white',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {language === 'tr' ? 'Daha Fazla Bilgi' : language === 'en' ? 'Learn More' : 'Узнать больше'}
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Search Card */}
              <Paper sx={{ 
                p: 4, 
                borderRadius: 4, 
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)'
              }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
                  {language === 'tr' ? 'Hemen Randevu Al' : language === 'en' ? 'Book Now' : 'Записаться сейчас'}
                </Typography>
                <Stack spacing={3}>
                  <TextField
                    placeholder={t.searchService}
                    value={searchService}
                    onChange={(e) => setSearchService(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: '#6b46c1' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': { borderColor: '#6b46c1' },
                        '&.Mui-focused fieldset': { borderColor: '#6b46c1' }
                      }
                    }}
                  />
                  <TextField
                    placeholder={t.searchLocation}
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ color: '#6b46c1' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': { borderColor: '#6b46c1' },
                        '&.Mui-focused fieldset': { borderColor: '#6b46c1' }
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    size="large"
                    fullWidth
                    sx={{ 
                      bgcolor: '#6b46c1',
                      fontWeight: 'bold',
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#553c9a' }
                    }}
                  >
                    {t.searchButton}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Service Categories */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937', textAlign: 'center' }}>
          {t.serviceCategories}
        </Typography>
        <Grid container spacing={3}>
          {serviceCategories.map((category) => (
            <Grid item xs={6} md={3} key={category.id}>
              <Card sx={{ 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(107, 70, 193, 0.2)'
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    bgcolor: '#ede9fe', 
                    borderRadius: '50%', 
                    width: 80, 
                    height: 80, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#6b46c1'
                  }}>
                    {React.cloneElement(category.icon, { sx: { fontSize: 32 } })}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} {language === 'tr' ? 'berber' : language === 'en' ? 'barbers' : 'парикмахеров'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Barbers */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937', textAlign: 'center' }}>
            {t.nearbyBarbers} ({featuredBarbers.length} {t.results})
          </Typography>
          <Grid container spacing={4}>
            {featuredBarbers.map((barber) => (
              <Grid item xs={12} md={4} key={barber.id}>
                <Card sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(107, 70, 193, 0.2)'
                  }
                }}>
                  {/* Cover Image */}
                  <Box sx={{ position: 'relative', height: 180 }}>
                    <CardMedia
                      component="img"
                      height="180"
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
                          ({barber.reviewCount})
                        </Typography>
                      </Box>
                    </Box>

                    {/* Info */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <LocationOn sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                        {barber.distance} • {barber.responseTime}
                      </Typography>
                    </Box>

                    {/* Specialties */}
                    <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                      {barber.specialties.map((specialty) => (
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
                        {barber.discount > 0 ? (
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
                        sx={{ border: 1, borderColor: 'divider' }}
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
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: 6 }}>
        <Container>
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

            {/* Services */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'tr' ? 'Hizmetler' : language === 'en' ? 'Services' : 'Услуги'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Saç Kesimi' : language === 'en' ? 'Haircut' : 'Стрижка'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Sakal Tıraş' : language === 'en' ? 'Beard Trim' : 'Стрижка бороды'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Şekillendirme' : language === 'en' ? 'Styling' : 'Ук��адка'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Bakım' : language === 'en' ? 'Treatment' : 'Уход'}
                </Link>
              </Stack>
            </Grid>

            {/* Company */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'tr' ? 'Şirket' : language === 'en' ? 'Company' : 'Компания'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Hakkımızda' : language === 'en' ? 'About Us' : 'О нас'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Kariyer' : language === 'en' ? 'Careers' : 'Карьера'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'İletişim' : language === 'en' ? 'Contact' : 'Контакты'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Blog' : language === 'en' ? 'Blog' : 'Блог'}
                </Link>
              </Stack>
            </Grid>

            {/* Support */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'tr' ? 'Destek' : language === 'en' ? 'Support' : 'Поддержка'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Yardım Merkezi' : language === 'en' ? 'Help Center' : 'Центр помощи'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Güvenlik' : language === 'en' ? 'Security' : 'Безопасность'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Gizlilik' : language === 'en' ? 'Privacy' : 'Конфиденциальность'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Kullanım Şartları' : language === 'en' ? 'Terms' : 'Условия'}
                </Link>
              </Stack>
            </Grid>

            {/* Legal */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {language === 'tr' ? 'Yasal' : language === 'en' ? 'Legal' : 'Правовая информация'}
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Çerez Politikası' : language === 'en' ? 'Cookie Policy' : 'Политика файлов cookie'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'KVKK' : language === 'en' ? 'GDPR' : 'GDPR'}
                </Link>
                <Link href="#" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                  {language === 'tr' ? 'Lisanslar' : language === 'en' ? 'Licenses' : 'Лицензии'}
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
                2024 {t.brand}. {language === 'tr' ? 'Tüm hakları saklıdır.' : language === 'en' ? 'All rights reserved.' : 'Все права защищены.'}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              {language === 'tr' ? 'Türkiye\'de yapıldı' : language === 'en' ? 'Made in Turkey' : 'Сделано в Турции'} 🇹🇷
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Side Drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#6b46c1' }}>
            {t.brand}
          </Typography>
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
          </List>
        </Box>
      </Drawer>

      {/* Bottom Navigation for Mobile */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          display: { xs: 'block', md: 'none' }
        }} 
        elevation={8}
      >
        <BottomNavigation
          value={bottomNavValue}
          onChange={(event, newValue) => setBottomNavValue(newValue)}
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
      </Paper>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: { xs: 80, md: 20 },
          right: 20,
          bgcolor: '#fbbf24',
          color: 'black',
          '&:hover': { bgcolor: '#f59e0b' }
        }}
        onClick={() => {}}
      >
        <Search />
      </Fab>
    </Box>
  );
};

export default Home;
