import '../form.css';
import axios from 'axios';
import {React, useState} from 'react';
import { toast } from 'react-toastify';

export default function EditLeitores(props){

    const [nome,setNome] = useState(props.obj.nome);
    const [cpf,setCpf] = useState(props.obj.cpf);
    const [email,setEmail] = useState(props.obj.email);
    const [datanasc,setDataNasc] = useState(props.obj.datanasc);

    async function handleSubmit(e){
        e.preventDefault();
        if(nome != '' && cpf != '' && email != '' && datanasc != ''){
            const response = await axios.post('http://localhost/reactapp/backend/submit/editleitores.php',{
                id: props.obj.id,
                nome: nome,
                cpf: cpf,
                email: email,
                datanasc: datanasc,
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
            <h2>Editar Leitores</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome: </label><br/>
                <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)} required/><br/>
                <label>CPF: </label><br/>
                <input type="text" value={cpf} onChange={(e)=>setCpf(e.target.value)} required/><br/>
                <label>E-mail: </label><br/>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br/>
                <label>Data de Nascimento: </label><br/>
                <input type="date" value={datanasc} onChange={(e)=>setDataNasc(e.target.value)} required/><br/>
                <input type="submit" value="Enviar"/><br/>
            </form>
        </>
    )
}
