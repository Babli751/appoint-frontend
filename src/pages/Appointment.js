import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AppointmentForm from '../components/AppointmentForm';
import { barberAPI } from '../services/api';
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
  Alert
} from '@mui/material';
import { ArrowBack, ContentCut } from '@mui/icons-material';

const Appointment = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();

  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBarberId, setSelectedBarberId] = useState('');

  useEffect(() => {
    const mockBarbers = () => {
      return [
        { id: 'b1', name: language === 'tr' ? 'Usta Berber' : language === 'ru' ? 'Мастер-барбер' : 'Master Barber' },
        { id: 'b2', name: language === 'tr' ? 'Klasik Berber' : language === 'ru' ? 'Классик барбер' : 'Classic Barber' },
        { id: 'b3', name: language === 'tr' ? 'Premium Berber' : language === 'ru' ? 'Премиум барбер' : 'Premium Barber' }
      ];
    };

    const fetchBarbers = async () => {
      try {
        setLoading(true);
        const data = await barberAPI.getBarbers();
        const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        const normalized = items.map(b => ({
          id: b.id || b._id || b.uuid || String(Math.random()),
          name: b.name || b.full_name || `${b.firstName || b.first_name || ''} ${b.lastName || b.last_name || ''}`.trim() || 'Barber'
        }));
        const finalBarbers = normalized.length > 0 ? normalized : mockBarbers();
        setBarbers(finalBarbers);
        setSelectedBarberId(finalBarbers[0]?.id || '');
        setError('');
      } catch (_) {
        const fallbacks = mockBarbers();
        setBarbers(fallbacks);
        setSelectedBarberId(fallbacks[0]?.id || '');
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchBarbers();
  }, [language]);

  const labels = {
    title: language === 'en' ? 'Make an Appointment' : language === 'tr' ? 'Randevu Al' : 'Записаться',
    selectBarber: language === 'en' ? 'Select Barber' : language === 'tr' ? 'Berber Seçin' : 'Выберите парикмахера'
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
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
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

            {!loading && error && barbers.length === 0 && (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            {!loading && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedBarberId}
                      onChange={(e) => setSelectedBarberId(e.target.value)}
                      displayEmpty
                    >
                      {barbers.map((b) => {
                        const id = b.id || b._id || b.uuid || String(Math.random());
                        const name = b.name || b.full_name || `${b.firstName || b.first_name || ''} ${b.lastName || b.last_name || ''}`.trim() || 'Barber';
                        return (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  {selectedBarberId ? (
                    <AppointmentForm barberId={selectedBarberId} />
                  ) : (
                    <Alert severity="info">{labels.selectBarber}</Alert>
                  )}
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
