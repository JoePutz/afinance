import {date, number, string} from 'yup';

const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - 17);

const validations = {
    applicationType: string()
        .label('Application Type')
        .required('Application type is required')
        .matches(/(CHECKING|SAVINGS|CHECKING_AND_SAVINGS|CREDIT_CARD|LOAN)/, (err) => `'${err.value}' is not valid application type.`),

    email: string()
        .label('Email')
        .required()
        .email((err) => `'${err.value}' is not a valid email address.`),

    firstName: string()
        .label('First Name')
        .required()
        .matches(/^[aA-zZ\s-]+$/, (err) => `'${err.value}' is not a valid name.`),

    middleName: string()
        .label('Middle Name')
        .matches(/^[aA-zZ\s-]+$/, (err) => `'${err.value}' is not a valid middle name.`)
        .nullable(true)
        .transform(v=>(v===''? null: v)),

    lastName: string()
        .label('Last Name')
        .required()
        .matches(/^[aA-zZ\s-]+$/, (err) => `'${err.value}' is not a valid name.`),

    gender: string()
        .label('Gender')
        .required('Please select a gender.')
        .matches(/(MALE|FEMALE|OTHER|UNSPECIFIED)/, 'Please select a gender.'),

    dateOfBirth: date()
        .label('Date of Birth')
        .typeError('Not a valid date.')
        .transform((val) => new Date(val))
        .required('Date of birth is required.')
        .max(minAgeDate, 'Must be at least 18 years of age.'),

    phone: string()
        .label('Phone Number')
        .required()
        .matches(/\(\d{3}\)[\s-.]\d{3}[\s-.]\d{4}/,
            (err) => `'${err.value}' is not a valid phone number.`),

    address: string()
        .label('Address')
        .required('Address is required.')
        .matches(/^([0-9]+([a-zA-Z]+)?)\s(.*)(\s)([a-zA-Z]+)(\.)?(\s(#?(\w+))|([A-Za-z]+\.?(\w+)))?$/i,
            (err) => `'${err.value}' is not a valid address.`),

    city: string()
        .label('City')
        .required('City is required.'),

    state: string()
        .label('State')
        .required('State is required.'),

    zipcode: string()
        .label('Zipcode')
        .required('Zipcode is required.')
        .matches(/^\d{5}(-\d{4})?$/,
            (err) => `'${err.value}' is not a valid zipcode.`),

    sameAsBilling: string()
        .matches(/(true|false)/i)
        .required('Please select an option.'),

    mailingAddress: string()
        .label('Mailing Address')
        .transform((value) => (value.length <= 0 ? undefined : value))
        .when('sameAsBilling', {
            is: 'false',
            then: string()
                .matches(/^(((PO|P O|P.O)\.?\s(Box)\s([0-9]+))|(([0-9]+([a-zA-Z]+)?)\s(.*)(\s)([a-zA-Z]+)(\.)?(\s(#?(\w+))|([A-Za-z]+\.?(\w+)))?))$/i,
                    (err) => `'${err.value}' is not a valid address.`).required('Address is required.'),
            otherwise: string().notRequired()
        }),

    mailingCity: string()
        .label('Mailing City')
        .transform((value) => (value.length <= 0 ? undefined : value))
        .when('sameAsBilling', {
            is: 'false',
            then: string().required('City is required.')
        }),

    mailingState: string()
        .label('Mailing State')
        .transform((value) => (value.length <= 0 ? undefined : value))
        .when('sameAsBilling', {
            is: 'false',
            then: string().required('State is required.')
        }),

    mailingZipcode: string()
        .label('Mailing Zipcode')
        .transform((value) => (value.length <= 0 ? undefined : value))
        .matches(/^\d{5}(-\d{4})?$/,
            (err) => `${err.value} is not a valid zipcode.`)
        .when('sameAsBilling', {
            is: 'false',
            then: string().required('Zipcode is required.')
        }),

    driversLicense: string()
        .label('Driver\'s License')
        .required(),

    socialSecurity: string()
        .label('Social Security')
        .required()
        .matches(/(\d{3})-(\d{2})-(\d{4})/, (err) => `${err.value} is not a valid social security number.`),

    incomeFrequency: string()
        .label('Income Frequency')
        .required()
        .default('Annually')
        .matches(/(Annually|Monthly|Bi-Weekly|Weekly|Hourly)/i),

    income: number()
        .label('Income')
        .typeError('Income must be number')
        .positive('Cannot have negative income.')
        .min(.01, 'Income must be greater than $0.01')
        .required('Income is required.'),

    initialDeposit: number()
        .positive('Cannot have a negative deposit.')
        .label('Initial Deposit')
        .required('An initial deposit is required.'),

    username: string()
        .label('Username')
        .required(),

    password: string()
        .label('Password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid password')
        .required(),

    searchId: number()
        .label('Searchable Id')
        .transform((value) => (isNaN(value) ? null : value))
        .nullable(true),

    searchName: string()
        .label('Searchable name')
        .nullable(true)
        .transform(v=>(v===''? null: v)),

    searchAmount: number()
        .label('Search Amount')
        .typeError('Search amount must be a number')
        .transform((value) => (isNaN(value) ? null : value))
        .nullable(),

    transactionType: string()
        .label('Transaction Type')
        .required(),

    transactionMethod: string()
        .label('Transaction Method')
        .required(),

    amount: number()
        .label('Amount')
        .typeError('Amount must be a number')
        .required(),

    merchantCode: string()
        .label('Merchant Code')
        .min(4, 'Merchant Code must be at least 4 characters in length')
        .max(8, 'Merchant Code cannot be greater than 8 characters in length')
        .required(),

    merchantName: string()
        .label('Merchant Name')
        .required(),

    accountNumber: string()
        .label('Account Number')
        .required(),

    transactionDescription: string()
        .label('Transaction Description')
        .nullable(true)

}

export default validations;
