rm -rf .aws-cf
mkdir .aws-cf

aws cloudformation package \
  --profile <aws-profile-here> \
  --template-file ./cf.yaml \
  --s3-bucket <s3-bucket-here> \
  --s3-prefix aws-fargate-example \
  --output-template-file ./.aws-cf/template.yaml

aws cloudformation deploy \
  --profile <aws-profile-here> \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
  --template-file ./.aws-cf/template.yaml \
  --stack-name aws-fargate-example \
  --s3-bucket <s3-bucket-here> \
  --s3-prefix aws-fargate-example