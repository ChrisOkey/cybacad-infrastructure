terraform {
backend "s3" {
bucket         = "cybacad-tfstate-dev"
key            = "state/dev/terraform.tfstate"
region         = "us-east-1"
dynamodb_table = "cybacad-tflock-dev"
encrypt        = true
}
}

eof

This corrected file will tell Terraform exactly where to find the locking table it needs to prevent concurrent state access, and it will get rid of the `use_lockfile` error.

After you have saved the file, please run the following commands to commit and push the change to your GitHub repository.

```bash
git add .
git commit -m "Fix: Reverting backend to use dynamodb_table"
git push
