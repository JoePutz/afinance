import * as yup from 'yup';
import baseSchema from './library'

const {
    firstName,
    lastName,
    phone,
    email,
    username,
    password
} = baseSchema

const schema = yup.object().shape({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    username: username,
    password: password
})

export default schema;
