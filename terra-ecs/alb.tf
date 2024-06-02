resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb-ls"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.subnet.id, aws_subnet.subnet2.id]
  enable_deletion_protection = false

  tags = {
    Name = "ecs-alb-ls"
  }
}

resource "aws_security_group" "alb_sg" {
  name        = "alb-security-group-jp"
  description = "Security group for ALB"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    # self        = "false"
    cidr_blocks = ["0.0.0.0/0"]
    description = "any"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
################################## Target Groups ####################################
resource "aws_lb_target_group" "user" {
  name     = "tg-user-jp"
  port     = 8070
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
  health_check {
  path                = "/health"
  }

}

resource "aws_lb_target_group" "underwriter" {
  name     = "tg-underwriter-jp"
  port     = 8071
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
  health_check {
    path                = "/health"
    }
}

resource "aws_lb_target_group" "account" {
  name     = "tg-account-jp"
  port     = 8072
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
  health_check {
    path   = "/health"
  }
}

resource "aws_lb_target_group" "transaction" {
  name     = "tg-transaction-jp"
  port     = 8073
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
  health_check {
    path   = "/health"
  }
}

resource "aws_lb_target_group" "bank" {
  name     = "tg-bank-jp"
  port     = 8083
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"
  health_check {
    path   = "/health"
  }
}

################################## Listeners ####################################

resource "aws_lb_listener" "user" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 8070
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.user.arn
  }
}

resource "aws_lb_listener" "underwriter" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 8071
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.underwriter.arn
  }
}

resource "aws_lb_listener" "account" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 8072
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.account.arn
  }
}

resource "aws_lb_listener" "transaction" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 8073
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.transaction.arn
  }
}

resource "aws_lb_listener" "bank" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 8083
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.bank.arn
  }
}