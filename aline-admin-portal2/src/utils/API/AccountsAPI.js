import axios from '../axiosCustom'

const AccountsAPI = {
    getAccountsByMemberID: async function(memberId){
        try {
            return await axios.get(`/api/members/${memberId}/accounts`)
        }catch (e) {
            console.error(e.response)
        }
    },
    getAccountById: async function(accountId){
        try {
            return await axios.get(`/api/accounts/${accountId}`)
        }catch (e){
            console.error(e.response)
        }
    }
}

export default AccountsAPI;
