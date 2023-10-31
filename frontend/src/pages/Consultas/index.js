import './consulta.css';
import checkSession from '../../components/checkSession';
import React, { useState} from 'react';
import Header from '../../components/Header';
import ConsultaEmprestimos from '../../components/screenConsultas/ConsultaEmprestimos';
import ConsultaLeitores from '../../components/screenConsultas/ConsultaLeitores';
import { useNavigate } from 'react-router-dom';

export default function Cadastros(){

    const [visibleLeitores, setVisibleLeitores] = useState(false);
    const [visibleEmprestimos, setVisibleEmprestimos] = useState(true);
    const navigate = useNavigate();

    async function sessionExists(){
        const session = await checkSession('user');

        if(!session){
            navigate('/');
            return;
        }
    }

    sessionExists();

    const handleClickLeitor = () => {
        setVisibleLeitores(true);
        setVisibleEmprestimos(false);
    };

    const handleClickEmprestimos = () => {
        setVisibleLeitores(false);
        setVisibleEmprestimos(true);
    };

    return(
        <div>
            <Header/>
            <section className="consultas">
                <div className="consulta emprestimos" onClick={()=>{handleClickEmprestimos()}}>
                    <p>Consulta Empréstimos</p>
                </div>
                <div className="consulta leitores" onClick={()=>{handleClickLeitor()}}>
                    <p>Consulta Leitores</p>
                </div>

            </section>
            <div className="div-form">
                {visibleLeitores && <ConsultaLeitores />}
                {visibleEmprestimos && <ConsultaEmprestimos />}
            </div>
        </div>
    )
}