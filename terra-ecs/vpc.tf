
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    name = "main"
  }
}

data "aws_availability_zones" "available" {}

# Filter out the unwanted availability zone
locals {
  filtered_azs = [for az in data.aws_availability_zones.available.names : az if az != "us-east-1e"]
}

resource "aws_subnet" "subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 1) ## takes 10.0.0.0/16 --> 10.0.1.0/24
  map_public_ip_on_launch = true
  availability_zone       = local.filtered_azs[0]
}

resource "aws_subnet" "subnet2" {
  # count                   = length(local.filtered_azs)
  vpc_id                  = aws_vpc.main.id
  map_public_ip_on_launch = true
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 2)
  availability_zone       = local.filtered_azs[1]
}

#Gateway path to the internet from the VPC
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "igw"
  }
}

#Route table to direct traffic connected to gateway
resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "subnet_route" {
  subnet_id      = aws_subnet.subnet.id
  route_table_id = aws_route_table.rt.id
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name       = "db-subnet-group-jp"
  subnet_ids = [
    aws_subnet.subnet.id,
    aws_subnet.subnet2.id
  ]
  description = "Subnet group for RDS instances"
}