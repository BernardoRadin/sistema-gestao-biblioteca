import {Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Painel from '../pages/Painel';
import Cadastros from '../pages/Cadastros';
import Consultas from '../pages/Consultas';
import Biblioteca from '../pages/Biblioteca';

import Private from './Private';

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Login/> }/>
            <Route path="/register" element={<Register/> }/>
            <Route path="/biblioteca" element={<Biblioteca/>}/>
            <Route path="/painel" element={<Painel/>}/>
            <Route path="/cadastros" element={<Cadastros/>}/>
            <Route path="/consultas" element={<Consultas/>}/>
        </Routes>
    )
}

export default RoutesApp;