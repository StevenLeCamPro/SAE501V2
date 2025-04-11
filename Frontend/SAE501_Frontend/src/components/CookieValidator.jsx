import Cookies from 'js-cookie';
import Api from './Api';
import useCheckRole from './ReadCookie';

async function roleValidator(requiredRole) {
    const authData = Cookies.get('pharminnov_login')

    const checkRole = useCheckRole(requiredRole)

    if (checkRole === 2) {

        try {
            const data = { auth_data: JSON.parse(authData) }
            const result = await Api("token", "post", null, data);
            console.log("API Response:", result);
            return true
        } catch (error) {
            console.error("Access denied", error);
            return false
        }
    }
    return false
}

export default roleValidator;