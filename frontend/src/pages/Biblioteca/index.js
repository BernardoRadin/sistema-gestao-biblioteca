import './biblioteca.css';
import checkSession from '../../components/checkSession';
import React, { useEffect, useState } from 'react';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image-book.png';
import invite from '../../assets/invite.png';
import aceitar from '../../assets/aceitar.png';
import recusar from '../../assets/recusar.png';
import { toast } from 'react-toastify';

export default function Biblioteca(){
    const [name,setName] = useState([]);
    const [data,setData] = useState([]);
    const [newlib,setNewlib] = useState(false);
    const [viewinvite,setViewInvite] = useState(false);
    const [datainvite,setDataInvite] = useState(false);
    const [dataselect, setDataSelect] = useState(true);
    const navigate = useNavigate();

    async function sessionExists(){
        const session = await checkSession('user');
        
        if(!session){
            navigate('/');
            return;
        }
    }

    async function getBiblioteca(){
        const response = await axios.get('http://localhost/reactapp/backend/selects.php?select=biblioteca', {
            withCredentials: true,
        });
        setData(response.data);
    };

    useEffect(() => {
        getBiblioteca();
        sessionExists();
    },[]);


    async function showinvites(){
      setViewInvite(true);
      const response = await axios.get('http://localhost/reactapp/backend/selects.php?select=convites', {
        withCredentials: true,
      });
  
      setDataInvite(await response.data);
    }

    async function postinvite(id,info){

      const response = await axios.post('http://localhost/reactapp/backend/submit/saveconfirmaconvite.php', {
        id: id,
        confirm: info
      },{
        withCredentials: true,
      });
  
      const dataresponseinvite = await response.data;

      if(dataresponseinvite){
        if(info == 1){
          toast.success("Convite aceito com sucesso, agora você tem acesso a biblioteca!");
        }
        if(info == 0){
          toast.success("Convite recusado com sucesso!");
        }
      }else{
        toast.error("Ocorreu um erro!");
      }

      getBiblioteca();
      setViewInvite(false);

    }

    async function handleClick(id){
      const responseselect =  await axios.post('http://localhost/reactapp/backend/selectbiblioteca.php', {
        num: id
      },{
          withCredentials: true,
      });
      const datahandleclick = await responseselect.data;
      setDataSelect(datahandleclick);

      if(dataselect){
          return navigate('/painel');
      }else{
          console.log("Ocorreu um erro no sistema!!");
          return
      }
    }

    async function handleSubmit(e){
      e.preventDefault();
      
      if(name != ""){

        const response = await axios.post('http://localhost/reactapp/backend/submit/savebiblioteca.php',{
          name: name
        },{
          withCredentials: true
        });

        const dataresponse = await response.data;

        if(dataresponse){
          toast.success('Dados salvos com sucesso!');
          setNewlib(false);
          getBiblioteca();
        }else{
          toast.success('Ocorreu um erro!');
        }
        setName('');
      }

    }
    return (
        <div>
          <div className='middle'>
            <div className="select">
              <img className="logo-img" src={logo} />
              {newlib != true && viewinvite != true && (
                <>
                  <h1 className="title-biblioteca">Selecione uma biblioteca: </h1>
                  <div className="div-box">
                    {data && data.map((value) => (
                      <div className="box-select" key={value.id} onClick={ () => { handleClick(value.id)} }>
                        <h3 className="name-biblioteca">{value.nomebiblioteca}</h3>
                        <p className="name-user">{value.nomeusuario}</p>
                      </div>
                    ))}
                  </div>
                  <div className="new" onClick={()=>setNewlib(true)}> <h2 className="title-new">+ Nova biblioteca </h2></div>
                  <div className='div-invite'>
                    <img className='invite' src={invite} onClick={() => showinvites()}/>
                  </div>
                </>
              )}
              {viewinvite && (
                <>
                  <h1 className="title-biblioteca">Convites Recebidos</h1>
                  <div className="div-box">
                    {datainvite == '' && (
                      <p>Você não tem nenhum convite!</p>
                    )}
                    {datainvite && datainvite.map((value) => (
                    <>
                      <div className="box-select" key={value.id}>
                        <div className="div-info-text">
                          <h3 className="name-biblioteca">{value.bibliotecanome}</h3>
                          <p className="name-user">{value.usuarionome}</p>
                        </div>
                        <div className='div-aceitar-recusar'>
                          <img className="aceitar" src={aceitar} onClick={() => postinvite(value.id,1)}/>
                          <img className="recusar" src={recusar} onClick={() => postinvite(value.id,0)}/>
                        </div>
                      </div>
                    </>
                    ))}
                    <p className='voltar' onClick={()=>{setViewInvite(false)}}>⇦ Voltar</p>
                  </div>
                </>
              )}

              {newlib && (
                <>
                  <h1 className="title-biblioteca">Criar Nova Biblioteca</h1>
                  <div className="div-form-new">
                    <form className="form" onSubmit={handleSubmit}>
                      <label>Nome Biblioteca:  </label>
                      <input className="input-lib" type="text" placeholder='Insira aqui o nome da biblioteca' onChange={(e)=>setName(e.target.value)} value={name}/>
                      <input className="new-lib" type="submit" value="Enviar"/>
                    </form>
                  </div>
                  <p className='voltar' onClick={()=>{setNewlib(false)}}>⇦ Voltar</p>
                </>
              )}
            </div>
          </div>
        </div>
      );
  };