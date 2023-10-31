import './login.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import checkSession from '../../components/checkSession';
import  axios  from 'axios';

export default function Login(){
    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function sessionExists(){
        const data = await checkSession('user');
        if(data){
            navigate('/biblioteca');
            return;
        }
    }

    useEffect(()=>{
        sessionExists();
    },[])

    async function handleSubmit(e){
        e.preventDefault();

        if(user !== '' && password !==''){

            const response = await axios.post('http://localhost/reactapp/backend/login.php', {
                user: user,
                password: password
            },{
                withCredentials: true,
            });

            const data = await response.data;

            if(data){
                navigate('/biblioteca',{replace: true});
                return;
            }else{
                setError('Usuário ou senha inválidos!')
            }
            setUser('');
            setPassword('');
        }else{
            setError('Preencha todos os campos!')
        }
    }

    return(
        <div className="container-login">
            <div className="middle-login">
            <div className="div-image">
            <img className="img" src="https://seel-sp.org.br/site/wp-content/uploads/2019/04/Livro-Logo-SEEL.png"></img>
            </div>
            <h1 className="title">LOGIN</h1>
                <form method="POST" className="form" onSubmit={handleSubmit}>
                    <label>Usuário: </label>
                    <input type="text" id="user" placeholder=" Usuário" value={user} onChange={(e)=>setUser(e.target.value)}/>
                    <label>Senha: </label>
                    <input type="password" id="pass" placeholder=" Senha" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    {/* <a className="forgot">Esqueceu a senha?</a> */}
                    <p className="error-login">{error}</p>
                    <input type="submit" className="submit" value="Entrar"/>
                    <Link className="register" to="/register">
                        Não possui uma conta? Cadastre-se
                    </Link>
                </form>
            </div>
        </div>
    )
}