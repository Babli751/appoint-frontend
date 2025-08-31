import { businessAPI } from '../services/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Box, Typography, TextField, Button, Container, Card, CardContent, Grid,
  Stepper, Step, StepLabel, Stack, IconButton, AppBar, Toolbar, FormControl,
  Select, MenuItem, List, Paper, Tabs, Tab, Divider
} from '@mui/material';
import {
  Business, Person, LocationOn, Phone, Description, ContentCut, Euro,
  AccessTime, CheckCircle, TrendingUp, Schedule, Star, ArrowBack, Add, Delete,
  Login, AppRegistration
} from '@mui/icons-material';

const BusinessSignup = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();

  const [activeTab, setActiveTab] = useState(0); // 0: Login, 1: Sign Up
  const [activeStep, setActiveStep] = useState(0);

  const [businessData, setBusinessData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    services: []
  });

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });

  const steps = [
    t.businessInfo,
    t.services,
    language === 'en' ? 'Complete' : language === 'tr' ? 'Tamamla' : 'Завершить'
  ];

  const handleInputChange = (field, value) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
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
      services: prev.services.filter(s => s.id !== serviceId)
    }));
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  // ✅ Login
  const handleLogin = async () => {
    try {
      const result = await businessAPI.login(loginData.email, loginData.password);
      localStorage.setItem('businessToken', result.access_token);
      navigate('/business-dashboard');
    } catch (err) {
      alert('Giriş sırasında hata: ' + (err.response?.data?.detail || err.message));
    }
  };

  // ✅ Signup
  const handleSubmit = async () => {
    try {
      const payload = {
        name: businessData.businessName,
        owner_name: businessData.ownerName,
        email: businessData.email,
        password: businessData.password,
        phone: businessData.phone,
        address: businessData.address,
        city: businessData.city,
        description: businessData.description,
        services: businessData.services.map(s => ({
          name: s.name,
          price: parseFloat(s.price),
          duration: parseInt(s.duration, 10)
        }))
      };
      const result = await businessAPI.signup(payload);
      localStorage.setItem('businessToken', result.access_token);
      navigate('/business-dashboard');
    } catch (err) {
      alert('Kayıt sırasında hata: ' + (err.response?.data?.message || err.message));
    }
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

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      {/* Header */}
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ maxWidth: 800, mx: 'auto', borderRadius: 3, mb: 4 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Tabs */}
            <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} variant="fullWidth"
              sx={{ '& .MuiTab-root': { py: 2, fontSize: '1rem', fontWeight: 'bold' }, '& .Mui-selected': { color: '#00a693 !important' } }}
            >
              <Tab icon={<Login />} iconPosition="start" label={language === 'en' ? 'Business Login' : language === 'tr' ? 'İşletme Girişi' : 'Бизнес Вход'} />
              <Tab icon={<AppRegistration />} iconPosition="start" label={language === 'en' ? 'Business Sign Up' : language === 'tr' ? 'İşletme Kaydı' : 'Бизнес Регистрация'} />
            </Tabs>
            <Divider />

            {/* Login */}
            {activeTab === 0 && (
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3}>
                  <TextField fullWidth label="Email" value={loginData.email} onChange={(e) => handleLoginChange('email', e.target.value)} type="email" />
                  <TextField fullWidth label="Password" value={loginData.password} onChange={(e) => handleLoginChange('password', e.target.value)} type="password" />
                  <Button variant="contained" size="large" onClick={handleLogin} disabled={!loginData.email || !loginData.password} sx={{ bgcolor: '#00a693', '&:hover': { bgcolor: '#007562' } }}>
                    Login
                  </Button>
                </Stack>
              </Box>
            )}

            {/* Sign Up */}
            {activeTab === 1 && (
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                  ))}
                </Stepper>

                {activeStep === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label={t.businessName} value={businessData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} InputProps={{ startAdornment: <Business sx={{ mr: 1, color: '#00a693' }} /> }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label={t.ownerName} value={businessData.ownerName} onChange={(e) => handleInputChange('ownerName', e.target.value)} InputProps={{ startAdornment: <Person sx={{ mr: 1, color: '#00a693' }} /> }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label={t.email} value={businessData.email} onChange={(e) => handleInputChange('email', e.target.value)} type="email" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="Password" value={businessData.password} onChange={(e) => handleInputChange('password', e.target.value)} type="password" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label={t.phoneNumber} value={businessData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: '#00a693' }} /> }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField fullWidth label={t.businessAddress} value={businessData.address} onChange={(e) => handleInputChange('address', e.target.value)} InputProps={{ startAdornment: <LocationOn sx={{ mr: 1, color: '#00a693' }} /> }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth label={t.city} value={businessData.city} onChange={(e) => handleInputChange('city', e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label={t.businessDescription} multiline rows={3} value={businessData.description} onChange={(e) => handleInputChange('description', e.target.value)} InputProps={{ startAdornment: <Description sx={{ mr: 1, color: '#00a693', mt: 1 }} /> }} />
                    </Grid>
                  </Grid>
                )}

                {activeStep === 1 && (
                  <Box>
                    <Paper sx={{ p: 3, mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>Add Service</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                          <TextField fullWidth label="Service Name" value={newService.name} onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField fullWidth label="Price" value={newService.price} onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))} />
                        </Grid>
                        <Grid item xs={6} md={2}>
                          <TextField fullWidth label="Duration" value={newService.duration} onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button fullWidth variant="contained" onClick={handleAddService}>Add</Button>
                        </Grid>
                      </Grid>
                    </Paper>

                    <List>
                      {businessData.services.map(service => (
                        <Paper key={service.id} sx={{ mb: 2, p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography>{service.name}</Typography>
                              <Typography>€{service.price} • {service.duration} min</Typography>
                            </Box>
                            <IconButton onClick={() => handleRemoveService(service.id)}> <Delete /> </IconButton>
                          </Box>
                        </Paper>
                      ))}
                    </List>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CheckCircle sx={{ fontSize: 80, color: '#00a693', mb: 3 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Registration Complete!</Typography>
                    <Button variant="contained" onClick={handleSubmit}>Go to Dashboard</Button>
                  </Box>
                )}

                {/* Navigation Buttons */}
                {activeStep < 2 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
                    <Button variant="contained" onClick={handleNext} disabled={!canProceed()}>Next</Button>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default BusinessSignup;
