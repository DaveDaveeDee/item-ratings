import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { createItem } from "../services/itemService";
import { randomUUID } from "crypto";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Request body is missing" }),
            };
        }

        const data = JSON.parse(event.body);

        if (!data.title || data.rating === undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields: title and rating" }),
            };
        }

        const newItem = {
            id: randomUUID(),
            title: data.title,
            rating: Number(data.rating),
        };

        const savedItem = await createItem(newItem);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Item created successfully",
                item: savedItem,
            }),
        };
    } catch (error) {
        console.error("Error creating item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};