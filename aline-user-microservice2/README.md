<div style="text-align: center; margin: 20px">
    <img src="https://avatars.githubusercontent.com/u/81389149?s=400&u=7fddbf624d3443e4da55f2a11879da78c80fdab7&v=4" alt="Aline" width="100"/>
</div>

# Microservice Template

---

_**NOTE:** This repository is not to be developed on. Create another repository and use this as a template._

### Start developing your microservice here.

<br>
<br>

### Prerequisites

1. Download Maven beforehand in order to compile the code
2. Use MySQL for the database

### Creating _Your Own_ Repository

---

1. Create a repository under the [Aline Financial](https://github.com/Aline-Financial) organization.
2. Select `Aline-Financial/aline-microservice-template` as the repository template.
3. Clone your repository onto your machine.
4. In the projects root, run `git submodule init`. A `core/` directory should now be created.
5. Run `git submodule update` to pull down the most recent core. (_Note:_ This will clone the [Core Repository](https://github.com/Aline-Financial/core) that is automatically checked out to a hashed branch.)
6. Run `git submodule set-url -- core <link to your core repo>` in order to update submodule to use the core repo that you forked.'
7. Run `git submodule update --force --recursive --init --remote` in order to update the submodule to use the core repo that you just set.
8. Rename main module to be your microservice. _(ex. usermicroservice)_
9. Update CI/CD files to match project.
10. Run `mvn test` to make sure your project builds!

If you get a **success**, you're all set. Start creating your microservice.

1. In the application.yaml file in the microservice/src/main/resources folder, export the required variables from the file to your console.
2. Run `mvn clean package -Dskiptests` in order to compile the code into a file
3. Under the microservice/target folder there is a .jar file that can be run in order to start your microservice. For the user microservice the command would be `java -jar ./user-microservice/target/user-microservice-0.1.0.jar`

---

<br>
<br>

### Managing the core

---

The core is a shared-code repository that contains classes such as:

- Models
- Data-Transfer Objects (DTO)
- Repositories
- Custom Exceptions
- Etc...

Before you put code in the core, make sure to consider the following:

> - _"Is there already code in the core that already solves my problem?"_
> - _"Will there be circular dependency between the core and the application module?"_
> - _"Will other microservices need to use this code?"_

**Carefully consider these questions.**

Create a new branch in the core that matches the current feature branch you are working on in the main module.

When pushing up, make sure to run `git status` to make sure core changes do not need to be committed.

**PUSH THE CORE FIRST**

Once the core change are pushed into the repository, **push your whole repository from the parent.** The core branch will update.

---

NB: When registering a user with a role of member, the API will raise 422 error because the email verification code is commented out - ignore the error because the user will be created

## Included Tools & Plugins:

> - Maven
> - SonarQube
> - JaCoCo
> - Jenkins (_Jenkinsfile_)
> - Docker (_Dockerfile_)
> - CloudFormation Template (_ecs-aws.yaml_)
> - Swagger 2
> - Swagger-UI (Access it by going to `http://localhost:{port}/swagger-ui/`)

For more information on tools & plugins included in this project, look at your repo's `pom.xml`.

---

<br>

### Team Aline

- [Beki Gonzalez](https://github.com/beki01)
- [Joshua Mallory](https://github.com/Joshua-Mallory)
- [Leandro Yabut](https://github.com/leandroyabut)
- [Luan DaSilva](https://github.com/smooth-dasilva)

---


mocking up my function:
from faker import Faker

def userGeneration():
    fake = Faker()
    for i in range(10):
        user = {
            "username": fake.username(),
            "password": generate_password(),
            "role": "member",
            "membershipId": i, #this one is wrong. Need to get membership to work from underwriter micro
            "lastFourOfSSN": fake.random_number(digits=4)
        }

import random
import string
from faker import Faker

fake = Faker()

def generate_password():
    # Define the character sets
    lowercase_letters = string.ascii_lowercase
    uppercase_letters = string.ascii_uppercase
    digits = string.digits
    symbols = string.punctuation.replace("#", "")  # Exclude '#' from symbols

    # Ensure at least one of each character type
    password = [random.choice(lowercase_letters),
                random.choice(uppercase_letters),
                random.choice(digits),
                random.choice(symbols)]

    # Generate the remaining characters
    password.extend(random.choices(lowercase_letters + uppercase_letters + digits + symbols, k=random.randint(2, 16)))

    # Shuffle the characters to make it more random
    random.shuffle(password)

    # Convert the list to a string
    password = ''.join(password)
    
    return password