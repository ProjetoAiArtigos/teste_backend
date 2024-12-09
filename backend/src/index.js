import Server from "./server.js";

const server = new Server();

(async () => {
    try {
        console.log("Iniciando .....")
        await server.connectDatabase();
        server.start();
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
})();
