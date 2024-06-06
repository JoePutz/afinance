import axios from '../axiosCustom';

const UserAPI =  {

    /**
     * User Login API:<br/>
     * OnSuccess: Retrieves new JWT & stores in localstorage <br/>
     * OnFail: Returns Error and message
     * @param credentials
     * @returns {Promise<response<any>|Error>}
     */
    login: async function(credentials)  {
        try {
            const res = await axios.post('/api/login', credentials);
            if(res.status===200) localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, res.headers.authorization)
            return res;
        }catch (e){
            if (e.response.status === 403 ) return new Error('Invalid Credentials');
            else return new Error('Oops! We\'re checking what the problem is.')
        }

    },
    create: async function (userDetails) {
        try {
            return await axios.post('/api/users/registration', userDetails)
        } catch (e) {
            const errorMsg = e?.response?.data[0] || e.message()
            return new Error(errorMsg)
        }
    },
    getUsers: async function (pageable) {
        try{
            return await axios.get('/api/users', {params: pageable})
        }catch (e){
            console.error(e.response)
        }
    },

    getUserById: async function(userId) {
        try{
            return await axios.get(`/api/users/${userId}`)
        }catch (e) {
            console.error(e.response)
        }
    }
}

export default UserAPI;
