import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "localhost"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    if (defaultOptions) {
        console.log("🚀", defaultOptions.type, "Running");
    }
    return createConnection(
        Object.assign(defaultOptions, {
            host
        })
    )
}