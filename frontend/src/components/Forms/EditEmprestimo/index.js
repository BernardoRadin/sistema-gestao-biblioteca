import '../form.css';
import axios from 'axios';
import {React, useState} from 'react';
import { toast } from 'react-toastify';

export default function EditEmprestimo(props){

    const [dataemprestimo,setDataEmprestimo] = useState(props.obj.dataemprestimo);
    const [datadevolucao,setDataDevolucao] = useState(props.obj.datadevolucao);
    const [concluido,setConcluido] = useState(props.obj.concluidosn);

    async function handleSubmit(e){
        e.preventDefault();
        if(dataemprestimo != '' && datadevolucao != '' && concluido != ''){
            const response = await axios.post('http://localhost/reactapp/backend/submit/editemprestimo.php',{
                id: props.obj.id,
                dataemprestimo: dataemprestimo,
                datadevolucao: datadevolucao,
                concluido: e.target.elements.namedItem('opcao').value
            },{
                withCredentials: true
            });
        
            const data = await response.data;

            if(data == 'true'){
                toast.success('Dados salvos com sucesso!');
                props.close();
            }else{
                toast.error("Ocorreu um erro tente novamente!")
            }
        }else{
            toast.error('Preencha todos os campos!')
        }
    }
    return(
        <>
            <h2>Editar Empréstimo</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>Data Empréstimo: </label><br/>
                <input type="date" value={dataemprestimo} onChange={(e)=>setDataEmprestimo(e.target.value)} required/><br/>
                <label>Data Devolução: </label><br/>
                <input type="date" value={datadevolucao}  onChange={(e)=>setDataDevolucao(e.target.value)} required/><br/>
                <label>Concluído: </label><br/>
                <div className="div-button">
                <input className="radio-button" name="opcao" type="radio" value='1' defaultChecked={concluido == 'Sim' ? true : false} required/>
                <label className="radio-label">Sim</label>
                <input className="radio-button" name="opcao" type="radio" value='0' defaultChecked={concluido == 'Não' ? true : false} required/>
                <label className="radio-label">Não</label>
                </div>
                <input type="submit" value="Enviar"/><br/>
            </form>
        </>
    )
}
