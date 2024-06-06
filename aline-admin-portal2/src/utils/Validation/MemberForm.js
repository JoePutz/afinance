import * as yup from 'yup';
import baseSchema from './library'

const{
    firstName,
    middleName,
    lastName,
    income,
    phone,
    email,
    address,
    city,
    state,
    zipcode,
    mailingAddress,
    mailingCity,
    mailingState,
    mailingZipcode
} = baseSchema

const schema = yup.object().shape({
    firstName,
    middleName,
    lastName,
    income,
    phone,
    email,
    address,
    city,
    state,
    zipcode,
    mailingAddress,
    mailingCity,
    mailingState,
    mailingZipcode
})

export default schema;
