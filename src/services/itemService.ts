import {dynamoDb, TABLE_NAME} from "./dynamodb";
import {PutCommand} from "@aws-sdk/lib-dynamodb";

export interface Item {
    id: string;
    title: string;
    rating: number;
}

export async function createItem(item: Item): Promise<Item> {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
    })

    await dynamoDb.send(command);
    return item;
}