import json
import boto3

# Get the service resource.
dynamodb = boto3.resource('dynamodb')
# Table "Visitors" already exists in DynamoDB with a `total_visits` entry. 
table = dynamodb.Table('resume-visitors')

def lambda_handler(event, context):
    data = {}
    statusCode = 200
    try:
        # Get the view count from dynamoDB
        key={'id':'rosiekerwinresume.com'}
        response = table.get_item(Key=key)
        # response is the whole map: {'id': 'rosiekerwinresume.com', 'views': Decimal('0')}
        print(response['Item'])
        views = int(response['Item']["views"])
        
        # Increment the counter and return the new value
        views = views + 1
        print(views)
        response = table.put_item(Item={
            'id':'rosiekerwinresume.com',
            'views':views
        })
        data = {"visits": views}
    except Exception as e:
        print(e)
        statusCode = 500

    return {
        'statusCode': statusCode,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials" : "true",
        },
        'body': json.dumps(data),
    }