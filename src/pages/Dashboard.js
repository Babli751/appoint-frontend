import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
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
  Tabs,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  TextField
} from '@mui/material';
import {
  ArrowBack,
  Schedule,
  Person,
  Star,
  AccessTime,
  LocationOn,
  History,
  Favorite,
  Settings
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [language, setLanguage] = useState('en'); // Default to English

  // Language content
  const content = {
    en: {
      brand: 'BarberPro',
      dashboard: 'Dashboard',
      upcomingAppointments: 'Upcoming Appointments',
      pastAppointments: 'Past Appointments',
      favoriteBarbers: 'Favorite Barbers',
      upcomingAppointment: 'Upcoming Appointment',
      pastAppointment: 'Past Appointment',
      favoriteBarber: 'Favorite Barbers',
      confirmed: 'Confirmed',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
      cancel: 'Cancel',
      details: 'Details',
      reviews: 'reviews',
      visits: 'visits',
      bookAppointment: 'Book Appointment',
      givenRating: 'Given rating',
      writeReview: 'Write Review',
      noUpcomingAppointments: 'No upcoming appointments',
      noUpcomingDescription: 'You have no upcoming appointments',
      bookNow: 'Book Now'
    },
    tr: {
      brand: 'BarberPro',
      dashboard: 'Panelim',
      upcomingAppointments: 'Yaklaşan Randevular',
      pastAppointments: 'Geçmiş Randevular',
      favoriteBarbers: 'Favori Berberler',
      upcomingAppointment: 'Yaklaşan Randevu',
      pastAppointment: 'Geçmiş Randevu',
      favoriteBarber: 'Favori Berber',
      confirmed: 'Onaylandı',
      pending: 'Beklemede',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
      cancel: 'İptal Et',
      details: 'Detaylar',
      reviews: 'yorum',
      visits: 'randevu',
      bookAppointment: 'Randevu Al',
      givenRating: 'Verilen puan',
      writeReview: 'Yorum Yap',
      noUpcomingAppointments: 'Yaklaşan randevunuz bulunmuyor',
      noUpcomingDescription: 'Yaklaşan randevunuz bulunmuyor',
      bookNow: 'Randevu Al'
    },
    ru: {
      brand: 'BarberPro',
      dashboard: 'Панель управления',
      upcomingAppointments: 'Предстоящие записи',
      pastAppointments: 'Прошедшие записи',
      favoriteBarbers: 'Избранные парикмахеры',
      upcomingAppointment: 'Предстоящая запись',
      pastAppointment: 'Прошедшая запись',
      favoriteBarber: 'Избранный парикмахер',
      confirmed: 'Подтверждено',
      pending: 'Ожидание',
      completed: 'Заверш��но',
      cancelled: 'Отменено',
      cancel: 'Отменить',
      details: '��етали',
      reviews: 'отзывов',
      visits: 'визитов',
      bookAppointment: 'Записаться',
      givenRating: 'Данный рейтинг',
      writeReview: 'Написать отзыв',
      noUpcomingAppointments: 'Нет предстоящих записей',
      noUpcomingDescription: 'У вас нет предстоящих записей',
      bookNow: 'Записаться сейчас'
    }
  };

  const t = content[language];

  // State for data fetched from API
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [favoriteBarbers, setFavoriteBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User profile basic info (public preview)
  const [profileInfo] = useState({ fullName: 'Guest User', phone: '+90 5xx xxx xx xx' });
  const [searchCity, setSearchCity] = useState('');
  const demoBarbers = [
    { id: 101, name: 'Ahmet Usta', city: 'Istanbul', rating: 4.8, visits: 122, image: '', shopName: 'Usta Barber' },
    { id: 102, name: 'Mehmet Kaya', city: 'Ankara', rating: 4.6, visits: 88, image: '', shopName: 'Kaya Kuaför' },
    { id: 103, name: 'John Doe', city: 'Istanbul', rating: 4.7, visits: 64, image: '', shopName: 'Downtown Cuts' },
    { id: 104, name: 'Maria Ivanova', city: 'Izmir', rating: 4.9, visits: 140, image: '', shopName: 'Salon Maria' }
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Replace with actual API calls
        // const [upcomingRes, pastRes, favoritesRes] = await Promise.all([
        //   fetch('/api/appointments/upcoming'),
        //   fetch('/api/appointments/past'),
        //   fetch('/api/barbers/favorites')
        // ]);

        // Seed demo data for public preview
        setUpcomingAppointments([
          { id: 1, barberName: 'Ahmet Usta', shopName: 'Usta Barber', service: 'Saç Kesimi', date: '2025-09-07', time: '10:00', address: 'Istanbul', status: 'confirmed', price: '₺300' },
          { id: 2, barberName: 'John Doe', shopName: 'Downtown Cuts', service: 'Haircut', date: '2025-09-08', time: '14:00', address: 'Istanbul', status: 'pending', price: '€25' }
        ]);
        setPastAppointments([
          { id: 3, barberName: 'Mehmet Kaya', shopName: 'Kaya Kuaför', service: 'Sakal Traşı', date: '2025-09-03', time: '16:00', address: 'Ankara', status: 'completed', price: '₺200', rating: 5 },
          { id: 4, barberName: 'Maria Ivanova', shopName: 'Salon Maria', service: 'Haircut', date: '2025-09-01', time: '11:30', address: 'Izmir', status: 'completed', price: '€30', rating: 4 }
        ]);
        setFavoriteBarbers([
          { id: 101, name: 'Ahmet Usta', shopName: 'Usta Barber', rating: 4.8, visits: 122, image: '' },
          { id: 104, name: 'Maria Ivanova', shopName: 'Salon Maria', rating: 4.9, visits: 140, image: '' }
        ]);

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
      case 'confirmed': return t.confirmed;
      case 'pending': return t.pending;
      case 'completed': return t.completed;
      case 'cancelled': return t.cancelled;
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
            {t.dashboard}
          </Typography>
          
          {/* Language Selector */}
          <FormControl size="small" sx={{ minWidth: 100, mr: 2 }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ 
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSvgIcon-root': { color: 'white' }
              }}
            >
              <MenuItem value="en">🇺🇸 EN</MenuItem>
              <MenuItem value="tr">🇹🇷 TR</MenuItem>
              <MenuItem value="ru">🇷🇺 RU</MenuItem>
            </Select>
          </FormControl>
          
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <Person />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 2, md: 3 } }}>
        {/* User Stats */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#6b46c1', color: 'white' }}>
              <Schedule sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                {upcomingAppointments.length}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {t.upcomingAppointment}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fbbf24', color: 'white' }}>
              <History sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                {pastAppointments.length}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {t.pastAppointment}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#10b981', color: 'white' }}>
              <Favorite sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                {favoriteBarbers.length}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {t.favoriteBarber}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
            >
              <Tab label={t.upcomingAppointments} />
              <Tab label={t.pastAppointments} />
              <Tab label={t.favoriteBarbers} />
              <Tab label={language === 'tr' ? 'Profilim' : language === 'en' ? 'Profile' : 'Профиль'} />
              <Tab label={language === 'tr' ? 'Randevularım' : language === 'en' ? 'My Appointments' : 'Мои встречи'} />
              <Tab label={language === 'tr' ? 'Berber Ara' : language === 'en' ? 'Search Barbers' : 'Найти парикмахера'} />
            </Tabs>
          </Box>

          {/* Upcoming Appointments */}
          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1">
                  {language === 'en' ? 'Loading appointments...' :
                   language === 'tr' ? 'Randevular yükleniyor...' :
                   'Загрузка встреч...'}
                </Typography>
              </Box>
            ) : error ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                  {language === 'en' ? 'Failed to load appointments' :
                   language === 'tr' ? 'Randevular yüklenemedi' :
                   'Не удалось загрузить встречи'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                  sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
                >
                  {language === 'en' ? 'Retry' : language === 'tr' ? 'Tekrar Dene' : 'Повторить'}
                </Button>
              </Box>
            ) : upcomingAppointments.length > 0 ? (
              <List>
                {upcomingAppointments.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
                      <ListItemAvatar>
                        <Avatar src={appointment.barberImage} sx={{ width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 } }} />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ ml: { xs: 1, md: 2 } }}
                        primaryTypographyProps={{ component: 'div' }}
                        secondaryTypographyProps={{ component: 'div' }}
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                              {appointment.barberName}
                            </Typography>
                            <Chip
                              label={getStatusText(appointment.status)}
                              sx={{
                                bgcolor: getStatusColor(appointment.status),
                                color: 'white',
                                fontWeight: 'bold',
                                mt: { xs: 1, sm: 0 }
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Stack spacing={1}>
                            <Typography variant="body2" component="span" color="text.secondary">
                              {appointment.shopName}
                            </Typography>
                            <Typography variant="body1" component="span" sx={{ fontWeight: 'medium' }}>
                              {appointment.service}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTime sx={{ fontSize: 16, mr: 0.5, color: '#6b46c1' }} />
                                <Typography variant="body2" component="span">
                                  {appointment.date} - {appointment.time}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#6b46c1' }} />
                                <Typography variant="body2" component="span">
                                  {appointment.address}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                              <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: '#6b46c1', mb: { xs: 1, sm: 0 } }}>
                                {appointment.price}
                              </Typography>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{ color: '#ef4444', borderColor: '#ef4444' }}
                                  fullWidth={isMobile}
                                >
                                  {t.cancel}
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{ bgcolor: '#6b46c1' }}
                                  onClick={() => navigate('/barber-dashboard')}
                                  fullWidth={isMobile}
                                >
                                  {t.details}
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
                  {t.noUpcomingAppointments}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/')}
                  sx={{ bgcolor: '#6b46c1' }}
                >
                  {t.bookNow}
                </Button>
              </Box>
            )}
          </TabPanel>

          {/* Past Appointments */}
          <TabPanel value={tabValue} index={1}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1">
                  {language === 'en' ? 'Loading past appointments...' :
                   language === 'tr' ? 'Geçmiş randevular yükleniyor...' :
                   'Загрузка прошлых встреч...'}
                </Typography>
              </Box>
            ) : error ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                  {language === 'en' ? 'Failed to load past appointments' :
                   language === 'tr' ? 'Geçmiş randevular yüklenemedi' :
                   'Не удалось загрузить прошлые встречи'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                  sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
                >
                  {language === 'en' ? 'Retry' : language === 'tr' ? 'Tekrar Dene' : 'Повторить'}
                </Button>
              </Box>
            ) : pastAppointments.length > 0 ? (
            <List>
              {pastAppointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  <ListItem sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar src={appointment.barberImage} sx={{ width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 } }} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ ml: { xs: 1, md: 2 } }}
                      primaryTypographyProps={{ component: 'div' }}
                      secondaryTypographyProps={{ component: 'div' }}
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                            {appointment.barberName}
                          </Typography>
                          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: '#6b46c1', mt: { xs: 1, sm: 0 } }}>
                            {appointment.price}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Stack spacing={1}>
                          <Typography variant="body2" component="span" color="text.secondary">
                            {appointment.shopName}
                          </Typography>
                          <Typography variant="body1" component="span" sx={{ fontWeight: 'medium' }}>
                            {appointment.service}
                          </Typography>
                          <Typography variant="body2" component="span">
                            {appointment.date} - {appointment.time}
                          </Typography>
                          {appointment.rating && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                              <Typography variant="body2" component="span">{t.givenRating}:</Typography>
                              <Star sx={{ color: '#fbbf24', fontSize: 16 }} />
                              <Typography variant="body2" component="span">{appointment.rating}/5</Typography>
                              {!appointment.reviewed && (
                                <Button size="small" sx={{ ml: 'auto', color: '#6b46c1' }}>
                                  {t.writeReview}
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
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {language === 'en' ? 'No past appointments' :
                   language === 'tr' ? 'Geçmiş randevu bulunamadı' :
                   'Нет прошлы�� встреч'}
                </Typography>
              </Box>
            )}
          </TabPanel>

          {/* Favorite Barbers */}
          <TabPanel value={tabValue} index={2}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1">
                  {language === 'en' ? 'Loading favorite barbers...' :
                   language === 'tr' ? 'Favori berberler yükleniyor...' :
                   'Загрузка любимых парикмахеров...'}
                </Typography>
              </Box>
            ) : error ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                  {language === 'en' ? 'Failed to load favorite barbers' :
                   language === 'tr' ? 'Favori berberler yüklenemedi' :
                   'Не удалось загрузить любимых парикмахеров'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                  sx={{ color: '#6b46c1', borderColor: '#6b46c1' }}
                >
                  {language === 'en' ? 'Retry' : language === 'tr' ? 'Tekrar Dene' : 'Повторить'}
                </Button>
              </Box>
            ) : favoriteBarbers.length > 0 ? (
            <List>
              {favoriteBarbers.map((barber, index) => (
                <React.Fragment key={barber.id}>
                  <ListItem sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar src={barber.image} sx={{ width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 } }} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ ml: { xs: 1, md: 2 } }}
                      primaryTypographyProps={{ component: 'div' }}
                      secondaryTypographyProps={{ component: 'div' }}
                      primary={
                        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                          {barber.name}
                        </Typography>
                      }
                      secondary={
                        <Stack spacing={1}>
                          <Typography variant="body2" component="span" color="text.secondary">
                            {barber.shopName}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Star sx={{ color: '#fbbf24', fontSize: 16, mr: 0.5 }} />
                              <Typography variant="body2" component="span">{barber.rating}</Typography>
                            </Box>
                            <Typography variant="body2" component="span">
                              {barber.visits} {t.visits}
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              bgcolor: '#6b46c1',
                              mt: 1,
                              alignSelf: { xs: 'stretch', sm: 'flex-start' }
                            }}
                            onClick={() => navigate('/barber-dashboard')}
                            fullWidth={isMobile}
                          >
                            {t.bookAppointment}
                          </Button>
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < favoriteBarbers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {language === 'en' ? 'No favorite barbers' :
                   language === 'tr' ? 'Favori berber bulunamadı' :
                   'Нет любимых парикмахеров'}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{ bgcolor: '#6b46c1' }}
                >
                  {language === 'en' ? 'Find Barbers' : language === 'tr' ? 'Berber Bul' : 'Найти парикмахеров'}
                </Button>
              </Box>
            )}
          </TabPanel>
        </Card>

        {/* Profile Tab */}
        <Card sx={{ mt: 3 }}>
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Avatar sx={{ width: 64, height: 64 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{profileInfo.fullName}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2">{language === 'tr' ? 'Telefon' : language === 'en' ? 'Phone' : 'Телефон'}:</Typography>
                          <Typography variant="body2">{profileInfo.phone}</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {language === 'tr' ? 'Geçmiş Randevular' : language === 'en' ? 'Past Appointments' : 'Прошлые записи'}
                    </Typography>
                    <List>
                      {pastAppointments.map((a, idx) => (
                        <React.Fragment key={a.id}>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText primary={`${a.date} • ${a.time} — ${a.barberName}`} secondary={a.service} />
                          </ListItem>
                          {idx < pastAppointments.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>

        {/* My Appointments Tab */}
        <Card sx={{ mt: 3 }}>
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {language === 'tr' ? 'Yaklaşan' : language === 'en' ? 'Upcoming' : 'Предстоящие'}
                    </Typography>
                    <List>
                      {upcomingAppointments.map((a, idx) => (
                        <React.Fragment key={a.id}>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText primary={`${a.date} • ${a.time} — ${a.barberName}`} secondary={a.service} />
                            <Chip label={language === 'tr' ? 'Yaklaşan' : 'upcoming'} size="small" sx={{ bgcolor: '#e6f7f5', color: '#00a693', fontWeight: 'bold' }} />
                          </ListItem>
                          {idx < upcomingAppointments.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {language === 'tr' ? 'Geçmiş' : language === 'en' ? 'Past' : 'Прошлые'}
                    </Typography>
                    <List>
                      {pastAppointments.map((a, idx) => (
                        <React.Fragment key={a.id}>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemText primary={`${a.date} • ${a.time} — ${a.barberName}`} secondary={a.service} />
                          </ListItem>
                          {idx < pastAppointments.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>

        {/* Search Barbers Tab */}
        <Card sx={{ mt: 3 }}>
          <TabPanel value={tabValue} index={5}>
            <Card>
              <Box sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                  <TextField fullWidth label={language === 'tr' ? 'Şehir' : language === 'en' ? 'City' : 'Город'} value={searchCity} onChange={(e) => setSearchCity(e.target.value)} InputProps={{ startAdornment: <LocationOn sx={{ color: '#6b46c1', mr: 1 }} /> }} />
                  <Button variant="contained" sx={{ bgcolor: '#6b46c1' }}>
                    {language === 'tr' ? 'Ara' : language === 'en' ? 'Search' : 'Поиск'}
                  </Button>
                </Stack>
                <Grid container spacing={2}>
                  {demoBarbers.filter(b => !searchCity || b.city.toLowerCase().includes(searchCity.toLowerCase())).map((b) => (
                    <Grid item xs={12} sm={6} md={4} key={b.id}>
                      <Card>
                        <Box sx={{ p: 2 }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <ListItemAvatar>
                              <Avatar src={b.image} />
                            </ListItemAvatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{b.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{b.shopName} • {b.city}</Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Star sx={{ color: '#f59e0b', fontSize: 18 }} />
                                <Typography variant="body2">{b.rating} • {b.visits}</Typography>
                              </Stack>
                            </Box>
                          </Stack>
                          <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#6b46c1' }} onClick={() => navigate('/barber-dashboard')}>
                            {language === 'tr' ? 'Berber Profiline Git' : language === 'en' ? 'View Barber Profile' : 'К профилю парикмахера'}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Card>
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
