import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.ITEMS_TABLE || "item-ratings-dev";

export async function createItem(item: any) {
    const params = {
        TableName: TABLE_NAME,
        Item: item,
    };

    await docClient.send(new PutCommand(params));
    return item;
}

export async function getItem(id: string) {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };

    const response = await docClient.send(new GetCommand(params));
    return response.Item;
}