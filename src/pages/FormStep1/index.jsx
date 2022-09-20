import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button } from '@mui/material';

import { FormContext } from '../../contexts/form';
import Header from '../../components/Header';
import VehicleCard from '../../components/VehicleCard';

export default function FormStep1() {
    const navigate = useNavigate();
    const { step, setStep, scheduled, setScheduled, vehicle, allSchedules } = useContext(FormContext);
    const dayjs = require('dayjs');
    var isoWeek = require('dayjs/plugin/isoWeek')
    dayjs.extend(isoWeek)

    // Recebe as horas livres
    const [hourAvailable, setHourAvailable] = useState([]);

    useEffect(() => {
        setStep(1);
    }, []);

    useEffect(() => {
        setHourAvailable(scheduleIsBusy(scheduled.day));
    }, [scheduled.day]);

    let daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    function nextSixDays() {
        let days = [];

        for (let i = 0; i < 6; i++) {
            days.push(dayjs().add(i, 'day'))

        }

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
            if (bussyHour.date == `${2022}-09-${scheduled.day}`) {
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

    function returnDayOfWeek(year, month, day) {
        var fullDate = new Date(`${year}-${month}-${day}`);
        var weekday = fullDate.getDay();
        return daysOfWeek[weekday];
    }

    let daysAvailable = nextSixDays();

    return (
        <>
            <Header />

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
                            {months[daysAvailable[0].$M]} {daysAvailable[0].$y}
                        </Grid>
                        <Grid item xs={12} className="topContent">
                            {daysAvailable.map((day, index) => (
                                < button key={index} className={scheduled.day == day.$D ? 'selectedDay' : ''} onClick={() => { setScheduled(prevState => { return { ...prevState, day: day.$D, month: months[day.$M], year: day.$y, dayOfWeek: returnDayOfWeek(day.$y, day.$M, day.$D) } }); }}>
                                    {returnDayOfWeek(day.$y, day.$M, day.$D)}<br />{day.$D}
                                </button>
                            ))}
                        </Grid>
                        <Grid item xs={12} className="mediumContent">
                            {hourAvailable.map((hour, index) => (
                                <button className={scheduled.hour == hour ? 'selectedTime' : ''} onClick={() => setScheduled(prevState => { return { ...prevState, hour: hour } })} disabled={!scheduled.day ? true : false}>
                                    {hour}
                                </button>
                            ))}
                        </Grid>
                        <Grid item xs={12} className="bottomContent">
                            <Button variant="contained" color="error" id="btnScheduled" onClick={() => { navigate('/step2'); }} disabled={!(scheduled.day && scheduled.hour) ? true : false}>
                                Agendar Visita
                            </Button>
                        </Grid>
                    </Grid >
                </Grid >
            </Container >
        </>
    );
}