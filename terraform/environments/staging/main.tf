terraform {
  backend "s3" {
    bucket         = "cybacad-tfstate-staging"
    key            = "state/staging/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "cybacad-tflock-staging"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}


