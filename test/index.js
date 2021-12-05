import { createLogger } from "../lib/index.js";
import chalk from 'chalk';

(async () => {

    const log = createLogger({
        ok: 'OK',
        debug: chalk.magenta('DEBUG'),
        info: chalk.cyan('INFO')
    }, 'PREPEND', '|', console.log);
    
    
    log.ok('this is ok');
    log.info('this is info');
    log.debug('this is debug');
})();