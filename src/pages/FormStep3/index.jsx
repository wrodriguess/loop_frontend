import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button } from '@mui/material';
import { LocationOn, CalendarToday } from '@mui/icons-material';

import './styles.css';
import { FormContext } from '../../contexts/form';
import Header from '../../components/Header';
import sucess from '../../images/sucess.png';

export default function FormStep1() {
    const navigate = useNavigate();
    const { setUser, setStep, scheduled, setScheduled, vehicle } = useContext(FormContext);

    useEffect(() => {
        setStep(3);
    }, [])

    function clearData() {
        setScheduled({
            day: '',
            dayOfWeek: '',
            month: 'Setembro',
            year: '2022',
            hour: '',
        })
        setUser({
            name: '',
            email: '',
            telephone: ''
        })
    }

    return (
        <>
            <Header />
            <Container maxWidth="md" id="containerFormStep3">
                <Grid item id="containerImage" p={3} xs={12}>
                    <img src={sucess} alt="imagem simbolizando agendamento concluido" />
                </Grid>

                <Grid item xs={12} p={3} id="topMonth">
                    Agendamento Concluído!
                </Grid>

                <Grid container XS={12} >
                    <Grid item p={3} xs={12} sm={6} id="bla1">
                        <CalendarToday />
                        {scheduled.dayOfWeek}, {scheduled.day} {scheduled.month} {scheduled.year} às {scheduled.hour}
                    </Grid>
                    <Grid item p={3} xs={12} sm={6} id="bla">
                        <LocationOn />
                        {vehicle.address}
                    </Grid>
                </Grid>

                <Grid item xs={12} p={3} id="topButton">
                    <Button variant="contained" color="error" id="btnScheduled" onClick={() => { clearData(); window.location.href = "http://localhost:3000"; }}>
                        Outros Veículos
                    </Button>
                </Grid>
            </Container >
        </>
    );
}