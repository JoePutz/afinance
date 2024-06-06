import axios from '../axiosCustom'

const ApplicationAPI = {
    newApplicant : async function(applicationRequest){
        try {
            return await axios.post('/api/applications', applicationRequest)
        }catch (e) {
            console.error(e.message())
        }
    }
}

export default ApplicationAPI;
