import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Box,
} from '@mui/material';

const Youtube = () => {
    const [username, setUsername] = useState('');
    const [channelData, setChannelData] = useState(null);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchChannelDetails = () => {
        if (!username) {
            setError('Please enter a YouTube channel username.');
            return;
        }

        const apiKey = 'AIzaSyC26EJjpRCbEMFh2cu1POm4xTEjJim3F_s'; 
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forUsername=${username}&key=${apiKey}`;
        
        setLoading(true);
        axios
            .get(channelUrl)
            .then((response) => {
                setLoading(false);
                if (response.data.items && response.data.items.length > 0) {
                    const channel = response.data.items[0];
                    setChannelData(channel);
                    fetchVideos(channel.id); 
                    setError('');
                } else {
                    setError('No channel found with that username.');
                    setChannelData(null);
                    setVideos([]);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error('Error fetching channel data', err);
                setError('Failed to retrieve channel data.');
            });
    };

    const fetchVideos = (channelId) => {
        const apiKey = 'AIzaSyC26EJjpRCbEMFh2cu1POm4xTEjJim3F_s'; 
        const videosUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=5`;

        axios
            .get(videosUrl)
            .then((response) => {
                setVideos(response.data.items || []); 
            })
            .catch((err) => {
                console.error('Error fetching videos', err);
                setError('Failed to retrieve video data.');
            });
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h3" color="primary" gutterBottom>
                    YouTube Channel Search
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Enter a YouTube channel username to fetch details and latest videos.
                </Typography>
            </Box>

            <Paper sx={{ padding: 3, marginBottom: 3, boxShadow: 3 }}>
                <TextField
                    label="Enter YouTube Channel Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    sx={{ marginBottom: 2 }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={fetchChannelDetails}
                    disabled={loading}
                    sx={{
                        marginTop: 2,
                        padding: 1.5,
                        fontSize: '16px',
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                </Button>
            </Paper>

            {error && (
                <Typography variant="body1" color="error" align="center" sx={{ marginTop: 2 }}>
                    {error}
                </Typography>
            )}

            {channelData && (
                <Card sx={{ marginTop: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Channel Details
                        </Typography>
                        <Typography variant="body1">
                            <strong>Name:</strong> {channelData.snippet.title}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Description:</strong> {channelData.snippet.description}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Subscriber Count:</strong> {channelData.statistics.subscriberCount}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Video Count:</strong> {channelData.statistics.videoCount}
                        </Typography>
                        <Typography variant="body1">
                            <strong>View Count:</strong> {channelData.statistics.viewCount}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {videos.length > 0 && (
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Latest Videos
                        </Typography>
                    </Grid>
                    {videos.map((video) => (
                        <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                            <Card sx={{ boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        <a
                                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {video.snippet.title}
                                        </a>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {video.snippet.publishedAt}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Youtube;
