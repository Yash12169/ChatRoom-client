import React, {useEffect, useState} from 'react';

function Auth() {
    const [isAuth,setIsAuth] = useState(false)
    useEffect(() => {
        if(localStorage.getItem('access_token')!=null) {
            setIsAuth(true);
        }
    }, [isAuth]);
    return (
        <>
            {isAuth ? <button>Logout</button> :<button>Login</button>}
        </>
    );
}

export default Auth;
