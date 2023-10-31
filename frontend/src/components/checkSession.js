import axios from 'axios';

export default async function checkSession(sessionname){
    async function checkLogin(){
        if(sessionname == 'user'){
            try {
                const response = await axios.get('http://localhost/reactapp/backend/session.php?s=user', {
                    withCredentials: true
                });

                const data = await response.data;
                return data;
            } catch (error){
                throw error;
            }
        }else if(sessionname == 'dados'){
            try {
                const response = await axios.get('http://localhost/reactapp/backend/session.php?s=dados', {
                    withCredentials: true
                });
    
                const data = await response.data;
                return data;
            } catch (error){
                throw error;
            }
        }
    }

    return await checkLogin();
}