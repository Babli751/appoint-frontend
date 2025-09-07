import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  ArrowBack,
  Language,
  Business,
  People,
  Security,
  Star,
  TrendingUp,
  CheckCircle,
  EuroSymbol
} from '@mui/icons-material';

const About = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const { language, changeLanguage, t: translations } = useLanguage();

  // Language content
  const content = {
    en: {
      brand: 'BarberPro',
      about: 'About Us',
      subtitle: 'Connecting you with Europe\'s finest barbers',
      ourMission: 'Our Mission',
      ourVision: 'Our Vision',
      ourValues: 'Our Values',
      stats: 'Our Impact',
      team: 'Leadership Team',
      joinUs: 'Join Us Today'
    },
    tr: {
      brand: 'BarberPro',
      about: 'Hakkımızda',
      subtitle: 'Sizi Avrupa\'nın en iyi berberleriyle buluşturuyoruz',
      ourMission: 'Misyonumuz',
      ourVision: 'Vizyonumuz',
      ourValues: 'Değerlerimiz',
      stats: 'Etkimiz',
      team: 'Yönetim Ekibi',
      joinUs: 'Bugün Katılın'
    },
    ru: {
      brand: 'BarberPro',
      about: 'О нас',
      subtitle: 'Соединяем вас с лучшими парикмахерами Европы',
      ourMission: 'Наша миссия',
      ourVision: 'Наше видение',
      ourValues: 'Наши ценности',
      stats: 'Наше влияние',
      team: 'Команда руководства',
      joinUs: 'Присоединяйтесь сегодня'
    }
  };

  // Use specific translations for this page
  const t = {
    ...translations,
    about: translations.aboutUs,
    subtitle: translations.aboutSubtitle
  };

  const stats = [
    {
      number: '2,000+',
      label: language === 'en' ? 'Professional Barbers' : language === 'tr' ? 'Profesyonel Berber' : 'Профессиональных парикмахеров',
      icon: <People />
    },
    {
      number: '50+',
      label: language === 'en' ? 'European Cities' : language === 'tr' ? 'Avrupa Şehri' : 'Европейских городов',
      icon: <Business />
    },
    {
      number: '150K+',
      label: language === 'en' ? 'Happy Customers' : language === 'tr' ? 'Mutlu Müşteri' : 'Довольных клиентов',
      icon: <Star />
    },
    {
      number: '4.8/5',
      label: language === 'en' ? 'Average Rating' : language === 'tr' ? 'Ortalama Puan' : 'Средний рейтинг',
      icon: <TrendingUp />
    }
  ];

  const values = [
    {
      title: language === 'en' ? 'Quality First' : language === 'tr' ? 'Önce Kalite' : 'Качество прежде всего',
      description: language === 'en' 
        ? 'We partner only with verified, professional barbers who maintain the highest standards'
        : language === 'tr' 
        ? 'Sadece en yüksek standartları koruyan doğrulanmış, profesyonel berberlerle ortaklık kuruyoruz'
        : 'Мы сотрудничаем только �� проверенными профессиональными парикмахерами, поддерживающими высочайшие стандарты',
      icon: <CheckCircle />
    },
    {
      title: language === 'en' ? 'Trust & Safety' : language === 'tr' ? 'Güven ve Güvenlik' : 'Доверие и безопасность',
      description: language === 'en' 
        ? 'Your safety is our priority. All our barbers are verified and follow strict hygiene protocols'
        : language === 'tr' 
        ? 'Güvenliğiniz önceliğimizdir. Tüm berberlerimiz doğrulanmış ve sıkı hijyen protokollerini takip ediyor'
        : 'Ваша безопасность - наш приоритет. Все наши парикмахеры проверены и следуют строгим протоколам гигиены',
      icon: <Security />
    },
    {
      title: language === 'en' ? 'Innovation' : language === 'tr' ? 'İnovasyon' : 'Инновации',
      description: language === 'en' 
        ? 'We continuously improve our platform to provide the best booking experience'
        : language === 'tr' 
        ? 'En iyi rezervasyon deneyimi sağlamak için platformumuzu sürekli geliştiriyoruz'
        : 'Мы постоянно улучшаем нашу платформу, чтобы обеспечить лучший опыт бронирования',
      icon: <TrendingUp />
    }
  ];

  const team = [
    {
      name: 'Babek Mammadov',
      position: language === 'en' ? 'CEO & Founder' : language === 'tr' ? 'CEO ve Kurucu' : 'Генеральный директор и основатель',
      bio: language === 'en'
        ? 'Entrepreneur leading BarberPro’s vision and growth across Europe'
        : language === 'tr'
        ? 'BarberPro’nun vizyonunu ve Avrupa genelindeki büyümesini yöneten girişimci'
        : 'Предприниматель, ведущий видение и рост BarberPro по всей Европе',
      image: 'https://images.unsplash.com/photo-1608160888760-3d4b4a3f95b9?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Cavansir Mammadov',
      position: language === 'en' ? 'COO' : language === 'tr' ? 'Operasyon Direktörü' : 'Операционный директор',
      bio: language === 'en'
        ? 'Operations leader focused on service excellence and customer experience'
        : language === 'tr'
        ? 'Hizmet mükemmeliyeti ve müşteri deneyimine odaklanan operasyon lideri'
        : 'Руководитель операций, сосредоточенный на качестве сервиса и опыте клиентов',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face'
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
              <MenuItem value="ru">🇷🇺 {isMobile ? 'RU' : 'RU'}</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(0, 166, 147, 0.95) 0%, rgba(79, 213, 199, 0.9) 100%)',
        color: 'white',
        py: { xs: 4, sm: 6, md: 10 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" component="h1" sx={{
            fontWeight: 'bold',
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '2rem', sm: '2.5rem', md: '4rem' }
          }}>
            {t.about}
          </Typography>
          <Typography variant="h5" sx={{
            opacity: 0.95,
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
            maxWidth: { xs: '90%', sm: 600 },
            mx: 'auto'
          }}>
            {t.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 8 } }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} md={3} key={index}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <Box sx={{ 
                  bgcolor: '#e6f7f5', 
                  borderRadius: '50%', 
                  p: 2, 
                  display: 'inline-flex',
                  mb: 2,
                  color: '#00a693'
                }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 32 } })}
                </Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 'bold', 
                  color: '#00a693',
                  fontSize: { xs: '2rem', md: '3rem' }
                }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Mission, Vision, Values */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <Business sx={{ fontSize: 48, color: '#00a693', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t.ourMission}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {language === 'en' 
                    ? 'To revolutionize the barbering industry by connecting customers with skilled professionals through innovative technology, making quality grooming accessible to everyone across Europe.'
                    : language === 'tr' 
                    ? 'Müşterileri yenilikçi teknoloji aracılığıyla yetenekli profesyonellerle buluşturarak berberlik sektöründe devrim yaratmak, kaliteli bakımı Avrupa genelinde herkese erişilebilir kılmak.'
                    : 'Революционизировать парикмахерскую индустрию, соединяя клиентов с квалифицированными профессионалами через инновационные технологии, делая качественный уход доступным для всех в Европе.'
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <TrendingUp sx={{ fontSize: 48, color: '#00a693', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t.ourVision}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {language === 'en' 
                    ? 'To become Europe\'s leading platform for professional grooming services, setting new standards for convenience, quality, and customer satisfaction in the beauty industry.'
                    : language === 'tr' 
                    ? 'Profesyonel bakım hizmetleri için Avrupa\'nın önde gelen platformu olmak, güzellik sektöründe rahatlık, kalite ve müşteri memnuniyeti için yeni standartlar belirlemek.'
                    : 'Стать ведущей платформой Европы для профессиональных услуг по уходу, устанавливая новые стандарты удобства, качества и удовлетворенности клиентов в индустрии красоты.'
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 4 }}>
                <Star sx={{ fontSize: 48, color: '#00a693', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t.ourValues}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {language === 'en' 
                    ? 'We believe in quality, trust, innovation, and putting our customers first. Every decision we make is guided by these core principles that drive our success.'
                    : language === 'tr' 
                    ? 'Kalite, güven, inovasyon ve müşterilerimizi ön planda tutmaya inanıyoruz. Aldığımız her karar, başarımızı yönlendiren bu temel ilkeler tarafından yönlendirilir.'
                    : 'Мы верим в качество, доверие, инновации и ставим наших клиентов на первое место. Каждое наше решение руководствуется этими основными принципами, которые движут нашим успехом.'
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Values Detail */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          {language === 'en' ? 'What Drives Us' : language === 'tr' ? 'Bizi Neler Yönlendiriyor' : 'Что нами движет'}
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {values.map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    bgcolor: '#e6f7f5', 
                    borderRadius: '50%', 
                    p: 2, 
                    display: 'inline-flex',
                    mb: 2,
                    color: '#00a693'
                  }}>
                    {React.cloneElement(value.icon, { sx: { fontSize: 32 } })}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Team Section */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          {t.team}
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {team.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                textAlign: 'center',
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Avatar
                    src={member.image}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid #e6f7f5'
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 'medium' }}>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ 
          textAlign: 'center', 
          p: 4,
          bgcolor: '#e6f7f5',
          borderRadius: 3
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1f2937' }}>
            {t.joinUs}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            {language === 'en' 
              ? 'Experience the future of barbering. Book your appointment today and discover why thousands of customers trust BarberPro for their grooming needs.'
              : language === 'tr' 
              ? 'Berberliğin geleceğini deneyimleyin. Bugün randevunuzu alın ve binlerce müşterinin neden bakım ihtiyaçları için BarberPro\'ya güvendiğini keşfedin.'
              : 'Испытайте будущее парикмахерского дела. Запишитесь на прием сегодня и узнайте, почему тысячи клиентов доверяют BarberPro для своих потребностей в уходе.'
            }
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#00a693',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#007562' }
            }}
            onClick={() => navigate('/')}
          >
            {language === 'en' 
              ? 'Find Your Barber'
              : language === 'tr' 
              ? 'Berberinizi Bulun'
              : 'На��ти парикмахера'
            }
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
