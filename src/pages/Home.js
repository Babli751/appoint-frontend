import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Menu
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
  Close,
  Business,
  Support as SupportIcon,
  Logout,
  Settings,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BarberFilter from '../components/BarberFilter';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [searchLocation, setSearchLocation] = useState('Berlin, Germany');
  const [searchService, setSearchService] = useState('');
  const [bookmarked, setBookmarked] = useState(new Set([1, 3]));
  const { language, changeLanguage, t: translations } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredBarbers, setFilteredBarbers] = useState([]);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  // Use centralized translations
  const t = translations;

  // European cities and pricing
  const europeanCities = [
    'Berlin, Germany', 'Paris, France', 'Madrid, Spain', 'Rome, Italy',
    'Amsterdam, Netherlands', 'Vienna, Austria', 'Brussels, Belgium'
  ];

  const featuredBarbers = [
    {
      id: 1,
      name: 'Marco Rossi',
      shopName: 'Milano Barber Studio',
      rating: 4.8,
      reviewCount: 245,
      distance: '0.8 km',
      estimatedTime: '12 min',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=250&fit=crop',
      specialties: [
        language === 'en' ? 'Classic Cut' : language === 'tr' ? 'Klasik Kesim' : 'Классическая стрижка',
        language === 'en' ? 'Beard Trim' : language === 'tr' ? 'Sakal Düzeltme' : 'Стрижка бороды',
        language === 'en' ? 'Hot Towel' : language === 'tr' ? 'Sıcak Havlu' : 'Горячее полотенц��'
      ],
      nextAvailable: '14:30',
      price: `${t.currency}35`,
      originalPrice: `${t.currency}45`,
      discount: 22,
      isVerified: true,
      instantBooking: true,
      features: ['WiFi', language === 'en' ? 'AC' : language === 'tr' ? 'Klima' : 'Кондиционер', language === 'en' ? 'Parking' : language === 'tr' ? 'Otopark' : 'Парковка'],
      responseTime: language === 'en' ? 'Within 2 min' : language === 'tr' ? '2 dk içinde' : 'В течение 2 мин',
      repeatCustomers: 85,
      city: 'Milan, Italy'
    },
    {
      id: 2,
      name: 'Jean-Luc Dubois',
      shopName: 'Salon Parisien',
      rating: 4.9,
      reviewCount: 189,
      distance: '1.2 km',
      estimatedTime: '18 min',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=250&fit=crop',
      specialties: [
        language === 'en' ? 'French Cut' : language === 'tr' ? 'Fransız Kesim' : 'Французская стрижка',
        language === 'en' ? 'Styling' : language === 'tr' ? 'Şekillendirme' : 'Укладка',
        language === 'en' ? 'Consultation' : language === 'tr' ? 'Danışmanlık' : 'Консультация'
      ],
      nextAvailable: '15:00',
      price: `${t.currency}42`,
      originalPrice: `${t.currency}50`,
      discount: 16,
      isVerified: true,
      instantBooking: false,
      features: ['WiFi', language === 'en' ? 'Card Payment' : language === 'tr' ? 'Kart Ödeme' : 'Оплата картой'],
      responseTime: language === 'en' ? 'Within 5 min' : language === 'tr' ? '5 dk içinde' : 'В течение 5 мин',
      isNew: true,
      repeatCustomers: 78,
      city: 'Paris, France'
    },
    {
      id: 3,
      name: 'Hans Mueller',
      shopName: 'Berlin Barbershop',
      rating: 4.7,
      reviewCount: 312,
      distance: '0.5 km',
      estimatedTime: '8 min',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1622034409709-bb8e94e6d9c7?w=400&h=250&fit=crop',
      specialties: [
        language === 'en' ? 'Precision Cut' : language === 'tr' ? 'Hassas Kesim' : 'Точная стрижка',
        language === 'en' ? 'Fade' : language === 'tr' ? 'Solmaya' : 'Фейд',
        language === 'en' ? 'Grooming' : language === 'tr' ? 'Bakım' : 'Уход'
      ],
      nextAvailable: '16:15',
      price: `${t.currency}38`,
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'AC' : language === 'tr' ? 'Klima' : 'Кондиционер', language === 'en' ? 'Parking' : language === 'tr' ? 'Otopark' : 'Парковка'],
      responseTime: language === 'en' ? 'Within 1 min' : language === 'tr' ? '1 dk içinde' : 'В течение 1 мин',
      isTopRated: true,
      repeatCustomers: 92,
      city: 'Berlin, Germany'
    },
    {
      id: 4,
      name: 'Antonio García',
      shopName: 'Madrid Premium',
      rating: 4.9,
      reviewCount: 156,
      distance: '1.5 km',
      estimatedTime: '20 min',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=250&fit=crop',
      specialties: [
        language === 'en' ? 'Premium Service' : language === 'tr' ? 'Premium Hizmet' : 'Премиум услуга',
        language === 'en' ? 'Traditional Shave' : language === 'tr' ? 'Geleneksel Tıraş' : 'Традиционное бритье',
        language === 'en' ? 'Facial Care' : language === 'tr' ? 'Yüz Bakımı' : 'Уход за лицом'
      ],
      nextAvailable: '17:00',
      price: `${t.currency}55`,
      originalPrice: `${t.currency}65`,
      discount: 15,
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'Luxury Salon' : language === 'tr' ? 'Lüks Salon' : 'Люкс салон', language === 'en' ? 'Premium Room' : language === 'tr' ? 'Premium Oda' : 'Премиум комната'],
      responseTime: language === 'en' ? 'Within 1 min' : language === 'tr' ? '1 dk içinde' : 'В течение 1 мин',
      isPremium: true,
      repeatCustomers: 95,
      city: 'Madrid, Spain'
    },
    {
      id: 5,
      name: 'Viktor Petrov',
      shopName: 'Amsterdam Style',
      rating: 4.6,
      reviewCount: 201,
      distance: '2.1 km',
      estimatedTime: '25 min',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=250&fit=crop',
      specialties: [
        language === 'en' ? 'Modern Cut' : language === 'tr' ? 'Modern Kesim' : 'Современная стрижка',
        'Undercut',
        language === 'en' ? 'Color' : language === 'tr' ? 'Renk' : 'Окрашивание'
      ],
      nextAvailable: '18:30',
      price: `${t.currency}40`,
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'Music' : language === 'tr' ? 'Müzik' : 'Музыка', language === 'en' ? 'Coffee' : language === 'tr' ? 'Kahve' : 'Кофе', 'WiFi'],
      responseTime: language === 'en' ? 'Within 3 min' : language === 'tr' ? '3 dk içinde' : 'В течение 3 мин',
      repeatCustomers: 82,
      city: 'Amsterdam, Netherlands'
    },
    {
      id: 6,
      name: 'Giuseppe Romano',
      shopName: 'Roma Classica',
      rating: 4.8,
      reviewCount: 289,
      distance: '0.9 km',
      estimatedTime: '15 min',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=250&fit=crop',
      specialties: [
        language === 'en' ? 'Italian Style' : language === 'tr' ? 'İtalyan Tarzı' : 'Итальянский стиль',
        language === 'en' ? 'Master Cut' : language === 'tr' ? 'Usta Kesimi' : 'М��стерская стрижка',
        language === 'en' ? 'Pompadour' : language === 'tr' ? 'Pompadur' : 'Помпадур'
      ],
      nextAvailable: '19:00',
      price: `${t.currency}45`,
      isVerified: true,
      instantBooking: true,
      features: [language === 'en' ? 'Traditional' : language === 'tr' ? 'Geleneksel' : 'Традиционный', language === 'en' ? 'Experienced' : language === 'tr' ? 'Deneyimli' : 'Опытный'],
      responseTime: language === 'en' ? 'Within 2 min' : language === 'tr' ? '2 dk içinde' : 'В течение 2 мин',
      isTraditional: true,
      repeatCustomers: 88,
      city: 'Rome, Italy'
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

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    let filtered = [...featuredBarbers];

    // Apply location filter
    if (newFilters.location) {
      filtered = filtered.filter(barber =>
        barber.city.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }

    // Apply price filter
    if (newFilters.priceRange) {
      filtered = filtered.filter(barber => {
        const price = parseInt(barber.price.replace('€', ''));
        return price >= newFilters.priceRange[0] && price <= newFilters.priceRange[1];
      });
    }

    // Apply rating filter
    if (newFilters.rating > 0) {
      filtered = filtered.filter(barber => barber.rating >= newFilters.rating);
    }

    // Apply verified filter
    if (newFilters.verifiedOnly) {
      filtered = filtered.filter(barber => barber.isVerified);
    }

    // Apply instant booking filter
    if (newFilters.instantBooking) {
      filtered = filtered.filter(barber => barber.instantBooking);
    }

    // Apply sorting
    switch (newFilters.sortBy) {
      case 'topRated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowToHigh':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace('€', ''));
          const priceB = parseInt(b.price.replace('€', ''));
          return priceA - priceB;
        });
        break;
      case 'highToLow':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace('€', ''));
          const priceB = parseInt(b.price.replace('€', ''));
          return priceB - priceA;
        });
        break;
      case 'mostBooked':
        filtered.sort((a, b) => b.repeatCustomers - a.repeatCustomers);
        break;
      default: // nearest
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }

    setFilteredBarbers(filtered);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const displayedBarbers = filteredBarbers.length > 0 ? filteredBarbers : featuredBarbers;
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 100)) count++;
    if (filters.rating > 0) count++;
    if (filters.verifiedOnly) count++;
    if (filters.instantBooking) count++;
    return count;
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8fffe', minHeight: '100vh', pb: { xs: '70px', md: 0 } }}>
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
            py: { xs: 0.5, md: 1 },
            minHeight: { xs: '56px', sm: '64px', md: '72px' },
            px: { xs: 0.5, sm: 1, md: 2 }
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
              <Typography variant={isMobile ? "h6" : "h4"} component="div" sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mr: { xs: 0.5, sm: 1, md: 4 },
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '2rem' }
              }}>
                {t.brand}
              </Typography>
              
              {/* Desktop/Tablet Navigation Links */}
              {!isMobile && (
                <Stack direction="row" spacing={{ md: 3, lg: 4 }} sx={{ ml: { md: 2, lg: 4 } }}>
                  <Button
                    color="inherit"
                    sx={{ fontWeight: 500 }}
                    onClick={() => navigate('/services')}
                  >
                    {t.services}
                  </Button>
                  <Button 
                    color="inherit" 
                    sx={{ fontWeight: 500 }}
                    onClick={() => navigate('/offers')}
                  >
                    {t.offers}
                  </Button>
                  <Button 
                    color="inherit" 
                    sx={{ fontWeight: 500 }}
                    onClick={() => navigate('/about')}
                  >
                    {t.about}
                  </Button>
                </Stack>
              )}
            </Box>

            {/* Right Side - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              {/* Language Selector */}
              <FormControl size="small" sx={{ minWidth: { xs: 60, sm: 80, md: 100 } }}>
                <Select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { py: { xs: 0.5, md: 1 }, display: 'flex', alignItems: 'center', fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' } }
                  }}
                >
                  <MenuItem value="en">🇬🇧 {isMobile ? 'EN' : isTablet ? 'EN' : 'English'}</MenuItem>
                  <MenuItem value="tr">🇹🇷 {isMobile ? 'TR' : isTablet ? 'TR' : 'Türkçe'}</MenuItem>
                  <MenuItem value="ru">🇷🇺 {isMobile ? 'RU' : isTablet ? 'RU' : 'Русский'}</MenuItem>
                </Select>
              </FormControl>

              {!isMobile && (
                <>
                  {isAuthenticated ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton sx={{ color: '#00a693' }}>
                        <Notifications />
                      </IconButton>
                      <Button
                        onClick={handleProfileMenuOpen}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: '#1f2937',
                          textTransform: 'none',
                          '&:hover': { bgcolor: 'rgba(0, 166, 147, 0.04)' }
                        }}
                      >
                        <Avatar
                          src={user?.avatar}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Box sx={{ textAlign: 'left', display: { xs: 'none', lg: 'block' } }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                            {user?.name || 'User'}
                          </Typography>
                        </Box>
                        <ExpandMore sx={{ fontSize: 16 }} />
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        sx={{ color: '#00a693', borderColor: '#00a693' }}
                        onClick={() => navigate('/signin')}
                      >
                        {t.login}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: '#00a693', color: 'white' }}
                        onClick={() => navigate('/signup')}
                      >
                        {t.signup}
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        sx={{ mt: 1 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          {t.profile}
        </MenuItem>
        <MenuItem onClick={() => { navigate('/dashboard'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <Schedule fontSize="small" />
          </ListItemIcon>
          {t.appointments}
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Favorite fontSize="small" />
          </ListItemIcon>
          {t.favorites}
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {language === 'en' ? 'Settings' : language === 'tr' ? 'Ayarlar' : 'Настройки'}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {language === 'en' ? 'Sign Out' : language === 'tr' ? 'Çıkış Yap' : 'В��йти'}
        </MenuItem>
      </Menu>

      {/* Responsive Hero Section */}
      <Box data-search="hero" sx={{
        position: 'relative',
        height: { xs: '60vh', sm: '65vh', md: '500px', lg: '600px' },
        background: 'linear-gradient(135deg, rgba(0, 166, 147, 0.95) 0%, rgba(79, 213, 199, 0.9) 100%)',
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
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3.5rem' },
                  lineHeight: { xs: 1.1, md: 1.2 }
                }}>
                  {t.heroTitle}
                </Typography>
                <Typography variant="h5" sx={{
                  mb: { xs: 3, sm: 3.5, md: 4 },
                  opacity: 0.95,
                  fontWeight: 300,
                  fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.4rem' },
                  lineHeight: { xs: 1.4, md: 1.5 }
                }}>
                  {t.heroSubtitle}
                </Typography>

                {/* Mobile/Tablet Search Bar */}
                <Box sx={{
                  display: { xs: 'block', md: 'flex' },
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  maxWidth: { xs: '100%', sm: 500, md: 600 },
                  mb: { xs: 3, sm: 3.5, md: 4 }
                }}>
                  <TextField
                    placeholder={t.searchService}
                    value={searchService}
                    onChange={(e) => setSearchService(e.target.value)}
                    sx={{
                      flex: 1,
                      bgcolor: 'white',
                      borderRadius: 2,
                      mb: { xs: 1.5, md: 0 },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        height: { xs: '48px', sm: '52px', md: '56px' },
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: '#00a693' }} />
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
                      mb: { xs: 1.5, md: 0 },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        height: { xs: '48px', sm: '52px', md: '56px' },
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ color: '#00a693' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button 
                    variant="contained" 
                    size="large"
                    fullWidth={isMobile}
                    sx={{ 
                      bgcolor: '#ff6b35',
                      color: 'white',
                      fontWeight: 'bold',
                      px: 4,
                      minWidth: { xs: 'auto', md: 120 },
                      height: { xs: '48px', sm: '52px', md: '56px' },
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      '&:hover': { bgcolor: '#e55a2e' }
                    }}
                  >
                    {t.searchButton}
                  </Button>
                </Box>

                {/* Quick Stats */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 2, sm: 3, md: 4 }}
                  sx={{ opacity: 0.9, alignItems: { xs: 'center', md: 'flex-start' } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>2000+ {t.barbers}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>150,000+ {t.happyCustomers}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>{t.instantBooking}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Responsive Filter and Sort Bar */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', py: { xs: 1.5, md: 2 } }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 1.5, md: 0 }
          }}>
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}>
              {t.featuredBarbers} ({displayedBarbers.length} {t.results})
              {getActiveFilterCount() > 0 && (
                <Chip
                  label={`${getActiveFilterCount()} ${language === 'en' ? 'filters' : language === 'tr' ? 'filtre' : 'филь��ров'}`}
                  size="small"
                  sx={{ ml: 1, bgcolor: '#00a693', color: 'white' }}
                  onDelete={() => {
                    setFilters({});
                    setFilteredBarbers([]);
                  }}
                />
              )}
            </Typography>
            <Box sx={{
              display: 'flex',
              gap: { xs: 0.5, sm: 1, md: 2 },
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <Chip
                label={t.nearest}
                variant={filters.sortBy === 'nearest' || !filters.sortBy ? "filled" : "outlined"}
                color="primary"
                sx={{ bgcolor: (filters.sortBy === 'nearest' || !filters.sortBy) ? '#00a693' : 'transparent', color: (filters.sortBy === 'nearest' || !filters.sortBy) ? 'white' : '#00a693', borderColor: '#00a693' }}
                size={isMobile ? "small" : "medium"}
                onClick={() => applyFilters({ ...filters, sortBy: 'nearest' })}
              />
              <Chip
                label={t.popular}
                variant={filters.sortBy === 'topRated' ? "filled" : "outlined"}
                sx={{ bgcolor: filters.sortBy === 'topRated' ? '#00a693' : 'transparent', color: filters.sortBy === 'topRated' ? 'white' : '#00a693', borderColor: '#00a693' }}
                size={isMobile ? "small" : "medium"}
                onClick={() => applyFilters({ ...filters, sortBy: 'topRated' })}
              />
              <Chip
                label={t.cheapest}
                variant={filters.sortBy === 'lowToHigh' ? "filled" : "outlined"}
                sx={{ bgcolor: filters.sortBy === 'lowToHigh' ? '#00a693' : 'transparent', color: filters.sortBy === 'lowToHigh' ? 'white' : '#00a693', borderColor: '#00a693' }}
                size={isMobile ? "small" : "medium"}
                onClick={() => applyFilters({ ...filters, sortBy: 'lowToHigh' })}
              />
              <Chip
                label={t.verified}
                variant={filters.verifiedOnly ? "filled" : "outlined"}
                sx={{ bgcolor: filters.verifiedOnly ? '#00a693' : 'transparent', color: filters.verifiedOnly ? 'white' : '#00a693', borderColor: '#00a693' }}
                size={isMobile ? "small" : "medium"}
                onClick={() => applyFilters({ ...filters, verifiedOnly: !filters.verifiedOnly })}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{
                  color: '#00a693',
                  borderColor: '#00a693',
                  position: 'relative'
                }}
                size={isMobile ? "small" : "medium"}
                onClick={() => setFilterOpen(true)}
              >
                {t.filter}
                {getActiveFilterCount() > 0 && (
                  <Chip
                    label={getActiveFilterCount()}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: '#ff6b35',
                      color: 'white',
                      minWidth: 20,
                      height: 20,
                      fontSize: '0.7rem'
                    }}
                  />
                )}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Sort />}
                sx={{ color: '#00a693', borderColor: '#00a693' }}
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
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {displayedBarbers.map((barber) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={barber.id}>
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
                  <Box sx={{ position: 'relative', height: { xs: 140, sm: 160, md: 180, lg: 200 } }}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "140" : isTablet ? "170" : "200"}
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
                        fontWeight: 'bold',
                        maxWidth: '50%',
                        zIndex: 2,
                        fontSize: { xs: '0.7rem', md: '0.75rem' }
                      }}
                    />
                    
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5, flexDirection: 'column', maxWidth: '60%', zIndex: 2 }}>
                      {barber.isVerified && (
                        <Chip 
                          icon={<Verified sx={{ fontSize: 16 }} />}
                          label={t.verified}
                          size="small"
                          sx={{ bgcolor: '#00a693', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isNew && (
                        <Chip 
                          label={t.new}
                          size="small"
                          sx={{ bgcolor: '#ff6b35', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isTopRated && (
                        <Chip 
                          icon={<TrendingUp sx={{ fontSize: 16 }} />}
                          label={t.mostPreferred}
                          size="small"
                          sx={{ bgcolor: '#fbbf24', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isPremium && (
                        <Chip
                          label={t.premiumLabel}
                          size="small"
                          sx={{ bgcolor: '#8b5cf6', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                      {barber.isTraditional && (
                        <Chip
                          label={t.traditionalLabel}
                          size="small"
                          sx={{ bgcolor: '#92400e', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                    
                    {/* Rating Badge */}
                    <Box sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      bgcolor: 'rgba(0,0,0,0.8)',
                      borderRadius: 2,
                      px: { xs: 1, md: 1.5 },
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      zIndex: 2
                    }}>
                      <Star sx={{ color: '#fbbf24', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
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
                        '&:hover': { bgcolor: 'white' },
                        zIndex: 2,
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(barber.id);
                      }}
                    >
                      {bookmarked.has(barber.id) ? 
                        <Bookmark sx={{ color: '#00a693' }} /> : 
                        <BookmarkBorder />
                      }
                    </IconButton>

                    {/* Barber Avatar */}
                    <Avatar
                      src={barber.image}
                      sx={{
                        width: { xs: 50, sm: 60, md: 70, lg: 80 },
                        height: { xs: 50, sm: 60, md: 70, lg: 80 },
                        position: 'absolute',
                        bottom: { xs: -25, sm: -30, md: -35, lg: -40 },
                        left: { xs: 12, sm: 16, md: 18, lg: 20 },
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ pt: { xs: 4.5, sm: 5.5, md: 6, lg: 7 }, pb: { xs: 2.5, md: 3 }, px: { xs: 1.5, sm: 2, md: 3 } }}>
                    {/* Header */}
                    <Box sx={{ mb: { xs: 1.5, md: 2 } }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '0.95rem', sm: '1rem', md: '1.15rem', lg: '1.25rem' }, lineHeight: 1.2, wordBreak: 'break-word' }}>
                        {barber.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' }, lineHeight: 1.3 }}>
                        {barber.shopName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating value={barber.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                          ({barber.reviewCount} {t.reviews})
                        </Typography>
                      </Box>
                    </Box>

                    {/* Distance and Response Time */}
                    <Box sx={{ mb: { xs: 1.5, md: 2 } }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <LocationOn sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                        {barber.distance} • {barber.responseTime}
                      </Typography>
                    </Box>

                    {/* Specialties */}
                    <Stack direction="row" spacing={0.5} sx={{ mb: { xs: 1.5, md: 2 }, flexWrap: 'wrap', gap: 0.5 }}>
                      {barber.specialties.slice(0, isMobile ? 2 : isTablet ? 3 : 3).map((specialty) => (
                        <Chip
                          key={specialty}
                          label={specialty}
                          size="small"
                          sx={{
                            bgcolor: '#e6f7f5',
                            color: '#00a693',
                            fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }
                          }}
                        />
                      ))}
                    </Stack>

                    {/* Next Available */}
                    <Box sx={{
                      bgcolor: '#e6f7f5',
                      border: '1px solid #b3ece6',
                      borderRadius: 2,
                      p: { xs: 1.2, md: 1.5 },
                      mb: { xs: 1.5, md: 2 },
                      minHeight: { xs: 'auto', md: '70px' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                        {t.nextAvailable}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime sx={{ fontSize: 16, color: '#00a693' }} />
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00a693', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                            {t.today} {barber.nextAvailable}
                          </Typography>
                        </Box>
                        {barber.instantBooking && (
                          <Chip 
                            label={t.instantApproval}
                            size="small"
                            sx={{ bgcolor: '#00a693', color: 'white', fontWeight: 'bold' }}
                          />
                        )}
                      </Box>
                    </Box>

                    {/* Price and Action */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1.5, md: 2 } }}>
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
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                          {t.starting}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={{ xs: 0.5, md: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: '#00a693',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#007562' }
                        }}
                        onClick={() => navigate(`/barber/${barber.id}`)}
                      >
                        {t.bookAppointment}
                      </Button>
                      <IconButton 
                        sx={{ 
                          border: 1, 
                          borderColor: '#00a693',
                          color: '#00a693',
                          '&:hover': { bgcolor: '#e6f7f5' }
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

      {/* Simplified Footer */}
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: { xs: 3, sm: 4, md: 6 }, mt: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* Brand Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                {t.brand}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                {language === 'en' 
                  ? 'The leading platform for booking professional barber services across Europe. Find and book the best barbers in your city.'
                  : language === 'tr'
                  ? 'Avrupa\'da profesyonel berber hizmetleri rezervasyonu için önde gelen platform. Şehrinizdeki en iyi berberleri bulun ve rezervasyon yapın.'
                  : 'Ведущая платфор��а для бронирования профессиональных парикмахерских услуг по всей Европе. Найдите и забронируйте лучших парикмахеров в своем городе.'
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

            {/* Company */}
            <Grid item xs={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {t.company}
              </Typography>
              <Stack spacing={1}>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/about')}
                >
                  {t.about}
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/company')}
                >
                  {language === 'en' ? 'Careers' : language === 'tr' ? 'Kariyer' : 'Карьера'}
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/company')}
                >
                  {language === 'en' ? 'Press' : language === 'tr' ? 'Basın' : 'Пресса'}
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/company')}
                >
                  {language === 'en' ? 'Partners' : language === 'tr' ? 'Ortaklar' : 'Партнеры'}
                </Link>
              </Stack>
            </Grid>

            {/* Support */}
            <Grid item xs={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                {t.support}
              </Typography>
              <Stack spacing={1}>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/support')}
                >
                  {language === 'en' ? 'Help Center' : language === 'tr' ? 'Yardım Merkezi' : 'Центр помощи'}
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/support')}
                >
                  {language === 'en' ? 'Contact Us' : language === 'tr' ? 'İletişim' : 'Связаться с нами'}
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/support')}
                >
                  {language === 'en' ? 'FAQ' : language === 'tr' ? 'SSS' : 'FAQ'}
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 }, fontSize: { xs: '0.85rem', md: '0.875rem' } }}
                  onClick={() => navigate('/support')}
                >
                  {language === 'en' ? 'Safety' : language === 'tr' ? 'Güvenlik' : 'Безопасность'}
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Bottom Footer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 2,
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Copyright sx={{ mr: 1, fontSize: { xs: 14, md: 16 } }} />
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                2024 {t.brand}. {language === 'en' ? 'All rights reserved.' : language === 'tr' ? 'Tüm hakları saklıdır.' : 'Все права защищены.'}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.6, fontSize: { xs: '0.8rem', md: '0.875rem' }, textAlign: { xs: 'center', md: 'right' } }}>
              {language === 'en' ? 'Made for Europe' : language === 'tr' ? 'Avrupa için yapıldı' : 'Сделано для Европы'} 🇪🇺
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
          sx: { width: { xs: 260, sm: 280 } }
        }}
      >
        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00a693', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              {t.brand}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* User Profile Section in Drawer */}
          {isAuthenticated && (
            <Box sx={{ mb: 2, p: 2, bgcolor: '#f0fffe', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email || ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />
          <List>
            <ListItemButton onClick={() => { navigate('/'); setDrawerOpen(false); }}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={t.home} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/services'); setDrawerOpen(false); }}>
              <ListItemIcon><ContentCut /></ListItemIcon>
              <ListItemText primary={t.services} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/offers'); setDrawerOpen(false); }}>
              <ListItemIcon><LocalOffer /></ListItemIcon>
              <ListItemText primary={t.offers} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/about'); setDrawerOpen(false); }}>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary={t.about} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/company'); setDrawerOpen(false); }}>
              <ListItemIcon><Business /></ListItemIcon>
              <ListItemText primary={t.company} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/support'); setDrawerOpen(false); }}>
              <ListItemIcon><SupportIcon /></ListItemIcon>
              <ListItemText primary={t.support} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }}>
              <ListItemIcon><Schedule /></ListItemIcon>
              <ListItemText primary={t.appointments} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary={t.favorites} />
            </ListItemButton>
            <Divider sx={{ my: 2 }} />
            {isAuthenticated ? (
              <>
                <ListItemButton onClick={() => { navigate('/profile'); setDrawerOpen(false); }}>
                  <ListItemIcon><Person /></ListItemIcon>
                  <ListItemText primary={t.profile} />
                </ListItemButton>
                <ListItemButton onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }}>
                  <ListItemIcon><Schedule /></ListItemIcon>
                  <ListItemText primary={t.appointments} />
                </ListItemButton>
                <ListItemButton onClick={() => setDrawerOpen(false)}>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Settings' : language === 'tr' ? 'Ayarlar' : 'Настройки'} />
                </ListItemButton>
                <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                  <ListItemIcon><Logout /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Sign Out' : language === 'tr' ? 'Çıkış Yap' : 'Выйти'} />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ color: '#00a693', borderColor: '#00a693', mr: 1 }}
                    onClick={() => { navigate('/signin'); setDrawerOpen(false); }}
                  >
                    {t.login}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: '#00a693', color: 'white' }}
                    onClick={() => { navigate('/signup'); setDrawerOpen(false); }}
                  >
                    {t.signup}
                  </Button>
                </ListItem>
              </>
            )}
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
            borderTop: '1px solid #e5e7eb',
            display: { xs: 'block', md: 'none' }
          }}
        >
          <BottomNavigation
            value={bottomNavValue}
            onChange={(event, newValue) => setBottomNavValue(newValue)}
            sx={{ height: { xs: 56, sm: 60 } }}
          >
            <BottomNavigationAction
              label={t.home}
              icon={<HomeIcon />}
              onClick={() => { navigate('/'); setBottomNavValue(0); }}
            />
            <BottomNavigationAction
              label={t.services}
              icon={<ContentCut />}
              onClick={() => { navigate('/services'); setBottomNavValue(1); }}
            />
            <BottomNavigationAction
              label={t.appointments}
              icon={<Schedule />}
              onClick={() => { navigate('/dashboard'); setBottomNavValue(2); }}
            />
            <BottomNavigationAction
              label={t.profile}
              icon={<AccountCircle />}
              onClick={() => setBottomNavValue(3)}
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
            bottom: { xs: 76, sm: 80 },
            right: { xs: 12, sm: 16 },
            bgcolor: '#ff6b35',
            color: 'white',
            '&:hover': { bgcolor: '#e55a2e' },
            zIndex: 1000
          }}
          onClick={() => {
            // Scroll to search section
            const searchSection = document.querySelector('[data-search="hero"]');
            if (searchSection) {
              searchSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <Search />
        </Fab>
      )}
      {/* Filter Component */}
      <BarberFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={applyFilters}
        currentFilters={filters}
      />
    </Box>
  );
};

export default Home;
