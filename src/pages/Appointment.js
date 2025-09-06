import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../services/api';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Chip,
  Stack,
  Grow
} from '@mui/material';
import { ArrowBack, ContentCut } from '@mui/icons-material';

const Appointment = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState('');

  // Barbers fetch
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/barbers/');
        const normalized = data.map(b => ({
          id: b.id,
          name: b.full_name || b.email
        }));
        setBarbers(normalized);
        setSelectedBarberId(normalized[0]?.id || '');
        setError('');
      } catch (error) {
        console.error('Error fetching barbers:', error);
        setBarbers([]);
        setSelectedBarberId('');
        setError('Could not fetch barbers');
      } finally {
        setLoading(false);
      }
    };
    fetchBarbers();
  }, [language]);

  // Services fetch (berber seçildiğinde)
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedBarberId) {
        setServices([]);
        setSelectedServiceId('');
        return;
      }
      try {
        const { data } = await api.get(`/services/?barber_id=${selectedBarberId}`);
        setServices(data);
        setSelectedServiceId(data[0]?.id || '');
      } catch (err) {
        console.error("❌ Error fetching services:", err.response?.data || err.message);
        setServices([]);
        setSelectedServiceId('');
      }
    };
    fetchServices();
  }, [selectedBarberId]);

  const labels = {
    title: language === 'en' ? 'Make an Appointment' : language === 'tr' ? 'Randevu Al' : 'Записаться'
  };

  const handleBook = async () => {
    if (!selectedBarberId || !selectedServiceId || !selectedDate || !selectedTime) {
      alert(language === 'tr' ? "Lütfen tüm alanları doldurun" : "Please fill all fields");
      return;
    }

    try {
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const iso = selectedDateTime.toISOString();

      const payload = {
        barber_id: Number(selectedBarberId),
        service_id: Number(selectedServiceId),
        start_time: iso,
        notes: "Online booking"
      };

      console.log("📤 Booking payload >>>", payload);

      await api.post('/bookings/', payload);
      alert(language === 'tr' ? "Randevu oluşturuldu!" : "Appointment created!");
    } catch (err) {
      console.error("❌ Booking error >>>", err.response?.data || err.message);
      alert(language === 'tr'
        ? "Randevu hatası: " + JSON.stringify(err.response?.data)
        : "Booking error: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" component="div" sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                {t.brand}
              </Typography>
            </Box>
            <FormControl size="small">
              <Select value={language} onChange={(e) => changeLanguage(e.target.value)} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                <MenuItem value="en">🇬🇧 EN</MenuItem>
                <MenuItem value="tr">🇹🇷 TR</MenuItem>
                <MenuItem value="ru">🇷🇺 RU</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <ContentCut sx={{ color: '#00a693' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1f2937' }}>{labels.title}</Typography>
            </Box>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress sx={{ color: '#00a693' }} />
              </Box>
            )}

            {!loading && barbers.length === 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {language === 'en'
                  ? 'No barbers available yet.'
                  : language === 'tr'
                    ? 'Henüz berber yok.'
                    : 'Парикмахеры недоступны.'}
              </Alert>
            )}

            {!loading && (
              <Grid container spacing={3}>
                {/* Barber select */}
                <Grid item xs={12} md={4}>
                  <Grow in timeout={300}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#6b7280' }}>
                        {language === 'en' ? 'Select Barber' : language === 'tr' ? 'Berber Seçin' : 'Выберите парикмахера'}
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={selectedBarberId || ""}
                          onChange={(e) => setSelectedBarberId(e.target.value)}
                        >
                          <MenuItem value="">
                            {language === 'en' ? 'Select Barber' : language === 'tr' ? 'Berber Seçin' : 'Выберите парикмахера'}
                          </MenuItem>
                          {barbers.map((b) => (
                            <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grow>
                </Grid>

                {/* Service select */}
                <Grid item xs={12} md={4}>
                  <Grow in timeout={450}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#6b7280' }}>
                        {language === 'en' ? 'Select Service' : language === 'tr' ? 'Hizmet Seçin' : 'Выберите услугу'}
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={selectedServiceId || ""}
                          onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                        >
                          <MenuItem value="">
                            {language === 'en' ? 'Select Service' : language === 'tr' ? 'Hizmet Seçin' : 'Выберите услугу'}
                          </MenuItem>
                          {services.map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                              {s.name} • €{s.price} ({s.duration} min)
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grow>
                </Grid>

                {/* Date & Time */}
                <Grid item xs={12} md={4}>
                  <Grow in timeout={600}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#6b7280' }}>
                        {language === 'en' ? 'Select Date & Time' : language === 'tr' ? 'Tarih ve Saat Seçin' : 'Выберите дату и время'}
                      </Typography>
                      <TextField
                        type="date"
                        fullWidth
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 1.5 }}
                      />
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {['09:00', '11:00', '14:00', '16:00', '18:00'].map(t => (
                          <Chip
                            key={t}
                            label={t}
                            onClick={() => setSelectedTime(t)}
                            color={selectedTime === t ? 'primary' : 'default'}
                            variant={selectedTime === t ? 'filled' : 'outlined'}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grow>
                </Grid>

                {/* Book button */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}
                      disabled={!selectedBarberId || !selectedServiceId || !selectedDate || !selectedTime}
                      onClick={handleBook}
                    >
                      {language === 'en' ? 'Book' : language === 'tr' ? 'Randevu Al' : 'Забронировать'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Appointment;
