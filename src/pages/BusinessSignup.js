import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  Business,
  Person,
  LocationOn,
  Phone,
  Description,
  ContentCut,
  Euro,
  AccessTime,
  CheckCircle,
  TrendingUp,
  Schedule,
  Star,
  ArrowBack,
  Add,
  Delete,
} from '@mui/icons-material';

const BusinessSignup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language, changeLanguage, t } = useLanguage();

  const [activeStep, setActiveStep] = useState(0);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    services: []
  });

  const [newService, setNewService] = useState({
    name: '',
    price: '',
    duration: ''
  });

  const steps = [
    t.businessInfo,
    t.services,
    language === 'en' ? 'Complete' : language === 'tr' ? 'Tamamla' : 'Завершить'
  ];

  const handleInputChange = (field, value) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = () => {
    if (newService.name && newService.price && newService.duration) {
      setBusinessData(prev => ({
        ...prev,
        services: [...prev.services, { ...newService, id: Date.now() }]
      }));
      setNewService({ name: '', price: '', duration: '' });
    }
  };

  const handleRemoveService = (serviceId) => {
    setBusinessData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== serviceId)
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Handle business registration
    console.log('Business registration data:', businessData);
    // Redirect to business dashboard
    navigate('/business-dashboard');
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return businessData.businessName && businessData.ownerName && 
               businessData.email && businessData.phone && 
               businessData.address && businessData.city;
      case 1:
        return businessData.services.length > 0;
      default:
        return true;
    }
  };

  const features = [
    {
      icon: <TrendingUp sx={{ color: '#00a693' }} />,
      title: t.increaseBookings,
      description: language === 'en' 
        ? 'Get more customers through our platform' 
        : language === 'tr' 
        ? 'Platformumuz aracılığıyla daha fazla müşteri edinin'
        : 'Получайте больше клиентов через нашу платформу'
    },
    {
      icon: <Schedule sx={{ color: '#00a693' }} />,
      title: t.easyManagement,
      description: language === 'en' 
        ? 'Manage appointments and services easily' 
        : language === 'tr' 
        ? 'Randevuları ve hizmetleri kolayca yönetin'
        : 'Легко управляйте встречами и услугами'
    },
    {
      icon: <Star sx={{ color: '#00a693' }} />,
      title: t.growYourBusiness,
      description: language === 'en' 
        ? 'Build your reputation with reviews' 
        : language === 'tr' 
        ? 'Yorumlarla itibarınızı artırın'
        : 'Развивайте репутацию с помощью отзывов'
    }
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
              <IconButton 
                onClick={() => navigate('/')} 
                sx={{ mr: 2 }}
              >
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#1f2937'
          }}>
            {t.joinOurNetwork}
          </Typography>
          <Typography variant="h5" sx={{ 
            color: '#6b7280', 
            mb: 4,
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}>
            {t.businessSubtitle}
          </Typography>

          {/* Features */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 20px rgba(0, 166, 147, 0.1)' }
                }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Registration Form */}
        <Card sx={{ maxWidth: 800, mx: 'auto', borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  {t.businessInfo}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t.businessName}
                      value={businessData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      InputProps={{
                        startAdornment: <Business sx={{ mr: 1, color: '#00a693' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t.ownerName}
                      value={businessData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: '#00a693' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t.email}
                      type="email"
                      value={businessData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t.phoneNumber}
                      value={businessData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: '#00a693' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label={t.businessAddress}
                      value={businessData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: '#00a693' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label={t.city}
                      value={businessData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t.businessDescription}
                      multiline
                      rows={3}
                      value={businessData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      InputProps={{
                        startAdornment: <Description sx={{ mr: 1, color: '#00a693', alignSelf: 'flex-start', mt: 1 }} />
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  {t.manageServices}
                </Typography>
                
                {/* Add Service Form */}
                <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8fffe', border: '1px solid #e5f7f5' }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#00a693' }}>
                    {t.addService}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <TextField
                        fullWidth
                        label={t.serviceName}
                        value={newService.name}
                        onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                        InputProps={{
                          startAdornment: <ContentCut sx={{ mr: 1, color: '#00a693' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        fullWidth
                        label={t.servicePrice}
                        value={newService.price}
                        onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                        InputProps={{
                          startAdornment: <Euro sx={{ mr: 1, color: '#00a693' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        fullWidth
                        label={t.serviceDuration}
                        value={newService.duration}
                        onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                        InputProps={{
                          startAdornment: <AccessTime sx={{ mr: 1, color: '#00a693' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleAddService}
                        sx={{ 
                          bgcolor: '#00a693', 
                          height: '56px',
                          '&:hover': { bgcolor: '#007562' }
                        }}
                      >
                        {t.addService}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Services List */}
                {businessData.services.length > 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {t.services} ({businessData.services.length})
                    </Typography>
                    <List>
                      {businessData.services.map((service) => (
                        <Paper key={service.id} sx={{ mb: 2, p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {service.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                €{service.price} • {service.duration} {t.minutes}
                              </Typography>
                            </Box>
                            <IconButton 
                              onClick={() => handleRemoveService(service.id)}
                              sx={{ color: '#ef4444' }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))}
                    </List>
                  </Box>
                )}

                {businessData.services.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ContentCut sx={{ fontSize: 48, color: '#d1d5db', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      {language === 'en' 
                        ? 'No services added yet. Add your first service above.'
                        : language === 'tr'
                        ? 'Henüz hizmet eklenmedi. İlk hizmetinizi yukarıdan ekleyin.'
                        : 'Услуги еще не добавлены. Добавьте первую услугу выше.'
                      }
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle sx={{ fontSize: 80, color: '#00a693', mb: 3 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {language === 'en' 
                    ? 'Welcome to BarberPro!'
                    : language === 'tr'
                    ? 'BarberPro\'ya Hoş Geldiniz!'
                    : 'Добро пожаловать в BarberPro!'
                  }
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  {language === 'en' 
                    ? 'Your business registration is complete. Start managing your bookings and grow your business.'
                    : language === 'tr'
                    ? 'İşletme kaydınız tamamlandı. Rezervasyonlarınızı yönetmeye başlayın ve işletmenizi büyütün.'
                    : 'Регистрация вашего бизнеса завершена. Начните управлять бронированиями и развивайте свой бизнес.'
                  }
                </Typography>
                
                <Stack spacing={2} sx={{ maxWidth: 400, mx: 'auto' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    sx={{ 
                      bgcolor: '#00a693',
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: '#007562' }
                    }}
                  >
                    {language === 'en' 
                      ? 'Go to Business Dashboard'
                      : language === 'tr'
                      ? 'İşletme Paneline Git'
                      : 'Перейти в бизнес-панель'
                    }
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                  >
                    {language === 'en' 
                      ? 'Back to Home'
                      : language === 'tr'
                      ? 'Ana Sayfaya Dön'
                      : 'Вернуться на главную'
                    }
                  </Button>
                </Stack>
              </Box>
            )}

            {/* Navigation Buttons */}
            {activeStep < 2 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: '#6b7280' }}
                >
                  {t.back}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  sx={{ 
                    bgcolor: '#00a693',
                    '&:hover': { bgcolor: '#007562' }
                  }}
                >
                  {activeStep === steps.length - 2 ? t.submit : t.next}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default BusinessSignup;
