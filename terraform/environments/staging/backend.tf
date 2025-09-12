s3" {
    bucket         = "cybacad-tfstate-staging"
    key            = "state/staging/terraform.tfstate"
     "regterraform {
  baion ckend        = "us-east-1"
    dynamodb_table = "cybacad-tflock-staging"
    encrypt        = true
  }
}
