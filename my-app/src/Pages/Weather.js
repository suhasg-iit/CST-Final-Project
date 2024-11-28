import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Box, CircularProgress, Container, Grid, Card, CardContent } from '@mui/material';

const WeatherForecast = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = '7c815bd4fae4495ea2b586a89ca5bc6d'; 

    const fetchWeatherForecast = async () => {
        setError(null); 
        if (!latitude || !longitude) {
            setError('Please enter both latitude and longitude.');
            return;
        }

        setLoading(true); 
        try {
            console.log('Fetching forecast for coordinates:', latitude, longitude); 
            const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    appid: API_KEY,
                    units: 'metric', 
                },
            });
            console.log('API Response:', response.data); 
            setForecast(response.data);
        } catch (err) {
            console.error('Error Response:', err.response || err); 
            setError('Unable to fetch forecast. Please try again.');
            setForecast(null);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h3" color="primary" gutterBottom>
                    5-Day Weather Forecast
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Enter latitude and longitude to get the weather forecast.
                </Typography>
            </Box>

            <Paper sx={{ padding: 3, boxShadow: 3, marginBottom: 3 }}>
                <TextField
                    label="Latitude"
                    variant="outlined"
                    fullWidth
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Longitude"
                    variant="outlined"
                    fullWidth
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={fetchWeatherForecast}
                    disabled={loading}
                    sx={{ padding: 1.5, fontSize: '16px' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Forecast'}
                </Button>
            </Paper>

            {error && (
                <Typography variant="body1" color="error" align="center" sx={{ marginTop: 2 }}>
                    {error}
                </Typography>
            )}

            {forecast && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Weather Forecast for {forecast.city.name}
                    </Typography>
                    <Grid container spacing={2}>
                        {forecast.list.slice(0, 5).map((entry, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ boxShadow: 2 }}>
                                    <CardContent>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            <strong>Date/Time:</strong> {entry.dt_txt}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Temperature:</strong> {entry.main.temp} °C
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Weather:</strong> {entry.weather[0].description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default WeatherForecast;
