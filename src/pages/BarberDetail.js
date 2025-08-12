import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Tabs,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Phone,
  Star,
  AccessTime,
  Language
} from '@mui/icons-material';

const BarberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [appointmentDialog, setAppointmentDialog] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [language, setLanguage] = useState('en'); // Default to English

  // Language content
  const content = {
    en: {
      brand: 'BarberPro',
      barberDetail: 'Barber Detail',
      services: 'Services',
      workingHours: 'Working Hours',
      reviews: 'Reviews',
      gallery: 'Gallery',
      bookAppointment: 'Book Appointment',
      selectService: 'Select Service',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      createAppointment: 'Create Appointment',
      cancel: 'Cancel',
      today: 'Today (January 15)',
      tomorrow: 'Tomorrow (January 16)',
      reviews: 'reviews',
      duration: 'duration',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      daysAgo: 'days ago',
      weekAgo: 'week ago',
      weeksAgo: 'weeks ago'
    },
    tr: {
      brand: 'BarberPro',
      barberDetail: 'Berber Detayı',
      services: 'Hizmetler',
      workingHours: 'Çalışma Saatleri',
      reviews: 'Yorumlar',
      gallery: 'Galeri',
      bookAppointment: 'Randevu Al',
      selectService: 'Hizmet Seçin',
      selectDate: 'Tarih Seçin',
      selectTime: 'Saat Seçin',
      createAppointment: 'Randevu Oluştur',
      cancel: 'İptal',
      today: 'Bugün (15 Ocak)',
      tomorrow: 'Yarın (16 Ocak)',
      reviews: 'yorum',
      duration: 'süre',
      mondayFriday: 'Pazartesi - Cuma',
      saturday: 'Cumartesi',
      sunday: 'Pazar',
      closed: 'Kapalı',
      daysAgo: 'gün önce',
      weekAgo: 'hafta önce',
      weeksAgo: 'hafta önce'
    },
    ru: {
      brand: 'BarberPro',
      barberDetail: 'Детали парикмахера',
      services: 'Услуги',
      workingHours: 'Рабочие часы',
      reviews: 'Отзывы',
      gallery: 'Галерея',
      bookAppointment: 'Записаться',
      selectService: 'Выберите услугу',
      selectDate: 'Выберите дату',
      selectTime: 'Выберите время',
      createAppointment: 'Создать запись',
      cancel: 'Отмена',
      today: 'Сегодня (15 января)',
      tomorrow: 'Завтра (16 января)',
      reviews: 'отзывов',
      duration: 'продолжительность',
      mondayFriday: 'Понедельник - Пят��ица',
      saturday: 'Суббота',
      sunday: 'Воскресенье',
      closed: 'Закрыто',
      daysAgo: 'дней назад',
      weekAgo: 'неделю назад',
      weeksAgo: 'недель назад'
    }
  };

  const t = content[language];

  const barber = {
    id: 1,
    name: 'Mehmet Kaya',
    shopName: 'Elite Barber Shop',
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    about: language === 'en' 
      ? '15 years of experience in barbering. Expert in modern haircuts and classic shaves.'
      : language === 'tr'
      ? 'Berberlik mesleğinde 15 yıllık deneyime sahip. Modern saç kesimleri ve klasik tıraş konularında uzman.'
      : '15 лет опыта в парикмахерском деле. Эксперт по современным стрижкам и классическому бритью.',
    address: language === 'en'
      ? 'Çankaya District, Atatürk Street No:15/A, Çankaya/Ankara'
      : language === 'tr'
      ? 'Çankaya Mahallesi, Atatürk Caddesi No:15/A, Çankaya/Ankara'
      : 'Район Чанкая, улица Ататюрк №15/A, Чанкая/Анкара',
    phone: '+90 312 123 45 67',
    workingHours: {
      [t.mondayFriday]: '09:00 - 20:00',
      [t.saturday]: '09:00 - 18:00',
      [t.sunday]: t.closed
    },
    services: [
      { 
        name: language === 'en' ? 'Classic Haircut' : language === 'tr' ? 'Klasik Saç Kesimi' : 'Классическая стрижка', 
        duration: '30 ' + (language === 'en' ? 'min' : language === 'tr' ? 'dk' : 'мин'), 
        price: '₺80' 
      },
      { 
        name: language === 'en' ? 'Modern Haircut' : language === 'tr' ? 'Modern Saç Kesimi' : 'Современная стрижка', 
        duration: '45 ' + (language === 'en' ? 'min' : language === 'tr' ? 'dk' : 'мин'), 
        price: '₺100' 
      },
      { 
        name: language === 'en' ? 'Beard Trim' : language === 'tr' ? 'Sakal Tıraşı' : 'Стрижка бороды', 
        duration: '20 ' + (language === 'en' ? 'min' : language === 'tr' ? 'dk' : 'мин'), 
        price: '₺50' 
      },
      { 
        name: language === 'en' ? 'Hair + Beard' : language === 'tr' ? 'Saç + Sakal' : 'Стрижка + Борода', 
        duration: '50 ' + (language === 'en' ? 'min' : language === 'tr' ? 'dk' : 'мин'), 
        price: '₺120' 
      },
      { 
        name: language === 'en' ? 'Wash + Blow dry' : language === 'tr' ? 'Yıkama + Fön' : 'Мытье + Сушка', 
        duration: '25 ' + (language === 'en' ? 'min' : language === 'tr' ? 'dk' : 'мин'), 
        price: '₺40' 
      },
      { 
        name: language === 'en' ? 'Skin Care' : language === 'tr' ? 'Cilt Bakımı' : 'Уход за кожей', 
        duration: '40 ' + (language === 'en' ? 'min' : language === 'tr' ? 'dk' : 'мин'), 
        price: '₺150' 
      }
    ],
    availableTimes: [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
    ],
    reviews: [
      {
        id: 1,
        name: 'Ali Yılmaz',
        rating: 5,
        date: language === 'en' ? '2 days ago' : language === 'tr' ? '2 gün önce' : '2 дня назад',
        comment: language === 'en' 
          ? 'Great experience! Mehmet is very professional and knows his job well.'
          : language === 'tr'
          ? 'Harika bir deneyim! Mehmet usta çok profesyonel ve işini iyi biliyor.'
          : 'Отличный опыт! Мехмет очень профессионален и хорошо знает свое дело.'
      },
      {
        id: 2,
        name: 'Burak Demir',
        rating: 5,
        date: language === 'en' ? '1 week ago' : language === 'tr' ? '1 hafta önce' : '1 неделю назад',
        comment: language === 'en'
          ? 'Always perfect service. I definitely recommend it.'
          : language === 'tr'
          ? 'Her zaman mükemmel hizmet. Kesinlikle tavsiye ederim.'
          : 'Всегда идеальный сервис. Определенно рекомендую.'
      },
      {
        id: 3,
        name: 'Emre Kaya',
        rating: 4,
        date: language === 'en' ? '2 weeks ago' : language === 'tr' ? '2 hafta önce' : '2 недели назад',
        comment: language === 'en'
          ? 'Very satisfied, prices are also reasonable.'
          : language === 'tr'
          ? 'Çok memnun kaldım, fiyatlar da uygun.'
          : 'Очень доволен, цены тоже разумные.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1622034409709-bb8e94e6d9c7?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=300&h=200&fit=crop'
    ]
  };

  const handleBookAppointment = () => {
    if (selectedService && selectedDate && selectedTime) {
      const successMessage = language === 'en' 
        ? `Appointment successfully created!\nService: ${selectedService}\nDate: ${selectedDate}\nTime: ${selectedTime}`
        : language === 'tr'
        ? `Randevu başarıyla oluşturuldu!\nHizmet: ${selectedService}\nTarih: ${selectedDate}\nSaat: ${selectedTime}`
        : `Запись успешно создана!\nУслуга: ${selectedService}\nДата: ${selectedDate}\nВремя: ${selectedTime}`;
      
      alert(successMessage);
      setAppointmentDialog(false);
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
      <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Container>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            py: 2 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {t.barberDetail}
              </Typography>
            </Box>
            
            {/* Language Selector */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }}
              >
                <MenuItem value="en">🇺🇸 EN</MenuItem>
                <MenuItem value="tr">🇹🇷 TR</MenuItem>
                <MenuItem value="ru">🇷🇺 RU</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 3 }}>
        {/* Barber Info Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={barber.image}
                    sx={{ 
                      width: { xs: 120, md: 150 }, 
                      height: { xs: 120, md: 150 }, 
                      mx: 'auto' 
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '2.125rem' },
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  {barber.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ 
                  mb: 2,
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  {barber.shopName}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Rating value={barber.rating} precision={0.1} readOnly />
                  <Typography sx={{ ml: 1, fontWeight: 'bold' }}>
                    {barber.rating}
                  </Typography>
                  <Typography color="text.secondary" sx={{ ml: 1 }}>
                    ({barber.reviewCount} {t.reviews})
                  </Typography>
                </Box>

                <Typography paragraph color="text.secondary" sx={{
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                  {barber.about}
                </Typography>

                <Stack spacing={1} sx={{ 
                  alignItems: { xs: 'center', md: 'flex-start' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, color: '#6b46c1' }} />
                    <Typography variant="body2">{barber.address}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1, color: '#6b46c1' }} />
                    <Typography variant="body2">{barber.phone}</Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth={isMobile}
                  sx={{ 
                    mt: 3,
                    bgcolor: '#6b46c1',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    alignSelf: { xs: 'center', md: 'flex-start' },
                    '&:hover': { bgcolor: '#553c9a' }
                  }}
                  onClick={() => setAppointmentDialog(true)}
                >
                  {t.bookAppointment}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
            >
              <Tab label={t.services} />
              <Tab label={t.workingHours} />
              <Tab label={t.reviews} />
              <Tab label={t.gallery} />
            </Tabs>
          </Box>

          {/* Services Tab */}
          <TabPanel value={tabValue} index={0}>
            <List>
              {barber.services.map((service, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: { xs: 1, md: 2 } }}>
                    <ListItemText
                      primary={service.name}
                      secondary={service.duration}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6b46c1' }}>
                      {service.price}
                    </Typography>
                  </ListItem>
                  {index < barber.services.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </TabPanel>

          {/* Working Hours Tab */}
          <TabPanel value={tabValue} index={1}>
            <List>
              {Object.entries(barber.workingHours).map(([day, hours]) => (
                <ListItem key={day} sx={{ px: { xs: 1, md: 2 } }}>
                  <ListItemText
                    primary={day}
                    secondary={hours}
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>

          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              {barber.reviews.map((review) => (
                <Box key={review.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: '#6b46c1' }}>
                      {review.name[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {review.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 0, sm: 1 }, mt: { xs: 0.5, sm: 0 } }}>
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 0, md: 7 } }}>
                    {review.comment}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          </TabPanel>

          {/* Gallery Tab */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2}>
              {barber.gallery.map((image, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`${t.gallery} ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: { xs: 150, md: 200 },
                      objectFit: 'cover',
                      borderRadius: 2
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Card>
      </Container>

      {/* Appointment Dialog */}
      <Dialog 
        open={appointmentDialog} 
        onClose={() => setAppointmentDialog(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {t.bookAppointment} - {barber.name}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>{t.selectService}</InputLabel>
              <Select
                value={selectedService}
                label={t.selectService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {barber.services.map((service) => (
                  <MenuItem key={service.name} value={service.name}>
                    {service.name} - {service.price} ({service.duration})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>{t.selectDate}</InputLabel>
              <Select
                value={selectedDate}
                label={t.selectDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <MenuItem value="2024-01-15">{t.today}</MenuItem>
                <MenuItem value="2024-01-16">{t.tomorrow}</MenuItem>
                <MenuItem value="2024-01-17">
                  {language === 'en' ? 'January 17' : language === 'tr' ? '17 Ocak' : '17 января'}
                </MenuItem>
                <MenuItem value="2024-01-18">
                  {language === 'en' ? 'January 18' : language === 'tr' ? '18 Ocak' : '18 января'}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>{t.selectTime}</InputLabel>
              <Select
                value={selectedTime}
                label={t.selectTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {barber.availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setAppointmentDialog(false)}>
            {t.cancel}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBookAppointment}
            sx={{ 
              bgcolor: '#6b46c1',
              '&:hover': { bgcolor: '#553c9a' }
            }}
          >
            {t.createAppointment}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BarberDetail;
