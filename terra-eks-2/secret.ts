// resource "aws_secretsmanager_secret" "db_secret" {
//     name = "alinedb_credentials"
//   }
  
//   resource "aws_secretsmanager_secret_version" "db_secret_version" {
//     secret_id = aws_secretsmanager_secret.db_secret.id
  
//     secret_string = jsonencode({
//       db_name  = "alinedb"
//       username = "root"
//       password = "Password123"
//       port     = 3306
//     })
//   }