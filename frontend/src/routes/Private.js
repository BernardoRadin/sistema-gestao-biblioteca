import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import checkSession from '../components/checkSession';

export default function Private({ children }){
    const [loading,setLoading] = useState(true);
    const [signed,setSigned] = useState(false);

    useEffect(()=>{
        async function checkLogin(){
            const data = await checkSession('user');
            if(data){
                setLoading(false);
                setSigned(true);
            }else{
                setLoading(false);
                setSigned(false);
            }
        }

        checkLogin();

    },[])

    if(loading){
        return(
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to="/"/>
    }

    return children;

}