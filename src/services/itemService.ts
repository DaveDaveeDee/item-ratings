import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand} from "@aws-sdk/lib-dynamodb";

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
        Key: {id},
    };

    const response = await docClient.send(new GetCommand(params));
    return response.Item;
}

export async function updateItem(id: string, attributes: Record<string, any>) {
    const updateExpressionParts: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    let index = 0;
    for (const [key, value] of Object.entries(attributes)) {
        if (key === "id") continue; // Undvik att skriva över primärnyckeln
        const attrNameKey = `#attr${index}`;
        const attrValKey = `:val${index}`;

        updateExpressionParts.push(`${attrNameKey} = ${attrValKey}`);
        expressionAttributeNames[attrNameKey] = key;
        expressionAttributeValues[attrValKey] = value;
        index++;
    }

    if (updateExpressionParts.length === 0) {
        throw new Error("No attributes provided for update");
    }

    const params = {
        TableName: TABLE_NAME,
        Key: {id},
        UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW" as const,
    };

    const response = await docClient.send(new UpdateCommand(params));
    return response.Attributes;
}

export async function deleteItem(id: string) {
    const params = {
        TableName: TABLE_NAME,
        Key: {id},
    };

    await docClient.send(new DeleteCommand(params));
    return {message: `Item with id ${id} deleted successfully`};
}
