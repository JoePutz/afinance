import * as yup from 'yup';
import baseSchema from './library'

const {
    transactionType,
    transactionMethod,
    amount,
    merchantCode,
    merchantName,
    accountNumber,
    transactionDescription
}= baseSchema

const schema = yup.object().shape({
    type: transactionType,
    method: transactionMethod,
    amount,
    merchantCode,
    merchantName,
    accountNumber,
    description: transactionDescription
})

export default schema;
