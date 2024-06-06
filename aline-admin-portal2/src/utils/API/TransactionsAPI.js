import axios from '../axiosCustom'

const TransactionsAPI = {
    create: async function(transaction) {
        try{
            return await axios.post('/api/transactions', transaction);
        }catch (e){
            console.error(e.message)
        }
    },
    getTransactionByAccountId: async function(accountId, pages){
        try{
            return await axios.get(`/api/accounts/${accountId}/transactions`, {params: {pages}});
        }catch (e){
            console.error(e.message)
        }
    }

}
export default TransactionsAPI;
