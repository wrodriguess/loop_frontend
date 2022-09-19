import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import FormStep1 from './pages/FormStep1';
import FormStep2 from './pages/FormStep2';
import FormStep3 from './pages/FormStep3';

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" exact element={<Home />} />

                <Route path="/" element={<FormStep1 />} />
                <Route path="/step2" element={<FormStep2 />} />
                <Route path="/step3" element={<FormStep3 />} />
            </Routes>
        </BrowserRouter>
    );
}