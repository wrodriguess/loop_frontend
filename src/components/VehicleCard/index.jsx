import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

import './vehicleCard.css';

export default function VehicleCard({ vehicle }) {
    return (
        <Card elevation={3} sx={{ maxWidth: 250, margin: 1 }}>
            <CardMedia
                component="img"
                alt="Foto do veículo"
                // height="140"
                image={vehicle.photo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <b>{vehicle.brand} {vehicle.model}</b>
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {vehicle.description}
                </Typography>
                <Typography mt={2} variant="h6" color="text.primary">
                    <b>R${vehicle.value}</b>
                </Typography>
            </CardContent>
            <hr id="divider" />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    <LocationOn fontSize="small" />
                    {vehicle.locale}
                </Typography>
            </CardContent>
        </Card>
    );
}
