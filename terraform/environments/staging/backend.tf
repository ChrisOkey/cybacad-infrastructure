terraform {
  backend "s3" {
    bucket         = "cybacad-tfstate-staging"
    key            = "state/staging/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "cybacad-tflock-staging"
    encrypt        = true
  }
}
