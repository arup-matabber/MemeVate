import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, CircularProgress, Card, CardMedia } from '@mui/material';
import axios from 'axios';

function App() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [memeImage, setMemeImage] = useState("");

    const generateMeme = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_meme", { prompt });
            setMemeImage(`data:image/jpeg;base64,${response.data.meme_image}`);
        } catch (error) {
            console.error("Error generating meme:", error);
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                MemeVate
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Create socially impactful memes with AI
            </Typography>
            <TextField
                label="Enter a theme (e.g., environment, mental health)"
                variant="outlined"
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={generateMeme}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Generate Meme"}
            </Button>
            {memeImage && (
                <Card sx={{ mt: 3 }}>
                    <CardMedia
                        component="img"
                        image={memeImage}
                        alt="Generated Meme"
                    />
                </Card>
            )}
        </Container>
    );
}

export default App;
