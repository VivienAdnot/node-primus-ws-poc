const path = require('path');

const __root = path.join(__dirname, '../');

console.log('__root', __root);

module.exports = {
    apps: [{
        name: 'socket-server',
        script: './src/server.js',
        watch: true,
        cwd: __root,
        'exec-interpreter': `${__root}/node_modules/.bin/babel-node`,
        env: {
            PORT: 8050
        },
        ignore_watch: ['dist/*', '.git/*', 'node_modules/*', 'npm-debug*']
    }]
};
