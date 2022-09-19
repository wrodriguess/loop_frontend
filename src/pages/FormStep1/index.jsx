import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button } from '@mui/material';

import { FormContext } from '../../contexts/form';
import Header from '../../components/Header';
import VehicleCard from '../../components/VehicleCard';

export default function FormStep1() {
    const [hourAvailable, setHourAvailable] = useState([]);
    const [chosenDate, setChosenDate] = useState();

    const navigate = useNavigate();
    const { step, setStep, scheduled, setScheduled, vehicle, allSchedules } = useContext(FormContext);
    const { format } = require('date-fns');

    useEffect(() => {
        setStep(1);
    }, []);

    useEffect(() => {
        setHourAvailable(scheduleIsBusy(chosenDate));
    }, [chosenDate]);

    const date = new Date()
    let semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    let dia_da_semana = semana[date.getDay()]
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    let ano = date.getFullYear();

    function nextSixDays() {
        let days = [
            [19, 'SEG', 'Segunda-Feira'],
            [20, 'TER', 'Terça-Feira'],
            [21, 'QUA', 'Quarta-Feira'],
            [22, 'QUI', 'Quinta-Feira'],
            [23, 'SEX', 'Sexta-Feira'],
            [24, 'SÁB', 'Sábado'],
        ];

        return days;
    }

    function generateBusinessHours() {
        let hours = [];

        for (let i = 8; i <= 18; i++) {
            hours.push(`${i}:00`);
        }

        return hours;
    }

    function scheduleIsBusy() {
        let businessHours = generateBusinessHours();

        let bussyHours = []

        allSchedules.forEach(bussyHour => {
            if (bussyHour.date == `${2022}-09-${chosenDate}`) {
                bussyHours.push(bussyHour.hour)
            }
        })

        let aux = [];

        businessHours.forEach(businessHour => {
            if (!bussyHours.includes(businessHour)) {
                aux.push(businessHour)
            }
        });

        return aux;
    }

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

    // console.log(allSchedules);
    let daysAvailable = nextSixDays();
    let hoursAvailable = generateBusinessHours();

    return (
        <>
            <Header />
            {/* {dia_da_semana}<br />
            {mes}<br />
            {dia}<br />
            {ano}<br /> */}

            <Container maxWidth="md" className="container">
                <Grid container xs={12}>
                    <Grid item xs={12} sm={4}>
                        <VehicleCard vehicle={vehicle} />
                    </Grid>

                    <Grid container xs={12} sm={8} className="rightSide">
                        <Grid item xs={12} p={1} className="topRight">
                            Agende o dia e horário da sua visita
                        </Grid>
                        <Grid item xs={12} className="contentHeader">
                            {scheduled.month} {scheduled.year}
                        </Grid>
                        <Grid item xs={12} className="topContent">
                            {daysAvailable.map((day, index) => (
                                <button key={index} className={scheduled.day == day[0] ? 'selectedDay' : ''} onClick={() => { setScheduled(prevState => { return { ...prevState, day: day[0], dayOfWeek: day[2] } }); setChosenDate(day[0]); }}>
                                    {day[1]}<br />{day[0]}
                                </button>
                            ))}
                        </Grid>
                        <Grid item xs={12} className="mediumContent">
                            {hourAvailable.map((hour, index) => (
                                <button className={scheduled.hour == hour ? 'selectedTime' : ''} onClick={() => setScheduled(prevState => { return { ...prevState, hour: hour } })} disabled={!chosenDate ? true : false}>
                                    {hour}
                                </button>
                            ))}
                        </Grid>
                        <Grid item xs={12} className="bottomContent">
                            <Button variant="contained" color="error" id="btnScheduled" onClick={() => { navigate('/step2'); setScheduled(prevState => { return { ...prevState, address: {} } }); }} disabled={!(scheduled.day && scheduled.hour) ? true : false}>
                                Agendar Visita
                            </Button>
                        </Grid>
                    </Grid >
                </Grid >
            </Container >
        </>
    );
}