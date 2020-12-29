const chalk = require('chalk');

const tag = `
 _______  _______  __    _  _______  _______             ___      ___      _______ 
|       ||       ||  |  | ||       ||       |           |   |    |   |    |       |
|    ___||____   ||   |_| ||    ___||_     _|   ____    |   |___ |   |___ |___    |
|   |___  ____|  ||       ||   |___   |   |    |____|   |    _  ||    _  |    |   |
|    ___|| ______||  _    ||    ___|  |   |             |   | | ||   | | |    |   |
|   |    | |_____ | | |   ||   |___   |   |             |   |_| ||   |_| |    |   |
|___|    |_______||_|  |__||_______|  |___|             |_______||_______|    |___|
`;

module.exports = {
    print: (msg) => {
        console.clear();
        console.log(chalk.green(`${tag} \n${!msg ? '' : msg}
        `));
    },

    classic: (msg, tagg) => {
        if (tagg) {
            console.clear();
            console.log(chalk.green(`${tag} \n${msg}`));
            return;
        };
        console.clear();
        console.log(chalk.green(msg));
    }
};