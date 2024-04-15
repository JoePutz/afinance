import pytest
import requests_mock
import string
from datetime import datetime, timedelta
import os
from faker import Faker
from data import add_bank, add_branch, add_admin, generate_password, generate_date_of_birth, generate_license, generate_admin, generate_member, add_member, generate_applications_and_applicants, add_applications_and_applicants, generate_transaction, add_transaction
from dotenv import load_dotenv

load_dotenv()
BASE_URL_USERS = os.getenv("BASE_URL_USERS")
BASE_URL_APPS = os.getenv("BASE_URL_APPS")
BASE_URL_BANKS = os.getenv("BASE_URL_BANKS")
BASE_URL_ACCOUNTS = os.getenv("BASE_URL_ACCOUNTS")
BASE_URL_TRANSACTIONS = os.getenv("BASE_URL_TRANSACTIONS")
BEARER_TOKEN = os.getenv("BEARER_TOKEN")
fake = Faker()

bank = {
        "routingNumber" : "085340798",
        "address" : "123 Main St",
        "city" : "Anytown",
        "state" : "CA",
        "zipcode" : "12345"
}

branch = {
    "name" : "Corporate Place",
    "address" : "321 Main Rd",
    "city" : "The Place",
    "state" : "TX",
    "zipcode" : "54321",
    "phone" : "888-777-6655",
    "bankID" : 1
}

# Example test for add_bank function
def test_add_bank():

    # Set up the mocking context
    with requests_mock.Mocker() as m:
        # Define the URL to mock

        # Mock the POST request and specify the expected response
        m.post("http://localhost:8083/banks", json={"id" : 1}, status_code=201)

        # Call the function you want to test
        response = add_bank(**bank)

        # Assert that the response matches the expected response
        assert response.status_code == 201
        assert response.json()["id"] == 1

def test_bad_bank():
    bad_bank = {
        "routingNumber": "085340798",
        "address": "123 Main St",
        "city" : False,
        "state": "CA",
        "zipcode": "12345"
    }

    # Mock the response with a 400 status code
    with requests_mock.Mocker() as m:
        m.post("http://localhost:8083/banks", json={"error": "Bad request"}, status_code=400)
        response = add_bank(**bad_bank)
        assert response.status_code == 400
        assert response.json()["error"] == "Bad request"

def test_add_branch():
    with requests_mock.Mocker() as m:
        # Define the URL to mock

        # Mock the POST request and specify the expected response
        m.post("http://localhost:8083/branches", json={"id" : 1}, status_code=201)

        # Call the function you want to test
        response = add_branch(**branch)

        # Assert that the response matches the expected response
        assert response.status_code == 201
        assert response.json()["id"] == 1

def test_bad_branch():
    bad_branch = {
        "name" : "Corporate Place",
        "address" : "321 Main Rd",
        "city" : False,
        "state" : "TX",
        "zipcode" : "54321",
        "phone" : False,
        "bankID" : 1
    }
    with requests_mock.Mocker() as m:
        m.post("http://localhost:8083/branches", json={"error": "Bad request"}, status_code=400)

        # Call the function you want to test
        response = add_branch(**bad_branch)

        # Assert that the response matches the expected response
        assert response.status_code == 400
        assert response.json()["error"] == "Bad request"

def test_add_admin():
    admin = {
        "username" : "testing123",
        "password" : "Password12!",
        "first_name" : "name",
        "last_name" : "name",
        "email" : "email@email.com",
        "phone" : "777-666-9876"
    }
    with requests_mock.Mocker() as m:
        m.post("http://localhost:8070/users/registration", json={"id" : 1}, status_code=201)
        # Call the function you want to test
        response = add_admin(admin)
        # Assert that the response matches the expected response
        assert response.status_code == 201
        assert response.json()["id"] == 1

def test_bad_admin():
    bad_admin = {
        "username" : "testing123",
        "password" : "Password12!",
        "first_name" : "name",
        "last_name" : "name",
        "email" : "email@email.com",
        "phone" : False
    }
    with requests_mock.Mocker() as m:
        m.post("http://localhost:8070/users/registration", json={"error": "Bad request"}, status_code=400)

        # Call the function you want to test
        response = add_admin(bad_admin)

        # Assert that the response matches the expected response
        assert response.status_code == 400
        assert response.json()["error"] == "Bad request"

def test_generate_password():
    password = generate_password()
    
    # Check if password contains at least one character from each character set
    has_lowercase = any(char in string.ascii_lowercase for char in password)
    has_uppercase = any(char in string.ascii_uppercase for char in password)
    has_digit = any(char in string.digits for char in password)
    has_symbol = any(char in '@$!%*?&' for char in password)
    
    assert 8 <= len(password) <= 12
    assert has_lowercase and has_uppercase and has_digit and has_symbol

def test_generate_date_of_birth_is_datetime():
    dob = generate_date_of_birth()
    dob_time = fake.time_object()
    
    # Combine the date and time components into a datetime object
    dob_datetime = datetime.combine(dob, dob_time)

    assert isinstance(dob_datetime, datetime)

def test_generate_date_of_birth_within_perameters():
    # Calculate the start date 25 years ago from today
    end_date = datetime.now() - timedelta(days=25*365)
    start_date = datetime.now() - timedelta(days=90*365)

    # Call the function to generate the date of birth
    dob = generate_date_of_birth()

    dob_time = fake.time_object()
    
    # Combine the date and time components into a datetime object
    dob_datetime = datetime.combine(dob, dob_time)

    # Check if the generated date falls within the expected range
    assert start_date <= dob_datetime <= end_date

def test_generate_license_length():
    license_key = generate_license()
    assert len(license_key) == 12

def test_generate_license_first_letter_is_uppercase():
    license_key = generate_license()
    assert license_key[0].isupper()

def test_generate_license_contains_only_letters_and_digits():
    license_key = generate_license()
    assert license_key.isalnum()

def test_generate_license_different_each_time():
    license_key1 = generate_license()
    license_key2 = generate_license()
    assert license_key1 != license_key2

def test_generate_admin():
    admin = generate_admin()
    
    assert isinstance(admin, dict)
    assert "username" in admin
    assert "password" in admin
    assert "role" in admin and admin["role"] == "admin"
    assert "firstName" in admin
    assert "lastName" in admin
    assert "email" in admin
    assert "phone" in admin

def test_generate_member():
    application = {
        "applicants": [
            {
                "socialSecurity": "123-45-6789"
            }
        ]
    }

    member = {
        "createdMembers": [
            {
                "membershipId": "1234567890"
            }
        ]
    }

    user = generate_member(application, member)
    
    assert isinstance(user, dict)
    assert "username" in user
    assert "password" in user
    assert "role" in user and user["role"] == "member"
    assert "membershipId" in user and user["membershipId"] == "1234567890"
    assert "lastFourOfSSN" in user and user["lastFourOfSSN"] == "6789"

def test_add_member():
    member = {
        "username" : "Test Member",
        "password" : "Password12!",
        "role" : "member",
        "membershipId" : "1234567890",
        "lastFourOfSSN" : "6789"
    }
    with requests_mock.Mocker() as m:
        m.post("http://localhost:8070/users/registration", json={"id" : 1}, status_code=201)
        # Call the function you want to test
        response = add_member(member)
        # Assert that the response matches the expected response
        assert response.status_code == 201
        assert response.json()["id"] == 1

def test_bad_member():
    bad_member = {
        "username" : "Test Member",
        "password" : "Password12!",
        "role" : "member",
        "membershipId" : "1234567890",
        "lastFourOfSSN" : False
    }
    with requests_mock.Mocker() as m:
        m.post("http://localhost:8070/users/registration", json={"error": "Bad request"}, status_code=400)

        # Call the function you want to test
        response = add_member(bad_member)

        # Assert that the response matches the expected response
        assert response.status_code == 400
        assert response.json()["error"] == "Bad request"

def test_generate_applications_and_applicants():
    application = generate_applications_and_applicants()

    assert isinstance(application, dict)
    assert "applicationType" in application
    assert "noNewApplicants" in application and application["noNewApplicants"] == False
    assert "applicantIds" in application
    assert "applicants" in application and isinstance(application["applicants"], list)
    assert "applicationAmount" in application

def test_add_application():
    url = f"{BASE_URL_APPS}/applications"
    application = {
        "applicationType": "CHECKING",
        "noNewApplicants": False,
        "applicantIds": [
            0
        ],
        "applicants": [
            {
                "firstName": "firstName",
                "middleName": "middleName",
                "lastName": "lastName",
                "dateOfBirth": 10-11-2000,
                "gender": "MALE",
                "email": "email@email.com",
                "phone": "888-222-5555",
                "socialSecurity": "123-09-4567",
                "driversLicense": "I12345678901",
                "income": 200000000,
                "address": "123 Main St",
                "city": "City",
                "state": "Texas",
                "zipcode": 74114,
                "mailingAddress": "123 Main St",
                "mailingCity": "City",
                "mailingState": "Texas",
                "mailingZipcode": 74114
            }
        ],
        "applicationAmount": 4000,
    }
    with requests_mock.Mocker() as m:
        m.post(url, json={"id" : 1}, status_code=201)
        # Call the function you want to test
        response = add_applications_and_applicants(application)
        # Assert that the response matches the expected response
        assert response.status_code == 201
        assert response.json()["id"] == 1

def test_bad_application():
    url = f"{BASE_URL_APPS}/applications"
    bad_application = {
        "applicationType": "CHECKING",
        "noNewApplicants": False,
        "applicantIds": [
            0
        ],
        "applicants": [
            {
                "firstName": "firstName",
                "middleName": "middleName",
                "lastName": "lastName",
                "dateOfBirth": 10-11-2000,
                "gender": "MALE",
                "email": False,
                "phone": "888-222-5555",
                "socialSecurity": "123-09-4567",
                "driversLicense": "I12345678901",
                "income": 200000000,
                "address": "123 Main St",
                "city": "City",
                "state": "Texas",
                "zipcode": 74114,
                "mailingAddress": "123 Main St",
                "mailingCity": "City",
                "mailingState": "Texas",
                "mailingZipcode": 74114
            }
        ],
        "applicationAmount": 4000,
    }
    with requests_mock.Mocker() as m:
        m.post(url, json={"error": "Bad request"}, status_code=400)

        # Call the function you want to test
        response = add_applications_and_applicants(bad_application)

        # Assert that the response matches the expected response
        assert response.status_code == 400
        assert response.json()["error"] == "Bad request"

def test_generate_transaction_type():
    valid_types = ["DEPOSIT", "WITHDRAWAL", "TRANSFER_IN", "TRANSFER_OUT", "PURCHASE", "PAYMENT", "REFUND", "VOID"]
    transaction = generate_transaction()
    assert transaction["type"] in valid_types

def test_generate_transaction_method():
    valid_methods = ["ACH", "ATM", "CREDIT_CARD", "DEBIT_CARD", "APP"]
    transaction = generate_transaction()
    assert transaction["method"] in valid_methods

def test_generate_transaction_amount_range():
    transaction = generate_transaction()
    assert 1 <= transaction["amount"] <= 111111

def test_generate_transaction_account_number_existence():
    transaction = generate_transaction()
    assert "accountNumber" in transaction

def test_generate_transaction_merchant_fields():
    valid_types_with_merchant = ["DEPOSIT", "PURCHASE", "PAYMENT", "REFUND", "VOID"]
    transaction = generate_transaction()
    if transaction["type"] in valid_types_with_merchant:
        assert "merchantName" in transaction
        assert "merchantCode" in transaction

def test_add_transaction():
    url = f"{BASE_URL_TRANSACTIONS}/transactions"
    transaction = {
        "type": "WITHDRAWAL",
        "method": "ACT",
        "amount": 5,
        "accountNumber": 1234562084
    }
    with requests_mock.Mocker() as m:
        m.post(url, json={"id" : 1}, status_code=201)
        # Call the function you want to test
        response = add_transaction(transaction)
        # Assert that the response matches the expected response
        assert response.status_code == 201
        assert response.json()["id"] == 1

def test_bad_transaction():
    url = f"{BASE_URL_TRANSACTIONS}/transactions"
    bad_transaction = {
        "type": "WITHDRAWAL",
        "method": False,
        "amount": 5,
        "accountNumber": 1234562084
    }
    with requests_mock.Mocker() as m:
        m.post(url, json={"error": "Bad request"}, status_code=400)

        # Call the function you want to test
        response = add_transaction(bad_transaction)

        # Assert that the response matches the expected response
        assert response.status_code == 400
        assert response.json()["error"] == "Bad request"

