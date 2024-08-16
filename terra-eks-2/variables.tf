# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "notification_email" {
  description = "The email address to receive RDS alarms"
  type        = string
}
