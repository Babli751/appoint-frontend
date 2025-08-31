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
    const fetchBarbers = async () => {
      try {
        setLoading(true);
        const data = await barberAPI.getBarbers();
        const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        setBarbers(items);
        if (items.length > 0) {
          setSelectedBarberId(items[0].id || items[0]._id || items[0].uuid || '');
        }
      } catch (e) {
        setError(e?.response?.data?.message || e.message || 'Failed to load barbers');
      } finally {
        setLoading(false);
      }
    };
    fetchBarbers();
  }, []);

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

            {!loading && error && (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            {!loading && !error && (
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
