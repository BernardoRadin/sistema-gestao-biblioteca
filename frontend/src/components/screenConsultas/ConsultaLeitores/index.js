import '../consulta.css';
import EditLeitores from '../../Forms/EditLeitores';
import Deletar from '../../screenDeletar';
import {React, useState, useEffect } from 'react';
import axios from 'axios';

export default function ConsultaLeitores(){

    const [idDelete,setIdDelete] = useState('');
    const [data,setData] = useState('');
    const [objEdit,setObjEdit] = useState([]);
    const [viewEdit, setViewEdit] = useState(false);
    const[viewDeletar,setViewDeletar] = useState(false);

    async function getLeitores(){
        const response = await axios.get('http://localhost/reactapp/backend/selects.php?select=leitores',{
            withCredentials: true,
        });

        const returndata = await response.data;
        setData(returndata);
    }

    
    useEffect(()=>{
        getLeitores()
    },[])

    const handleEditarClick = (obj) => {
        setObjEdit(obj);
        setViewEdit(true);
    }

    const closeEdit = () => {
        setViewEdit(false);
        getLeitores();
    }

    const closeDelete = () => {
        setViewDeletar(false);
        getLeitores();
    }


    return(
        <div>
            {viewEdit && (
                    <>
                    <div className='overlay' onClick={() => {setViewEdit(false)}}></div>
                    <div className='box-load'><EditLeitores obj={objEdit} close={closeEdit}/></div>
                    </>    
                )
            }
            {viewDeletar && (
                <>
                <div className='overlay' onClick={() => {setViewDeletar(false)}}></div> 
                <Deletar id={idDelete} deletar={'leitor'} closedelete={closeDelete}/>
                </>                
            )}
            <table className="table-consulta">
            <thead>
                <tr>
                    <th> Nome </th>
                    <th> CPF </th>
                    <th> E-mail </th>
                    <th> Data de Nascimento </th>
                    <th> Editar </th>
                    <th> Excluir </th>
                </tr>
            </thead>
            <tbody>
            {data && data.map((val)=> (
                <tr key={val.id}>
                    <td>
                     {val.nome}
                    </td>
                    <td>
                     {val.cpf}
                    </td>
                    <td>
                     {val.email}
                    </td>
                    <td>
                     {val.datanasc}
                    </td>
                    <td className="td-editar">
                        <svg onClick={ ()=>{ handleEditarClick(val)} } className="svg-editar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.882 348.882">
                                <path d="M333.988,11.758l-0.42-0.383C325.538,4.04,315.129,0,304.258,0c-12.187,0-23.888,5.159-32.104,14.153L116.803,184.231c-1.416,1.55-2.49,3.379-3.154,5.37l-18.267,54.762c-2.112,6.331-1.052,13.333,2.835,18.729c3.918,5.438,10.23,8.685,16.886,8.685c0,0,0.001,0,0.001,0c2.879,0,5.693-0.592,8.362-1.76l52.89-23.138c1.923-0.841,3.648-2.076,5.063-3.626L336.771,73.176C352.937,55.479,351.69,27.929,333.988,11.758z M130.381,234.247l10.719-32.134l0.904-0.99l20.316,18.556l-0.904,0.99L130.381,234.247z M314.621,52.943L182.553,197.53l-20.316-18.556L294.305,34.386c2.583-2.828,6.118-4.386,9.954-4.386c3.365,0,6.588,1.252,9.082,3.53l0.419,0.383C319.244,38.922,319.63,47.459,314.621,52.943z"/>
                                <path d="M303.85,138.388c-8.284,0-15,6.716-15,15v127.347c0,21.034-17.113,38.147-38.147,38.147H68.904c-21.035,0-38.147-17.113-38.147-38.147V100.413c0-21.034,17.113-38.147,38.147-38.147h131.587c8.284,0,15-6.716,15-15s-6.716-15-15-15H68.904c-37.577,0-68.147,30.571-68.147,68.147v180.321c0,37.576,30.571,68.147,68.147,68.147h181.798c37.576,0,68.147-30.571,68.147-68.147V153.388C318.85,145.104,312.134,138.388,303.85,138.388z"/>
                        </svg>
                    </td>
                    <td className="td-excluir">
                        <svg className="svg-excluir" onClick={ ()=>{ setIdDelete(val.id); setViewDeletar(true) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}