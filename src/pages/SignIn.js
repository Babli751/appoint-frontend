import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
} from '@mui/icons-material';

const SignIn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language, changeLanguage, t: translations } = useLanguage();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Page-specific translations
  const t = {
    ...translations,
    signInTitle: language === 'en' ? 'Sign In to BarberPro' : language === 'tr' ? 'BarberPro\'ya Giriş Yapın' : 'Войти в BarberPro',
    signInSubtitle: language === 'en' ? 'Welcome back! Please sign in to your account' : language === 'tr' ? 'Tekrar hoş geldiniz! Lütfen hesabınıza giriş yapın' : 'Добро пожаловать! Пожалуйста, войдите в сво�� аккаунт',
    email: language === 'en' ? 'Email Address' : language === 'tr' ? 'E-posta Adresi' : 'Адрес электронной почты',
    password: language === 'en' ? 'Password' : language === 'tr' ? 'Şifre' : 'Пароль',
    rememberMe: language === 'en' ? 'Remember me' : language === 'tr' ? 'Beni hatırla' : 'Запомнить меня',
    forgotPassword: language === 'en' ? 'Forgot Password?' : language === 'tr' ? 'Şifremi Unuttum?' : 'Забыли пароль?',
    signInButton: language === 'en' ? 'Sign In' : language === 'tr' ? 'Giriş Yap' : 'Войти',
    orContinueWith: language === 'en' ? 'Or continue with' : language === 'tr' ? 'Veya şununla devam edin' : 'Или продолжить с',
    dontHaveAccount: language === 'en' ? 'Don\'t have an account?' : language === 'tr' ? 'Hesabınız yok mu?' : 'Нет аккаунта?',
    signUpLink: language === 'en' ? 'Sign up here' : language === 'tr' ? 'Buradan kayıt olun' : 'Зарегистрируйтесь здесь',
    continueWithGoogle: language === 'en' ? 'Continue with Google' : language === 'tr' ? 'Google ile devam et' : 'Продолжить с Google',
    continueWithFacebook: language === 'en' ? 'Continue with Facebook' : language === 'tr' ? 'Facebook ile devam et' : 'Продолжить с Facebook',
    continueWithApple: language === 'en' ? 'Continue with Apple' : language === 'tr' ? 'Apple ile devam et' : 'Продолжить с Apple',
    invalidCredentials: language === 'en' ? 'Invalid email or password' : language === 'tr' ? 'Geçersiz e-posta veya şifre' : 'Неверный email или пароль'
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call real login API
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.detail || t.invalidCredentials;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
    // For now, just redirect to home page
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fffe' }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid #e5e7eb',
        py: { xs: 1, md: 2 }
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            px: { xs: 1, md: 0 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/')} sx={{ color: '#00a693' }}>
                <ArrowBack />
              </IconButton>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                {t.brand}
              </Typography>
            </Box>
            
            {/* Language Selector */}
            <FormControl size="small" sx={{ minWidth: { xs: 60, md: 100 } }}>
              <Select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                }}
              >
                <MenuItem value="en">🇬🇧 {isMobile ? 'EN' : 'English'}</MenuItem>
                <MenuItem value="tr">🇹🇷 {isMobile ? 'TR' : 'Türkçe'}</MenuItem>
                <MenuItem value="ru">🇷🇺 {isMobile ? 'RU' : 'Русский'}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Card sx={{ 
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 166, 147, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Header Section */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)',
            color: 'white',
            p: { xs: 3, md: 4 },
            textAlign: 'center'
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}>
              {t.signInTitle}
            </Typography>
            <Typography variant="body1" sx={{ 
              opacity: 0.9,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}>
              {t.signInSubtitle}
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}


            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label={t.email}
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                sx={{ mb: 3 }}
                variant="outlined"
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label={t.password}
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                required
                sx={{ mb: 2 }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Remember Me & Forgot Password */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 }
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                      sx={{ color: '#00a693' }}
                    />
                  }
                  label={t.rememberMe}
                  sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}
                />
                <Button 
                  variant="text" 
                  sx={{ 
                    color: '#00a693', 
                    textTransform: 'none',
                    fontSize: { xs: '0.85rem', md: '1rem' }
                  }}
                >
                  {t.forgotPassword}
                </Button>
              </Box>

              {/* Sign In Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  bgcolor: '#00a693',
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '&:hover': { bgcolor: '#007562' }
                }}
              >
                {loading ? t.loading : t.signInButton}
              </Button>
            </form>

            {/* Divider */}
            <Box sx={{ my: 3 }}>
              <Divider>
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  {t.orContinueWith}
                </Typography>
              </Divider>
            </Box>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('google')}
                sx={{ 
                  borderColor: '#db4437', 
                  color: '#db4437',
                  '&:hover': { bgcolor: '#fef7f7' }
                }}
              >
                {t.continueWithGoogle}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin('facebook')}
                sx={{ 
                  borderColor: '#4267B2', 
                  color: '#4267B2',
                  '&:hover': { bgcolor: '#f7f9ff' }
                }}
              >
                {t.continueWithFacebook}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Apple />}
                onClick={() => handleSocialLogin('apple')}
                sx={{ 
                  borderColor: '#000', 
                  color: '#000',
                  '&:hover': { bgcolor: '#f9f9f9' }
                }}
              >
                {t.continueWithApple}
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {t.dontHaveAccount}{' '}
                <Button
                  component={Link}
                  to="/signup"
                  variant="text"
                  sx={{ 
                    color: '#00a693', 
                    textTransform: 'none',
                    fontWeight: 'bold',
                    p: 0,
                    minWidth: 'auto'
                  }}
                >
                  {t.signUpLink}
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SignIn;
