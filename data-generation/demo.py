from data import make_admin, make_member, make_application, generate_banks_and_branches, make_transactions, add_bank, add_branch, add_admin, generate_password, generate_date_of_birth, generate_license, generate_applications_and_applicants
import requests
import os
import json
from dotenv import load_dotenv

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

def display_options():
    print("Which would you like to make:")
    print("1) Users")
    print("2) Applications and Applicants")
    print("3) Banks and Branches")
    print("4) Transactions")
    print("5) End")

    choice = input("Enter your choice: ")

    print("You chose:", choice)

    if choice == '1':
        create_users()
    elif choice == '2':
        create_application_applicants()
    elif choice == '3':
        create_banks_and_branches()
    elif choice == '4':
        create_transactions()
    elif choice == '5':
        print("Thanks for watching this demo")
        exit()
    else:
        print("Invalid choice. Please choose a number between 1 and 5.")
    display_options()

def create_transactions():
    num_trans = int(input("How many transactions? "))
    make_transactions(num_trans)
    database=input("Would you like to verify in the database(y/n)? ")
    if database == 'y':
        print("Joe, there is no get transaction. You know this.")
        print("\n\n")
        print("Really, you're supposed to be a professional")
        print("\n\n")
        print("Show them on Postman. Do I have to explain everything?")
    elif database == 'n':
        pass
    else:
        print("Invalid choice.")
    print("===================")

def create_banks_and_branches():
    num_banks = int(input("How many banks?" ))
    num_branches = int(input("How many branches? "))
    generate_banks_and_branches(num_banks, num_branches)
    database=input("Would you like to verify in the database(y/n)? ")
    if database == 'y':
        print("We first display the banks")
        get_banks()
        input("Press any key to see branches: ")
        get_branches()
    elif database == 'n':
        pass
    else:
        print("Invalid choice.")
    print("===================")

def get_branches():
    get_branch_url=f'{BASE_URL_BANKS}/branches'
    params = {"unpaged": "true", "paged": "false"}
    response = requests.get(get_branch_url, headers=headers, params=params).json()
    
    params = {"size": 100}
    
    branches = []
    page = 0
    while True:
        params["page"] = page
        response = requests.get(get_branch_url, headers=headers, params=params).json()
        branches.extend(response["content"])
    
        page += 1
        if response["last"]:
            break
    
    for branch in branches:
        branch_json = json.dumps(branch, indent=4)
        print(branch_json)
        print()
    print("=================")

def get_banks():
    get_bank_url=f'{BASE_URL_BANKS}/banks'
    params = {"unpaged": "true", "paged": "false"}
    response = requests.get(get_bank_url, headers=headers, params=params).json()
    
    params = {"size": 100}
    
    banks = []
    page = 0
    while True:
        params["page"] = page
        response = requests.get(get_bank_url, headers=headers, params=params).json()
        banks.extend(response["content"])
    
        page += 1
        if response["last"]:
            break
    
    for bank in banks:
        bank_json = json.dumps(bank, indent=4)
        print(bank_json)
        print()
    print("=================")

def create_application_applicants():
    num_apps = int(input("How many applicants and applications?" ))
    make_application(num_apps)
    database=input("Would you like to verify in the database(y/n)? ")
    if database == 'y':
        get_applications()
    elif database == 'n':
        pass
    else:
        print("Invalid choice.")
    print("===================")
    display_options()

def get_applications():
    get_app_url=f'http://localhost:8071/applications'
    params = {"unpaged": "true", "paged": "false"}
    response = requests.get(get_app_url, headers=headers, params=params).json()
    
    params = {"size": 100}
    
    apps = []
    page = 0
    while True:
        params["page"] = page
        response = requests.get(get_app_url, headers=headers, params=params).json()
        apps.extend(response["content"])
    
        page += 1
        if response["last"]:
            break
    
    for app in apps:
        app_json = json.dumps(app, indent=4)
        print(app_json)
        print()
    print("=================")

def create_users():
    num_admins = int(input("How many admins?: "))
    num_members = int(input("How many members?: "))
    make_admin(num_admins)
    make_member(num_members)
    # generate_applications_and_applicants(num_members)
    database=input("Would you like to verify in the database(y/n)? ")
    if database == 'y':
        get_users()
    elif database == 'n':
        pass
    else:
        print("Invalid choice.")
    print("===================")
    display_options()

def get_users():
    get_users_url = f"http://localhost:8070/users"
    # Make a GET request to the API endpoint with the headers
    params = {"unpaged": "true", "paged": "false"}
    response = requests.get(get_users_url, headers=headers, params=params).json()
    
    params = {"size": 100}  # Adjust the size based on your API's pagination settings
    
    users = []
    page = 0
    while True:
        params["page"] = page
        response = requests.get(get_users_url, headers=headers, params=params).json()
        users.extend(response["content"])
    
        page += 1
        if response["last"]:
            break
    
    for user in users:
        user_json = json.dumps(user, indent=4)
        print(user_json)
        print()
    print("=================")

# display_options()

if __name__ == "__main__":
    response = display_options()