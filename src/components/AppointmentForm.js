import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';

export default function AppointmentForm({ barberId }) {
  const [date, setDate] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');

  // Berberin hizmetlerini çek
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(`/services?barberId=${barberId}`);
        setServices(response.data);
      } catch (err) {
        console.error('Hizmetler yüklenemedi:', err.message);
      }
    };
    fetchServices();
  }, [barberId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        barberId,
        serviceId: selectedService,
        date: new Date(date).toISOString()
      });
      alert('Randevu başarıyla oluşturuldu!');
    } catch (err) {
      alert(`Hata: ${err.response?.data?.details || err.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Randevu Al</Typography>
      <TextField
        select
        label="Hizmet Seçin"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {services.map((service) => (
          <MenuItem key={service._id} value={service._id}>
            {service.name} - {service.price} TL ({service.duration} dakika)
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="datetime-local"
        label="Tarih ve Saat"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Randevu Al
      </Button>
    </Box>
  );
}