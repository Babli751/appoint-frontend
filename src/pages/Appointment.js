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

  const addDays = (dateStr, days) => {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };
  const formatDayLabel = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'tr' ? 'tr-TR' : 'en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  const timeSlots = React.useMemo(() => {
    const slots = [];
    let h = 9, m = 0; // 09:00 - 19:00
    while (h < 19 || (h === 19 && m === 0)) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      slots.push(`${hh}:${mm}`);
      m += 30;
      if (m >= 60) { m = 0; h += 1; }
    }
    return slots;
  }, []);
  const weekDays = React.useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i)), [selectedDate]);

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
                <Grid item xs={12} md={8}>
                  <Grow in timeout={600}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#6b7280' }}>
                        {language === 'en' ? 'Select Date & Time' : language === 'tr' ? 'Tarih ve Saat Seçin' : 'Выберите дату и время'}
                      </Typography>

                      {/* Week day scroller */}
                      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, mb: 2 }}>
                        {weekDays.map((d) => (
                          <Button
                            key={d}
                            variant={selectedDate === d ? 'contained' : 'outlined'}
                            onClick={() => { setSelectedDate(d); setSelectedTime(''); }}
                            sx={{
                              whiteSpace: 'nowrap',
                              bgcolor: selectedDate === d ? '#00a693' : 'transparent',
                              color: selectedDate === d ? 'white' : '#1f2937',
                              borderColor: '#00a693',
                              '&:hover': { bgcolor: selectedDate === d ? '#007562' : '#e6f7f5' }
                            }}
                          >
                            {formatDayLabel(d)}
                          </Button>
                        ))}
                      </Stack>

                      {/* Time grid */}
                      <Grid container spacing={1} columns={{ xs: 12, sm: 12, md: 12 }}>
                        {timeSlots.map((t) => (
                          <Grid key={t} item xs={4} sm={3} md={2}>
                            <Button
                              fullWidth
                              variant={selectedTime === t ? 'contained' : 'outlined'}
                              onClick={() => setSelectedTime(t)}
                              sx={{
                                bgcolor: selectedTime === t ? '#00a693' : 'white',
                                color: selectedTime === t ? 'white' : '#1f2937',
                                borderColor: selectedTime === t ? '#00a693' : '#e5e7eb',
                                fontWeight: 600
                              }}
                            >
                              {t}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grow>
                </Grid>

                {/* Selected date preview */}
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: '#6b7280', mb: 1 }}>
                        {language === 'en' ? 'Selection' : language === 'tr' ? 'Seçim' : 'Выбор'}
                      </Typography>
                      <Stack spacing={1}>
                        <TextField
                          type="date"
                          label={language === 'en' ? 'Date' : language === 'tr' ? 'Tarih' : 'Дата'}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label={language === 'en' ? 'Time' : language === 'tr' ? 'Saat' : 'Время'}
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          placeholder="--:--"
                        />
                      </Stack>
                    </CardContent>
                  </Card>
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
