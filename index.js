const server = require('./server');

const port = 7000;

server.listen(port, () => console.log(`Listening on port ${port}`));
