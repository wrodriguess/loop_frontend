import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button, TextField } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';

import { FormContext } from '../../contexts/form';
import Header from '../../components/Header';
import VehicleCard from '../../components/VehicleCard';
import api from '../../services/api';

export default function FormStep2() {
    const navigate = useNavigate();
    const { user, setUser, step, setStep, scheduled, setScheduled, vehicle, LoadSchedules, setAllSchedules } = useContext(FormContext);

    useEffect(() => {
        setStep(2);
    }, [])

    function monthInNumber(month) {
        let monthLowercase = month.toLowerCase();
        switch (monthLowercase) {
            case 'janeiro':
                return '01';
            case 'fevereiro':
                return '02';
            case 'março':
                return '03';
            case 'abril':
                return '04';
            case 'maio':
                return '05';
            case 'junho':
                return '06';
            case 'julho':
                return '07';
            case 'agosto':
                return '08';
            case 'setembro':
                return '09';
            case 'outubro':
                return '10';
            case 'novembro':
                return '11';
            case 'dezembro':
                return '12';
            default:
                console.log('Mês inválido');
        }
    }

    async function schedule() {
        // MELHORAR
        await api.post('/scheduling/create.php', null, { params: { id_user: '2', id_vehicle: '2', date: `${scheduled.year}-${monthInNumber(scheduled.month)}-${scheduled.day}`, hour: scheduled.hour } })
            .then(navigate('/step3'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header />

            <Container maxWidth="md" className="container">
                <Grid item xs={12} >
                    <Button variant="text" onClick={() => { navigate('/'); }}>
                        <ArrowBackIos />
                        Voltar
                    </Button>
                </Grid>

                <Grid container xs={12}>
                    <Grid item xs={12} sm={4}>
                        <VehicleCard vehicle={vehicle} />
                    </Grid>

                    <Grid container xs={12} sm={8} className="rightSide">
                        <Grid item xs={12} p={1} className="topRight">
                            Concluir Agendamento
                        </Grid>
                        <Grid item xs={12} className="contentHeader">
                            {scheduled.dayOfWeek}, {scheduled.day} de {scheduled.month}, {scheduled.hour} horas
                        </Grid>

                        <Grid container justifyContent="center" className="contentTop">
                            <Grid item xs={11} className="contentTop">
                                <TextField fullWidth id="outlined-basic" label="Nome" variant="outlined" defaultValue={user.name} onChange={(e) => setUser(prevState => { return { ...prevState, name: e.target.value } })} />
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="space-around" className="mediumContent">
                            <Grid item xs={5} id="inputEmail">
                                <TextField fullWidth id="outlined-basic" label="E-mail" variant="outlined" defaultValue={user.email} onChange={(e) => setUser(prevState => { return { ...prevState, email: e.target.value } })} />
                            </Grid>
                            <Grid item xs={5} id="inputTelephone">
                                <TextField fullWidth id="outlined-basic" label="Telefone" variant="outlined" defaultValue={user.telephone} onChange={(e) => setUser(prevState => { return { ...prevState, telephone: e.target.value } })} />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} className="bottomContent">
                            <Button variant="contained" color="error" id="btnScheduled" onClick={schedule} disabled={!(user.name && user.email && user.telephone) ? true : false}>
                                Concluir
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}