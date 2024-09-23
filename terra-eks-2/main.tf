provider "aws" {
  region = var.region
}

#Establish availabaility zones
data "aws_availability_zones" "available" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

#Set default VPC
data "aws_vpc" "default" {
    default = true
}

data "aws_subnets" "default" {
    filter {
        name = "vpc-id"
        values = [data.aws_vpc.default.id]
    }

    filter {
        name = "availability-zone"
        values = [
            for az in data.aws_availability_zones.available.names :
            az if az != "us-east-1e"
        ]
    }
}

#Set EKS cluster name
locals {
  cluster_name = "aline-cluster-test-2-jp"
  # unique_id    = format("%s-%s", var.iam_role_base_name, formatdate("YYYYMMDDHHmmss", timestamp()))
}

#Set EKS
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.5"

  cluster_name    = local.cluster_name
  cluster_version = "1.29"

  cluster_endpoint_public_access           = true
  enable_cluster_creator_admin_permissions = true

  create_cloudwatch_log_group = false
  create_kms_key = false
  cluster_encryption_config = {}

  create_iam_role = false
  iam_role_arn = aws_iam_role.aline-cluster-role-jp.arn

  vpc_id     = data.aws_vpc.default.id
  subnet_ids = data.aws_subnets.default.ids
  #Make certain to specify default.

  eks_managed_node_groups = {
    one = {
      name = "aline-node-group-jp"

      create_cloudwatch_log_group = false

      instance_types = ["t3.small"]

      min_size     = 2
      max_size     = 2
      desired_size = 2

      node_role_arn = aws_iam_role.eks_nodegroup_role_jp.arn

      subnet_ids = data.aws_subnets.default.ids

      update_config = {
        max_unavailable_percentage = 100
      }

      additional_security_group_ids = [aws_security_group.eks_nodegroup_sg_jp.id]
    }
  }

  cluster_tags = {
    "Schedule" = "office-hours"
  }
}

#Create EKS IAM roles and attach the correct policies
resource "aws_iam_role" "aline-cluster-role-jp" {
  name = "aline-cluster-role-jp"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "eks.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "aline-cluster-role-cloudwatch_agent_policy" {
  role       = aws_iam_role.aline-cluster-role-jp.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

resource "aws_iam_role_policy_attachment" "eks_cluster_role_EKSClusterPolicy_attachment" {
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
    role = aws_iam_role.aline-cluster-role-jp.name
}
 
resource "aws_iam_role_policy_attachment" "eks_cluster_role_EKSServicePolicy_attachment" {
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
    role = aws_iam_role.aline-cluster-role-jp.name
}
 
# resource "aws_iam_role_policy_attachment" "eks_cluster_role_EKSVPCResouceController_attachment" {
#     policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
#     role = aws_iam_role.aline-cluster-role-jp.name
# }

# variable "iam_role_base_name" {
#   description = "Base name of the IAM role"
#   type        = string
#   default     = "aline-cluster-role-jp"
# }

#Create ec2 IAM role and attach policies
resource "aws_iam_role" "eks_nodegroup_role_jp" {
  name = "eks_nodegroup_role_jp"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "eks_nodegroup_role_EC2ContainerRegistryReadOnly_attachment" {
  role = aws_iam_role.eks_nodegroup_role_jp.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}
 
resource "aws_iam_role_policy_attachment" "eks_nodegroup_role_EKS_CNI_Policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_nodegroup_role_jp.name
}
 
resource "aws_iam_role_policy_attachment" "eks_nodegroup_role_EKSWorkerNodePolicy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_nodegroup_role_jp.name
}
 
# resource "aws_iam_role_policy_attachment" "eks_nodegroup_role_RDS_DataFullAccess_attachment" {
#   policy_arn = "arn:aws:iam::aws:policy/AmazonRDSDataFullAccess"
#   role       = aws_iam_role.eks_nodegroup_role_jp.name
# }

resource "aws_iam_role_policy_attachment" "cloudwatch_agent_policy" {
  role       = aws_iam_role.eks_nodegroup_role_jp.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

#Establish EKS nodegroup security group
resource "aws_security_group" "eks_nodegroup_sg_jp" {
    name = "eks_nodegroup_sg_jp"
    description = "Security group for Joe cluster nodegroup"

    vpc_id = data.aws_vpc.default.id

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["100.7.200.240/32"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

#Module for database
module "db" {
  source = "terraform-aws-modules/rds/aws"
  version = "6.7.0"

  identifier = "alinedb"

  create_db_option_group = false
  create_db_parameter_group = false

  engine                = "mysql"
  engine_version        = "8.0"
  family                = "mysql8.0"
  major_engine_version  = "8.0"
  instance_class        = "db.t3.micro"

  allocated_storage = 5

  manage_master_user_password = false

  db_name  = "alinedb"
  username = "root"
  password = "Password123"
  port     = 3306

  skip_final_snapshot = true

  vpc_security_group_ids = [module.rds_security_group.security_group_id]
#   db_subnet_group_name = aws_db_subnet_group.vpc_db_subnets.name

  publicly_accessible = true
}

#RDS security group
module "rds_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.0"

  name        = "alinedb_sg_jp"
  description = "Security group for Joe RDS"
  vpc_id      = data.aws_vpc.default.id

  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MySQL access from within VPC"
      cidr_blocks = data.aws_vpc.default.cidr_block
    },
  ]
}

#Cloudwatch Agent IAM Role
resource "aws_iam_role" "cloudwatch_agent_irsa" {
  name               = "service-account-role-jp"
  assume_role_policy = data.aws_iam_policy_document.cloudwatch_agent_assume_role_policy.json
}

#Specific policies for IAM role
data "aws_iam_policy_document" "cloudwatch_agent_assume_role_policy" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [module.eks.oidc_provider_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "${module.eks.oidc_provider}:sub"
      values   = ["system:serviceaccount:amazon-cloudwatch:cloudwatch-agent"]
    }
  }
}

#Policy to function as cloudwatch agent
resource "aws_iam_role_policy_attachment" "cloudwatch_agent_attach_policy" {
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
  role       = aws_iam_role.cloudwatch_agent_irsa.name
}

resource "aws_eks_addon" "cloudwatch_observability" {
  cluster_name             = module.eks.cluster_name
  addon_name               = "amazon-cloudwatch-observability"
  service_account_role_arn = aws_iam_role.cloudwatch_agent_irsa.arn
}

data "aws_secretsmanager_secret" "notification_email" {
  name = "notification_email"
}

data "aws_secretsmanager_secret_version" "notification_email" {
  secret_id = data.aws_secretsmanager_secret.notification_email.id
}

locals {
  notification_email = jsondecode(data.aws_secretsmanager_secret_version.notification_email.secret_string).email
}

# Create CloudWatch Dashboard
resource "aws_cloudwatch_dashboard" "eks_cluster_dashboard_jp" {
  dashboard_name = "EKSClusterDashboardJP"
  
  dashboard_body = jsonencode({
    widgets = [
      {
        type = "metric",
        x = 12,
        y = 12,
        width = 12,
        height = 6,
        properties = {
          metrics = [
            [ "AWS/Logs", "IncomingLogEvents", "LogGroupName", "/aws/eks/${local.cluster_name}/cluster" ],
            [ ".", "IncomingBytes", ".", "/aws/eks/${local.cluster_name}/cluster" ],
          ],
          view = "timeSeries",
          stacked = false,
          region = var.region,
          title = "EKS Incoming Log Events",
        }
      },
      {
        type = "metric",
        x = 0,
        y = 6,
        width = 12,
        height = 6,
        properties = {
          metrics = [
            [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", module.db.db_instance_identifier ],
            [ ".", "FreeStorageSpace", ".", module.db.db_instance_identifier ],
          ],
          view = "timeSeries",
          stacked = false,
          region = var.region,
          title = "RDS Metrics",
        }
      },
      {
        "type": "metric",
        "x": 0,
        "y": 0,
        "width": 12,
        "height": 6,
        "properties": {
          "metrics": [
            [ "ContainerInsights", "node_cpu_utilization", "ClusterName", local.cluster_name ],
            [ ".", "node_memory_utilization", ".", local.cluster_name ]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": var.region,
          "title": "Node CPU & Memory Utilization"
        }
      },
      {
        "type": "metric",
        "x": 0,
        "y": 12,
        "width": 12,
        "height": 6,
        "properties": {
          "metrics": [
            [ "ContainerInsights", "node_filesystem_utilization", "ClusterName", local.cluster_name ]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": var.region,
          "title": "Node Disk Space Utilization"
        }
      },
      {
        "type": "metric",
        "x": 12,
        "y": 0,
        "width": 12,
        "height": 6,
        "properties": {
          "metrics": [
            [ "AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", module.db.db_instance_identifier ]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": var.region,
          "title": "Database Connections"
        }
      },
      {
        "type": "metric",
        "x": 12,
        "y": 6,
        "width": 12,
        "height": 6,
        "properties": {
          "metrics": [
            [ "AWS/RDS", "ReadLatency", "DBInstanceIdentifier", module.db.db_instance_identifier ],
            [ ".", "WriteLatency", ".", module.db.db_instance_identifier ]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": var.region,
          "title": "Read/Write Latency"
        }
      },
      {
        "type": "metric",
        "x": 0,
        "y": 24,
        "width": 12,
        "height": 6,
        "properties": {
          "metrics": [
            [ "AWS/ApplicationELB", "RequestCount", "LoadBalancer", "<load_balancer_name>" ]
          ],
          "view": "timeSeries",
          "stacked": false,
          "region": var.region,
          "title": "ELB Request Count"
        }
      },
    ]
  })
}

resource "aws_cloudwatch_metric_alarm" "rds_low_memory_alarm" {
  alarm_name          = "RDSLowMemoryAlarm"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "FreeableMemory"
  namespace           = "AWS/RDS"
  period              = 300  # 5 minutes
  statistic           = "Average"
  threshold           = 1073741824  # 1 GB in bytes
  alarm_description   = "Alarm when RDS instance freeable memory is below 1GB (approx. 10% of total memory for many instance types)."
  actions_enabled     = true
  alarm_actions       = [aws_sns_topic.rds_alarm_topic.arn]
  ok_actions          = [aws_sns_topic.rds_alarm_topic.arn]
  insufficient_data_actions = []

  dimensions = {
    DBInstanceIdentifier = module.db.db_instance_identifier
  }

  treat_missing_data = "breaching"
}

resource "aws_sns_topic" "rds_alarm_topic" {
  name = "rds_alarm_topic"
}

resource "aws_sns_topic_subscription" "rds_alarm_topic_subscription" {
  topic_arn = aws_sns_topic.rds_alarm_topic.arn
  protocol  = "email"
  endpoint  = local.notification_email
}
