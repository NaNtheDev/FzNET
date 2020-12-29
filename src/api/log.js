const { Router } = require('express');
const tag = require('../utils/console');

module.exports = class Log extends Router {
    constructor(server) {
        super(server);
        this.server = server;

        this.get('/log', (req, res) => {
            if (!req.query.log) return res.json({
                message: 'Enter a message',
                code: 400
            });
            
            tag.classic(req.query.log, req.query.tag);
            res.json({
                code: 200
            });
        });
    };
};