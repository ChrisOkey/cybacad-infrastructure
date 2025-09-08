terraform {
  backend "s3" {
    bucket         = "cybacad-tfstate-dev"
    key            = "state/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "cybacad-tflock-dev"
    encrypt        = true
  }
}