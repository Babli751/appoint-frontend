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
  const { language, changeLanguage, t: translations } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  // Use centralized translations
  const t = translations;

  // European cities and pricing
  const europeanCities = [
    'Berlin, Germany', 'Paris, France', 'Madrid, Spain', 'Rome, Italy',
    'Amsterdam, Netherlands', 'Vienna, Austria', 'Brussels, Belgium'
  ];

  // Showcase categories for beauty salons and barber shops
  const showcaseCategories = [
    {
      id: 1,
      title: language === 'en' ? 'Premium Barbershops' : language === 'tr' ? 'Premium Berber Salonları' : 'Премиум парикмахерские',
      subtitle: language === 'en'
        ? 'Traditional craftsmanship meets modern style'
        : language === 'tr'
        ? 'Geleneksel ustalık modern tarzla buluşuyor'
        : 'Традиционное мастерство встречает современный стиль',
      image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=800&h=600&fit=crop',
      features: [
        language === 'en' ? 'Master Barbers' : language === 'tr' ? 'Usta Berberler' : 'Мастер-парикмахеры',
        language === 'en' ? 'Classic Cuts' : language === 'tr' ? 'Klasik Kesimler' : 'Классические стрижки',
        language === 'en' ? 'Hot Towel Service' : language === 'tr' ? 'Sıcak Havlu Hizmeti' : 'Горячее полотенце'
      ]
    },
    {
      id: 2,
      title: language === 'en' ? 'Modern Hair Studios' : language === 'tr' ? 'Modern Saç Stüdyoları' : 'Современные студии волос',
      subtitle: language === 'en'
        ? 'Cutting-edge techniques and contemporary designs'
        : language === 'tr'
        ? 'Son teknoloji ve çağdaş tasarımlar'
        : 'Передовые техники и современный дизайн',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop',
      features: [
        language === 'en' ? 'Trendy Styles' : language === 'tr' ? 'Trend Saç Modelleri' : 'Модные стили',
        language === 'en' ? 'Color Specialists' : language === 'tr' ? 'Renk Uzmanları' : 'Специалисты по цвету',
        language === 'en' ? 'Hair Treatments' : language === 'tr' ? 'Saç Bakımı' : 'Уход за волосами'
      ]
    },
    {
      id: 3,
      title: language === 'en' ? 'Luxury Beauty Salons' : language === 'tr' ? 'Lüks Güzellik Salonları' : 'Роскошные салоны красоты',
      subtitle: language === 'en'
        ? 'Complete beauty experience with premium services'
        : language === 'tr'
        ? 'Premium hizmetlerle tam güzellik deneyimi'
        : 'Полноценный опыт красоты с премиум услугами',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
      features: [
        language === 'en' ? 'Full Service Salon' : language === 'tr' ? 'Tam Hizmet Salon' : 'П��лный сервис салон',
        language === 'en' ? 'Skin Care' : language === 'tr' ? 'Cilt Bakımı' : 'Уход за кожей',
        language === 'en' ? 'Nail Services' : language === 'tr' ? 'Tırnak Hizmetleri' : 'Услуги маникюра'
      ]
    }
  ];


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

              {/* Try Business Button */}
              <Button
                variant="outlined"
                startIcon={<Business />}
                sx={{
                  color: '#ff6b35',
                  borderColor: '#ff6b35',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'rgba(255, 107, 53, 0.04)',
                    borderColor: '#e55a2e'
                  },
                  display: { xs: 'none', sm: 'flex' }
                }}
                onClick={() => navigate('/business-signup')}
              >
                {t.tryBusiness}
              </Button>

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
        <MenuItem onClick={() => { navigate('/favorites'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <Favorite fontSize="small" />
          </ListItemIcon>
          {t.favorites}
        </MenuItem>
        <MenuItem onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}>
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

      {/* Showcase Introduction */}
      <Box sx={{ bgcolor: 'white', py: { xs: 3, md: 6 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography variant="h3" sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              mb: 2
            }}>
              {language === 'en'
                ? 'Discover Premium Beauty & Grooming'
                : language === 'tr'
                ? 'Premium Güzellik ve Bakım Keşfedin'
                : 'Откройте премиум красоту и уход'
              }
            </Typography>
            <Typography variant="h6" sx={{
              color: '#6b7280',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}>
              {language === 'en'
                ? 'From traditional barbershops to modern beauty salons, find the perfect place for your style and wellness needs'
                : language === 'tr'
                ? 'Geleneksel berber dükkanlarından modern güzellik salonlarına, tarzınız ve sağlık ihtiyaçlarınız için mükemmel yeri bulun'
                : 'От традиционных парикмахерских до современных салонов красоты, найдите идеальное место для ваших потребностей в стиле и красоте'
              }
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Beautiful Showcase Grid */}
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {showcaseCategories.map((category) => (
              <Grid item xs={12} md={4} key={category.id}>
                <Card sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0, 166, 147, 0.15)'
                  }
                }}>
                  {/* Hero Image */}
                  <Box sx={{ position: 'relative', height: { xs: 280, md: 320 } }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={category.image}
                      alt={category.title}
                      sx={{ objectFit: 'cover' }}
                    />

                    {/* Gradient Overlay */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                      zIndex: 1
                    }} />

                    {/* Content Overlay */}
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: { xs: 2.5, md: 3 },
                      color: 'white',
                      zIndex: 2
                    }}>
                      <Typography variant="h4" sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        lineHeight: 1.2
                      }}>
                        {category.title}
                      </Typography>
                      <Typography variant="body1" sx={{
                        opacity: 0.9,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        lineHeight: 1.5
                      }}>
                        {category.subtitle}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    {/* Features */}
                    <Stack spacing={1.5}>
                      {category.features.map((feature, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#00a693'
                          }} />
                          <Typography variant="body2" sx={{
                            fontWeight: 500,
                            color: '#374151',
                            fontSize: { xs: '0.9rem', md: '1rem' }
                          }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>

                    {/* Action Button */}
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        mt: 3,
                        color: '#00a693',
                        borderColor: '#00a693',
                        fontWeight: 'bold',
                        py: 1.5,
                        '&:hover': {
                          bgcolor: '#00a693',
                          color: 'white'
                        }
                      }}
                      onClick={() => {
                        // Navigate to specific category or show search results
                        console.log('Navigate to category:', category.title);
                      }}
                    >
                      {language === 'en'
                        ? 'Explore Options'
                        : language === 'tr'
                        ? 'Seçenekleri Keşfet'
                        : 'Изучить варианты'
                      }
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography variant="h3" sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}>
              {language === 'en'
                ? 'Ready to Book Your Next Appointment?'
                : language === 'tr'
                ? 'Bir Sonraki Randevunuzu Almaya Hazır mısınız?'
                : 'Готовы забронировать следующую встречу?'
              }
            </Typography>
            <Typography variant="h6" sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto'
            }}>
              {language === 'en'
                ? 'Join thousands of satisfied customers who trust us with their beauty and grooming needs'
                : language === 'tr'
                ? 'Güzellik ve bakım ihtiyaçları için bize güvenen binlerce memnun müşteriye katılın'
                : 'Присоединяйтесь к тысячам довольных клиентов, которые доверяют нам свои потребности в красоте и уходе'
              }
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: '#00a693',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#f0fffe',
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => {
                  // Scroll to search section
                  const searchSection = document.querySelector('[data-search="hero"]');
                  if (searchSection) {
                    searchSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {language === 'en'
                  ? 'Find Your Salon'
                  : language === 'tr'
                  ? 'Salonunuzu Bulun'
                  : 'Найти салон'
                }
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Business />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white'
                  }
                }}
                onClick={() => navigate('/business-signup')}
              >
                {t.tryBusiness}
              </Button>
            </Stack>
          </Box>
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
            <Divider sx={{ my: 1 }} />
            <ListItemButton
              onClick={() => { navigate('/business-signup'); setDrawerOpen(false); }}
              sx={{
                bgcolor: 'rgba(255, 107, 53, 0.08)',
                '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.15)' },
                mb: 1,
                borderRadius: 1,
                mx: 1
              }}
            >
              <ListItemIcon><Business sx={{ color: '#ff6b35' }} /></ListItemIcon>
              <ListItemText
                primary={t.tryBusiness}
                sx={{ '& .MuiTypography-root': { color: '#ff6b35', fontWeight: 600 } }}
              />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }}>
              <ListItemIcon><Schedule /></ListItemIcon>
              <ListItemText primary={t.appointments} />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/favorites'); setDrawerOpen(false); }}>
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
                <ListItemButton onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Settings' : language === 'tr' ? 'Ayarlar' : 'Настройки'} />
                </ListItemButton>
                <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                  <ListItemIcon><Logout /></ListItemIcon>
                  <ListItemText primary={language === 'en' ? 'Sign Out' : language === 'tr' ? 'Çıkı�� Yap' : 'Выйти'} />
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
