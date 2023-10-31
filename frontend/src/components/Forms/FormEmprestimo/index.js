import '../form.css';
import axios from 'axios';
import {React, useEffect, useState} from 'react';
import { toast } from 'react-toastify';

export default function FormEmprestimo(props){

    const day = new Date().toLocaleString("en-US", { day: "2-digit" });
    const month = new Date().toLocaleString("en-US", { month: "2-digit" });
    const year = new Date().getFullYear();

    const idlivro = props.id;
    const [name,setName] = useState('');
    const [leitores,setLeitores] = useState([]);
    const [leitor,setLeitor] = useState([]);
    const [dateE,setdateE] = useState(`${year}-${month}-${day}`);
    const [dateD,setdateD] = useState('');
    async function handleSubmit(e){
        e.preventDefault();

        if(name !== '' || dateD != ''){
            const response = await axios.post('http://localhost/reactapp/backend/submit/saveemprestimo.php',{
                leitor: leitor,
                livro: idlivro,
                datee: dateE,
                dated: dateD
            }, {
                 withCredentials: true
              });

            const data = await response.data;

            if(data == 'true'){
                toast.success('Dados salvos com sucesso!');
                setLeitor('');
                props.close();
            }else{
                toast.error("Ocorreu um erro, tente novamente!")
            }
        }else{
            toast.error('Preencha todos os campos!')
        }
    }

    useEffect(() => {
        async function getName(){
            try {
                const responselivro = await axios.get(`http://localhost/reactapp/backend/selects.php?select=nomelivro&num=${idlivro}`, {
                    withCredentials: true,
                });
                const responseleitores = await axios.get('http://localhost/reactapp/backend/selects.php?select=leitores', {
                    withCredentials: true,
                });

                const dataresponselivro = await responselivro.data;
                const dataresponseleitores = await responseleitores.data;

                setLeitores(dataresponseleitores);
                setName(dataresponselivro.nome);
            } catch (error) {
                console.error(error);
            }
        };

        getName();
      },[]);

    return(
        <>
            <h2>Emprestar Livro</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>Leitor: </label><br/>
                <select className="leitores-options" onChange={(e)=>setLeitor(e.target.value)} required>
                    <option defaultValue="">Seleciona uma das opções abaixo</option>
                    {leitores && leitores.map((leitor)=> (<option value={leitor.id} key={leitor.id}>{leitor.nome}</option>))}
                </select><br/>
                <label>Livro: </label><br/>
                <input id="disabled" type="text" value={name} disabled/>
                <div className="aviso" > * Campo preenchido conforme o livro selecionado</div><br/><br/>
                <label>Data Empréstimo: </label><br/>
                <input type="date" value={dateE} onChange={(e)=>{setdateE(e.target.value)}} required/><br/>
                <label>Data Devolução: </label><br/>
                <input type="date" value={dateD} onChange={(e)=>{setdateD(e.target.value)}}/><br/><br/>
                <input type="submit" value="Enviar"/><br/><br/>
            </form>
        </>
    )
}