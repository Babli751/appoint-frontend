import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Box, 
  Typography, 
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
  Tabs,
  Badge,
  Menu
} from '@mui/material';
import {
  Business,
  Schedule,
  ContentCut,
  Star,
  Euro,
  Settings,
  Notifications,
  Add,
  Edit,
  Delete,
  Phone,
  CheckCircle,
  Cancel,
  Pending,
  Logout,
  ExpandMore
} from '@mui/icons-material';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();

  const [currentTab, setCurrentTab] = useState(0);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    duration: '',
    description: ''
  });

  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: language === 'en' ? 'New booking' : language === 'tr' ? 'Yeni rezervasyon' : 'Новая бронь', body: '12:30 - Haircut by Mehmet', time: '2m', read: false },
    { id: 2, title: language === 'en' ? 'Review received' : language === 'tr' ? 'Yeni yorum' : 'Новый отзыв', body: '4.8★ from Ayşe', time: '1h', read: false },
    { id: 3, title: language === 'en' ? 'Cancellation' : language === 'tr' ? 'İptal' : 'Отмена', body: 'Ali cancelled 16:00', time: '3h', read: true }
  ]);

  const [businessInfo, setBusinessInfo] = useState({
    address: '',
    photoUrl: '',
    workingHours: {
      mon: { open: '09:00', close: '19:00' },
      tue: { open: '09:00', close: '19:00' },
      wed: { open: '09:00', close: '19:00' },
      thu: { open: '09:00', close: '19:00' },
      fri: { open: '09:00', close: '19:00' },
      sat: { open: '10:00', close: '18:00' },
      sun: { open: 'Closed', close: 'Closed' }
    }
  });

  const [barbers, setBarbers] = useState([
    { id: 1, name: 'Mehmet Kaya', email: 'mehmet@example.com' },
    { id: 2, name: 'Ahmet Demir', email: 'ahmet@example.com' }
  ]);
  const [barberDialogOpen, setBarberDialogOpen] = useState(false);
  const [newBarber, setNewBarber] = useState({ name: '', email: '' });

  // State for business data fetched from API
  const [businessData, setBusinessData] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    rating: 0,
    reviewCount: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    services: []
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch business data from API
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Replace with actual API calls
        // const [businessRes, appointmentsRes, activityRes] = await Promise.all([
        //   fetch('/api/business/profile'),
        //   fetch('/api/business/appointments/upcoming'),
        //   fetch('/api/business/activity/recent')
        // ]);

        // For now, we'll use empty data until backend is implemented
        setBusinessData({
          name: '',
          owner: '',
          email: '',
          phone: '',
          address: '',
          avatar: '',
          rating: 0,
          reviewCount: 0,
          totalBookings: 0,
          monthlyRevenue: 0,
          services: []
        });
        setUpcomingAppointments([]);
        setRecentActivity([]);

      } catch (err) {
        console.error('Failed to fetch business data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  const stats = [
    {
      title: language === 'en' ? 'Total Bookings' : language === 'tr' ? 'Toplam Rezervasyon' : 'Всего бронирований',
      value: businessData.totalBookings,
      change: '+12%',
      icon: <Schedule sx={{ color: '#00a693' }} />
    },
    {
      title: language === 'en' ? 'Monthly Revenue' : language === 'tr' ? 'Aylık Gelir' : 'Месячный доход',
      value: `€${businessData.monthlyRevenue}`,
      change: '+8%',
      icon: <Euro sx={{ color: '#00a693' }} />
    },
    {
      title: language === 'en' ? 'Average Rating' : language === 'tr' ? 'Ortalama Puan' : 'Средний рейтинг',
      value: businessData.rating,
      change: '+0.2',
      icon: <Star sx={{ color: '#00a693' }} />
    },
    {
      title: language === 'en' ? 'Active Services' : language === 'tr' ? 'Aktif Hizmetler' : 'Активные услуги',
      value: businessData.services.length,
      change: '+1',
      icon: <ContentCut sx={{ color: '#00a693' }} />
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    navigate('/');
  };

  const handleAddService = () => {
    if (newService.name && newService.price && newService.duration) {
      // Add service logic here
      console.log('Adding service:', newService);
      setServiceDialogOpen(false);
      setNewService({ name: '', price: '', duration: '', description: '' });
    }
  };

  const handleNotifOpen = (e) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearNotifications = () => setNotifications([]);

  const handleBusinessPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setBusinessInfo(prev => ({ ...prev, photoUrl: URL.createObjectURL(file) }));
  };

  const saveBusinessInfo = () => {
    alert(language === 'en' ? 'Saved' : language === 'tr' ? 'Kaydedildi' : 'Сохранено');
  };

  const addBarber = () => {
    if (!newBarber.name || !newBarber.email) return;
    setBarbers(prev => [...prev, { id: Date.now(), ...newBarber }]);
    setNewBarber({ name: '', email: '' });
    setBarberDialogOpen(false);
  };
  const removeBarber = (id) => setBarbers(prev => prev.filter(b => b.id !== id));

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#00a693';
      case 'pending':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'pending':
        return <Pending sx={{ fontSize: 16 }} />;
      case 'cancelled':
        return <Cancel sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const tabLabels = [
    language === 'en' ? 'Overview' : language === 'tr' ? 'Genel Bakış' : 'Обзор',
    t.services,
    language === 'en' ? 'Salon Info' : language === 'tr' ? 'Salon Bilgisi' : 'Инфо салона',
    language === 'en' ? 'Barbers' : language === 'tr' ? 'Berberler' : 'Парикмахеры',
    language === 'en' ? 'Appointments' : language === 'tr' ? 'Randevular' : 'Встречи',
    language === 'en' ? 'Income Reports' : language === 'tr' ? 'Gelir Raporları' : 'Отчеты о доходах'
  ];

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          borderBottom: '1px solid #e5e7eb',
          color: '#1f2937'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" component="div" sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mr: 4
              }}>
                {t.brand} {t.businessPortal}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small">
                <Select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                  }}
                >
                  <MenuItem value="en">🇬🇧 EN</MenuItem>
                  <MenuItem value="tr">🇹🇷 TR</MenuItem>
                  <MenuItem value="ru">🇷🇺 RU</MenuItem>
                </Select>
              </FormControl>

              <IconButton sx={{ color: '#00a693' }} onClick={handleNotifOpen}>
                <Badge badgeContent={unreadCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              <Button
                onClick={handleProfileMenuOpen}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#1f2937',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(0, 166, 147, 0.04)' }
                }}
              >
                <Avatar
                  src={businessData.avatar}
                  sx={{ width: 32, height: 32 }}
                />
                <Box sx={{ textAlign: 'left', display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {businessData.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {businessData.owner}
                  </Typography>
                </Box>
                <ExpandMore sx={{ fontSize: 16 }} />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={() => { /* Handle settings */ }}>
          <Settings sx={{ mr: 2 }} />
          {language === 'en' ? 'Settings' : language === 'tr' ? 'Ayarlar' : 'Настройки'}
        </MenuItem>
        <MenuItem onClick={() => navigate('/')}>
          <Business sx={{ mr: 2 }} />
          {language === 'en' ? 'View as Customer' : language === 'tr' ? 'Müşteri Olarak Görüntüle' : 'Смотреть как клиент'}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 2 }} />
          {language === 'en' ? 'Sign Out' : language === 'tr' ? 'Çıkış Yap' : 'Выйти'}
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleNotifClose}
        sx={{ mt: 1 }}
      >
        <Box sx={{ px: 2, py: 1, minWidth: 320 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {language === 'en' ? 'Notifications' : language === 'tr' ? 'Bildirimler' : 'Уведомления'}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" onClick={markAllNotificationsRead}>
                {language === 'en' ? 'Mark all read' : language === 'tr' ? 'Tümünü okundu yap' : 'Отметить как прочит.'}
              </Button>
              <Button size="small" color="error" onClick={clearNotifications}>
                {language === 'en' ? 'Clear' : language === 'tr' ? 'Temizle' : 'Очистить'}
              </Button>
            </Stack>
          </Box>
          {notifications.length ? (
            <List sx={{ pt: 0 }}>
              {notifications.map(n => (
                <ListItem key={n.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: n.read ? 400 : 700 }}>{n.title}</Typography>}
                    secondary={<Typography color="text.secondary">{n.body} • {n.time}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {language === 'en' ? 'No notifications' : language === 'tr' ? 'Bildirim yok' : 'Нет уведомлений'}
            </Typography>
          )}
        </Box>
      </Menu>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {language === 'en' ? 'Welcome back,' : language === 'tr' ? 'Tekrar hoş geldiniz,' : 'Добро пожаловать,'} {businessData.owner}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {language === 'en' 
              ? 'Here\'s what\'s happening with your business today.'
              : language === 'tr'
              ? 'İşletmenizde bugün neler oluyor.'
              : 'Вот что происходит с ��ашим бизнесом сегодня.'
            }
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      {stat.icon}
                    </Box>
                    <Chip 
                      label={stat.change} 
                      size="small" 
                      sx={{ 
                        bgcolor: '#e6f7f5', 
                        color: '#00a693',
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        {currentTab === 0 && (
          <Grid container spacing={3}>
            {/* Today's Appointments */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {language === 'en' ? 'Today\'s Appointments' : language === 'tr' ? 'Bugünün Randevuları' : 'Сегодняшние встречи'}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Schedule />}
                      sx={{ color: '#00a693', borderColor: '#00a693' }}
                    >
                      {language === 'en' ? 'View All' : language === 'tr' ? 'Tümünü Gör' : 'Смотреть все'}
                    </Button>
                  </Box>

                  {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2">
                        {language === 'en' ? 'Loading appointments...' :
                         language === 'tr' ? 'Randevular yükleniyor...' :
                         'Загрузка встреч...'}
                      </Typography>
                    </Box>
                  ) : error ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="error">
                        {language === 'en' ? 'Failed to load appointments' :
                         language === 'tr' ? 'Randevular yüklenemedi' :
                         'Не удалось загрузить встречи'}
                      </Typography>
                    </Box>
                  ) : upcomingAppointments.length > 0 ? (
                  <List>
                    {upcomingAppointments.map((appointment) => (
                      <ListItem
                        key={appointment.id}
                        sx={{
                          border: '1px solid #e5e7eb',
                          borderRadius: 2,
                          mb: 1,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {appointment.client}
                            </Typography>
                            <Chip
                              label={appointment.status}
                              size="small"
                              icon={getStatusIcon(appointment.status)}
                              sx={{
                                bgcolor: `${getStatusColor(appointment.status)}15`,
                                color: getStatusColor(appointment.status),
                                fontWeight: 'bold'
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {appointment.service} • {appointment.time}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" startIcon={<Phone />}>
                              {appointment.phone}
                            </Button>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {language === 'en' ? 'No appointments today' :
                         language === 'tr' ? 'Bugün randevu yok' :
                         'Сегодня нет встреч'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {language === 'en' ? 'Recent Activity' : language === 'tr' ? 'Son Aktiviteler' : 'Недавняя активность'}
                  </Typography>

                  {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2">
                        {language === 'en' ? 'Loading activity...' :
                         language === 'tr' ? 'Aktiviteler yükleniyor...' :
                         'Загрузка активности...'}
                      </Typography>
                    </Box>
                  ) : error ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="error">
                        {language === 'en' ? 'Failed to load activity' :
                         language === 'tr' ? 'Aktiviteler yüklenemedi' :
                         'Не удалось загрузить активность'}
                      </Typography>
                    </Box>
                  ) : recentActivity.length > 0 ? (
                  <List>
                    {recentActivity.map((activity) => (
                      <ListItem key={activity.id} sx={{ px: 0 }}>
                        <ListItemText
                          primary={activity.message}
                          secondary={activity.time}
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        {language === 'en' ? 'No recent activity' :
                         language === 'tr' ? 'Son aktivite yok' :
                         'Нет недавней активности'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {currentTab === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {language === 'en' ? 'Salon Information' : language === 'tr' ? 'Salon Bilgisi' : 'Информация о салоне'}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label={language === 'en' ? 'Address' : language === 'tr' ? 'Adres' : 'Адрес'}
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                    {[
                      { key: 'mon', label: language==='en'?'Mon':language==='tr'?'Pzt':'Пн' },
                      { key: 'tue', label: language==='en'?'Tue':language==='tr'?'Sal':'Вт' },
                      { key: 'wed', label: language==='en'?'Wed':language==='tr'?'Çar':'Ср' },
                      { key: 'thu', label: language==='en'?'Thu':language==='tr'?'Per':'Чт' },
                      { key: 'fri', label: language==='en'?'Fri':language==='tr'?'Cum':'Пт' },
                      { key: 'sat', label: language==='en'?'Sat':language==='tr'?'Cts':'Сб' },
                      { key: 'sun', label: language==='en'?'Sun':language==='tr'?'Paz':'Вс' },
                    ].map(d => (
                      <Box key={d.key} sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', sm: '48%', md: '32%' } }}>
                        <Typography variant="body2" sx={{ width: 40 }}>{d.label}</Typography>
                        <TextField
                          size="small"
                          value={businessInfo.workingHours[d.key].open}
                          onChange={(e)=> setBusinessInfo(prev=> ({ ...prev, workingHours: { ...prev.workingHours, [d.key]: { ...prev.workingHours[d.key], open: e.target.value } } }))}
                          placeholder="09:00"
                        />
                        <Typography variant="body2">-</Typography>
                        <TextField
                          size="small"
                          value={businessInfo.workingHours[d.key].close}
                          onChange={(e)=> setBusinessInfo(prev=> ({ ...prev, workingHours: { ...prev.workingHours, [d.key]: { ...prev.workingHours[d.key], close: e.target.value } } }))}
                          placeholder="19:00"
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar src={businessInfo.photoUrl} sx={{ width: 120, height: 120 }} />
                    <Button component="label" variant="outlined" sx={{ color: '#00a693', borderColor: '#00a693' }}>
                      {language === 'en' ? 'Upload Photo' : language === 'tr' ? 'Fotoğraf Yükle' : 'Загрузить фото'}
                      <input hidden accept="image/*" type="file" onChange={handleBusinessPhotoChange} />
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }} onClick={saveBusinessInfo}>
                      {language === 'en' ? 'Save' : language === 'tr' ? 'Kaydet' : 'Сохранить'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {currentTab === 1 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {t.manageServices}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setServiceDialogOpen(true)}
                  sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}
                >
                  {t.addService}
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t.serviceName}</TableCell>
                      <TableCell>{t.servicePrice}</TableCell>
                      <TableCell>{t.serviceDuration}</TableCell>
                      <TableCell>{language === 'en' ? 'Bookings' : language === 'tr' ? 'Rezervasyonlar' : 'Бронирования'}</TableCell>
                      <TableCell>{language === 'en' ? 'Actions' : language === 'tr' ? 'İşlemler' : 'Действия'}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {businessData.services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>€{service.price}</TableCell>
                        <TableCell>{service.duration} {t.minutes}</TableCell>
                        <TableCell>{service.bookings}</TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: '#00a693' }}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#ef4444' }}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {currentTab === 3 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {language === 'en' ? 'Barbers' : language === 'tr' ? 'Berberler' : 'Парикмахеры'}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setBarberDialogOpen(true)}
                  sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}
                >
                  {language === 'en' ? 'Add Barber' : language === 'tr' ? 'Berber Ekle' : 'Добавить'}
                </Button>
              </Box>
              <List>
                {barbers.map((b) => (
                  <ListItem key={b.id} sx={{ px: 0 }}>
                    <ListItemText primary={b.name} secondary={b.email} />
                    <IconButton onClick={() => removeBarber(b.id)} sx={{ color: '#ef4444' }}>
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
                {!barbers.length && (
                  <Typography variant="body2" color="text.secondary">
                    {language === 'en' ? 'No barbers added' : language === 'tr' ? 'Berber ekli değil' : 'Нет парикмахеров'}
                  </Typography>
                )}
              </List>
            </CardContent>
          </Card>
        )}

        {currentTab === 4 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {language === 'en' ? 'All Appointments' : language === 'tr' ? 'Tüm Randevular' : 'Все встречи'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {language === 'en' 
                  ? 'Full appointment management coming soon...'
                  : language === 'tr'
                  ? 'Tam randevu yönetimi yakında gelecek...'
                  : 'Полное управление встречами скоро появится...'
                }
              </Typography>
            </CardContent>
          </Card>
        )}

        {currentTab === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {language === 'en' ? 'Business Analytics' : language === 'tr' ? 'İşletme Analitikleri' : 'Аналитика бизнеса'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {language === 'en' 
                  ? 'Detailed analytics and reports coming soon...'
                  : language === 'tr'
                  ? 'Detaylı analitik ve raporlar yakında gelecek...'
                  : 'Подробная аналитика и отчеты скоро появятся...'
                }
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Add Service Dialog */}
      <Dialog open={serviceDialogOpen} onClose={() => setServiceDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t.addService}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label={t.serviceName}
              value={newService.name}
              onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              fullWidth
              label={t.servicePrice}
              value={newService.price}
              onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>€</Typography>
              }}
            />
            <TextField
              fullWidth
              label={t.serviceDuration}
              value={newService.duration}
              onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
              InputProps={{
                endAdornment: <Typography sx={{ ml: 1 }}>{t.minutes}</Typography>
              }}
            />
            <TextField
              fullWidth
              label={language === 'en' ? 'Description' : language === 'tr' ? 'Açıklama' : 'Описание'}
              multiline
              rows={3}
              value={newService.description}
              onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialogOpen(false)}>
            {t.cancel}
          </Button>
          <Button 
            onClick={handleAddService}
            variant="contained"
            sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}
          >
            {t.addService}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessDashboard;
