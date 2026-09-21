import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getItem } from "../services/itemService";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const itemId = event.pathParameters?.id;

        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing item id parameter" }),
            };
        }

        const item = await getItem(itemId);

        if (!item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Item not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(item),
        };
    } catch (error: any) {
        console.error("Error retrieving item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};