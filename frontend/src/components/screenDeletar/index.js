import './deletar.css';
import axios from 'axios';
import {React, useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Deletar(props){

    const navigate = useNavigate();
    async function postDelete(){

        const response = await axios.post('http://localhost/reactapp/backend/submit/delete.php',{
            id: props.id,
            deletar: props.deletar
          },{
            withCredentials: true
          });

        const dataresponse = await response.data;

        if(dataresponse == 'true'){
            if(props.deletar == 'livro'){
                toast.success('Livro deletado com sucesso!');
                props.closeviewmore();
            }
            if(props.deletar == 'emprestimo'){
                toast.success('Empréstimo deletado com sucesso!');
                props.closedelete();
            }
            if(props.deletar == 'leitor'){
                toast.success('Leitor deletado com sucesso!');
                props.closedelete();
            }
        }else{
            toast.error('Ocorreu um erro ao deletar!');
        }

    }

    return(
        <div className='div-deletar'>
            {props.deletar == 'livro' && (
                <>
                <h1>Deseja excluir o livro selecionado?</h1>
                <p>Todos os empréstimos vinculados a esse livro serão perdidos!</p>
                </>
            )}
            {props.deletar == 'emprestimo' && (
                <>
                <h1>Deseja excluir o empréstimo selecionado?</h1>
                </>
            )}
            {props.deletar == 'leitor' && (
                <>
                <h1>Deseja excluir o leitor selecionado?</h1>
                </>
            )}
            <div className='div-buttons'>
                <button className="button excluir" onClick={() => postDelete()}>Sim, excluir</button>
                <button className="button nao" onClick={() => props.closedelete()}>Não</button>
            </div>
        </div>
    )
}