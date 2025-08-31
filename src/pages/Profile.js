import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Chip,
  Rating,
  Fab,
  Menu,
  MenuItem as MuiMenuItem,
  InputAdornment,
  Snackbar,
  Input
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
  CameraAlt,
  DateRange,
  Favorite,
  History,
  Lock,
  Visibility,
  VisibilityOff,
  Share,
  MoreVert,
  QrCode,
  VerifiedUser,
  CalendarToday,
  Star,
  Payment,
  Loyalty,
  Description
} from '@mui/icons-material';
import { authAPI, profileApi, userAPI } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, updateUser, logout } = useAuth();
  const { language, changeLanguage } = useLanguage();

  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [profileError, setProfileError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
  });

  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    birth_date: '',
    address: '',
    created_at: '',
    loyalty_points: 0,
    membership_tier: 'Bronze',
    rating: 0,
    total_appointments: 0,
    favorite_barbers: 0,
    upcoming_appointments: 0,
    avatar_url: ''
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await authAPI.getProfile();
        const statsResponse = await profileApi.getUserStats();
        
        const userData = {
          full_name: userResponse.full_name || '',
          email: userResponse.email || '',
          phone_number: userResponse.phone_number || '',
          birth_date: userResponse.birth_date || '',
          address: userResponse.address || '',
          created_at: userResponse.created_at || '',
          loyalty_points: userResponse.loyalty_points || 0,
          membership_tier: userResponse.membership_tier || 'Bronze',
          rating: userResponse.rating || 0,
          total_appointments: statsResponse.total_appointments || 0,
          favorite_barbers: statsResponse.favorite_barbers || 0,
          upcoming_appointments: statsResponse.upcoming_appointments || 0,
          avatar_url: userResponse.avatar_url || ''
        };

        setUserInfo(userData);
        setEditedInfo(userData);
        setNotifications(userResponse.notification_settings || {
          email_notifications: true,
          push_notifications: true,
          sms_notifications: false
        });
      } catch (error) {
        setProfileError(error.response?.data?.detail || 'Failed to load profile');
        setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const content = {
    tr: {
      brand: 'BarberPro',
      profile: 'Profilim',
      personalInfo: 'Kişisel Bilgiler',
      settings: 'Ayarlar',
      security: 'Güvenlik',
      fullName: 'Ad Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      birthDate: 'Doğum Tarihi',
      address: 'Adres',
      memberSince: 'Üyelik Tarihi',
      totalAppointments: 'Toplam Randevu',
      favoriteBarbers: 'Favori Berber',
      loyaltyPoints: 'Sadakat Puanı',
      membershipTier: 'Üyelik Seviyesi',
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
      termsOfService: 'Kullanım Şartları',
      loading: 'Yükleniyor...',
      tryAgain: 'Tekrar Dene',
      close: 'Kapat',
      currentPassword: 'Mevcut Şifre',
      newPassword: 'Yeni Şifre',
      confirmPassword: 'Yeni Şifreyi Onayla',
      allFieldsRequired: 'Tüm alanlar zorunludur',
      passwordsNotMatch: 'Şifreler eşleşmiyor',
      passwordMinLength: 'Şifre en az 6 karakter olmalıdır',
      profileUpdated: 'Profil başarıyla güncellendi!',
      passwordChanged: 'Şifre başarıyla değiştirildi!',
      quickActions: 'Hızlı İşlemler',
      shareProfile: 'Profili Paylaş',
      viewQR: 'QR Kodunu Görüntüle',
      appointmentHistory: 'Randevu Geçmişi',
      paymentMethods: 'Ödeme Yöntemleri',
      securitySettings: 'Güvenlik Ayarları',
      darkMode: 'Karanlık Mod',
      deleteAccountConfirm: 'Hesabınızı silmek istediğinize emin misiniz?',
      cancelAppointment: 'Randevu İptal',
      reschedule: 'Yeniden Planla',
      rateService: 'Hizmeti Değerlendir',
      uploadAvatar: 'Profil Fotoğrafı Yükle'
    },
    en: {
      brand: 'BarberPro',
      profile: 'My Profile',
      personalInfo: 'Personal Information',
      settings: 'Settings',
      security: 'Security',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      birthDate: 'Birth Date',
      address: 'Address',
      memberSince: 'Member Since',
      totalAppointments: 'Total Appointments',
      favoriteBarbers: 'Favorite Barbers',
      loyaltyPoints: 'Loyalty Points',
      membershipTier: 'Membership Tier',
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
      termsOfService: 'Terms of Service',
      loading: 'Loading...',
      tryAgain: 'Try Again',
      close: 'Close',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      allFieldsRequired: 'All fields are required',
      passwordsNotMatch: 'Passwords do not match',
      passwordMinLength: 'Password must be at least 6 characters',
      profileUpdated: 'Profile updated successfully!',
      passwordChanged: 'Password changed successfully!',
      quickActions: 'Quick Actions',
      shareProfile: 'Share Profile',
      viewQR: 'View QR Code',
      appointmentHistory: 'Appointment History',
      paymentMethods: 'Payment Methods',
      securitySettings: 'Security Settings',
      darkMode: 'Dark Mode',
      deleteAccountConfirm: 'Are you sure you want to delete your account?',
      cancelAppointment: 'Cancel Appointment',
      reschedule: 'Reschedule',
      rateService: 'Rate Service',
      uploadAvatar: 'Upload Profile Picture'
    },
    ru: {
      brand: 'BarberPro',
      profile: 'Мой Профиль',
      personalInfo: 'Личная Информация',
      settings: 'Настройки',
      security: 'Безопасность',
      fullName: 'Полное имя',
      email: 'Email',
      phone: 'Телефон',
      birthDate: 'Дата Рождения',
      address: 'Адрес',
      memberSince: 'Участник с',
      totalAppointments: 'Всего Записей',
      favoriteBarbers: 'Любимые Парикмахеры',
      loyaltyPoints: 'Баллы Лояльности',
      membershipTier: 'Уровень Членства',
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
      termsOfService: 'Условия Использования',
      loading: 'Загрузка...',
      tryAgain: 'Попробовать снова',
      close: 'Закрыть',
      currentPassword: 'Текущий пароль',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердите новый пароль',
      allFieldsRequired: 'Все поля обязательны',
      passwordsNotMatch: 'Пароли не совпадают',
      passwordMinLength: 'Пароль должен содержать минимум 6 символов',
      profileUpdated: 'Профиль успешно обновлен!',
      passwordChanged: 'Пароль успешно изменен!',
      quickActions: 'Быстрые Действия',
      shareProfile: 'Поделиться Профилем',
      viewQR: 'Посмотреть QR-код',
      appointmentHistory: 'История Записей',
      paymentMethods: 'Способы Оплаты',
      securitySettings: 'Настройки Безопасности',
      darkMode: 'Темный Режим',
      deleteAccountConfirm: 'Вы уверены, что хотите удалить аккаунт?',
      cancelAppointment: 'Отменить Запись',
      reschedule: 'Перенести',
      rateService: 'Оценить Услугу',
      uploadAvatar: 'Загрузить фото профиля'
    }
  };

  const t = content[language] || content.en;

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  const handleInputChange = (field) => (event) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      try {
        const response = await profileApi.uploadAvatar(formData);
        setUserInfo(prev => ({ ...prev, avatar_url: response.avatar_url }));
        setSnackbar({ open: true, message: 'Profile picture uploaded successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: error.response?.data?.detail || 'Failed to upload avatar', severity: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        full_name: editedInfo.full_name,
        phone_number: editedInfo.phone_number,
        birth_date: editedInfo.birth_date,
        address: editedInfo.address
      };
      const response = await authAPI.updateProfile(updateData);
      setUserInfo(prev => ({ ...prev, ...response }));
      setEditing(false);
      setSnackbar({ open: true, message: t.profileUpdated, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.detail || 'Update failed', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError(t.allFieldsRequired);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t.passwordsNotMatch);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(t.passwordMinLength);
      return;
    }

    setLoading(true);
    try {
      await authAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setChangePasswordOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSnackbar({ open: true, message: t.passwordChanged, severity: 'success' });
    } catch (error) {
      setPasswordError(error.response?.data?.detail || t.passwordChangeFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (field) => (event) => {
    setNotifications(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await userAPI.updateNotificationSettings(notifications);
      setSnackbar({ open: true, message: 'Notifications updated successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.detail || 'Failed to update notifications', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbar({ open: true, message: 'Profile link copied!', severity: 'success' });
    handleMenuClose();
  };

  const handlePrivacyPolicy = () => {
    setPrivacyPolicyOpen(true);
  };

  const handleTermsOfService = () => {
    setTermsOfServiceOpen(true);
  };

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#00a693';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#00a693' }} />
      </Box>
    );
  }

  if (profileError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{profileError}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ 
        background: 'linear-gradient(135deg, #00a693 0%, #00897b 100%)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
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
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {t.profile}
          </Typography>
          
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MuiMenuItem onClick={handleShareProfile}>
              <Share sx={{ mr: 1 }} /> {t.shareProfile}
            </MuiMenuItem>
            <MuiMenuItem onClick={() => navigate('/appointments')}>
              <History sx={{ mr: 1 }} /> {t.appointmentHistory}
            </MuiMenuItem>
            <MuiMenuItem onClick={() => navigate('/payments')}>
              <Payment sx={{ mr: 1 }} /> {t.paymentMethods}
            </MuiMenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Quick Actions */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CalendarToday />}
              onClick={() => navigate('/appointments')}
              sx={{ py: 1.5, background: 'linear-gradient(45deg, #00a693, #4fd5c7)' }}
            >
              {t.appointmentHistory}
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Payment />}
              onClick={() => navigate('/payments')}
              sx={{ py: 1.5, background: 'linear-gradient(45deg, #ff6b35, #ff9b6a)' }}
            >
              {t.paymentMethods}
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Loyalty />}
              onClick={() => navigate('/loyalty')}
              sx={{ py: 1.5, background: 'linear-gradient(45deg, #10b981, #34d399)' }}
            >
              {t.loyaltyPoints}
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Star />}
              onClick={() => navigate('/ratings')}
              sx={{ py: 1.5, background: 'linear-gradient(45deg, #f59e0b, #fbbf24)' }}
            >
              {t.rateService}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Left Sidebar - Profile Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar
                    src={userInfo.avatar_url}
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: '3rem',
                      bgcolor: '#00a693',
                      border: '4px solid white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    {!userInfo.avatar_url && userInfo.full_name ? userInfo.full_name.charAt(0) : ''}
                  </Avatar>
                  <label htmlFor="avatar-upload">
                    <Fab
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: '#00a693',
                        color: 'white',
                        '&:hover': { bgcolor: '#007562' }
                      }}
                      component="span"
                    >
                      <CameraAlt />
                    </Fab>
                  </label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    sx={{ display: 'none' }}
                  />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {userInfo.full_name}
                </Typography>
                
                <Chip
                  icon={<VerifiedUser />}
                  label={userInfo.membership_tier}
                  sx={{
                    bgcolor: getTierColor(userInfo.membership_tier),
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2
                  }}
                />

                <Rating
                  value={userInfo.rating}
                  readOnly
                  precision={0.1}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ textAlign: 'left', mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ color: '#00a693', mr: 2 }} />
                    <Typography variant="body2">{userInfo.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ color: '#00a693', mr: 2 }} />
                    <Typography variant="body2">{userInfo.phone_number || 'N/A'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DateRange sx={{ color: '#00a693', mr: 2 }} />
                    <Typography variant="body2">
                      {t.memberSince}: {new Date(userInfo.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  {t.accountInfo}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#00a693', color: 'white', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.total_appointments}
                      </Typography>
                      <Typography variant="body2">
                        {t.totalAppointments}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ff6b35', color: 'white', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.favorite_barbers}
                      </Typography>
                      <Typography variant="body2">
                        {t.favoriteBarbers}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#10b981', color: 'white', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.loyalty_points}
                      </Typography>
                      <Typography variant="body2">
                        {t.loyaltyPoints}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#8b5cf6', color: 'white', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {userInfo.rating}
                      </Typography>
                      <Typography variant="body2">
                        Rating
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabValue}
                  onChange={(e, newValue) => setTabValue(newValue)}
                  variant={isMobile ? "scrollable" : "fullWidth"}
                  sx={{
                    '& .MuiTab-root': { fontWeight: 'bold' },
                    '& .Mui-selected': { color: '#00a693' }
                  }}
                >
                  <Tab label={t.personalInfo} />
                  <Tab label={t.settings} />
                  <Tab label={t.security} />
                </Tabs>
              </Box>

              {/* Personal Information Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {t.personalInfo}
                    </Typography>
                    {!editing ? (
                      <Button
                        startIcon={<Edit />}
                        onClick={() => setEditing(true)}
                        variant="outlined"
                        sx={{ color: '#00a693', borderColor: '#00a693' }}
                      >
                        {t.edit}
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <Button
                          startIcon={<Save />}
                          variant="contained"
                          onClick={handleSave}
                          disabled={loading}
                          sx={{ bgcolor: '#00a693' }}
                        >
                          {loading ? <CircularProgress size={20} /> : t.save}
                        </Button>
                        <Button
                          startIcon={<Cancel />}
                          variant="outlined"
                          onClick={() => setEditing(false)}
                          disabled={loading}
                        >
                          {t.cancel}
                        </Button>
                      </Stack>
                    )}
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={t.fullName}
                        value={editing ? editedInfo.full_name : userInfo.full_name}
                        onChange={handleInputChange('full_name')}
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
                        disabled
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t.phone}
                        value={editing ? editedInfo.phone_number : userInfo.phone_number || 'N/A'}
                        onChange={handleInputChange('phone_number')}
                        disabled={!editing}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t.birthDate}
                        type="date"
                        value={editing ? editedInfo.birth_date : userInfo.birth_date || ''}
                        onChange={handleInputChange('birth_date')}
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
                        value={editing ? editedInfo.address : userInfo.address || ''}
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
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {t.preferences}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {t.language}
                    </Typography>
                    <FormControl fullWidth sx={{ maxWidth: 300 }}>
                      <InputLabel>{t.language}</InputLabel>
                      <Select
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        label={t.language}
                      >
                        <MenuItem value="tr">🇹🇷 {t.turkish}</MenuItem>
                        <MenuItem value="en">🇺🇸 {t.english}</MenuItem>
                        <MenuItem value="ru">🇷🇺 {t.russian}</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {t.notifications}
                    </Typography>
                    <Stack spacing={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.email_notifications}
                            onChange={handleNotificationChange('email_notifications')}
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
                            checked={notifications.push_notifications}
                            onChange={handleNotificationChange('push_notifications')}
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
                            checked={notifications.sms_notifications}
                            onChange={handleNotificationChange('sms_notifications')}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#00a693' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00a693' }
                            }}
                          />
                        }
                        label={t.smsNotifications}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSaveNotifications}
                        sx={{ mt: 2, bgcolor: '#00a693' }}
                      >
                        {t.save}
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                    {t.security}
                  </Typography>

                  <List>
                    <ListItemButton onClick={() => setChangePasswordOpen(true)}>
                      <ListItemIcon>
                        <Lock sx={{ color: '#00a693' }} />
                      </ListItemIcon>
                      <ListItemText primary={t.changePassword} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={() => navigate('/security')}>
                      <ListItemIcon>
                        <Security sx={{ color: '#00a693' }} />
                      </ListItemIcon>
                      <ListItemText primary={t.securitySettings} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={() => navigate('/support')}>
                      <ListItemIcon>
                        <Help sx={{ color: '#00a693' }} />
                      </ListItemIcon>
                      <ListItemText primary={t.help} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={handlePrivacyPolicy}>
                      <ListItemIcon>
                        <VerifiedUser sx={{ color: '#00a693' }} />
                      </ListItemIcon>
                      <ListItemText primary={t.privacyPolicy} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={handleTermsOfService}>
                      <ListItemIcon>
                        <Description sx={{ color: '#00a693' }} />
                      </ListItemIcon>
                      <ListItemText primary={t.termsOfService} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton
                      onClick={() => {
                        if (window.confirm(t.deleteAccountConfirm)) {
                          // Handle account deletion (backend endpoint eklenebilir)
                        }
                      }}
                      sx={{ color: '#ef4444' }}
                    >
                      <ListItemIcon>
                        <ExitToApp sx={{ color: '#ef4444' }} />
                      </ListItemIcon>
                      <ListItemText primary={t.deleteAccount} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton
                      onClick={() => {
                        logout();
                        navigate('/');
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
          </Grid>
        </Grid>
      </Container>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#00a693', color: 'white' }}>
          {t.changePassword}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}

          <TextField
            fullWidth
            label={t.currentPassword}
            type={showPassword ? 'text' : 'password'}
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label={t.newPassword}
            type={showPassword ? 'text' : 'password'}
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            margin="normal"
          />

          <TextField
            fullWidth
            label={t.confirmPassword}
            type={showPassword ? 'text' : 'password'}
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
            disabled={loading}
            sx={{ bgcolor: '#00a693' }}
          >
            {loading ? <CircularProgress size={20} /> : t.save}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog
        open={privacyPolicyOpen}
        onClose={() => setPrivacyPolicyOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#00a693', color: 'white' }}>
          {t.privacyPolicy}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1">
            This is the Privacy Policy content. Replace with actual content or load from an API.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPrivacyPolicyOpen(false)}
            color="inherit"
          >
            {t.close}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog
        open={termsOfServiceOpen}
        onClose={() => setTermsOfServiceOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#00a693', color: 'white' }}>
          {t.termsOfService}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1">
            This is the Terms of Service content. Replace with actual content or load from an API.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setTermsOfServiceOpen(false)}
            color="inherit"
          >
            {t.close}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;