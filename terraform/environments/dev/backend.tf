terraform {
  backend "s3" {
    bucket       = "cybacad-tfstate-dev"
    key          = "state/dev/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}
