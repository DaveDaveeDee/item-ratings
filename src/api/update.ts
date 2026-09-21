import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from "aws-lambda";
import {updateItem} from "../services/itemService";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const itemId = event.pathParameters?.id;

        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Missing item id parameter"}),
            };
        }

        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({error: "Missing request body"}),
            };
        }

        const updates = JSON.parse(event.body);
        const updatedItem = await updateItem(itemId, updates);

        return {
            statusCode: 200,
            body: JSON.stringify(updatedItem),
        };
    } catch (error: any) {
        console.error("Error updating item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Internal Server Error"}),
        };
    }
};