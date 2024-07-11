package test
 
import (
    "testing"
    "os"
 
    "github.com/gruntwork-io/terratest/modules/aws"
    "github.com/stretchr/testify/assert"
)
 
func TestBackendResourcesExist(t *testing.T) {
    t.Parallel()
 
    awsRegion := os.Getenv("AWS_DEFAULT_REGION")
    if awsRegion == "" {
        awsRegion = "us-east-1"
    }
 
    s3BucketName := "s3-bucket-jp"
    dynamoDbTableName := "terraform_eks_state_lock_jp"
 
    // Check if S3 bucket exists
    s3BucketExists := aws.GetS3BucketVersioning(t, awsRegion, s3BucketName)
    assert.NotNil(t, s3BucketExists, "S3 bucket does not exist: %s", s3BucketName)
 
    // Check if DynamoDB table exists
    dynamoDbTable := aws.GetDynamoDBTable(t, awsRegion, dynamoDbTableName)
    assert.NotNil(t, dynamoDbTable, "DynamoDB table does not exist: %s", dynamoDbTableName)
}