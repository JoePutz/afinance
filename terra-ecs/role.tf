#list of roles

#task role and task executioner

resource "aws_iam_role" "ecs_task_role_jp" {
  name = "ecs_task_role_jp"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "task_role_policy" {
  role       = aws_iam_role.ecs_task_role_jp.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task_execution_jp" {
  name = "ecs_task_execution_jp"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}
 
resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_execution_jp.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# resource "aws_iam_instance_profile" "ecs_instance_role" {
#   name = "ecs-instance-profile"
#   role = aws_iam_role.ecs_instance_role_jp.name
# }
 
# resource "aws_iam_role" "ecs_instance_role_jp" {
#   name = "ecs_instance_role_jp"
 
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [{
#       Effect = "Allow",
#       Principal = {
#         #ecs?
#         Service = "ec2.amazonaws.com"
#       },
#       Action = "sts:AssumeRole"
#     }]
#   })
# }
 
# resource "aws_iam_role_policy_attachment" "ecs_instance_role_policy" {
#   role       = aws_iam_role.ecs_instance_role_jp.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
# }
 
# resource "aws_iam_role_policy_attachment" "ecs_instance_ecr_policy" {
#   role       = aws_iam_role.ecs_instance_role_jp.name
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
# }
 
# resource "aws_iam_role_policy_attachment" "ecs_instance_cloudwatch_policy" {
#   role       = aws_iam_role.ecs_instance_role_jp.name
#   policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
# }