import axios from '../axiosCustom'

const BankAPI = {
    searchMembers: async function (search) {
        try {
            return await axios.get('/api/members', {params: {...search}});
        } catch (e) {
            console.error(e.message)
        }
    },
    updateMember: async function (memberUpdate) {
        try {
            return await axios.put('/api/members', memberUpdate)
        } catch (e) {
            console.error(e.response)
        }
    },
    getMemberByMembershipId: async function(membershipId) {
        try{
            return await axios.get(`/api/members/${membershipId}`)
        }catch (e) {
            console.error(e.response)
        }
    }
}

export default BankAPI;
