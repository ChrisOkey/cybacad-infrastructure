terraform {
  backend "s3" {
    bucket         = "cybacad-tfstate-prod"
    key            = "state/prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "cybacad-tflock-prod"
    encrypt        = true
  }
}
