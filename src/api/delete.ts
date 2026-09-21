import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { deleteItem } from "../services/itemService";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        const itemId = event.pathParameters?.id;

        if (!itemId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing item id parameter" }),
            };
        }

        await deleteItem(itemId);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item deleted successfully" }),
        };
    } catch (error: any) {
        console.error("Error deleting item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};