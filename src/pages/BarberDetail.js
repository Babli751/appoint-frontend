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
  MenuItem
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Phone,
  Star,
  AccessTime,
  CheckCircle,
  Schedule,
  Person
} from '@mui/icons-material';

const BarberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [appointmentDialog, setAppointmentDialog] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const barber = {
    id: 1,
    name: 'Mehmet Kaya',
    shopName: 'Elite Barber Shop',
    rating: 4.8,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    about: 'Berberlik mesleğinde 15 yıllık deneyime sahip. Modern saç kesimleri ve klasik tıraş konularında uzman.',
    address: 'Çankaya Mahallesi, Atatürk Caddesi No:15/A, Çankaya/Ankara',
    phone: '+90 312 123 45 67',
    workingHours: {
      'Pazartesi - Cuma': '09:00 - 20:00',
      'Cumartesi': '09:00 - 18:00',
      'Pazar': 'Kapalı'
    },
    services: [
      { name: 'Klasik Saç Kesimi', duration: '30 dk', price: '₺80' },
      { name: 'Modern Saç Kesimi', duration: '45 dk', price: '₺100' },
      { name: 'Sakal Tıraşı', duration: '20 dk', price: '₺50' },
      { name: 'Saç + Sakal', duration: '50 dk', price: '₺120' },
      { name: 'Yıkama + Fön', duration: '25 dk', price: '₺40' },
      { name: 'Cilt Bakımı', duration: '40 dk', price: '₺150' }
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
        date: '2 gün önce',
        comment: 'Harika bir deneyim! Mehmet usta çok profesyonel ve işini iyi biliyor.'
      },
      {
        id: 2,
        name: 'Burak Demir',
        rating: 5,
        date: '1 hafta önce',
        comment: 'Her zaman mükemmel hizmet. Kesinlikle tavsiye ederim.'
      },
      {
        id: 3,
        name: 'Emre Kaya',
        rating: 4,
        date: '2 hafta önce',
        comment: 'Çok memnun kaldım, fiyatlar da uygun.'
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
      alert(`Randevu başarıyla oluşturuldu!\nHizmet: ${selectedService}\nTarih: ${selectedDate}\nSaat: ${selectedTime}`);
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
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Berber Detayı
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 3 }}>
        {/* Barber Info Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Avatar
                  src={barber.image}
                  sx={{ width: 150, height: 150, mx: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {barber.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {barber.shopName}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={barber.rating} precision={0.1} readOnly />
                  <Typography sx={{ ml: 1, fontWeight: 'bold' }}>
                    {barber.rating}
                  </Typography>
                  <Typography color="text.secondary" sx={{ ml: 1 }}>
                    ({barber.reviewCount} yorum)
                  </Typography>
                </Box>

                <Typography paragraph color="text.secondary">
                  {barber.about}
                </Typography>

                <Stack spacing={1}>
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
                  sx={{ 
                    mt: 3,
                    bgcolor: '#6b46c1',
                    fontWeight: 'bold',
                    px: 4,
                    '&:hover': { bgcolor: '#553c9a' }
                  }}
                  onClick={() => setAppointmentDialog(true)}
                >
                  Randevu Al
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Hizmetler" />
              <Tab label="Çalışma Saatleri" />
              <Tab label="Yorumlar" />
              <Tab label="Galeri" />
            </Tabs>
          </Box>

          {/* Services Tab */}
          <TabPanel value={tabValue} index={0}>
            <List>
              {barber.services.map((service, index) => (
                <React.Fragment key={index}>
                  <ListItem>
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
                <ListItem key={day}>
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
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
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
                    alt={`Galeri ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 200,
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
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Randevu Al - {barber.name}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Hizmet Seçin</InputLabel>
              <Select
                value={selectedService}
                label="Hizmet Seçin"
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
              <InputLabel>Tarih Seçin</InputLabel>
              <Select
                value={selectedDate}
                label="Tarih Seçin"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <MenuItem value="2024-01-15">Bugün (15 Ocak)</MenuItem>
                <MenuItem value="2024-01-16">Yarın (16 Ocak)</MenuItem>
                <MenuItem value="2024-01-17">17 Ocak</MenuItem>
                <MenuItem value="2024-01-18">18 Ocak</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Saat Seçin</InputLabel>
              <Select
                value={selectedTime}
                label="Saat Seçin"
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
            İptal
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBookAppointment}
            sx={{ 
              bgcolor: '#6b46c1',
              '&:hover': { bgcolor: '#553c9a' }
            }}
          >
            Randevu Oluştur
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BarberDetail;
