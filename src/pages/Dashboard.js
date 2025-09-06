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
  useMediaQuery
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

        // For now, we'll use empty arrays until backend is implemented
        setUpcomingAppointments([]);
        setPastAppointments([]);
        setFavoriteBarbers([]);

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
                   'Нет прошлых встреч'}
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
      </Container>
    </Box>
  );
};

export default Dashboard;
