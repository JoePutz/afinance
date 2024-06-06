import * as yup from 'yup';
import baseSchema from './library'

const {
    searchId,
    searchName,
    searchAmount
} = baseSchema

const schema = yup.object().shape({
    searchName: searchName,
    searchId: searchId,
    accountFloor:searchAmount,
    accountCeiling: searchAmount,
})

export default schema;
