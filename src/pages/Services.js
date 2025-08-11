import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack,
  ContentCut,
  Face,
  ColorLens,
  Spa,
  AutoAwesome,
  Language,
  AccessTime,
  EuroSymbol
} from '@mui/icons-material';

const Services = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const { language, changeLanguage, t: translations } = useLanguage();

  // Language content
  const content = {
    en: {
      brand: 'BarberPro',
      services: 'Our Services',
      subtitle: 'Professional barber services across Europe',
      bookNow: 'Book Now',
      duration: 'Duration',
      price: 'Starting from',
      popular: 'Popular',
      premium: 'Premium',
      traditional: 'Traditional',
      minutes: 'min',
      currency: '€'
    },
    tr: {
      brand: 'BarberPro',
      services: 'Hizmetlerimiz',
      subtitle: 'Avrupa genelinde profesyonel berber hizmetleri',
      bookNow: 'Rezervasyon Yap',
      duration: 'Süre',
      price: 'Başlangıç',
      popular: 'Popüler',
      premium: 'Premium',
      traditional: 'Geleneksel',
      minutes: 'dk',
      currency: '€'
    },
    ru: {
      brand: 'BarberPro',
      services: 'Наши услуги',
      subtitle: 'Профессиональные парикмахерские услуги по всей Европе',
      bookNow: 'Забронировать',
      duration: 'Продолжительность',
      price: 'Начиная от',
      popular: 'Популярная',
      premium: 'Премиум',
      traditional: 'Традиционная',
      minutes: 'мин',
      currency: '€'
    }
  };

  // Use specific translations for this page
  const t = {
    ...translations,
    services: translations.ourServices,
    subtitle: translations.servicesSubtitle
  };

  const serviceCategories = [
    {
      id: 'haircut',
      name: language === 'en' ? 'Haircuts' : language === 'tr' ? 'Saç Kesimleri' : 'Стрижки',
      description: language === 'en' 
        ? 'Professional cuts from classic to modern styles'
        : language === 'tr' 
        ? 'Klasikten moderne profesyonel saç kesimleri'
        : 'Профессиональные стрижки от классических до современных',
      icon: <ContentCut />,
      image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=300&fit=crop',
      services: [
        {
          name: language === 'en' ? 'Classic Cut' : language === 'tr' ? 'Klasik Kesim' : 'Классическая стрижка',
          duration: 30,
          price: 25,
          description: language === 'en' 
            ? 'Traditional scissor cut with styling'
            : language === 'tr' 
            ? 'Geleneksel makas kesimi ve şekillendirme'
            : 'Традиционная стрижка ножницами со укладкой',
          popular: true
        },
        {
          name: language === 'en' ? 'Modern Fade' : language === 'tr' ? 'Modern Fade' : 'Современный фейд',
          duration: 45,
          price: 35,
          description: language === 'en' 
            ? 'Contemporary fade with precise transitions'
            : language === 'tr' 
            ? 'Modern fade hassas geçişlerle'
            : 'Современны�� фейд с точными переходами',
          popular: true
        },
        {
          name: language === 'en' ? 'Beard Trim' : language === 'tr' ? 'Sakal Düzeltme' : 'Стрижка бороды',
          duration: 20,
          price: 18,
          description: language === 'en' 
            ? 'Professional beard shaping and trimming'
            : language === 'tr' 
            ? 'Profesyonel sakal şekillendirme ve düzeltme'
            : 'Профессиональная стрижка и формирование бороды'
        }
      ]
    },
    {
      id: 'shaving',
      name: language === 'en' ? 'Shaving' : language === 'tr' ? 'Tıraş' : 'Бритье',
      description: language === 'en' 
        ? 'Traditional wet shaves and beard care'
        : language === 'tr' 
        ? 'Geleneksel ıslak tıraş ve sakal bakımı'
        : 'Традиционное влажное бритье и уход за бородой',
      icon: <Face />,
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
      services: [
        {
          name: language === 'en' ? 'Hot Towel Shave' : language === 'tr' ? 'Sıcak Havlu Tıraş' : 'Бритье горячим полотенцем',
          duration: 30,
          price: 30,
          description: language === 'en' 
            ? 'Traditional shave with hot towel treatment'
            : language === 'tr' 
            ? 'Sıcak havlu uygulaması ile geleneksel tıraş'
            : 'Традиционное бритье с горячим полотенцем',
          traditional: true
        },
        {
          name: language === 'en' ? 'Beard Styling' : language === 'tr' ? 'Sakal Şekillendirme' : 'Стайлинг бороды',
          duration: 25,
          price: 22,
          description: language === 'en' 
            ? 'Custom beard shaping and styling'
            : language === 'tr' 
            ? 'Özel sakal şekillendirme ve stili'
            : 'Индивидуальное формиров��ние и стайлинг бороды'
        },
        {
          name: language === 'en' ? 'Mustache Trim' : language === 'tr' ? 'Bıyık Düzeltme' : 'Стрижка усов',
          duration: 15,
          price: 15,
          description: language === 'en' 
            ? 'Precision mustache trimming and shaping'
            : language === 'tr' 
            ? 'Hassas bıyık düzeltme ve şekillendirme'
            : 'Точная стрижка и формирование усов'
        }
      ]
    },
    {
      id: 'styling',
      name: language === 'en' ? 'Hair Styling' : language === 'tr' ? 'Saç Şekillendirme' : 'Укладка волос',
      description: language === 'en' 
        ? 'Professional styling and finishing'
        : language === 'tr' 
        ? 'Profesyonel şekillendirme ve bitirme'
        : 'Профессиональная укладка и финиш',
      icon: <ColorLens />,
      image: 'https://images.unsplash.com/photo-1622034409709-bb8e94e6d9c7?w=400&h=300&fit=crop',
      services: [
        {
          name: language === 'en' ? 'Wash & Style' : language === 'tr' ? 'Yıkama & Şekillendirme' : 'Мытье и укладка',
          duration: 25,
          price: 20,
          description: language === 'en' 
            ? 'Professional wash and blow-dry styling'
            : language === 'tr' 
            ? 'Profesyonel yıkama ve fön şekillendirme'
            : 'Профессиональное мытье и укладка феном',
          popular: true
        },
        {
          name: language === 'en' ? 'Hair Color' : language === 'tr' ? 'Saç Boyama' : 'Окрашивание волос',
          duration: 90,
          price: 45,
          description: language === 'en' 
            ? 'Professional hair coloring and highlights'
            : language === 'tr' 
            ? 'Profesyonel saç boyama ve röfleler'
            : 'Профессиональное окрашивание и мелирование'
        },
        {
          name: language === 'en' ? 'Hair Treatment' : language === 'tr' ? 'Saç Bakım' : 'Уход за волосами',
          duration: 40,
          price: 28,
          description: language === 'en' 
            ? 'Nourishing hair mask and treatment'
            : language === 'tr' 
            ? 'Besleyici saç maskesi ve bakım'
            : 'Питательная маска и уход за волосами'
        }
      ]
    },
    {
      id: 'premium',
      name: language === 'en' ? 'Premium Services' : language === 'tr' ? 'Premium Hizmetler' : 'Премиум услуги',
      description: language === 'en' 
        ? 'Luxury grooming and spa treatments'
        : language === 'tr' 
        ? 'Lüks bakım ve spa uygulamaları'
        : 'Роскошный уход и спа-процедуры',
      icon: <AutoAwesome />,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      services: [
        {
          name: language === 'en' ? 'Gentleman\'s Package' : language === 'tr' ? 'Centilmen Paketi' : 'Джентльменский пакет',
          duration: 90,
          price: 65,
          description: language === 'en' 
            ? 'Complete grooming: cut, shave, styling, and facial'
            : language === 'tr' 
            ? 'Komple bakım: kesim, tıraş, şekillendirme ve yüz bakımı'
            : 'Полный уход: стрижка, бритье, укладка и уход за лицом',
          premium: true
        },
        {
          name: language === 'en' ? 'Scalp Massage' : language === 'tr' ? 'Kafa Derisi Masajı' : 'Массаж кожи головы',
          duration: 30,
          price: 25,
          description: language === 'en' 
            ? 'Relaxing scalp massage with essential oils'
            : language === 'tr' 
            ? 'Esansiyel yağlarla rahatlatıcı kafa derisi masajı'
            : 'Расслабляющий массаж кожи головы с эфирными маслами',
          premium: true
        },
        {
          name: language === 'en' ? 'Facial Treatment' : language === 'tr' ? 'Yüz Bakımı' : 'Уход за лицом',
          duration: 50,
          price: 40,
          description: language === 'en' 
            ? 'Deep cleansing facial with moisturizing'
            : language === 'tr' 
            ? 'Nemlendirici ile derin temizlik yüz bakım��'
            : 'Глубокая очища��щая процедура с увлажнением',
          premium: true
        }
      ]
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8fffe', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: '#1f2937' }}>
        <Toolbar sx={{ px: { xs: 1, md: 2 } }}>
          <IconButton 
            edge="start" 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #00a693 0%, #4fd5c7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}>
            {t.brand}
          </Typography>
          
          {/* Language Selector */}
          <FormControl size="small" sx={{ minWidth: { xs: 70, md: 100 } }}>
            <Select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
              }}
            >
              <MenuItem value="en">🇬🇧 {isMobile ? 'EN' : 'EN'}</MenuItem>
              <MenuItem value="tr">🇹🇷 {isMobile ? 'TR' : 'TR'}</MenuItem>
              <MenuItem value="ru">🇷���� {isMobile ? 'RU' : 'RU'}</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(0, 166, 147, 0.95) 0%, rgba(79, 213, 199, 0.9) 100%)',
        color: 'white',
        py: { xs: 3, sm: 4, md: 6 },
        textAlign: 'center'
      }}>
        <Container>
          <Typography variant="h2" component="h1" sx={{
            fontWeight: 'bold',
            mb: { xs: 1.5, md: 2 },
            fontSize: { xs: '1.75rem', sm: '2rem', md: '3rem' }
          }}>
            {t.services}
          </Typography>
          <Typography variant="h6" sx={{
            opacity: 0.9,
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.25rem' }
          }}>
            {t.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container sx={{ py: { xs: 2, sm: 3, md: 6 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {serviceCategories.map((category) => (
            <Grid item xs={12} key={category.id}>
              <Card sx={{ 
                mb: 4,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 166, 147, 0.1)'
              }}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "180" : isTablet ? "220" : "300"}
                      image={category.image}
                      alt={category.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', md: 'center' }, mb: { xs: 1.5, md: 2 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
                        <Box sx={{
                          bgcolor: '#e6f7f5',
                          borderRadius: '50%',
                          p: { xs: 1.2, md: 1.5 },
                          mr: { xs: 0, sm: 2 },
                          mb: { xs: 1, sm: 0 },
                          color: '#00a693',
                          alignSelf: { xs: 'center', sm: 'flex-start' }
                        }}>
                          {React.cloneElement(category.icon, { sx: { fontSize: { xs: 24, md: 28 } } })}
                        </Box>
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                          <Typography variant="h4" sx={{
                            fontWeight: 'bold',
                            color: '#1f2937',
                            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' },
                            lineHeight: 1.2,
                            mb: 0.5
                          }}>
                            {category.name}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.4 }}>
                            {category.description}
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={{ xs: 1.5, md: 2 }}>
                        {category.services.map((service, index) => (
                          <Grid item xs={12} sm={6} md={6} key={index}>
                            <Card sx={{
                              p: { xs: 1.5, md: 2 },
                              bgcolor: '#f8fffe',
                              border: '1px solid #e6f7f5',
                              '&:hover': {
                                borderColor: '#00a693',
                                boxShadow: '0 4px 12px rgba(0, 166, 147, 0.1)'
                              }
                            }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                  {service.name}
                                </Typography>
                                <Stack direction="row" spacing={0.5}>
                                  {service.popular && (
                                    <Chip 
                                      label={t.popular}
                                      size="small"
                                      sx={{ bgcolor: '#00a693', color: 'white', fontWeight: 'bold' }}
                                    />
                                  )}
                                  {service.premium && (
                                    <Chip 
                                      label={t.premium}
                                      size="small"
                                      sx={{ bgcolor: '#ff6b35', color: 'white', fontWeight: 'bold' }}
                                    />
                                  )}
                                  {service.traditional && (
                                    <Chip 
                                      label={t.traditional}
                                      size="small"
                                      sx={{ bgcolor: '#8b5cf6', color: 'white', fontWeight: 'bold' }}
                                    />
                                  )}
                                </Stack>
                              </Box>
                              
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                                {service.description}
                              </Typography>

                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <AccessTime sx={{ fontSize: 16, color: '#00a693' }} />
                                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                                    {service.duration} {t.minutes}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <EuroSymbol sx={{ fontSize: 16, color: '#00a693' }} />
                                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00a693', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                    {service.price}
                                  </Typography>
                                </Box>
                              </Box>

                              <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                  bgcolor: '#00a693',
                                  fontWeight: 'bold',
                                  '&:hover': { bgcolor: '#007562' }
                                }}
                                onClick={() => navigate('/')}
                              >
                                {t.bookNow}
                              </Button>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{
          textAlign: 'center',
          mt: { xs: 3, md: 6 },
          p: { xs: 2.5, sm: 3, md: 4 },
          bgcolor: '#e6f7f5',
          borderRadius: 3
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: { xs: 1.5, md: 2 }, color: '#1f2937', fontSize: { xs: '1.4rem', sm: '1.7rem', md: '2rem' } }}>
            {language === 'en' 
              ? 'Ready to book your appointment?'
              : language === 'tr' 
              ? 'Randevunuzu almaya hazır mısınız?'
              : 'Готовы записаться на прием?'
            }
          </Typography>
          <Typography variant="body1" sx={{ mb: { xs: 2, md: 3 }, color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
            {language === 'en' 
              ? 'Find the perfect barber near you and book instantly'
              : language === 'tr' 
              ? 'Yakınınızdaki mükemmel berberi bulun ve hemen rezervasyon yapın'
              : 'Найдите идеального парикмахера рядом с вами и забронируйте мгновенно'
            }
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#00a693',
              fontWeight: 'bold',
              px: { xs: 3, md: 4 },
              py: { xs: 1.2, md: 1.5 },
              fontSize: { xs: '0.9rem', md: '1rem' },
              '&:hover': { bgcolor: '#007562' }
            }}
            onClick={() => navigate('/')}
          >
            {language === 'en' 
              ? 'Find Barbers'
              : language === 'tr' 
              ? 'Berber Bul'
              : 'Найти парикмахеров'
            }
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
