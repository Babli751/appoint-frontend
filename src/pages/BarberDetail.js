import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import AppointmentForm from '../components/AppointmentForm';
import { Typography, Box } from '@mui/material';

export default function BarberDetail() {
  const { id } = useParams();
  const [barber, setBarber] = useState(null);

  useEffect(() => {
    const fetchBarber = async () => {
      try {
        const response = await api.get(`/barbers/${id}`);
        setBarber(response.data);
      } catch (err) {
        console.error('Berber bilgileri yüklenemedi:', err);
      }
    };
    fetchBarber();
  }, [id]);

  if (!barber) return <Typography>Yükleniyor...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{barber.name}</Typography>
      <Typography>Adres: {barber.address}</Typography>
      <AppointmentForm barberId={id} />
    </Box>
  );
}