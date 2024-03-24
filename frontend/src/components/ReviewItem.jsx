import React from 'react';
import { Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { grey, blueGrey } from '@mui/material/colors';

const ReviewItem = ({ review }) => {
  const firstLetter = review.posterDisplayName.charAt(0).toUpperCase();

  return (
    <Card variant='outlined' sx={{ backgroundColor: grey[900], color: grey[100] }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 10 }}>
          <Grid item>
            <Avatar sx={{ bgcolor: blueGrey[500] }}>{firstLetter}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom sx={{ color: blueGrey[300], fontWeight: 'bold' }}>
              {review.posterDisplayName}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ color: blueGrey[200] }}>
          {review.title}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: blueGrey[300] }}>
          {review.description}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: blueGrey[300] }}>
          Building: {review.building}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: blueGrey[300] }}>
          Floor: {review.floor}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: blueGrey[300] }}>
          Room: {review.room}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
