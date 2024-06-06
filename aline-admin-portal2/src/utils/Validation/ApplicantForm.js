import * as yup from 'yup';
import baseSchema from './library'

const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phone,
    socialSecurity,
    driversLicense,
    income,
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

    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    gender: gender,
    email: email,
    phone: phone,
    socialSecurity: socialSecurity,
    driversLicense: driversLicense,
    income: income,
    address: address,
    city: city,
    state: state,
    zipcode: zipcode,
    mailingAddress: mailingAddress,
    mailingCity: mailingCity,
    mailingState: mailingState,
    mailingZipcode: mailingZipcode

})

export default schema;
