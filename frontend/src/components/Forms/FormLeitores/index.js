import '../form.css';
import {React, useState, useEffect} from 'react';
import  axios  from 'axios';
import { toast } from 'react-toastify';

export default function FormLeitores(props){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [cpf,setCpf] = useState('');
    const [date,setDate] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        if(name !== '' && email !== '' && cpf !=='' && date !==''){

            const response = await axios.post('http://localhost/reactapp/backend/submit/saveleitores.php',{
                name: name,
                email: email,
                cpf: cpf,
                date: date,
            }, {
                 withCredentials: true
              });

            const data = await response.data;

            if(data == 'true'){
                toast.success('Dados salvos com sucesso!');
                setName('');
                setEmail('');
                setCpf('');
                setDate('');
                return;
            }else{
                toast.error("Ocorreu um erro tente novamente!")
            }
        }else{
            toast.error('Preencha todos os campos!')
        }
    }

    return(
        <div className="animation">
            <h2>Cadastro Leitores</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome: </label><br/>
                <input type="text" placeholder=" Nome"  onChange={(e)=>setName(e.target.value)}  value={name}/><br/><br/>
                <label>E-mail: </label><br/>
                <input type="text" placeholder=" E-mail"  onChange={(e)=>setEmail(e.target.value)}  value={email}/><br/><br/>
                <label>CPF: </label><br/>
                <input type="text" placeholder="CPF"  onChange={(e)=>setCpf(e.target.value)}  value={cpf}/><br/><br/>
                <label>Data Nascimento: </label><br/>
                <input type="date" placeholder="12/34/5678"  onChange={(e)=>setDate(e.target.value)}  value={date}/><br/><br/>
                <input type="submit" value="Enviar" /><br/><br/>
            </form>
        </div>
    )
}