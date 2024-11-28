import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Card, CardContent, Grid, CircularProgress } from '@mui/material';

const Twitter = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTwitterData = async () => {
        if (!username.trim()) {
            setError('Please enter a Twitter username.');
            return;
        }
        setLoading(true);
        setError(null); 

        try {
            const response = await axios.get(`http://localhost:4000/api/twitter/${username}`);
            console.log('API Response:', response.data); 
            setUserData(response.data.data); 
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch Twitter data. Please check the username and try again.');
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Twitter User Info
            </Typography>
            <TextField
                fullWidth
                label="Enter Twitter Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                size="small"
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={fetchTwitterData}
                disabled={loading}
                style={{ marginTop: '10px' }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Get User Data'}
            </Button>
            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
            {userData && (
                <Card style={{ marginTop: '20px' }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                {userData.profile_image_url ? (
                                    <img
                                        src={userData.profile_image_url}
                                        alt="Profile"
                                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                    />
                                ) : (
                                    <Typography>No Profile Image</Typography>
                                )}
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h6">{userData.name || 'No Name Available'}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {userData.description || 'No Description Available'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Followers: {userData.public_metrics?.followers_count ?? 'No Followers Data'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Following: {userData.public_metrics?.following_count ?? 'No Following Data'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Likes: {userData.public_metrics?.like_count ?? 'No Likes Data'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Listed: {userData.public_metrics?.listed_count ?? 'No Listed Data'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Tweets: {userData.public_metrics?.tweet_count ?? 'No Tweets Data'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Joined: {userData.created_at ? new Date(userData.created_at).toDateString() : 'Date Not Available'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default Twitter;
