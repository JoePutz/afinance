import subprocess
import json
import os

# Run the Terraform output command and save to a file
def get_terraform_outputs():
    try:
        result = subprocess.run(
            ["terraform", "output", "-json"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True
        )
        with open("terraform_outputs.json", "wb") as f:
            f.write(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error running Terraform output: {e}")
        print(e.stderr.decode())

# Read and parse the outputs
def read_outputs():
    if os.path.exists("terraform_outputs.json"):
        with open("terraform_outputs.json", "r") as f:
            outputs = json.load(f)
        return outputs
    else:
        print("Output file not found.")
        return {}

def rewrite_inventory():
    # Load the Terraform outputs
    with open('terraform_outputs.json') as f:
        tf_outputs = json.load(f)

    # Define the path to your inventory file
    inventory_file = 'inventory.ini'

    # Map instance names to the corresponding output keys in Terraform
    instance_mapping = {
        'ubuntu': 'ubuntu_instance_ip',
        'rhel': 'rhel_instance_ip',
        'amazon_linux': 'amazon_linux_instance_ip',
    }

    # Read the current inventory file
    with open(inventory_file, 'r') as f:
        lines = f.readlines()

    # Update the ansible_host entries with the new IPs from Terraform outputs
    new_lines = []
    for line in lines:
        for instance, output_key in instance_mapping.items():
            if line.startswith(instance):
                ip_address = tf_outputs[output_key]['value']
                parts = line.split()
                for i, part in enumerate(parts):
                    if part.startswith('ansible_host='):
                        parts[i] = f'ansible_host={ip_address}'
                line = ' '.join(parts) + '\n'
        new_lines.append(line)

    # Write the updated inventory back to the file
    with open(inventory_file, 'w') as f:
        f.writelines(new_lines)

    print('Inventory file updated successfully.')


# Main execution
def main():
    get_terraform_outputs()
    outputs = read_outputs()
    print(outputs)
    rewrite_inventory()

if __name__ == "__main__":
    main()

