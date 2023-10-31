import './cadastros.css';
import checkSession from '../../components/checkSession';
import React, { useState} from 'react';
import Header from '../../components/Header';
import FormLeitores from '../../components/Forms/FormLeitores';
import FormLivros from '../../components/Forms/FormLivros';
import { useNavigate } from 'react-router-dom';

export default function Cadastros(){

    const [visibleFormLeitor, setVisibleFormLeitor] = useState(false);
    const [visibleFormLivro, setVisibleFormLivro] = useState(true);
    const navigate = useNavigate();

    async function sessionExists(){
        const session = await checkSession('user');

        if(!session){
            navigate('/');
            return;
        }
    }

    sessionExists();

    const handleClickFormLeitor = () => {
        setVisibleFormLeitor(true);
        setVisibleFormLivro(false);
    };

    const handleClickFormLivro = () => {
    setVisibleFormLeitor(false);
    setVisibleFormLivro(true);
    };

    return(
        <div>
            <Header/>
            <section className="cadastros">
                <div className="cadastro leitores" onClick={()=>{handleClickFormLeitor()}}>
                    <p>Cadastro Leitores</p>
                </div>
                <div className="cadastro livro" onClick={()=>{handleClickFormLivro()}}>
                    <p>Cadastro Livros</p>
                </div>

            </section>
            <div className="div-form">
                {visibleFormLeitor && <FormLeitores />}
                {visibleFormLivro && <FormLivros />}
            </div>
        </div>
    )
}