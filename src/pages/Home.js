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
  DialogContent
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
  MobileFriendly
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('Ankara, Çankaya');
  const [searchService, setSearchService] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterDialog, setFilterDialog] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('distance');
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedDate, setSelectedDate] = useState('today');
  const [bookmarked, setBookmarked] = useState(new Set([1, 3]));
  const [currentLocation, setCurrentLocation] = useState('Çankaya, Ankara');
  const [tabValue, setTabValue] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  const serviceCategories = [
    { 
      id: 'haircut', 
      name: 'Saç Kesimi', 
      icon: <ContentCut />,
      subcategories: ['Klasik Kesim', 'Modern Kesim', 'Fade', 'Undercut', 'Uzun Saç']
    },
    { 
      id: 'beard', 
      name: 'Sakal & Tıraş', 
      icon: <Face />,
      subcategories: ['Sakal Düzeltme', 'Klasik Tıraş', 'Sakal Tasarım', 'Bıyık Kesimi']
    },
    { 
      id: 'styling', 
      name: 'Şekillendirme', 
      icon: <ColorLens />,
      subcategories: ['Fön', 'Maşa', 'Düzleştirme', 'Doğal Dalgalar']
    },
    { 
      id: 'treatment', 
      name: 'Bakım', 
      icon: <Spa />,
      subcategories: ['Saç Maskesi', 'Kafa Masajı', 'Cilt Bakımı', 'Kaş Düzeltme']
    }
  ];

  const quickFilters = [
    { label: 'Hemen Müsait', value: 'available_now', active: false },
    { label: 'En Yakın', value: 'nearest', active: true },
    { label: 'En Popüler', value: 'popular', active: false },
    { label: 'En Uygun', value: 'cheapest', active: false },
    { label: 'Premium', value: 'premium', active: false }
  ];

  const promotions = [
    {
      id: 1,
      title: '%30 İndirim',
      description: 'İlk randevunuza özel',
      code: 'ILKRANDEVU30',
      validUntil: '31 Ocak',
      backgroundColor: '#ef4444',
      textColor: 'white'
    },
    {
      id: 2,
      title: 'Ücretsiz Masaj',
      description: 'Saç kesimi + Sakal paketinde',
      code: 'MASAJHEDIYE',
      validUntil: '15 Şubat',
      backgroundColor: '#10b981',
      textColor: 'white'
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
      specialties: ['Saç Kesimi', 'Sakal Tıraş', 'Masaj'],
      nextAvailable: '14:30',
      price: '₺80',
      originalPrice: '₺100',
      discount: 20,
      isVerified: true,
      instantBooking: true,
      features: ['Klima', 'WiFi', 'Otopark', 'Kart Ödeme'],
      workingHours: '09:00 - 20:00',
      responseTime: '2 dk içinde',
      totalBookings: 1250,
      repeatCustomers: 85,
      languages: ['Türkçe', 'İngilizce'],
      awards: ['2023 En İyi Berber', 'Müşteri Memnuniyeti']
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
      specialties: ['Modern Kesim', 'Boya', 'Şekillendirme'],
      nextAvailable: '15:00',
      price: '₺75',
      originalPrice: '₺90',
      discount: 15,
      isVerified: true,
      instantBooking: false,
      features: ['WiFi', 'Kart Ödeme', 'Online Ödeme'],
      workingHours: '10:00 - 19:00',
      responseTime: '5 dk içinde',
      totalBookings: 890,
      repeatCustomers: 78,
      languages: ['Türkçe'],
      isNew: true
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
      specialties: ['Klasik Tıraş', 'Sakal Bakım', 'Masaj'],
      nextAvailable: '16:15',
      price: '₺90',
      originalPrice: '₺90',
      discount: 0,
      isVerified: true,
      instantBooking: true,
      features: ['Klima', 'Otopark', 'Kart Ödeme', 'Engelli Erişim'],
      workingHours: '08:00 - 21:00',
      responseTime: '1 dk içinde',
      totalBookings: 2100,
      repeatCustomers: 92,
      languages: ['Türkçe', 'İngilizce', 'Arapça'],
      isTopRated: true
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

  const locationSuggestions = [
    'Çankaya, Ankara', 'Kızılay, Ankara', 'Ulus, Ankara', 
    'Beştepe, Ankara', 'Bahçelievler, Ankara'
  ];

  const serviceSuggestions = [
    'Saç Kesimi', 'Sakal Tıraş', 'Modern Kesim', 'Klasik Tıraş',
    'Fade Kesim', 'Undercut', 'Saç Boyama', 'Kaş Alma', 'Masaj'
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa', pb: 8 }}>
      {/* Enhanced Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
          boxShadow: '0 4px 20px rgba(107, 70, 193, 0.3)'
        }}
      >
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            BarberPro
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={notificationCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar 
            sx={{ bgcolor: '#fbbf24', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            U
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Location & Quick Access Bar */}
      <Paper sx={{ m: 2, p: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <LocationOn sx={{ color: '#6b46c1', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Mevcut konum
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {currentLocation}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" sx={{ color: '#6b46c1' }}>
            <MyLocation />
          </IconButton>
        </Box>
      </Paper>

      {/* Enhanced Search Section */}
      <Container sx={{ mb: 3 }}>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <Autocomplete
                freeSolo
                options={serviceSuggestions}
                value={searchService}
                onChange={(event, newValue) => setSearchService(newValue)}
                onInputChange={(event, newInputValue) => setSearchService(newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Hangi hizmeti arıyorsunuz?"
                    sx={{ flex: 1 }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: '#6b46c1' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Autocomplete
                freeSolo
                options={locationSuggestions}
                value={searchLocation}
                onChange={(event, newValue) => setSearchLocation(newValue)}
                onInputChange={(event, newInputValue) => setSearchLocation(newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Nerede?"
                    sx={{ flex: 1 }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ color: '#6b46c1' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#fbbf24',
                  color: 'black',
                  fontWeight: 'bold',
                  px: 4,
                  '&:hover': { bgcolor: '#f59e0b' },
                  minWidth: 120
                }}
              >
                Ara
              </Button>
            </Box>

            {/* Quick Filters */}
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {quickFilters.map((filter) => (
                <Chip
                  key={filter.value}
                  label={filter.label}
                  variant={filter.active ? 'filled' : 'outlined'}
                  color={filter.active ? 'primary' : 'default'}
                  onClick={() => {}}
                  sx={{
                    fontWeight: filter.active ? 'bold' : 'normal'
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* Promotions Carousel */}
      <Container sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1f2937' }}>
          <LocalOffer sx={{ mr: 1, verticalAlign: 'middle', color: '#fbbf24' }} />
          Özel Fırsatlar
        </Typography>
        <Grid container spacing={2}>
          {promotions.map((promo) => (
            <Grid item xs={12} md={6} key={promo.id}>
              <Card sx={{ 
                background: `linear-gradient(135deg, ${promo.backgroundColor} 0%, ${promo.backgroundColor}dd 100%)`,
                color: promo.textColor,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <CardContent>
                  <Bolt sx={{ position: 'absolute', top: 10, right: 10, fontSize: 30, opacity: 0.3 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {promo.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                    {promo.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Kod: {promo.code}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {promo.validUntil} tarihine kadar
                      </Typography>
                    </Box>
                    <Button 
                      variant="outlined" 
                      sx={{ 
                        color: promo.textColor, 
                        borderColor: promo.textColor,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      Kullan
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Service Categories */}
      <Container sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1f2937' }}>
          Hizmet Kategorileri
        </Typography>
        <Grid container spacing={2}>
          {serviceCategories.map((category) => (
            <Grid item xs={6} md={3} key={category.id}>
              <Card sx={{ 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(107, 70, 193, 0.15)'
                }
              }}>
                <CardContent>
                  <Box sx={{ 
                    bgcolor: '#ede9fe', 
                    borderRadius: '50%', 
                    width: 60, 
                    height: 60, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#6b46c1'
                  }}>
                    {React.cloneElement(category.icon, { sx: { fontSize: 28 } })}
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.subcategories.length} alt kategori
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Filter and Sort Bar */}
      <Container sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
            Yakınınızdaki Berberler ({featuredBarbers.length} sonuç)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterDialog(true)}
            >
              Filtrele
            </Button>
            <Button
              variant="outlined"
              startIcon={<Sort />}
            >
              Sırala
            </Button>
            <IconButton
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              sx={{ border: 1, borderColor: 'divider' }}
            >
              {viewMode === 'grid' ? <ListIcon /> : <HomeIcon />}
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Enhanced Barber Cards */}
      <Container sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {featuredBarbers.map((barber) => (
            <Grid item xs={12} md={viewMode === 'grid' ? 4 : 12} key={barber.id}>
              <Card sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(107, 70, 193, 0.2)'
                }
              }}>
                {/* Cover Image */}
                <Box sx={{ position: 'relative', height: 150 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={barber.coverImage}
                    alt={barber.shopName}
                  />
                  {/* Badges */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 0.5 }}>
                    {barber.isVerified && (
                      <Chip 
                        icon={<Verified sx={{ fontSize: 16 }} />}
                        label="Doğrulanmış"
                        size="small"
                        sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 'bold' }}
                      />
                    )}
                    {barber.isNew && (
                      <Chip 
                        label="Yeni"
                        size="small"
                        sx={{ bgcolor: '#3b82f6', color: 'white', fontWeight: 'bold' }}
                      />
                    )}
                    {barber.isTopRated && (
                      <Chip 
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                        label="En Çok Tercih Edilen"
                        size="small"
                        sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 'bold' }}
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
                    px: 1,
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

                <CardContent sx={{ pt: 6 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
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
                    {barber.discount > 0 && (
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography 
                          variant="body2" 
                          sx={{ textDecoration: 'line-through', color: '#6b7280' }}
                        >
                          {barber.originalPrice}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ef4444' }}>
                          {barber.price}
                        </Typography>
                        <Chip 
                          label={`%${barber.discount} İndirim`}
                          size="small"
                          sx={{ bgcolor: '#ef4444', color: 'white', fontSize: '0.7rem' }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Info Grid */}
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 14, color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                          {barber.distance} ({barber.estimatedTime})
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 14, color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                          {barber.workingHours}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <MobileFriendly sx={{ fontSize: 14, color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                          {barber.responseTime}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Person sx={{ fontSize: 14, color: '#6b7280' }} />
                        <Typography variant="body2" color="text.secondary">
                          %{barber.repeatCustomers} tekrar müşteri
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

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
                          fontSize: '0.75rem',
                          fontWeight: 'medium'
                        }}
                      />
                    ))}
                    {barber.specialties.length > 3 && (
                      <Chip
                        label={`+${barber.specialties.length - 3}`}
                        size="small"
                        sx={{
                          bgcolor: '#f3f4f6',
                          color: '#6b7280',
                          fontSize: '0.75rem'
                        }}
                      />
                    )}
                  </Stack>

                  {/* Features */}
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1}>
                      {barber.features.slice(0, 4).map((feature) => (
                        <Box key={feature} sx={{ display: 'flex', alignItems: 'center' }}>
                          {feature === 'WiFi' && <Wifi sx={{ fontSize: 16, color: '#6b46c1' }} />}
                          {feature === 'Klima' && <AcUnit sx={{ fontSize: 16, color: '#6b46c1' }} />}
                          {feature === 'Otopark' && <LocalParking sx={{ fontSize: 16, color: '#6b46c1' }} />}
                          {feature === 'Kart Ödeme' && <Payment sx={{ fontSize: 16, color: '#6b46c1' }} />}
                          {feature === 'Engelli Erişim' && <Accessible sx={{ fontSize: 16, color: '#6b46c1' }} />}
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Next Available */}
                  <Box sx={{ 
                    bgcolor: '#f0fdf4', 
                    border: '1px solid #bbf7d0', 
                    borderRadius: 2, 
                    p: 1.5, 
                    mb: 2 
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Sonraki müsait randevu
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: 16, color: '#10b981' }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                          Bugün {barber.nextAvailable}
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
                      Randevu Al
                    </Button>
                    <IconButton 
                      sx={{ border: 1, borderColor: 'divider' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone />
                    </IconButton>
                    <IconButton 
                      sx={{ border: 1, borderColor: 'divider' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Filter Dialog */}
      <Dialog open={filterDialog} onClose={() => setFilterDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Filtreler
            <IconButton onClick={() => setFilterDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Fiyat Aralığı
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={20}
                max={300}
                marks={[
                  { value: 20, label: '₺20' },
                  { value: 100, label: '₺100' },
                  { value: 200, label: '₺200' },
                  { value: 300, label: '₺300' }
                ]}
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel>Tarih</InputLabel>
              <Select
                value={selectedDate}
                label="Tarih"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <MenuItem value="today">Bugün</MenuItem>
                <MenuItem value="tomorrow">Yarın</MenuItem>
                <MenuItem value="week">Bu Hafta</MenuItem>
                <MenuItem value="any">Herhangi bir zaman</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Özellikler
              </Typography>
              <Stack spacing={1}>
                {['Anında Onay', 'Doğrulanmış Berber', 'Otopark', 'WiFi', 'Kart Ödeme'].map((feature) => (
                  <Box key={feature} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label={feature}
                      variant="outlined"
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

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
            BarberPro
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Ana Sayfa" />
            </ListItem>
            <ListItem button onClick={() => navigate('/dashboard')}>
              <ListItemIcon><Schedule /></ListItemIcon>
              <ListItemText primary="Randevularım" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary="Favorilerim" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary="Profilim" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Bottom Navigation */}
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
            label="Ana Sayfa" 
            icon={<HomeIcon />}
            onClick={() => navigate('/')}
          />
          <BottomNavigationAction 
            label="Randevular" 
            icon={<Schedule />}
            onClick={() => navigate('/dashboard')}
          />
          <BottomNavigationAction 
            label="Favoriler" 
            icon={<Favorite />}
          />
          <BottomNavigationAction 
            label="Profil" 
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
