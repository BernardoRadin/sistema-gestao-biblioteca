import './details.css';
import Deletar from '../screenDeletar';
import axios from 'axios';
import {React, useState, useEffect} from 'react';

export default function ViewDetails(props){
    const[data,setData] = useState([]);
    const[viewDeletar,setViewDeletar] = useState(false);
    const[loading,setLoading] = useState(true);
    const id = props.id;

    useEffect(() => {
        async function getData(){
            try {
                const response = await axios.get(`http://localhost/reactapp/backend/selects.php?select=livrodetalhes&num=${id}`, {
                    withCredentials: true,
                });

                const responsedata = await response.data;
                setData(responsedata);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
      },[]);
      if (loading)
        return <div>Carregando...</div>;
    
      function closeDelete(){
        setViewDeletar(false);
      }

    return(
        
        <div className="view-details">
            {viewDeletar && (
                <>
                <div className='overlay' onClick={() => {setViewDeletar(false)}}></div> 
                <Deletar id={id} deletar={'livro'} closedelete={closeDelete} closeviewmore={props.close}/>
                </>                
            )}
            <h2 className="name">{data.nome}</h2><br/>
            <img src={`http://localhost/reactapp/backend/submit/${data.imagemcapa}`} className="capa-livro"/><br/>
            <p className="text"><b>Autor: </b>{data.autor}</p><br/>
            <p className="text"><b>Sinopse:</b> {data.sinopse}</p>
            {data.leitornome != null ? <p className="red"> Este livro está em um empréstimo para {data.leitornome} até o dia {data.datadevolucao}.</p> : <p className="green">Livro Disponível</p>}
            <svg className="svg-delete" onClick={() => setViewDeletar(true)} version="1.0" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FF0000" stroke="none">
                <path d="M1387 4938 c-18 -18 -53 -148 -175 -639 l-154 -617 -78 -4 c-84 -3 -113 -17 -154 -72 -20 -26 -21 -41 -21 -246 0 -205 1 -220 21 -246 38 -52 69 -67 146 -73 l73 -6 76 -1375 c43 -756 82 -1386 87 -1400 14 -36 49 -70 88 -86 50 -21 2478 -21 2528 0 38 16 74 50 88 86 6 14 45 644 87 1400 l76 1375 73 6 c77 6 108 21 146 73 20 26 21 41 21 246 0 205 -1 220 -21 246 -41 55 -70 69 -154 72 l-78 4 -154 617 c-122 491 -157 621 -175 639 l-22 22 -1151 0 -1151 0 -22 -22z m293 -513 l0 -376 25 -24 24 -25 831 0 831 0 24 25 25 24 0 376 0 375 89 0 89 0 140 -560 140 -560 -1338 0 -1338 0 140 560 140 560 89 0 89 0 0 -375z m1600 55 l0 -320 -720 0 -720 0 0 320 0 320 720 0 720 0 0 -320z m880 -1120 l0 -160 -1600 0 -1600 0 0 160 0 160 1600 0 1600 0 0 -160z m-320 -1677 l-75 -1358 -1205 0 -1205 0 -75 1358 -75 1357 1355 0 1355 0 -75 -1357z"/>
                <path d="M1545 2695 l-25 -24 0 -991 0 -991 25 -24 c24 -25 26 -25 215 -25 189 0 191 0 215 25 l25 24 0 991 0 991 -25 24 c-24 25 -26 25 -215 25 -189 0 -191 0 -215 -25z m295 -1015 l0 -880 -80 0 -80 0 0 880 0 880 80 0 80 0 0 -880z"/>
                <path d="M2345 2695 l-25 -24 0 -991 0 -991 25 -24 c24 -25 26 -25 215 -25 189 0 191 0 215 25 l25 24 0 991 0 991 -25 24 c-24 25 -26 25 -215 25 -189 0-191 0 -215 -25z m295 -1015 l0 -880 -80 0 -80 0 0 880 0 880 80 0 80 0 0-880z"/>
                <path d="M3145 2695 l-25 -24 0 -991 0 -991 25 -24 c24 -25 26 -25 215 -25 189 0 191 0 215 25 l25 24 0 991 0 991 -25 24 c-24 25 -26 25 -215 25 -189 0 -191 0 -215 -25z m295 -1015 l0 -880 -80 0 -80 0 0 880 0 880 80 0 80 0 0 -880z"/>
                </g>
            </svg>
        </div>
    )
}