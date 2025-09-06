import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import {
  ArrowBack,
  ContentCut,
  Schedule,
  Star,
  Phone
} from '@mui/icons-material';

const BarberDashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('tr');

  const t = {
    en: {
      title: 'Barber Portal', today: "Today's Schedule", nextClients: 'Next Clients', call: 'Call', rating: 'Rating'
    },
    tr: {
      title: 'Berber Portalı', today: 'Bugünkü Program', nextClients: 'Sıradaki Müşteriler', call: 'Ara', rating: 'Puan'
    },
    ru: {
      title: 'Портал Барбера', today: 'Сегодняшнее расписание', nextClients: 'Следующие клиенты', call: 'Позвонить', rating: 'Рейтинг'
    }
  }[language];

  const [appointments, setAppointments] = useState([
    { id: 1, client: 'Ali Yılmaz', time: '10:00', service: 'Saç Kesimi', phone: '+90 555 111 22 33' },
    { id: 2, client: 'John Doe', time: '11:00', service: 'Sakal Traşı', phone: '+90 555 444 55 66' }
  ]);

  useEffect(() => {
    // Public preview mode: demo verisi
  }, []);

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                {t.title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small">
                <Select value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                  <MenuItem value="en">🇬🇧 EN</MenuItem>
                  <MenuItem value="tr">🇹🇷 TR</MenuItem>
                  <MenuItem value="ru">🇷🇺 RU</MenuItem>
                </Select>
              </FormControl>
              <Avatar alt="Barber" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {t.today}
                  </Typography>
                  <Chip icon={<Schedule sx={{ color: '#00a693' }} />} label={`${appointments.length}`} sx={{ bgcolor: '#e6f7f5', color: '#00a693', fontWeight: 'bold' }} />
                </Box>

                <List>
                  {appointments.map((a, i) => (
                    <React.Fragment key={a.id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 600 }}>{a.client} • {a.time}</Typography>}
                          secondary={<Typography color="text.secondary">{a.service}</Typography>}
                        />
                        <Button size="small" startIcon={<Phone />} sx={{ color: '#00a693' }}>{t.call}</Button>
                      </ListItem>
                      {i < appointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Ahmet Demir</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Star sx={{ color: '#f59e0b' }} />
                      <Typography variant="body2">4.8 {t.rating}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Button fullWidth variant="contained" startIcon={<ContentCut />} sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}>
                  Randevu Oluştur
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BarberDashboard;
