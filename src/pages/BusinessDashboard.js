import React, { useState } from 'react';
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

  // Mock business data
  const businessData = {
    name: 'Milano Barber Studio',
    owner: 'Marco Rossi',
    email: 'marco@milanobarberstudio.com',
    phone: '+39 02 1234 5678',
    address: 'Via Roma 123, Milano, Italy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 245,
    totalBookings: 1250,
    monthlyRevenue: 8500,
    services: [
      { id: 1, name: 'Classic Cut', price: 35, duration: 45, bookings: 125 },
      { id: 2, name: 'Beard Trim', price: 25, duration: 30, bookings: 89 },
      { id: 3, name: 'Hot Towel Shave', price: 40, duration: 60, bookings: 67 },
      { id: 4, name: 'Hair Wash', price: 15, duration: 20, bookings: 234 }
    ]
  };

  const upcomingAppointments = [
    { id: 1, client: 'Giovanni Bianchi', service: 'Classic Cut', time: '14:30', status: 'confirmed', phone: '+39 333 1234567' },
    { id: 2, client: 'Luca Verde', service: 'Beard Trim', time: '15:00', status: 'pending', phone: '+39 333 7654321' },
    { id: 3, client: 'Antonio Rosso', service: 'Hot Towel Shave', time: '15:30', status: 'confirmed', phone: '+39 333 9876543' },
    { id: 4, client: 'Francesco Nero', service: 'Classic Cut', time: '16:00', status: 'confirmed', phone: '+39 333 5551234' }
  ];

  const recentActivity = [
    { id: 1, type: 'booking', message: 'New booking from Giovanni Bianchi', time: '2 min ago' },
    { id: 2, type: 'review', message: 'New 5-star review received', time: '1 hour ago' },
    { id: 3, type: 'payment', message: 'Payment received: €35', time: '2 hours ago' },
    { id: 4, type: 'booking', message: 'Booking confirmed for Luca Verde', time: '3 hours ago' }
  ];

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
    language === 'en' ? 'Appointments' : language === 'tr' ? 'Randevular' : 'Встречи',
    language === 'en' ? 'Analytics' : language === 'tr' ? 'Analitik' : 'Аналитика'
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

              <IconButton sx={{ color: '#00a693' }}>
                <Badge badgeContent={3} color="error">
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
              : 'Вот что происходит с вашим бизнесом сегодня.'
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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

        {currentTab === 2 && (
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
