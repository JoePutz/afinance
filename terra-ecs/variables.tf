# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for main"
  type        = string
  default     = "10.0.0.0/16"
}

# # availability zones variable
# variable "availability_zones" {
#   type    = string
#   default = "us-east-1a"
# }

variable "micro-env" {
  default = [
    {
        name = "DB_USERNAME"
        value = "root"
    },
    {
        name = "DB_PASSWORD"
        value = "Password123"
    },
    {
        name = "ENCRYPT_SECRET_KEY"
        value = "mf5ZIxRkF6IJj1AIVreII2ZQ4uhtJ8zC"
    },
    {
        name = "JWT_SECRET_KEY"
        value = "x2wOrQfY6RQIfE1ETwZtpflC19KyfN9N"
    },
    {
        name = "DB_PORT"
        value = "3306"
    },
    {
        name = "DB_NAME"
        value = "alinedb"
    }
  ]
}

variable "gateway_environment" {
    description = "Environment variables for gateway"
    default = [
      {
        name  = "PORTAL_LANDING"
        value = "*"
      },
      {
        name  = "PORTAL_DASHBOARD"
        value = "*"
      },
      {
        name  = "PORTAL_ADMIN"
        value = "*"
      }
    ]
}

output "db_instance_address" {
  value = module.db.db_instance_address
}

output "db_connection_endpoint" {
  value = module.db.db_instance_endpoint
}