import Cookies from 'js-cookie';

function logout(nav) {
    Cookies.remove('pharminnov_login');
    console.log('User logged out');
    nav('/');
};

export default logout