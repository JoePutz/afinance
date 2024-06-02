
#Establish the ECS cluster
resource "aws_ecs_cluster" "ecs-cluster-jp" {
  name = "ecs-cluster-jp"
  # maybe remove down
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

#List fo all microservices
variable "services" {
  type = list(object({
    name = string
    image = string
    port = number
  }))
  default = [
    { name = "user-micro", image = "767397723308.dkr.ecr.us-east-1.amazonaws.com/aline-financial-jp:user-micro-11", port = 8070},
    { name = "under-micro", image = "767397723308.dkr.ecr.us-east-1.amazonaws.com/aline-financial-jp:underwriter-micro-v1", port = 8071 },
    { name = "account-micro",  image = "767397723308.dkr.ecr.us-east-1.amazonaws.com/aline-financial-jp:account-micro-v1",  port = 8072 },
    { name = "transaction-micro", image = "767397723308.dkr.ecr.us-east-1.amazonaws.com/aline-financial-jp:transaction-micro-v1", port = 8073 },
    { name = "bank-micro",     image = "767397723308.dkr.ecr.us-east-1.amazonaws.com/aline-financial-jp:bank-micro-v2", port = 8083 }
  ]
}

#Creation for each microservice individually
resource "aws_ecs_task_definition" "microservices" {
  for_each = { for service in var.services : service.name => service }

  family                   = each.key
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_jp.arn
  cpu                      = 512
  memory                   = 2048
    container_definitions    = <<DEFINITION
  [
    {
      "name"      : "${each.key}",
      "image"     : "${each.value.image}",
      "cpu"       : 512,
      "memory"    : 2048,
      "essential" : true,
      "environment": ${jsonencode(
        concat(
          [
            {
              name  = "DB_HOST"
              value = module.db.db_instance_address
            }
          ],
          var.micro-env
        )
      )},
      "portMappings" : [
        {
          "containerPort" : ${each.value.port},
          "hostPort"      : ${each.value.port}
        }
      ]
    }
  ]
  DEFINITION
}

#The ECS Service allows communication with each microservice
resource "aws_ecs_service" "service" {
  for_each = { for service in var.services : service.name => service }

  name             = each.key
  cluster          = aws_ecs_cluster.ecs-cluster-jp.id
  task_definition  = aws_ecs_task_definition.microservices[each.key].id
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "LATEST"

  network_configuration {
    assign_public_ip = true
    security_groups  = [aws_security_group.sg.id]
    subnets          = [aws_subnet.subnet.id, aws_subnet.subnet2.id]
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}

#Module for the RDS Mysql database
module "db" {
  source = "terraform-aws-modules/rds/aws"

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

#   iam_database_authentication_enabled = true

  skip_final_snapshot = true

  vpc_security_group_ids = [module.rds_security_group.security_group_id]
  # vpc_security_group_ids = [aws_vpc.main.id]
  db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name

  publicly_accessible = true
}

#Security group for the RDS
module "rds_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.0"

  name        = "alinedb_sg_jp"
  description = "Security group for Joe RDS"
  vpc_id = aws_vpc.main.id

  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MySQL access from within VPC"
      cidr_blocks  = var.vpc_cidr
    },
  ]
}



module "gateway_service" {
  source = "terraform-aws-modules/ecs/aws//modules/service"

  name        = "gateway-service"
  cluster_arn = aws_ecs_cluster.ecs-cluster-jp.arn

  cpu    = 256
  memory = 512

  launch_type = "FARGATE"
  assign_public_ip = true

  enable_autoscaling = false

  # IAM role names
  iam_role_name = "ECS_Gateway_ServiceRole_JP"
  tasks_iam_role_name = "ECS_Gateway_TaskRole_JP"
  task_exec_iam_role_name = "ECS_Gateway_TaskExecRole_JP"

  tasks_iam_role_policies = {
    AmazonRDSDataFullAccessLS = "arn:aws:iam::aws:policy/AmazonRDSDataFullAccess"
  }

  task_exec_iam_role_policies = {
    TaskExecRolePolicyLS = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  }

  # Container definition(s)
  container_definitions = {
    gateway = {
      cpu       = 256
      memory    = 512
      essential = true
      image     = "767397723308.dkr.ecr.us-east-1.amazonaws.com/aline-financial-jp:aline-gateway-v5"
      port_mappings = [
        {
          name          = "gateway-port"
          containerPort = 8080
          protocol      = "tcp"
        }
      ]
      environment = concat(
                      var.gateway_environment,
                      [
                        {
                          name  = "APP_SERVICE_HOST"
                          value = aws_lb.ecs_alb.dns_name #If i dont ahve http in the original image. add http if needed.
                        }
                      ])

      readonly_root_filesystem = false
      enable_cloudwatch_logging = false
    }
  }

  subnet_ids = [aws_subnet.subnet.id, aws_subnet.subnet2.id]

  security_group_rules = {
    vpc_ingress = {
      type        = "ingress"
      from_port   = 0
      to_port     = 65535  # Allow all ports
      protocol    = "tcp"  # Allow TCP traffic
      cidr_blocks = ["0.0.0.0/0"]  
      description = "Allow all incoming traffic from inside VPC"
    }

    allow_my_ip_ingress = {
      type        = "ingress"
      from_port   = 0
      to_port     = 65535  # Allow all ports
      protocol    = "tcp"  # Allow TCP traffic
      cidr_blocks = ["108.7.200.240/32"]  
      description = "Allow all incoming traffic from my IP"
    }
    egress_all = {
      type        = "egress"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  tags = {
    Terraform   = "true"
  }

  depends_on = [ module.db, aws_lb.ecs_alb]
}

