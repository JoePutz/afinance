from faker import Faker
import requests
import random
import string
import re
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

fake = Faker()

load_dotenv()
BASE_URL_USERS = os.getenv("BASE_URL_USERS")
BASE_URL_APPS = os.getenv("BASE_URL_APPS")
BASE_URL_BANKS = os.getenv("BASE_URL_BANKS")
BASE_URL_ACCOUNTS = os.getenv("BASE_URL_ACCOUNTS")
BASE_URL_TRANSACTIONS = os.getenv("BASE_URL_TRANSACTIONS")
BEARER_TOKEN = os.getenv("BEARER_TOKEN")

headers = {
    'Authorization': f'Bearer {BEARER_TOKEN}'
}

def generate_password():
    # Define the character sets
    lowercase_letters = string.ascii_lowercase
    uppercase_letters = string.ascii_uppercase
    digits = string.digits
    symbols = '@$!%*?&'

    # Ensure at least one of each character type
    password = [random.choice(lowercase_letters),
                random.choice(uppercase_letters),
                random.choice(digits),
                random.choice(symbols)]

    # Generate the remaining characters
    password.extend(random.choices(lowercase_letters + uppercase_letters + digits + symbols, k=random.randint(4, 8)))

    # Shuffle the characters to make it more random
    random.shuffle(password)

    # Convert the list to a string
    password = ''.join(password)
    
    return password

def generate_phone_number():
    phone_number = fake.phone_number()
    # Remove non-digit characters from the generated phone number
    phone_number_digits = re.sub(r'\D', '', phone_number)
    # Format the phone number as xxx-xxx-xxxx
    formatted_phone_number = '-'.join([phone_number_digits[:3], phone_number_digits[3:6], phone_number_digits[6:10]])
    return formatted_phone_number

def generate_date_of_birth():
    # Calculate the start date 25 years ago from today
    end_date = datetime.now() - timedelta(days=25*365)
    start_date = datetime.now() - timedelta(days=90*365)
    # Generate a date between start date and today
    dob = fake.date_between(start_date=start_date, end_date=end_date)
    return dob

def generate_license():
    capital_letter = random.choice(string.ascii_uppercase)
    # Generate 11 random numerals
    numerals = ''.join(random.choices(string.digits, k=11))
    # Concatenate the capital letter and numerals
    license = capital_letter + numerals
    return license

def generate_banks_and_branches(x, y):
    for i in range(x):
        routingNumber = fake.aba()
        address = fake.street_address()
        city = fake.city()
        state = fake.state()
        zipcode = fake.zipcode()
        add_bank(routingNumber, address, city, state, zipcode)
    for i in range(y):
        name = fake.company()
        address = fake.street_address()
        city = fake.city()
        state = fake.state()
        zipcode = fake.zipcode()
        phone = generate_phone_number()
        bankID = random.randint(1, x)
        add_branch(name, address, city, state, zipcode, phone, bankID)

def add_bank(routingNumber, address, city, state, zipcode):
        url = f"http://localhost:8083/banks"
        bank = {
            "routingNumber" : routingNumber,
            "address" : address,
            "city" : city,
            "state" : state,
            "zipcode" : zipcode
        }

        response = requests.post(url, json=bank, headers = headers)

        if response.status_code == 201:
            print("Registration successful:", response.json())
        else:
            print('Error registering bank:', response.text)
        
        print(response)
        return response


def add_branch(name, address, city, state, zipcode, phone, bankID):
    url = f"{BASE_URL_BANKS}/branches"
    branch = {
        "name" : name,
        "address" : address,
        "city" : city,
        "state" : state,
        "zipcode" : zipcode,
        "phone" : phone, 
        "bankID": bankID
    }

    response = requests.post(url, json=branch, headers = headers)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering branch:', response.text)
    return response

def make_admin(number):
    for i in range(number):
        admin = generate_admin()
        add_admin(admin)

def generate_admin():
    username = fake.user_name()
    password = generate_password()
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = fake.email()
    phone_number = generate_phone_number()
    admin = {
        "username" : username,
        "password" : password,
        "role" : "admin",
        "firstName" : first_name,
        "lastName" : last_name,
        "email" : email,
        "phone" : phone_number
    }
    return admin

def add_admin(admin):
    url = f"{BASE_URL_USERS}/users/registration"

    response = requests.post(url, json=admin, headers = headers)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering user:', response.text)
    return response

def generate_member(application, member):
    username = fake.user_name()
    password = generate_password()
    membershipId = member["createdMembers"][0]["membershipId"]
    lastFourOfSSN = application["applicants"][0]["socialSecurity"][-4:]
    user = {
            "username" : username,
            "password" : password,
            "role" : "member",
            "membershipId" : membershipId,
            "lastFourOfSSN" : lastFourOfSSN
        }
    return user

def add_member(user):
    url_users = f"{BASE_URL_USERS}/users/registration"
    response = requests.post(url_users, json=user, headers = headers)
    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering member user:', response.text)
    return response

def make_member(number):
    for i in range(number):
        application = generate_applications_and_applicants()
        member = add_applications_and_applicants(application).json()
        user = generate_member(application, member)
        add_member(user)

def make_application(number):
    for i in range(number):
        application = generate_applications_and_applicants()
        add_applications_and_applicants(application)

def generate_applications_and_applicants():
    applicationType = random.choice(["CHECKING", "SAVINGS", "CHECKING_AND_SAVINGS"])
    firstName = fake.first_name()
    middleName = fake.first_name()
    lastName = fake.last_name()
    dateOfBirth = generate_date_of_birth().isoformat()
    gender = random.choice(["MALE", "FEMALE", "OTHER", "UNSPECIFIED"])
    email = fake.email()
    phone = generate_phone_number()
    socialSecurity = fake.ssn()
    driversLicense = generate_license()
    income = random.randint(1500000, 50000000)
    address = fake.street_address()
    city = fake.city()
    state = fake.state()
    zipcode = fake.zipcode()
    applicationAmount = random.randint(0, 5000)
    application = {
        "applicationType": applicationType,
        "noNewApplicants": False,
        "applicantIds": [
            0
        ],
        "applicants": [
            {
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "dateOfBirth": dateOfBirth,
                "gender": gender,
                "email": email,
                "phone": phone,
                "socialSecurity": socialSecurity,
                "driversLicense": driversLicense,
                "income": income,
                "address": address,
                "city": city,
                "state": state,
                "zipcode": zipcode,
                "mailingAddress": address,
                "mailingCity": city,
                "mailingState": state,
                "mailingZipcode": zipcode
            }
        ],
        "applicationAmount": applicationAmount,
    }
    return application

def add_applications_and_applicants(application):
    url = f"{BASE_URL_APPS}/applications"
    response = requests.post(url, json=application, headers = headers)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering application:', response.text)
    return response

def make_transactions(number):
    for i in range(number):
        transaction = generate_transaction()
        add_transaction(transaction)

def generate_transaction():
    url_accounts = f"{BASE_URL_ACCOUNTS}/accounts"
    account_nums = []
    response = requests.get(url_accounts, headers=headers)
    if response.status_code == 200:
    # Extract the list of users from the response JSON
        data = response.json()
        accounts = data.get('content')
        # print('Retrieval successful:', accounts)

        for account in accounts:
            account_nums.append(account.get('accountNumber'))
    else:
        print('Error fetching users:', response.text)
    type = random.choice(["DEPOSIT", "WITHDRAWAL", "TRANSFER_IN", "TRANSFER_OUT", "PURCHASE", "PAYMENT", "REFUND", "VOID"])
    method = random.choice(["ACH", "ATM", "CREDIT_CARD", "DEBIT_CARD", "APP"])
    amount = random.randint(1, 111111)
    accountNumber = random.choice(account_nums)
    transaction = {
        "type": type,
        "method": method,
        "amount": amount,
        "accountNumber": accountNumber
    }
    if type in ["DEPOSIT", "PURCHASE", "PAYMENT", "REFUND", "VOID"]:
        transaction["merchantName"] = fake.first_name()
        transaction["merchantCode"] = random.randint(1111, 999999)
    return transaction

def add_transaction(transaction):
    url_transactions = f"{BASE_URL_TRANSACTIONS}/transactions"

    response = requests.post(url_transactions, json=transaction, headers = headers)

    if response.status_code == 200:
        print("Transaction successful:", response.json())
    else:
        print('Error registering transaction:', response.text)
    return response

if __name__ == "__main__":
    response = make_transactions(1)