output "ubuntu_instance_ip" {
  description = "The public IP address of the Ubuntu instance"
  value       = aws_instance.ubuntu.public_ip
}

output "rhel_instance_ip" {
  description = "The public IP address of the RHEL instance"
  value       = aws_instance.rhel.public_ip
}

output "amazon_linux_instance_ip" {
  description = "The public IP address of the Amazon Linux instance"
  value       = aws_instance.amazon_linux.public_ip
}

# output "ubuntu_instance_dns" {
#   description = "The public IP address of the Ubuntu instance"
#   value       = aws_instance.ubuntu.public_dns
# }

# output "rhel_instance_dns" {
#   description = "The public IP address of the RHEL instance"
#   value       = aws_instance.rhel.public_dns
# }

# output "amazon_linux_instance_dns" {
#   description = "The public IP address of the Amazon Linux instance"
#   value       = aws_instance.amazon_linux.public_dns
# }