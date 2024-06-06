import * as yup from 'yup';
import baseSchema from './library'

const {
    firstName,
    lastName,
    phone,
    email,
    username
} = baseSchema

const schema = yup.object().shape({
    firstName,
    lastName,
    phone,
    email,
    username
})

export default schema;
