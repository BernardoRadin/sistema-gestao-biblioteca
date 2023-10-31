import '../form.css';
import {React, useState, useEffect, useMemo} from 'react';
import  axios  from 'axios';
import { toast } from 'react-toastify';

export default function FormLivros(){
    const [name,setName] = useState('');
    const [author,setAuthor] = useState('');
    const [sinopse,setSinopse] = useState('');
    const [image,setImage] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        if(name !== '' && author !== '' && image !==''){

            const formData = new FormData();

            formData.append('name', name);
            formData.append('author', author);
            formData.append('image', image);
            formData.append('sinopse', sinopse);

            const response = await axios.post('http://localhost/reactapp/backend/submit/savelivro.php', 
                formData
              , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                 withCredentials: true
              });

            const data = await response.data;

            if(data == 'true'){
                toast.success('Dados salvos com sucesso!');
                document.getElementById('file-image').value = '';
                setName('');
                setAuthor('');
                setSinopse('');
                setImage('');
                return;
            }else if(data == 'FormatImage'){
                toast.error("Insira um imagem com formato JPEG, JPG ou PNG!");
            }else{
                toast.error("Ocorreu um erro tente novamente!")
            }
        }else{
            toast.error('Preencha todos os campos!')
        }
    }

    return(
        <div className="animation">
            <h2>Cadastro Livros</h2>
            <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <label>Nome: </label><br/>
                <input type="text" placeholder=" Nome" onChange={(e)=>setName(e.target.value)}  value={name}/><br/><br/>
                <label>Autor: </label><br/>
                <input type="text" placeholder=" Autor" onChange={(e)=>setAuthor(e.target.value)} value={author}/><br/><br/>
                <label>Sinopse: </label><br/>
                <input type="text" placeholder=" Sinopse" onChange={(e)=>setSinopse(e.target.value)} value={sinopse}/><br/><br/>
                <label>Imagem: </label><br/>
                <input id="file-image" type="file" placeholder=" Anexe a imagem da capa" onChange={(e)=>setImage(e.target.files[0])}/><br/><br/>
                <input type="submit" value="Enviar"/><br/><br/>
            </form>
        </div>
    )
}