import App from './app';
import router from './routers';

const server = new App();

server.addRouter(router);

export default server;