import './painel.css';
import Header from '../../components/Header';
import checkSession from '../../components/checkSession';
import FormEmprestimo from '../../components/Forms/FormEmprestimo'
import ViewDetails from '../../components/screenViewDetails'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {React, useEffect, useState, useMemo} from 'react';
import { toast } from 'react-toastify';

export default function Painel(){

    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [search, setSearch] = useState('');
    const [viewform, setViewForm] = useState(false);
    const [viewmore, setViewMore] = useState(false);
    const navigate = useNavigate();

    async function sessionExists(){
        const session = await checkSession('dados');
        
        if(!session){
            navigate('/biblioteca');
            return;
        }
    }

    async function Dados(){
        const response =  await axios.get('http://localhost/reactapp/backend/selects.php?select=livros',{
            withCredentials: true,
        });
        const returndata = await response.data;

        setData(returndata);
    }

    useEffect(()=>{
        Dados();
        sessionExists();
    },[])

    const closeForm =  () => {
        setViewForm(false);
        Dados();
    }

    const showDetails = (id) =>{
        setId(id);
        setViewMore(true);
    }

    const closeViewMore = () =>{
        Dados();
        setViewMore(false);
    }

    const datafilter = useMemo(()=>{
        if(data.length > 0)
        return data.filter((val) => val.nome.toLowerCase().includes(search) || val.autor.toLowerCase().includes(search));
    },[data,search]);
    
    return(
        <div>
            <Header/>
            <section className="section-1">
                {viewform && (
                    <>
                    <div className='overlay' onClick={() => {setViewForm(false)}}></div> 
                    <div className='box-load'><FormEmprestimo id={id} close={closeForm} /></div>
                    </>
                )}

                {viewmore && (
                    <>
                    <div className='overlay' onClick={() => {setViewMore(false)}}></div> 
                    <div className='box-load'><ViewDetails id={id} close={closeViewMore}/></div>
                    </>
                )}

                <div className="overlay-banner"></div>
                <h1>BUSCA DE LIVROS ABAIXO</h1>
                    <p className="description"> O sistema "Gestão de bibliotecas" é um pequeno sistema para gestão de bibliotecas, cadastro livros, controle de alocação.</p>        
                    <div className="search-container">
                        <input type="text" className="search"  placeholder="Buscar Livros" onChange={(e)=>setSearch(e.target.value.toLowerCase())} />
                        <svg className="pesquisar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    </div>
            </section>
            <section>
            <div className="box-principal">
                {datafilter && datafilter.map((value)=>(
                <div className="box" key={value.id}>
                    <h3>{value.nome}</h3>
                    <img src={`http://localhost/reactapp/backend/submit/${value.imagemcapa}`} className="livro-img"/>
                    <p className="description-book"> Autor: {value.autor}</p>
                    <p className="description-book"> Disponível: {value.emprestimo == 0 ? 'Sim' : 'Não'}</p>
                    <div className="options">
                    <svg onClick={() => value.emprestimo == 0 ? (setId(value.id), setViewForm(true)) : toast.error("Este livro já está em um empréstimo, verifique em Ver Detalhes")}  className="svg-rent" version="1.0" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 860.000000 980.000000">
                        <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)" stroke="none">
                            <path d="M6200 9504 c-505 -94 -930 -372 -1212 -793 -268 -401 -364 -895 -267 -1374 70 -349 256 -689 514 -940 344 -336 791 -517 1275 -517 296 0 542 57 805 185 197 97 344 205 511 377 225 231 385 521 459 832 76 320 73 579 -11 903 -150 581 -623 1079 -1198 1262 -289 93 -605 116 -876 65z m-167 -1028 c18 -8 130 -112 249 -232 186 -188 217 -224 223 -257 18 -93 -23 -180 -102 -218 -61 -30 -129 -23 -189 20 -39 27 -60 36 -66 29 -1 -2 -4 -182 -7 -400 l-6 -397 -44 -45 c-33 -34 -56 -48 -92 -55 -27 -6 -54 -9 -61 -7 -7 3 -25 7 -40 10 -34 8 -84 50 -106 90 -15 27 -18 78 -22 430 l-5 400 -36 -32 c-71 -62 -141 -76 -214 -43 -50 22 -91 69 -105 119 -13 46 -12 58 1 107 9 33 49 78 217 248 114 115 223 217 242 227 42 23 118 25 163 6z m1135 -18 c23 -16 48 -44 61 -70 20 -43 21 -58 21 -421 0 -257 3 -378 11 -382 6 -4 20 2 32 13 90 82 239 65 294 -35 29 -54 36 -95 23 -145 -10 -37 -41 -73 -218 -251 -114 -114 -222 -218 -240 -229 -43 -26 -124 -28 -172 -3 -51 26 -437 415 -455 458 -29 70 -16 148 33 201 36 38 81 56 142 56 58 0 82 -10 128 -53 20 -20 35 -28 42 -21 5 5 10 169 12 406 l3 396 31 39 c44 55 87 75 156 70 40 -2 68 -11 96 -29z"/>
                            <path d="M1085 8680 c-374 -40 -662 -286 -772 -661 l-28 -94 -3 -2892 c-1 -1591 1 -2893 4 -2893 4 0 37 24 73 54 173 141 346 224 566 272 62 14 149 19 395 23 l315 6 3 3089 c2 2465 0 3091 -10 3098 -16 10 -447 8 -543 -2z"/>
                            <path d="M2020 5585 l0 -3095 2303 -3 c1266 -2 2317 -7 2335 -11 l32 -8 0 1515 0 1514 -212 6 c-126 3 -252 12 -308 22 -550 94 -1011 360 -1368 790 -262 314 -435 729 -482 1154 -16 142 -8 462 15 586 38 209 99 403 192 613 4 9 -250 12 -1251 12 l-1256 0 0 -3095z"/>
                            <path d="M1095 2110 c-399 -36 -710 -318 -795 -721 -25 -118 -25 -190 -1 -304 34 -162 78 -261 171 -384 126 -167 304 -277 537 -331 82 -20 136 -20 2809 -20 2488 0 2728 1 2757 16 76 38 117 98 117 169 0 82 -53 154 -126 170 -16 4 -37 9 -47 12 -22 6 -70 103 -91 185 -77 299 -16 819 99 851 60 17 111 48 133 82 71 103 10 247 -118 274 -58 13 -5306 13 -5445 1z"/>
                        </g>
                    </svg>
                    <a className="verdetalhes" onClick={() => { setId(value.id); setViewMore(true) }} > Ver Detalhes </a>
                    </div>
                </div>
                ))}
                {!data && <div className="aviso-livro"> Nenhum livro cadastrado! <div className="aviso-start">Vá na aba de cadastros e começe sua jornada!</div> </div>}
            </div>
            </section>
        </div>
    )
}