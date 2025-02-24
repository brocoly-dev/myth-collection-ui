import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid2, Typography, Paper } from '@mui/material';

const FigureForm = () => {
  // Dummy data
  const rows = [
    { id: 1, name: 'John Doe', age: 30, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/924/n9EbWm.jpg' },
    { id: 2, name: 'Jane Smith', age: 25, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/923/tfpAjh.jpg' },
    { id: 3, name: 'Michael Johnson', age: 35, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/924/JDVd5Y.jpg' },
    { id: 4, name: 'Emily Davis', age: 28, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/923/gqkNEn.jpg' },
    { id: 5, name: 'David Brown', age: 40, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/922/OFg4lf.jpg' },
    { id: 6, name: 'Sarah Wilson', age: 32, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/924/W1Eyny.jpg' },
    { id: 7, name: 'Chris Lee', age: 27, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/922/bsLvNJ.jpg' },
    { id: 8, name: 'Laura Clark', age: 22, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/922/OEKG0N.jpg' },
    { id: 9, name: 'James Lewis', age: 38, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/924/Pl86x4.jpg' },
    { id: 10, name: 'Linda Hall', age: 45, imageUrl: 'https://imagizer.imageshack.com/v2/640x480q70/923/he4WBk.jpg' },
  ];

  return (
    <Paper sx={{ padding: '16px' }}>
      <Grid2 container spacing={2}>
        {rows.map((row) => (
          <Grid2 key={row.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={row.imageUrl}
                alt={row.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {row.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {row.age}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
};

export default FigureForm;
