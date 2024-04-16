"""The functions to auto-generate data for the Aline Financial Banking App"""
from datetime import datetime, timedelta
import random
import string
import re
import os
import requests
from dotenv import load_dotenv
from faker import Faker

fake = Faker()

load_dotenv()
BASE_URL_USERS = os.getenv("BASE_URL_USERS")
BASE_URL_APPS = os.getenv("BASE_URL_APPS")
BASE_URL_BANKS = os.getenv("BASE_URL_BANKS")
BASE_URL_ACCOUNTS = os.getenv("BASE_URL_ACCOUNTS")
BASE_URL_TRANSACTIONS = os.getenv("BASE_URL_TRANSACTIONS")
BEARER_TOKEN = os.getenv("BEARER_TOKEN")
TIME_SECONDS = 100

headers = {
    'Authorization': f'Bearer {BEARER_TOKEN}'
}

def generate_password():
    """Generates a password that fits the aline criteria"""
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
    password.extend(random.choices(lowercase_letters + uppercase_letters + digits + symbols,
                                   k=random.randint(4, 8)))

    # Shuffle the characters to make it more random
    random.shuffle(password)

    # Convert the list to a string
    password = ''.join(password)

    return password

def generate_phone_number():
    """Generates data for a phone number"""
    phone_number = fake.phone_number()
    # Remove non-digit characters from the generated phone number
    phone_number_digits = re.sub(r'\D', '', phone_number)
    # Format the phone number as xxx-xxx-xxxx
    formatted_phone_number = '-'.join([phone_number_digits[:3], phone_number_digits[3:6],
                                       phone_number_digits[6:10]])
    return formatted_phone_number

def generate_date_of_birth():
    """Generates the data for a date of birth"""
    # Calculate the start date 25 years ago from today
    end_date = datetime.now() - timedelta(days=25*365)
    start_date = datetime.now() - timedelta(days=90*365)
    # Generate a date between start date and today
    dob = fake.date_between(start_date=start_date, end_date=end_date)
    return dob

def generate_license():
    """Generates the data for a license"""
    capital_letter = random.choice(string.ascii_uppercase)
    # Generate 11 random numerals
    numerals = ''.join(random.choices(string.digits, k=11))
    # Concatenate the capital letter and numerals
    license_num = capital_letter + numerals
    return license_num

def generate_banks_and_branches(x, y):
    """Sets up number and navigates the steps to post banks and branches"""
    i = 0
    j = 0
    # For all of x create the information for a bank
    for i in range(x):
        routing_number = fake.aba()
        address = fake.street_address()
        city = fake.city()
        state = fake.state()
        zipcode = fake.zipcode()
        add_bank(routing_number, address, city, state, zipcode)
        i += 1
    # For all of y create the information for a branch
    for j in range(y):
        name = fake.company()
        address = fake.street_address()
        city = fake.city()
        state = fake.state()
        zipcode = fake.zipcode()
        phone = generate_phone_number()
        bank_id = random.randint(1, x)
        add_branch(name, address, city, state, zipcode, phone, bank_id)
        j += 1

def add_bank(routing_number, address, city, state, zipcode):
    """Posts bank to database"""
    url = f"{BASE_URL_BANKS}/banks"
    bank = {
        "routingNumber" : routing_number,
        "address" : address,
        "city" : city,
        "state" : state,
        "zipcode" : zipcode
    }

    response = requests.post(url, json=bank, headers = headers, timeout=TIME_SECONDS)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering bank:', response.text)
    print(response)
    return response


def add_branch(name, address, city, state, zipcode, phone, bank_id):
    """Posts branch to database"""
    url = f"{BASE_URL_BANKS}/branches"
    branch = {
        "name" : name,
        "address" : address,
        "city" : city,
        "state" : state,
        "zipcode" : zipcode,
        "phone" : phone,
        "bankID": bank_id
    }

    response = requests.post(url, json=branch, headers = headers, timeout=TIME_SECONDS)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering branch:', response.text)
    return response

def make_admin(number):
    "Determines the number of admins to make and navigates the steps to post it"
    i = 0
    for i in range(number):
        admin = generate_admin()
        add_admin(admin)
        i += 1

def generate_admin():
    """Generates the information for an admin"""
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
    """Posts admin to the database"""
    url = f"{BASE_URL_USERS}/users/registration"

    response = requests.post(url, json=admin, headers = headers, timeout=TIME_SECONDS)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering user:', response.text)
    return response

def generate_member(application, member):
    """Generates the information for a member"""
    username = fake.user_name()
    password = generate_password()
    membership_id = member["createdMembers"][0]["membershipId"]
    last_four_ssn = application["applicants"][0]["socialSecurity"][-4:]
    user = {
            "username" : username,
            "password" : password,
            "role" : "member",
            "membershipId" : membership_id,
            "lastFourOfSSN" : last_four_ssn
        }
    return user

def add_member(user):
    """Posts member to database"""
    url_users = f"{BASE_URL_USERS}/users/registration"
    response = requests.post(url_users, json=user, headers = headers, timeout=TIME_SECONDS)
    if response.status_code == 422:
        print("Registration successful:", user)
    else:
        print('Error registering member user:', response.text)
    return response

def make_member(number):
    """Sets the number of members to make and navigates the steps to post them"""
    i = 0
    for i in range(number):
        application = generate_applications_and_applicants()
        member = add_applications_and_applicants(application).json()
        user = generate_member(application, member)
        add_member(user)
        i += 1

def make_application(number):
    """Determines number of applications to make and navigates steps to post"""
    i = 0
    for i in range(number):
        application = generate_applications_and_applicants()
        add_applications_and_applicants(application)
        i += 1

def generate_applications_and_applicants():
    """Generates data for applications and applicants"""
    application_type = random.choice(["CHECKING", "SAVINGS", "CHECKING_AND_SAVINGS"])
    first_name = fake.first_name()
    middle_name = fake.first_name()
    last_name = fake.last_name()
    birthday = generate_date_of_birth().isoformat()
    gender = random.choice(["MALE", "FEMALE", "OTHER", "UNSPECIFIED"])
    email = fake.email()
    phone = generate_phone_number()
    ssn = fake.ssn()
    user_license = generate_license()
    income = random.randint(1500000, 50000000)
    address = fake.street_address()
    city = fake.city()
    state = fake.state()
    zipcode = fake.zipcode()
    application_amount = random.randint(0, 5000)
    application = {
        "applicationType": application_type,
        "noNewApplicants": False,
        "applicantIds": [
            0
        ],
        "applicants": [
            {
                "firstName": first_name,
                "middleName": middle_name,
                "lastName": last_name,
                "dateOfBirth": birthday,
                "gender": gender,
                "email": email,
                "phone": phone,
                "socialSecurity": ssn,
                "driversLicense": user_license,
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
        "applicationAmount": application_amount,
    }
    return application

def add_applications_and_applicants(application):
    """Posts application data"""
    url = f"{BASE_URL_APPS}/applications"
    response = requests.post(url, json=application, headers = headers, timeout=TIME_SECONDS)

    if response.status_code == 201:
        print("Registration successful:", response.json())
    else:
        print('Error registering application:', response.text)
    return response

def make_transactions(number):
    """Sets the number of transactions and navigates the steps to post it"""
    i = 0
    for i in range(number):
        transaction = generate_transaction()
        add_transaction(transaction)
        i += 1

def generate_transaction():
    """Generates data for transactions"""
    url_accounts = f"{BASE_URL_ACCOUNTS}/accounts"
    account_nums = []
    # Get a JSON list of accounts
    response = requests.get(url_accounts, headers=headers, timeout=TIME_SECONDS)
    if response.status_code == 200:
    # Extract the list of users from the response JSON
        data = response.json()
        accounts = data.get('content')

        for account in accounts:
            account_nums.append(account.get('accountNumber'))
    else:
        print('Error fetching users:', response.text)
    
    # Create the transaction object
    transaction_type = random.choice(["DEPOSIT", "WITHDRAWAL", "TRANSFER_IN", "TRANSFER_OUT",
                          "PURCHASE", "PAYMENT", "REFUND", "VOID"])
    method = random.choice(["ACH", "ATM", "CREDIT_CARD", "DEBIT_CARD", "APP"])
    amount = random.randint(1, 111111)
    account_number = random.choice(account_nums)
    transaction = {
        "type": transaction_type,
        "method": method,
        "amount": amount,
        "accountNumber": account_number
    }

    if transaction_type in ["DEPOSIT", "PURCHASE", "PAYMENT", "REFUND", "VOID"]:
        transaction["merchantName"] = fake.first_name()
        transaction["merchantCode"] = random.randint(1111, 999999)
    print(transaction)
    return transaction

def add_transaction(transaction):
    """Adds Transactions to the sql"""
    url_transactions = f"{BASE_URL_TRANSACTIONS}/transactions"

    response = requests.post(url_transactions, json=transaction,
                             headers = headers, timeout=TIME_SECONDS)

    if response.status_code == 200:
        print("Transaction successful:", response.json())
    else:
        print('Error registering transaction:', response.text)
    return response
