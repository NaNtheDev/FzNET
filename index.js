const chalk = require('chalk');
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const { readdir } = require('fs');
const csl = require('./src/utils/console');
const config = require('./config.json');

class Server {
    server = express();
    constructor({ port, ip }) {
        this.server.use(serveStatic('./src/web/'));

        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.raw());

        readdir('./src/api/', (err, file) => {
            if (err) return csl.print(`I can't load file :/ \n${err}`);
            file.forEach(item => {
                const Api = require(`./src/api/${item}`);
                this.server.use('/api', new Api(this));
            });
        });
        console.clear();
        this.server.listen(port, ip, () => csl.print(`Open your Web Browser and go to : ${chalk.underline(`http://${config.ip}:${config.port}`)}`));
    };
};

new Server({ port: config.port, ip: config.ip });