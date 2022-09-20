import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const FormContext = createContext({});

export function FormProvider({ children }) {
    const [step, setStep] = useState(0);

    const [scheduled, setScheduled] = useState({
        day: '',
        dayOfWeek: '',
        month: '',
        year: '',
        hour: '',
    });

    const [allSchedules, setAllSchedules] = useState([{}]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        telephone: ''
    });

    const [vehicle, setVehicle] = useState({});

    useEffect(() => {
        LoadVehicle(2);
        LoadSchedules();
    }, []);

    async function LoadVehicle(id) {
        await api.get(`/vehicle/read_one.php?id=${id}`)
            .then(response => {
                setVehicle(response.data);
            })
    }

    async function LoadSchedules() {
        await api.get('/scheduling/read.php')
            .then(response => {
                setAllSchedules(response.data);
            })
    }

    return (
        <FormContext.Provider value={{ user, setUser, step, setStep, scheduled, setScheduled, vehicle, setVehicle, allSchedules, setAllSchedules }}>
            {children}
        </FormContext.Provider>
    )
}