import React, { useEffect, useMemo, useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import {
  ArrowBack,
  ContentCut,
  Schedule,
  Star,
  Phone,
  Delete,
  Edit
} from '@mui/icons-material';

function formatDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const BarberDashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('tr');
  const dict = useMemo(() => ({
    en: {
      title: 'Barber Portal',
      tabs: ['My Calendar', 'My Appointments', 'My Customers', 'My Profile'],
      addFree: 'Add Free Slot',
      editFree: 'Edit Free Slot',
      date: 'Date', start: 'Start', end: 'End', save: 'Save', cancel: 'Cancel', add: 'Add',
      today: 'Today', tomorrow: 'Tomorrow', week: 'This Week',
      time: 'Time', client: 'Client', service: 'Service', phone: 'Phone', call: 'Call', rating: 'Rating',
      customers: 'Customers', noCustomers: 'No customers yet',
      profile: 'Profile', services: 'Services', price: 'Price', duration: 'Duration (min)', bio: 'Bio', uploadPhoto: 'Upload Photo'
    },
    tr: {
      title: 'Berber Portalı',
      tabs: ['Takvimim', 'Randevularım', 'Müşterilerim', 'Profilim'],
      addFree: 'Boş Saat Ekle',
      editFree: 'Boş Saati Düzenle',
      date: 'Tarih', start: 'Başlangıç', end: 'Bitiş', save: 'Kaydet', cancel: 'İptal', add: 'Ekle',
      today: 'Bugün', tomorrow: 'Yarın', week: 'Haftalık',
      time: 'Saat', client: 'Müşteri', service: 'Hizmet', phone: 'Telefon', call: 'Ara', rating: 'Puan',
      customers: 'Müşteriler', noCustomers: 'Henüz müşteri yok',
      profile: 'Profil', services: 'Hizmetler', price: 'Fiyat', duration: 'Süre (dk)', bio: 'Hakkımda', uploadPhoto: 'Fotoğraf Yükle'
    },
    ru: {
      title: 'Портал Барбера',
      tabs: ['Календарь', 'Мои встречи', 'Клиенты', 'Профиль'],
      addFree: 'Добавить окно',
      editFree: 'Изменить окно',
      date: 'Дата', start: 'Начало', end: 'Конец', save: 'Сохранить', cancel: 'Отмена', add: 'Добавить',
      today: 'Сегодня', tomorrow: 'Завтра', week: 'Неделя',
      time: 'Время', client: 'Клиент', service: 'Услуга', phone: 'Телефон', call: 'Позвонить', rating: 'Рейтинг',
      customers: 'Клиенты', noCustomers: 'Пока нет клиентов',
      profile: 'Пр��филь', services: 'Услуги', price: 'Цена', duration: 'Длительность (мин)', bio: 'О себе', uploadPhoto: 'Загрузить фото'
    }
  })[language], [language]);

  const [tab, setTab] = useState(0);

  // Demo appointments with dates (YYYY-MM-DD)
  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const inThree = formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [appointments, setAppointments] = useState([
    { id: 1, date: today, time: '10:00', client: 'Ali Yılmaz', service: 'Saç Kesimi', phone: '+90 555 111 22 33' },
    { id: 2, date: today, time: '11:30', client: 'John Doe', service: 'Sakal Traşı', phone: '+90 555 444 55 66' },
    { id: 3, date: tomorrow, time: '15:00', client: 'Ayşe Kara', service: 'Saç Boyama', phone: '+90 555 222 33 44' },
    { id: 4, date: inThree, time: '12:00', client: 'Maria Ivanova', service: 'Haircut', phone: '+90 555 777 88 99' }
  ]);

  // Calendar availability slots
  const [slots, setSlots] = useState([
    { id: 1, date: today, start: '09:00', end: '10:00' },
    { id: 2, date: today, start: '14:00', end: '15:00' }
  ]);
  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [slotForm, setSlotForm] = useState({ date: today, start: '', end: '' });

  // Profile
  const [profile, setProfile] = useState({
    photoUrl: '',
    bio: '',
    services: [
      { id: 1, name: 'Saç Kesimi', price: '300', duration: '30' },
      { id: 2, name: 'Sakal Traşı', price: '200', duration: '20' }
    ]
  });
  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });

  useEffect(() => {
    // Public preview mode
  }, []);

  const weekDates = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) arr.push(formatDate(new Date(Date.now() + i * 86400000)));
    return new Set(arr);
  }, []);

  const filteredAppointments = (range) => {
    if (range === 'today') return appointments.filter(a => a.date === today);
    if (range === 'tomorrow') return appointments.filter(a => a.date === tomorrow);
    return appointments.filter(a => weekDates.has(a.date));
  };

  const customers = useMemo(() => {
    const map = new Map();
    for (const a of appointments) {
      if (!map.has(a.client)) map.set(a.client, { name: a.client, phone: a.phone, visits: 0 });
      map.get(a.client).visits += 1;
    }
    return Array.from(map.values());
  }, [appointments]);

  const openAddSlot = () => {
    setEditingSlot(null);
    setSlotForm({ date: today, start: '', end: '' });
    setSlotDialogOpen(true);
  };
  const openEditSlot = (slot) => {
    setEditingSlot(slot);
    setSlotForm({ date: slot.date, start: slot.start, end: slot.end });
    setSlotDialogOpen(true);
  };
  const saveSlot = () => {
    if (!slotForm.date || !slotForm.start || !slotForm.end) return;
    if (editingSlot) {
      setSlots(prev => prev.map(s => s.id === editingSlot.id ? { ...editingSlot, ...slotForm } : s));
    } else {
      setSlots(prev => [...prev, { id: Date.now(), ...slotForm }]);
    }
    setSlotDialogOpen(false);
  };
  const deleteSlot = (id) => setSlots(prev => prev.filter(s => s.id !== id));

  const addService = () => {
    if (!newService.name || !newService.price || !newService.duration) return;
    setProfile(prev => ({ ...prev, services: [...prev.services, { id: Date.now(), ...newService }] }));
    setNewService({ name: '', price: '', duration: '' });
  };
  const removeService = (id) => setProfile(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfile(prev => ({ ...prev, photoUrl: URL.createObjectURL(file) }));
  };

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', color: '#1f2937' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/')}> <ArrowBack /> </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                {dict.title}
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
              <Avatar alt="Barber" src={profile.photoUrl} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            {dict.tabs.map((label, i) => (<Tab key={i} label={label} />))}
          </Tabs>
        </Box>

        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{dict.tabs[0]}</Typography>
                    <Button variant="contained" onClick={openAddSlot} sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}>{dict.addFree}</Button>
                  </Box>
                  <List>
                    {slots.map((s) => (
                      <React.Fragment key={s.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText primary={`${s.date} • ${s.start}-${s.end}`} />
                          <IconButton onClick={() => openEditSlot(s)} sx={{ color: '#00a693' }}><Edit /></IconButton>
                          <IconButton onClick={() => deleteSlot(s.id)} sx={{ color: '#ef4444' }}><Delete /></IconButton>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                    {!slots.length && (
                      <Typography variant="body2" color="text.secondary">—</Typography>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={dict.today} icon={<Schedule sx={{ color: '#00a693' }} />} onClick={() => setAppointments([...appointments])} sx={{ bgcolor: '#e6f7f5', color: '#00a693', fontWeight: 'bold' }} />
                <Chip label={dict.tomorrow} onClick={() => setAppointments([...appointments])} />
                <Chip label={dict.week} onClick={() => setAppointments([...appointments])} />
              </Stack>

              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{dict.tabs[1]}</Typography>
              <List>
                {filteredAppointments('today').map((a) => (
                  <ListItem key={`t-${a.id}`} sx={{ px: 0 }}>
                    <ListItemText primary={`${a.date} • ${a.time} — ${a.client}`} secondary={`${dict.service}: ${a.service}`} />
                    <Button size="small" startIcon={<Phone />} sx={{ color: '#00a693' }}>{dict.call}</Button>
                  </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                {filteredAppointments('tomorrow').map((a) => (
                  <ListItem key={`tm-${a.id}`} sx={{ px: 0 }}>
                    <ListItemText primary={`${a.date} • ${a.time} — ${a.client}`} secondary={`${dict.service}: ${a.service}`} />
                    <Button size="small" startIcon={<Phone />} sx={{ color: '#00a693' }}>{dict.call}</Button>
                  </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                {filteredAppointments('week').map((a) => (
                  <ListItem key={`w-${a.id}`} sx={{ px: 0 }}>
                    <ListItemText primary={`${a.date} • ${a.time} — ${a.client}`} secondary={`${dict.service}: ${a.service}`} />
                    <Button size="small" startIcon={<Phone />} sx={{ color: '#00a693' }}>{dict.call}</Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {tab === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{dict.tabs[2]}</Typography>
              <List>
                {customers.map((c, idx) => (
                  <React.Fragment key={c.name}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText primary={`${c.name} • ${c.visits}`} secondary={`${dict.phone}: ${c.phone}`} />
                      <Button size="small" startIcon={<Phone />} sx={{ color: '#00a693' }}>{dict.call}</Button>
                    </ListItem>
                    {idx < customers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
                {!customers.length && (
                  <Typography variant="body2" color="text.secondary">{dict.noCustomers}</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        )}

        {tab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{dict.services}</Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                    <TextField fullWidth label={<span>{dict.services}</span>} placeholder="Saç Kesimi" value={newService.name} onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))} />
                    <TextField label={dict.price} value={newService.price} onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))} />
                    <TextField label={dict.duration} value={newService.duration} onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))} />
                    <Button variant="contained" onClick={addService} sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}>{dict.add}</Button>
                  </Stack>
                  <List>
                    {profile.services.map((s) => (
                      <React.Fragment key={s.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText primary={`${s.name} — ₺${s.price}`} secondary={`${dict.duration}: ${s.duration}`} />
                          <IconButton onClick={() => removeService(s.id)} sx={{ color: '#ef4444' }}><Delete /></IconButton>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{dict.profile}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar src={profile.photoUrl} sx={{ width: 120, height: 120 }} />
                    <Button component="label" variant="outlined" sx={{ color: '#00a693', borderColor: '#00a693' }}>
                      {dict.uploadPhoto}
                      <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
                    </Button>
                    <TextField fullWidth multiline rows={4} label={dict.bio} value={profile.bio} onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      <Dialog open={slotDialogOpen} onClose={() => setSlotDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editingSlot ? dict.editFree : dict.addFree}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label={dict.date} type="date" value={slotForm.date} onChange={(e) => setSlotForm(prev => ({ ...prev, date: e.target.value }))} InputLabelProps={{ shrink: true }} />
            <Stack direction="row" spacing={2}>
              <TextField label={dict.start} type="time" value={slotForm.start} onChange={(e) => setSlotForm(prev => ({ ...prev, start: e.target.value }))} InputLabelProps={{ shrink: true }} />
              <TextField label={dict.end} type="time" value={slotForm.end} onChange={(e) => setSlotForm(prev => ({ ...prev, end: e.target.value }))} InputLabelProps={{ shrink: true }} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSlotDialogOpen(false)}>{dict.cancel}</Button>
          <Button variant="contained" onClick={saveSlot} sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}>{dict.save}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BarberDashboard;
