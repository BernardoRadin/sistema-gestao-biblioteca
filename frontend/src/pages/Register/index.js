import './register.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if(user !== '' && password !== '' && email !== ''){

            const response = await fetch('http://localhost/reactapp/backend/register.php', {
                method: 'POST',
                body: JSON.stringify({
                    user: user,
                    password: password,
                    email: email
                }),
            });
    
            const data = await response.json(); // Espera pela conversão da resposta para JSON
        
            if(data === true){
                navigate('/');
            }else{
                alert('erro');
            }
            setUser('');
            setPassword('');
        }else{
            alert('Preencha todos os campos!');
        }
    }

    return(
        <div className="container-login">
            <div className="middle-register">
            <div className="div-image">
            <img className="img" src="https://seel-sp.org.br/site/wp-content/uploads/2019/04/Livro-Logo-SEEL.png"></img>
            </div>
            <h1 className="title">CADASTRE-SE</h1>
                <form method="POST" className="form" onSubmit={handleSubmit}>
                    <label>Nome do Usuário: </label>
                    <input type="text" id="user" placeholder=" Insira aqui seu nome de usuario" value={user} onChange={(e)=>setUser(e.target.value)}/>
                    <label>Email: </label>
                    <input type="email" id="email" placeholder=" Insira aqui seu email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Senha: </label>
                    <input type="password" id="pass" placeholder=" Insira aqui sua senha" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <input type="submit" className="submit" value="Cadastrar"/>
                    <Link className="register" to="/">
                        Já tem conta? Faça o login
                    </Link>
                </form>
            </div>
        </div>
    )
}