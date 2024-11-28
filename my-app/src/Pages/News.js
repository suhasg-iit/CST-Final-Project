import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

const API_KEY = "9e9af039ba0d423082027358ed6cc54e";

const BASE_URL = "https://newsapi.org/v2/everything";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          apiKey: API_KEY,
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchArticles(searchTerm);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom style={{ margin: "20px 0" }}>
        News Search
      </Typography>

      <Grid container spacing={2} alignItems="center" style={{ marginBottom: "20px" }}>
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Search for news"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {loading && (
        <Container style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Container>
      )}

      {/* Articles Grid */}
      {!loading && articles.length > 0 && (
        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={article.title}
                  height="140"
                  image={article.urlToImage || "https://via.placeholder.com/140"}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ margin: "10px 0" }}>
                    {article.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read more
                    </a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && articles.length === 0 && searchTerm && (
        <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: "20px" }}>
          No articles found for "{searchTerm}".
        </Typography>
      )}
    </Container>
  );
}

export default App;
