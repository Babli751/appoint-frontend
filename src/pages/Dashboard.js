import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
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
  InputLabel,
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
  Phone,
  History,
  Favorite,
  Settings,
  Language
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

  const upcomingAppointments = [
    {
      id: 1,
      barberName: language === 'en' ? 'Alexander Smith' : language === 'tr' ? 'Alexander Smith' : 'Александр Смит',
      shopName: language === 'en' ? 'Elite Barber Shop' : language === 'tr' ? 'Elite Berber Salonu' : 'Элитная Парикмахерская',
      service: language === 'en' ? 'Haircut + Beard' : language === 'tr' ? 'Saç Kesimi + Sakal' : 'Стрижка + Борода',
      date: language === 'en' ? 'January 15, 2024' : language === 'tr' ? '15 Ocak 2024' : '15 января 2024',
      time: '14:30',
      price: '€35',
      status: 'confirmed',
      barberImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      address: language === 'en' ? 'Çankaya District, Atatürk Street' : language === 'tr' ? 'Çankaya Mahallesi, Atatürk Caddesi' : 'Район Чанкая, улица Ататюр��'
    },
    {
      id: 2,
      barberName: language === 'en' ? 'Marco Rossi' : language === 'tr' ? 'Marco Rossi' : 'Марко Росси',
      shopName: language === 'en' ? 'Modern Style Studio' : language === 'tr' ? 'Modern Stil Stüdyosu' : 'Современная Студия Стиля',
      service: language === 'en' ? 'Haircut' : language === 'tr' ? 'Saç Kesimi' : 'Стрижка',
      date: language === 'en' ? 'January 18, 2024' : language === 'tr' ? '18 Ocak 2024' : '18 января 2024',
      time: '16:00',
      price: '€25',
      status: 'pending',
      barberImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      address: language === 'en' ? 'Kızılay District, Atatürk Boulevard' : language === 'tr' ? 'Kızılay Mahallesi, Atatürk Bulvarı' : 'Райо�� Кызылай, бульвар Ататюрк'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      barberName: language === 'en' ? 'Giovanni Costa' : language === 'tr' ? 'Giovanni Costa' : 'Джованни Коста',
      shopName: language === 'en' ? 'Classic Barber' : language === 'tr' ? 'Klasik Berber' : 'Классическая Пари��махерская',
      service: language === 'en' ? 'Beard Trim + Massage' : language === 'tr' ? 'Sakal Tıraşı + Masaj' : 'Стрижка бороды + Массаж',
      date: language === 'en' ? 'January 10, 2024' : language === 'tr' ? '10 Ocak 2024' : '10 января 2024',
      time: '15:30',
      price: '€30',
      status: 'completed',
      barberImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      reviewed: true
    },
    {
      id: 4,
      barberName: language === 'en' ? 'Alexander Smith' : language === 'tr' ? 'Alexander Smith' : 'Александр Смит',
      shopName: language === 'en' ? 'Elite Barber Shop' : language === 'tr' ? 'Elite Berber Salonu' : 'Элитная Парикмахерская',
      service: language === 'en' ? 'Haircut' : language === 'tr' ? 'Saç Kesimi' : 'Стрижка',
      date: language === 'en' ? 'January 5, 2024' : language === 'tr' ? '5 Ocak 2024' : '5 января 2024',
      time: '11:00',
      price: '€22',
      status: 'completed',
      barberImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 4,
      reviewed: false
    }
  ];

  const favoriteBarbers = [
    {
      id: 1,
      name: language === 'en' ? 'Alexander Smith' : language === 'tr' ? 'Alexander Smith' : 'Александр Смит',
      shopName: language === 'en' ? 'Elite Barber Shop' : language === 'tr' ? 'Elite Berber Salonu' : 'Элитная Парикмахерская',
      rating: 4.8,
      visits: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      id: 3,
      name: language === 'en' ? 'Giovanni Costa' : language === 'tr' ? 'Giovanni Costa' : 'Джованни Коста',
      shopName: language === 'en' ? 'Classic Barber' : language === 'tr' ? 'Klasik Berber' : 'Классическая Парикмахерская',
      rating: 4.7,
      visits: 3,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face'
    }
  ];

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
            {upcomingAppointments.length > 0 ? (
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
                                  onClick={() => navigate(`/barber/${appointment.barberId}`)}
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
          </TabPanel>

          {/* Favorite Barbers */}
          <TabPanel value={tabValue} index={2}>
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
                            onClick={() => navigate(`/barber/${barber.id}`)}
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
          </TabPanel>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
