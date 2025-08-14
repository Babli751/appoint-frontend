import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { userAPI } from '../services/api';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Stack,
  Paper,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Person,
  Phone,
  Email,
  LocationOn,
  Notifications,
  Language,
  Security,
  Help,
  ExitToApp,
  Save,
  Cancel,
  Camera,
  DateRange,
  Favorite,
  History
} from '@mui/icons-material';

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, updateUser, changePassword, logout } = useAuth();
  const { language, changeLanguage } = useLanguage();

  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  // Use user data from AuthContext
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    address: user?.address || '',
    memberSince: user?.memberSince || '',
    totalAppointments: user?.totalAppointments || 0,
    favoriteBarbers: user?.favoriteBarbers || 0
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      const updatedUserInfo = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        address: user.address || '',
        memberSince: user.memberSince || '',
        totalAppointments: user.totalAppointments || 0,
        favoriteBarbers: user.favoriteBarbers || 0
      };
      setUserInfo(updatedUserInfo);
      setEditedInfo(updatedUserInfo);
    }
  }, [user]);

  // Language content
  const content = {
    tr: {
      brand: 'BarberPro',
      profile: 'Profilim',
      personalInfo: 'Kişisel Bilgiler',
      settings: 'Ayarlar',
      security: 'Güvenlik',
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      birthDate: 'Doğum Tarihi',
      address: 'Adres',
      memberSince: 'Üyelik Tarihi',
      totalAppointments: 'Toplam Randevu',
      favoriteBarbers: 'Favori Berber',
      edit: 'Düzenle',
      save: 'Kaydet',
      cancel: 'İptal',
      changePhoto: 'Fotoğraf Değiştir',
      notifications: 'Bildirimler',
      emailNotifications: 'E-posta Bildirimleri',
      pushNotifications: 'Anlık Bildirimler',
      smsNotifications: 'SMS Bildirimleri',
      language: 'Dil',
      changePassword: 'Şifre Değiştir',
      logout: 'Çıkış Yap',
      help: 'Yardım',
      turkish: 'Türkçe',
      english: 'English',
      russian: 'Русский',
      accountInfo: 'Hesap Bilgileri',
      preferences: 'Tercihler',
      support: 'Destek',
      deleteAccount: 'Hesabı Sil',
      privacyPolicy: 'Gizlilik Politikası',
      termsOfService: 'Kullanım Şartları'
    },
    en: {
      brand: 'BarberPro',
      profile: 'My Profile',
      personalInfo: 'Personal Information',
      settings: 'Settings',
      security: 'Security',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      birthDate: 'Birth Date',
      address: 'Address',
      memberSince: 'Member Since',
      totalAppointments: 'Total Appointments',
      favoriteBarbers: 'Favorite Barbers',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      changePhoto: 'Change Photo',
      notifications: 'Notifications',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      smsNotifications: 'SMS Notifications',
      language: 'Language',
      changePassword: 'Change Password',
      logout: 'Logout',
      help: 'Help',
      turkish: 'Türkçe',
      english: 'English',
      russian: 'Русский',
      accountInfo: 'Account Information',
      preferences: 'Preferences',
      support: 'Support',
      deleteAccount: 'Delete Account',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    },
    ru: {
      brand: 'BarberPro',
      profile: 'Мой Профиль',
      personalInfo: 'Личная Информация',
      settings: 'Настройки',
      security: 'Безопасность',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      birthDate: 'Дата Рождения',
      address: 'Адрес',
      memberSince: 'Участник с',
      totalAppointments: 'Всего Записей',
      favoriteBarbers: 'Любимые Парикмахеры',
      edit: 'Редактировать',
      save: 'Сохранить',
      cancel: 'Отмена',
      changePhoto: 'Изменить Фото',
      notifications: 'Уведомления',
      emailNotifications: 'Email Уведомления',
      pushNotifications: 'Push Уведомления',
      smsNotifications: 'SMS Уведомления',
      language: 'Язык',
      changePassword: 'Изменить Пароль',
      logout: 'Выйти',
      help: 'Помощь',
      turkish: 'Türkçe',
      english: 'English',
      russian: 'Русский',
      accountInfo: 'Информация Аккаунта',
      preferences: 'Предпочтения',
      support: 'Поддержка',
      deleteAccount: 'Удалить Аккаунт',
      privacyPolicy: 'Политика Конфиденциальности',
      termsOfService: 'Условия Использов��ния'
    }
  };

  const t = content[language];

  const handleInputChange = (field) => (event) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProfile = {
        first_name: editedInfo.firstName,
        last_name: editedInfo.lastName,
        email: editedInfo.email,
        phone: editedInfo.phone,
        birth_date: editedInfo.birthDate,
        address: editedInfo.address
      };

      await updateUser(updatedProfile);
      setUserInfo(editedInfo);
      setEditing(false);
      setUpdateSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(language === 'en' ? 'Failed to update profile' :
            language === 'tr' ? 'Profil güncellenemedi' :
            'Не удалось обновить профиль');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setEditing(false);
  };

  const handleChangePassword = () => {
    setChangePasswordOpen(true);
    setPasswordError('');
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setPasswordError('');
  };

  const handlePasswordSubmit = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError(language === 'en' ? 'All fields are required' : language === 'tr' ? 'Tüm alanlar zorunludur' : 'Все поля обязательны');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(language === 'en' ? 'Passwords do not match' : language === 'tr' ? 'Şifreler eşleşmiyor' : 'Пароли не совпадают');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(language === 'en' ? 'Password must be at least 6 characters' : language === 'tr' ? 'Şifre en az 6 karakter olmalıdır' : 'Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setChangePasswordOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

      alert(language === 'en' ? 'Password changed successfully' :
            language === 'tr' ? 'Şifre başarıyla değiştirildi' :
            'Пароль успешно изменен');
    } catch (error) {
      console.error('Password change failed:', error);
      setPasswordError(
        error.response?.data?.detail ||
        (language === 'en' ? 'Failed to change password' :
         language === 'tr' ? 'Şifre değiştirilemedi' :
         'Не удалось изменить пароль')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleHelp = () => {
    navigate('/support');
  };

  const handlePrivacyPolicy = () => {
    setPrivacyPolicyOpen(true);
  };

  const handleTermsOfService = () => {
    setTermsOfServiceOpen(true);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)'
      }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {t.profile}
          </Typography>
          
          {/* Language Selector */}
          <FormControl size="small" sx={{ minWidth: 100, mr: 2 }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ 
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSvgIcon-root': { color: 'white' }
              }}
            >
              <MenuItem value="tr">🇹🇷 TR</MenuItem>
              <MenuItem value="en">🇺🇸 EN</MenuItem>
              <MenuItem value="ru">🇷🇺 RU</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 2, md: 3 } }}>
        {/* Profile Header */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 3 
            }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  sx={{ 
                    width: { xs: 100, md: 120 }, 
                    height: { xs: 100, md: 120 } 
                  }} 
                />
                <IconButton 
                  sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: '#00a693',
                    color: 'white',
                    width: 35,
                    height: 35,
                    '&:hover': { bgcolor: '#007562' }
                  }}
                >
                  <Camera fontSize="small" />
                </IconButton>
              </Box>
              
              <Box sx={{ 
                flex: 1, 
                textAlign: { xs: 'center', md: 'left' },
                width: { xs: '100%', md: 'auto' }
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {userInfo.email}
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#00a693', color: 'white' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.totalAppointments}
                      </Typography>
                      <Typography variant="body2">
                        {t.totalAppointments}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ff6b35', color: 'white' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.favoriteBarbers}
                      </Typography>
                      <Typography variant="body2">
                        {t.favoriteBarbers}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#10b981', color: 'white' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        2023
                      </Typography>
                      <Typography variant="body2">
                        {t.memberSince}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
            >
              <Tab label={t.personalInfo} />
              <Tab label={t.settings} />
              <Tab label={t.security} />
            </Tabs>
          </Box>

          {/* Personal Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {t.personalInfo}
                </Typography>
                {!editing ? (
                  <Button 
                    startIcon={<Edit />}
                    onClick={() => setEditing(true)}
                    sx={{ color: '#00a693' }}
                  >
                    {t.edit}
                  </Button>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <Button 
                      startIcon={<Save />}
                      variant="contained"
                      onClick={handleSave}
                      sx={{ bgcolor: '#00a693' }}
                    >
                      {t.save}
                    </Button>
                    <Button 
                      startIcon={<Cancel />}
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      {t.cancel}
                    </Button>
                  </Stack>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t.firstName}
                    value={editing ? editedInfo.firstName : userInfo.firstName}
                    onChange={handleInputChange('firstName')}
                    disabled={!editing}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t.lastName}
                    value={editing ? editedInfo.lastName : userInfo.lastName}
                    onChange={handleInputChange('lastName')}
                    disabled={!editing}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t.email}
                    type="email"
                    value={editing ? editedInfo.email : userInfo.email}
                    onChange={handleInputChange('email')}
                    disabled={!editing}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t.phone}
                    value={editing ? editedInfo.phone : userInfo.phone}
                    onChange={handleInputChange('phone')}
                    disabled={!editing}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t.birthDate}
                    type="date"
                    value={editing ? editedInfo.birthDate : userInfo.birthDate}
                    onChange={handleInputChange('birthDate')}
                    disabled={!editing}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t.address}
                    multiline
                    rows={3}
                    value={editing ? editedInfo.address : userInfo.address}
                    onChange={handleInputChange('address')}
                    disabled={!editing}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t.preferences}
              </Typography>

              {/* Language Settings */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t.language}
                </Typography>
                <FormControl fullWidth sx={{ maxWidth: 300 }}>
                  <InputLabel>{t.language}</InputLabel>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    label={t.language}
                  >
                    <MenuItem value="tr">🇹�� {t.turkish}</MenuItem>
                    <MenuItem value="en">🇺🇸 {t.english}</MenuItem>
                    <MenuItem value="ru">🇷🇺 {t.russian}</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Notification Settings */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t.notifications}
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.email}
                        onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#00a693' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00a693' }
                        }}
                      />
                    }
                    label={t.emailNotifications}
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.push}
                        onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#00a693' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00a693' }
                        }}
                      />
                    }
                    label={t.pushNotifications}
                  />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={notifications.sms}
                        onChange={(e) => setNotifications(prev => ({ ...prev, sms: e.target.checked }))}
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#00a693' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00a693' }
                        }}
                      />
                    }
                    label={t.smsNotifications}
                  />
                </Stack>
              </Box>
            </Box>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t.security}
              </Typography>

              <List>
                <ListItemButton onClick={handleChangePassword}>
                  <ListItemIcon>
                    <Security sx={{ color: '#00a693' }} />
                  </ListItemIcon>
                  <ListItemText primary={t.changePassword} />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handleHelp}>
                  <ListItemIcon>
                    <Help sx={{ color: '#00a693' }} />
                  </ListItemIcon>
                  <ListItemText primary={t.help} />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handlePrivacyPolicy}>
                  <ListItemIcon>
                    <Security sx={{ color: '#00a693' }} />
                  </ListItemIcon>
                  <ListItemText primary={t.privacyPolicy} />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handleTermsOfService}>
                  <ListItemIcon>
                    <Security sx={{ color: '#00a693' }} />
                  </ListItemIcon>
                  <ListItemText primary={t.termsOfService} />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  onClick={() => {
                    if (setAuth) setAuth(false);
                    localStorage.removeItem('isAuthenticated');
                    navigate('/signin');
                  }}
                  sx={{ color: '#ef4444' }}
                >
                  <ListItemIcon>
                    <ExitToApp sx={{ color: '#ef4444' }} />
                  </ListItemIcon>
                  <ListItemText primary={t.logout} />
                </ListItemButton>
              </List>
            </Box>
          </TabPanel>
        </Card>
      </Container>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {t.changePassword}
        </DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}

          <TextField
            fullWidth
            label={language === 'en' ? 'Current Password' : language === 'tr' ? 'Mevcut Şifre' : 'Текущий пароль'}
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange('currentPassword')}
            margin="normal"
          />

          <TextField
            fullWidth
            label={language === 'en' ? 'New Password' : language === 'tr' ? 'Yeni Şifre' : 'Новый пароль'}
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange('newPassword')}
            margin="normal"
          />

          <TextField
            fullWidth
            label={language === 'en' ? 'Confirm New Password' : language === 'tr' ? 'Yeni Şifreyi Onayla' : 'Подтвердите новый пароль'}
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange('confirmPassword')}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setChangePasswordOpen(false)}
            color="inherit"
          >
            {t.cancel}
          </Button>
          <Button
            onClick={handlePasswordSubmit}
            variant="contained"
            sx={{ bgcolor: '#00a693' }}
          >
            {t.save}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog
        open={privacyPolicyOpen}
        onClose={() => setPrivacyPolicyOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t.privacyPolicy}
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '1. Information Collection' :
             language === 'tr' ? '1. Bilgi Toplama' :
             '1. Сбор информации'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {language === 'en' ? 'We collect information you provide directly to us, such as when you create an account, book appointments, or contact us for support.' :
             language === 'tr' ? 'Hesap oluşturduğunuzda, randevu aldığınızda veya destek için bizimle iletişime geçtiğinizde doğrudan bize sağladığınız bilgileri topluyoruz.' :
             'Мы собираем ��нформацию, которую вы предоставляете нам напрямую, например, при создании учетной записи, бронировании встреч ил�� обращении в службу поддержки.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '2. Information Use' :
             language === 'tr' ? '2. Bilgi Kullanımı' :
             '2. Использование информации'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {language === 'en' ? 'We use the information we collect to provide, maintain, and improve our services, process appointments, and communicate with you.' :
             language === 'tr' ? 'Topladığımız bilgileri hizmetlerimizi sağlamak, sürdürmek ve geliştirmek, randevuları işlemek ve sizinle iletişim kurmak için kullanırız.' :
             'Мы используем собранную информацию для предоставления, поддержания и улучшения наших услуг, обработки встреч и общения с вами.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '3. Information Sharing' :
             language === 'tr' ? '3. Bilgi Paylaşımı' :
             '3. Обмен информацией'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {language === 'en' ? 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.' :
             language === 'tr' ? 'Kişisel bilgilerinizi, bu politikada açıklananlar dışında, izniniz olmadan üçüncü taraflara satmaz, takas etmez veya başka şekilde aktarmayız.' :
             'Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, описанных в этой политике.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '4. Contact Us' :
             language === 'tr' ? '4. Bize Ulaşın' :
             '4. Свяжитесь с нами'}
          </Typography>
          <Typography variant="body2">
            {language === 'en' ? 'If you have questions about this Privacy Policy, please contact us at support@barberpro.com' :
             language === 'tr' ? 'Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen support@barberpro.com adresinden bizimle iletişime geçin' :
             'Если у вас есть вопросы об этой Политике конфиденциальности, свяжитесь с нами по адресу support@barberpro.com'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPrivacyPolicyOpen(false)}
            variant="contained"
            sx={{ bgcolor: '#00a693' }}
          >
            {language === 'en' ? 'Close' : language === 'tr' ? 'Kapat' : 'Закрыть'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog
        open={termsOfServiceOpen}
        onClose={() => setTermsOfServiceOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t.termsOfService}
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '1. Acceptance of Terms' :
             language === 'tr' ? '1. Şartların Kabulü' :
             '1. Принятие условий'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {language === 'en' ? 'By accessing and using BarberPro, you accept and agree to be bound by the terms and provision of this agreement.' :
             language === 'tr' ? 'BarberPro\'ya erişerek ve kullanarak, bu sözleşmenin hüküm ve koşullarıyla bağlı olmayı kabul etmiş olursunuz.' :
             'Получая доступ к BarberPro и используя его, вы принимаете и соглашаетесь соблюдать условия и положения этого соглашения.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '2. Service Description' :
             language === 'tr' ? '2. Hizmet Açıklaması' :
             '2. Описание услуги'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {language === 'en' ? 'BarberPro is a platform that connects customers with barber services. We facilitate appointment booking and payment processing.' :
             language === 'tr' ? 'BarberPro, müşterileri berber hizmetleriyle buluşturan bir platformdur. Randevu rezervasyonu ve ödeme işlemlerini kolaylaştırırız.' :
             'BarberPro - это платформа, которая связывает клиентов с парикмахерскими услугами. Мы облегчаем бронирование встреч и обработку платежей.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '3. User Responsibilities' :
             language === 'tr' ? '3. Kullanıcı Sorumlulukları' :
             '3. Обязанности пользователя'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {language === 'en' ? 'Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.' :
             language === 'tr' ? 'Kullanıcılar hesap bilgilerinin gizliliğini korumaktan ve hesapları altında gerçekleşen tüm aktivitelerden sorumludur.' :
             'Пользователи несут ответственность за сохранение конфиденциальности информации своей учетной записи и за все действия, происходящие под их учетной записью.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {language === 'en' ? '4. Cancellation Policy' :
             language === 'tr' ? '4. İptal Politikası' :
             '4. Политика отмены'}
          </Typography>
          <Typography variant="body2">
            {language === 'en' ? 'Appointments must be cancelled at least 24 hours in advance. Late cancellations may result in charges.' :
             language === 'tr' ? 'Randevular en az 24 saat önceden iptal edilmelidir. Geç iptaller ücretlendirme ile sonuçlanabilir.' :
             'Встречи должны быть отменены не менее чем за 24 часа. Поздние отмены могут привести к дополнительным расходам.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setTermsOfServiceOpen(false)}
            variant="contained"
            sx={{ bgcolor: '#00a693' }}
          >
            {language === 'en' ? 'Close' : language === 'tr' ? 'Kapat' : 'Закрыть'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
