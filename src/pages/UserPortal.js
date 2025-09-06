import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Toolbar
} from '@mui/material';
import {
  ArrowBack,
  Schedule,
  Person,
  Phone,
  LocationOn,
  Star
} from '@mui/icons-material';

const demoAppointments = [
  { id: 1, date: '2025-09-06', time: '10:00', barber: 'Ahmet Usta', service: 'Saç Kesimi', status: 'upcoming' },
  { id: 2, date: '2025-09-05', time: '14:00', barber: 'Mehmet Kaya', service: 'Sakal Traşı', status: 'past' },
  { id: 3, date: '2025-09-03', time: '16:00', barber: 'John Doe', service: 'Haircut', status: 'past' }
];

const demoBarbers = [
  { id: 101, name: 'Ahmet Usta', city: 'Istanbul', rating: 4.8, visits: 122, image: '', shopName: 'Usta Barber' },
  { id: 102, name: 'Mehmet Kaya', city: 'Ankara', rating: 4.6, visits: 88, image: '', shopName: 'Kaya Kuaför' },
  { id: 103, name: 'John Doe', city: 'Istanbul', rating: 4.7, visits: 64, image: '', shopName: 'Downtown Cuts' },
  { id: 104, name: 'Maria Ivanova', city: 'Izmir', rating: 4.9, visits: 140, image: '', shopName: 'Salon Maria' }
];

const UserPortal = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('tr');
  const [tab, setTab] = useState(0);
  const [city, setCity] = useState('');

  const t = useMemo(() => ({
    en: {
      title: 'User Profile',
      tabs: ['Profile', 'My Appointments', 'Search Barbers'],
      name: 'Full Name', phone: 'Phone', past: 'Past Appointments', upcoming: 'Upcoming', past2: 'Past', search: 'Search', city: 'City', viewProfile: 'View Barber Profile',
    },
    tr: {
      title: 'Kullanıcı Profili',
      tabs: ['Profilim', 'Randevularım', 'Berber Ara'],
      name: 'İsim', phone: 'Telefon', past: 'Geçmiş Randevular', upcoming: 'Yaklaşan', past2: 'Geçmiş', search: 'Ara', city: 'Şehir', viewProfile: 'Berber Profiline Git',
    },
    ru: {
      title: 'Профиль пользователя',
      tabs: ['Профиль', 'Мои встречи', 'Найти парикмахера'],
      name: 'Имя', phone: 'Телефон', past: 'Прошлые встречи', upcoming: 'Предстоящие', past2: 'Прошлые', search: 'Поиск', city: 'Город', viewProfile: 'К профилю парикмахера',
    }
  })[language], [language]);

  const [profile, setProfile] = useState({ fullName: 'Guest User', phone: '+90 5xx xxx xx xx' });

  const upcoming = demoAppointments.filter(a => a.status === 'upcoming');
  const past = demoAppointments.filter(a => a.status === 'past');

  const filteredBarbers = demoBarbers.filter(b => !city || b.city.toLowerCase().includes(city.toLowerCase()));

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/')}> <ArrowBack /> </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                {t.title}
              </Typography>
            </Box>
            <FormControl size="small">
              <Select value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                <MenuItem value="en">🇬🇧 EN</MenuItem>
                <MenuItem value="tr">🇹🇷 TR</MenuItem>
                <MenuItem value="ru">🇷🇺 RU</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            {t.tabs.map((label, i) => (<Tab key={i} label={label} />))}
          </Tabs>
        </Box>

        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ width: 64, height: 64 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{profile.fullName}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Phone fontSize="small" sx={{ color: '#00a693' }} />
                        <Typography variant="body2">{profile.phone}</Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{t.past}</Typography>
                  <List>
                    {past.map((a, idx) => (
                      <React.Fragment key={a.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText primary={`${a.date} • ${a.time} — ${a.barber}`} secondary={a.service} />
                        </ListItem>
                        {idx < past.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{t.upcoming}</Typography>
                  <List>
                    {upcoming.map((a, idx) => (
                      <React.Fragment key={a.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText primary={`${a.date} • ${a.time} — ${a.barber}`} secondary={a.service} />
                          <Chip label="upcoming" size="small" sx={{ bgcolor: '#e6f7f5', color: '#00a693', fontWeight: 'bold' }} />
                        </ListItem>
                        {idx < upcoming.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{t.past2}</Typography>
                  <List>
                    {past.map((a, idx) => (
                      <React.Fragment key={a.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText primary={`${a.date} • ${a.time} — ${a.barber}`} secondary={a.service} />
                        </ListItem>
                        {idx < past.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tab === 2 && (
          <Card>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField fullWidth label={t.city} value={city} onChange={(e) => setCity(e.target.value)} InputProps={{ startAdornment: <LocationOn sx={{ color: '#00a693', mr: 1 }} /> }} />
                <Button variant="contained" sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}>{t.search}</Button>
              </Stack>

              <Grid container spacing={2}>
                {filteredBarbers.map((b) => (
                  <Grid item xs={12} sm={6} md={4} key={b.id}>
                    <Card>
                      <CardContent>
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
                        <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }} onClick={() => navigate('/barber-dashboard')}>
                          {t.viewProfile}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default UserPortal;
