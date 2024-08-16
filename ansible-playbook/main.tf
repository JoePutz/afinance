terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.50.0"
    }
  }
  required_version = ">= 1.3.2"
}
 
provider "aws" {
  region = "us-east-1"
}
 
data "aws_vpc" "default" {
  default = true
}
 
resource "aws_security_group" "ansible_security_jp" {
  name        = "ansible-security-jp"
  description = "Security group for Ansible SSH access"
  vpc_id      = data.aws_vpc.default.id
 
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  tags = {
    Name = "ansible-security-jp"
  }
}
 
 
data "aws_subnet" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
 
  filter {
    name   = "availability-zone"
    values = ["us-east-1a"]
  }
}
 
resource "aws_instance" "ubuntu" {
  ami           = "ami-04a81a99f5ec58529"
  instance_type = "t2.micro"
  key_name      = "Jenkins-kv-jp"
  vpc_security_group_ids = [
    aws_security_group.ansible_security_jp.id
  ]
  subnet_id = data.aws_subnet.default.id
  tags = {
    Name = "ubuntu-instance-jp"
  }
}
 
resource "aws_instance" "rhel" {
  ami           = "ami-0583d8c7a9c35822c"
  instance_type = "t2.micro"
  key_name      = "Jenkins-kv-jp"
  vpc_security_group_ids = [
    aws_security_group.ansible_security_jp.id
  ]
  subnet_id = data.aws_subnet.default.id
  tags = {
    Name = "rhel-instance-jp"
  }
}
 
resource "aws_instance" "amazon_linux" {
  ami           = "ami-0427090fd1714168b"
  instance_type = "t2.micro"
  key_name      = "Jenkins-kv-jp"
  vpc_security_group_ids = [
    aws_security_group.ansible_security_jp.id
  ]
  subnet_id = data.aws_subnet.default.id
  tags = {
    Name = "amazon-linux-instance-jp"
  }
}

