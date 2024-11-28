import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Container, Grid } from '@mui/material';
import Youtube from './Pages/Youtube';
import Weather from './Pages/Weather';
import Twitter from './Pages/Twitter';
import News from './Pages/News';

function App() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h6">React App for Project</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div style={navStyle}>
            <Link to="/news">
              <Button variant="contained" color="primary" size="large" fullWidth style={{ margin: '5px' }}>
                News
              </Button>
            </Link>
            <Link to="/twitter">
              <Button variant="contained" color="secondary" size="large" fullWidth style={{ margin: '5px' }}>
                Twitter
              </Button>
            </Link>
            <Link to="/weather">
              <Button variant="contained" color="success" size="large" fullWidth style={{ margin: '5px' }}>
                Weather
              </Button>
            </Link>
            <Link to="/youtube">
              <Button variant="contained" color="info" size="large" fullWidth style={{ margin: '5px' }}>
                YouTube
              </Button>
            </Link>
          </div>
          <Routes>
            <Route path="/news" element={<News />} />
            <Route path="/twitter" element={<Twitter />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/youtube" element={<Youtube />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
