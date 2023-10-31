import './header.css';
import logo from '../../assets/image-book.png';
import { Link } from 'react-router-dom';
import img from '../../assets/adduser.png';
import {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Header(){

    const [listuser,setlistUser] = useState([]);
    const [user,setUser] = useState([]);
    const [usersallow,setUsersAllow] = useState([]);
    const input = document.querySelector(".input-convida");
    const [showusers,setShowusers] = useState(false);

    async function showListEmails(val){
        const response = await axios.get("http://localhost/reactapp/backend/selects.php",{
            params:{
                select: "listausuarios",
                email: val
            },
            withCredentials: true
        });

        const responsedata = await response.data;
        setlistUser(responsedata);
    }

    async function handleSubmit(id){
        const response = await axios.post("http://localhost/reactapp/backend/submit/saveconvite.php",{
                id: id
        },{
            withCredentials: true
        });

        const responsedata = await response.data;

        if(responsedata){
            setlistUser([]);
            setUser([]);
            showusersallow();
            input.value = "";
            input.disabled = false;    
            toast.success("Convite enviado com sucesso!");
        }
    }

    async function showusersallow(){
        const response = await axios.get("http://localhost/reactapp/backend/selects.php?select=usuariosbiblioteca",{
            withCredentials: true
        });

        const responsedata = await response.data;
        setUsersAllow(responsedata);
    }

    function UserSelect(user){
        setlistUser([]);
        setUser(user);
        input.value = "";
        input.disabled = true;
    }

    function deleteUser(){
        setUser([]);
        input.disabled = false;
    }

    return(
        <header className="header">
            <div className="line">SISTEMA GESTÃO DE BIBLIOTECA</div>
            <div className="menu-header">
                <div className="logo">
                    <Link to="/painel"><img className="header-img" src={logo}/></Link>
                </div>
                <div className="div-links">
                    <Link className="list" to="/consultas">CONSULTAS</Link>
                    <Link className="list" to="/cadastros">CADASTROS</Link>
                    <img src={img} className="image-adduser" onClick={()=>{setShowusers(!showusers); setUser([]); showusersallow()}}/>
                </div>
            </div>
            {showusers && 
                <div className="div-convida-usuario">
                    <h3>Pessoas com acesso</h3>
                    <input type="text" onChange={(e) => showListEmails(e.target.value)} className="input-convida" placeholder='Adicione seus colegas de trabalho pelo E-mail'/>
                    <div className="div-list">
                        {listuser && listuser.map((user)=>(
                            <div key={user.id} className="user-list" onClick={() => {UserSelect(user)}} ><div className="color"></div> <div><p>{user.nome}</p> <p>{user.email}</p></div></div>
                        ))}
                        {user != '' && 
                        <>
                            <div className="user-list">
                                <div className="color"></div>
                                <div>
                                    <p>{user.nome}</p> 
                                    <p>{user.email}</p>
                                </div>
                                <p className="excluir-user" onClick={() => deleteUser()}> x </p>
                            </div>
                             <button className="enviar" onClick={()=> {handleSubmit(user.id)}}>Enviar Convite</button>
                             <hr/>
                        </>
                        }
                        {usersallow != '' && usersallow.map((user)=>(
                          <div key={user.id} className="user-list"><div className="color"></div> <div><p>{user.nome}</p> <p>{user.email}</p></div><p className="excluir-user" onClick={() => deleteUser()}> x </p></div>
                        ))}
                    </div>
                </div>
            }
        </header>
    )
}