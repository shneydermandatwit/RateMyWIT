import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TextField, Button, Typography, Grid, Box, Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

function ReviewForm({ building, floor, roomItem }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [room, setRoom] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);


    useEffect(() => {
        const checkRoom = (roomItem !== 'none') ? roomItem : room;

        setRoom(checkRoom);

       
      }, [roomItem]);

      const handleCloseSnackbar = () => {
        setSuccessSnackbarOpen(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = Cookies.get('token');




        try {

            
            const response = await axios.post('http://localhost:5555/review/create', {
                title,
                description,
                building,
                floor,
                room,
            }, {
                headers: {
                    Authorization: `Bearer: ${token}`,
                },
            });


            console.log('Review created:', response.data);
            setSuccessSnackbarOpen(true); // Show success Snackbar

            // Add any further handling here, such as showing a success message or redirecting the user
        } catch (error) {
            console.error('Error creating review:', error);
            // Add error handling, such as displaying an error message to the user
        }
    };

    return (
        <Box p={2} >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" style={{paddingTop: '30px'}} >
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            color='warning' // This prop is not used for setting the border color
                            InputProps={{
                                style: { color: 'white' },
                                placeholder: 'Description',
                                className: 'white-placeholder', // Custom class for placeholder
                                classes: {
                                    root: 'white-border', // Custom class for the root element
                                    focused: 'white-border-focused', // Custom class for the focused state
                                    notchedOutline: 'white-notched-outline', // Custom class for the outline/border
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' }, // Custom style for input label color
                            }}
                        />

                    </Grid>
                    {roomItem === 'none' && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Room"
                                variant="outlined"
                                value={room}
                                onChange={(event) => setRoom(event.target.value)}
                                color='warning' // This prop is not used for setting the border color
                                InputProps={{
                                    style: { color: 'white' },
                                    placeholder: 'Description',
                                    className: 'white-placeholder', // Custom class for placeholder
                                    classes: {
                                        root: 'white-border', // Custom class for the root element
                                        focused: 'white-border-focused', // Custom class for the focused state
                                        notchedOutline: 'white-notched-outline', // Custom class for the outline/border
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: 'white' }, // Custom style for input label color
                                }}

                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            variant="outlined"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            color='warning' // This prop is not used for setting the border color
                            InputProps={{
                                style: { color: 'white' },
                                placeholder: 'Description',
                                className: 'white-placeholder', // Custom class for placeholder
                                classes: {
                                    root: 'white-border', // Custom class for the root element
                                    focused: 'white-border-focused', // Custom class for the focused state
                                    notchedOutline: 'white-notched-outline', // Custom class for the outline/border
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' }, // Custom style for input label color
                            }}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create review
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar
                    open={successSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <SnackbarContent
                        sx={{ backgroundColor: '#4caf50', borderRadius: '5px' }}
                        message={
                            <Typography variant="body1" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ mr: 1 }} /> Review created successfully!
                            </Typography>
                        }
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={handleCloseSnackbar}
                                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                            >
                                {/* You can add a close icon here if needed */}
                            </IconButton>
                        }
                    />
                </Snackbar>
            </form>
        </Box>
    );
}

export default ReviewForm;
