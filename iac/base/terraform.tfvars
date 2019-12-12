app = "webmd-rest-service"
environment = "dev"

internal = true
container_port = "8080"
replicas = "1"
health_check = "/health"
region = "us-east-1"
aws_profile = "default"
saml_role = "admin"
vpc = "vpc-2ab3e850"
public_subnets = "subnet-08110426,subnet-09ba6444,subnet-1a646f46,subnet-33fef154,subnet-497fbe47,subnet-9a590ba4"
tags = {
  application   = "webmd-rest-service"
  environment   = "dev"
}
