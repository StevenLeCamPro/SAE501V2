import Cookies from 'js-cookie';

function useCheckRole(requiredRole) {

    const authData = Cookies.get('pharminnov_login');
    if (!authData) {
        console.log('not connected')
        
        return 0;
    }

    const { user_id, role } = JSON.parse(authData);

    if (!user_id || role < requiredRole) {
        console.log('not the good role')
       
        return 1;
    }

    console.log('all good')
    return 2;
}

export default useCheckRole;