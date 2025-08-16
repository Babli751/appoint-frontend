import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { authAPI } from '../services/api';
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
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const SignUp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language, changeLanguage, t: translations } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Page-specific translations
  const t = {
    ...translations,
    signUpTitle: language === 'en' ? 'Create Your BarberPro Account' : language === 'tr' ? 'BarberPro Hesabınızı Oluşturun' : 'Создайте свой аккаунт BarberPro',
    signUpSubtitle: language === 'en' ? 'Join thousands of happy customers' : language === 'tr' ? 'Binlerce mutlu müşteriye katılın' : 'Присоединяйтесь к тысячам довольных клиентов',
    firstName: language === 'en' ? 'First Name' : language === 'tr' ? 'Ad' : 'Имя',
    lastName: language === 'en' ? 'Last Name' : language === 'tr' ? 'Soyad' : 'Фамилия',
    email: language === 'en' ? 'Email Address' : language === 'tr' ? 'E-posta Adresi' : 'Адрес электронной почты',
    password: language === 'en' ? 'Password' : language === 'tr' ? 'Şifre' : 'Пароль',
    confirmPassword: language === 'en' ? 'Confirm Password' : language === 'tr' ? 'Şifreyi Onayla' : 'Подтвердите пароль',
    agreeToTerms: language === 'en' ? 'I agree to the Terms of Service and Privacy Policy' : language === 'tr' ? 'Hizmet Şartları ve Gizlilik Politikası\'nı kabul ediyorum' : 'Я согласен с Условиями обслуживания и Политикой конфиденциальности',
    termsOfService: language === 'en' ? 'Terms of Service' : language === 'tr' ? 'Hizmet Şartları' : 'Условия обслуживания',
    privacyPolicy: language === 'en' ? 'Privacy Policy' : language === 'tr' ? 'Gizlilik Politikası' : 'Политика конфиденциальности',
    signUpButton: language === 'en' ? 'Create Account' : language === 'tr' ? 'Hesap Oluştur' : 'Создать аккаунт',
    orContinueWith: language === 'en' ? 'Or continue with' : language === 'tr' ? 'Veya şununla devam edin' : 'Или продолжить с',
    alreadyHaveAccount: language === 'en' ? 'Already have an account?' : language === 'tr' ? 'Zaten hesabınız var mı?' : 'Уже есть аккаунт?',
    signInLink: language === 'en' ? 'Sign in here' : language === 'tr' ? 'Buradan giriş yapın' : 'Войдите здесь',
    continueWithGoogle: language === 'en' ? 'Continue with Google' : language === 'tr' ? 'Google ile devam et' : 'Продо��жить с Google',
    continueWithFacebook: language === 'en' ? 'Continue with Facebook' : language === 'tr' ? 'Facebook ile devam et' : 'Продолжить с Facebook',
    continueWithApple: language === 'en' ? 'Continue with Apple' : language === 'tr' ? 'Apple ile devam et' : 'Продолжить с Apple',
    emailExists: language === 'en' ? 'Email already exists' : language === 'tr' ? 'E-posta zaten mevcut' : 'Email уже существует',
    passwordMismatch: language === 'en' ? 'Passwords do not match' : language === 'tr' ? 'Şifreler eşleşmiyor' : 'Пароли не совпадают',
    passwordWeak: language === 'en' ? 'Password must be at least 8 characters' : language === 'tr' ? '��ifre en az 8 karakter olmalı' : 'Пароль должен содержать не менее 8 символов',
    passwordStrength: language === 'en' ? 'Password Strength:' : language === 'tr' ? 'Şifre Gücü:' : 'Сила пароля:',
    weak: language === 'en' ? 'Weak' : language === 'tr' ? 'Zayıf' : 'Слабый',
    medium: language === 'en' ? 'Medium' : language === 'tr' ? 'Orta' : 'Средний',
    strong: language === 'en' ? 'Strong' : language === 'tr' ? 'Güçlü' : 'Сильный'
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError('');
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 0, label: t.weak, color: '#ef4444' };
    if (password.length < 10) return { strength: 50, label: t.medium, color: '#f59e0b' };
    return { strength: 100, label: t.strong, color: '#10b981' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch);
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError(t.passwordWeak);
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError(t.agreeToTerms);
      setLoading(false);
      return;
    }

    try {
      // Call register API without auto-login
      await authAPI.register(formData.email, formData.password, formData.firstName, formData.lastName);

      // Redirect to signin page after successful registration
      navigate('/signin');
    } catch (err) {
      setError(t.emailExists);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Implement social login logic here
    // After social signup, redirect to signin page
    navigate('/signin');
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
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
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
              fontSize: { xs: '1.4rem', md: '2rem' }
            }}>
              {t.signUpTitle}
            </Typography>
            <Typography variant="body1" sx={{ 
              opacity: 0.9,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}>
              {t.signUpSubtitle}
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Fields */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label={t.firstName}
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label={t.lastName}
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  required
                  variant="outlined"
                />
              </Box>

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

              {/* Password Strength Indicator */}
              {formData.password && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1, fontSize: '0.8rem' }}>
                      {t.passwordStrength}
                    </Typography>
                    <Typography variant="body2" sx={{ color: passwordStrength.color, fontWeight: 'bold', fontSize: '0.8rem' }}>
                      {passwordStrength.label}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={passwordStrength.strength} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: passwordStrength.color
                      }
                    }}
                  />
                </Box>
              )}

              {/* Confirm Password Field */}
              <TextField
                fullWidth
                label={t.confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                required
                sx={{ mb: 3 }}
                variant="outlined"
                error={formData.confirmPassword && formData.password !== formData.confirmPassword}
                helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? t.passwordMismatch : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      {formData.confirmPassword && (
                        <Box sx={{ ml: 1 }}>
                          {formData.password === formData.confirmPassword ? 
                            <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} /> : 
                            <Cancel sx={{ color: '#ef4444', fontSize: 20 }} />
                          }
                        </Box>
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              {/* Terms Agreement */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                    sx={{ color: '#00a693' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                    {language === 'en' ? 'I agree to the ' : language === 'tr' ? '' : 'Я согласен с '}
                    <Button variant="text" sx={{ p: 0, minWidth: 'auto', textTransform: 'none', color: '#00a693', fontSize: 'inherit' }}>
                      {t.termsOfService}
                    </Button>
                    {language === 'en' ? ' and ' : language === 'tr' ? ' ve ' : ' и '}
                    <Button variant="text" sx={{ p: 0, minWidth: 'auto', textTransform: 'none', color: '#00a693', fontSize: 'inherit' }}>
                      {t.privacyPolicy}
                    </Button>
                    {language === 'tr' ? '\'nı kabul ediyorum' : ''}
                  </Typography>
                }
                sx={{ mb: 3, alignItems: 'flex-start' }}
              />

              {/* Sign Up Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !formData.agreeToTerms}
                sx={{
                  bgcolor: '#00a693',
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  '&:hover': { bgcolor: '#007562' }
                }}
              >
                {loading ? t.loading : t.signUpButton}
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

            {/* Sign In Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {t.alreadyHaveAccount}{' '}
                <Button
                  component={Link}
                  to="/signin"
                  variant="text"
                  sx={{ 
                    color: '#00a693', 
                    textTransform: 'none',
                    fontWeight: 'bold',
                    p: 0,
                    minWidth: 'auto'
                  }}
                >
                  {t.signInLink}
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SignUp;
