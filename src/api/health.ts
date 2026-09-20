export const handler = async (event: any) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
        }),
    };
};