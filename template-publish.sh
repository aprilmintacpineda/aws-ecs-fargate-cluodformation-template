echo "\n\nBuilding docker image\n\n"

docker build -t aws-fargate-example:latest .

echo "\n\nTagging docker image\n\n"

docker tag <image-name-here>:latest 127336369406.dkr.ecr.us-east-1.amazonaws.com/<image-name-here>:latest

echo "\n\nPushing docker image to ECR\n\n"

ecs-cli push 127336369406.dkr.ecr.us-east-1.amazonaws.com/<image-name-here>:latest \
  --aws-profile <aws-profile-here>

# echo "\n\nRestarting ecs service\n\n"

# aws ecs update-service \
#   --cluster aws-fargate-example \
#   --service aws-fargate-example-myEcsClusterService-V7n3IlQnRn0a \
#   --force-new-deployment \
#   --profile <aws-profile-here>
