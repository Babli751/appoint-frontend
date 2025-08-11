import React, { useState } from 'react';
import api from '../services/api';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  Stack
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  ContentCut,
  Star,
  Schedule
} from '@mui/icons-material';

export default function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const data = isRegister ? { name, email, password } : { email, password };
      
      const response = await api.post(endpoint, data);
      localStorage.setItem('token', response.data.token);
      setAuth(true);
    } catch (err) {
      alert(isRegister ? 'Kayıt başarısız: ' + err.response?.data?.error : 'Giriş başarısız: ' + err.response?.data?.error);
    }
  };

  const features = [
    { icon: <ContentCut />, text: 'Profesyonel Berberler' },
    { icon: <Schedule />, text: 'Kolay Randevu Sistemi' },
    { icon: <Star />, text: 'Değerlendirme & Yorum' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6b46c1 0%, #9333ea 100%)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          minHeight: '80vh',
          gap: 8
        }}>
          {/* Left Side - Brand & Features */}
          <Box sx={{ 
            flex: 1, 
            color: 'white',
            display: { xs: 'none', md: 'block' }
          }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              fontSize: { md: '3rem', lg: '4rem' }
            }}>
              BarberPro
            </Typography>
            <Typography variant="h5" sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontWeight: 300
            }}>
              En iyi berberleri keşfedin ve kolayca randevu alın
            </Typography>
            
            <Stack spacing={3}>
              {features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%', 
                    p: 1.5, 
                    mr: 2 
                  }}>
                    {React.cloneElement(feature.icon, { sx: { fontSize: 24 } })}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Right Side - Login Form */}
          <Box sx={{ flex: { xs: 1, md: 0.6 } }}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box sx={{ 
                    bgcolor: '#6b46c1', 
                    borderRadius: '50%', 
                    width: 60, 
                    height: 60, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}>
                    <Person sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {isRegister ? 'Hesap Oluştur' : 'Hoş Geldiniz'}
                  </Typography>
                  <Typography color="text.secondary">
                    {isRegister 
                      ? 'Yeni hesap oluşturun ve berberleri keşfedin'
                      : 'Hesabınıza giriş yapın'
                    }
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {isRegister && (
                    <TextField
                      label="Ad Soyad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      margin="normal"
                      required
                      sx={{ mb: 2 }}
                    />
                  )}
                  
                  <TextField
                    label="E-posta"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    label="Şifre"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
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
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    sx={{ 
                      bgcolor: '#6b46c1',
                      fontWeight: 'bold',
                      py: 1.5,
                      mb: 3,
                      '&:hover': { bgcolor: '#553c9a' }
                    }}
                  >
                    {isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}
                  </Button>

                  <Divider sx={{ mb: 3 }}>
                    <Typography color="text.secondary" variant="body2">
                      veya
                    </Typography>
                  </Divider>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {isRegister ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}
                    </Typography>
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => setIsRegister(!isRegister)}
                      sx={{ 
                        color: '#6b46c1', 
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {isRegister ? 'Giriş Yap' : 'Kayıt Ol'}
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
