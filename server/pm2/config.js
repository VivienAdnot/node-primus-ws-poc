const path = require('path');

const __root = path.join(__dirname, '../');

module.exports = {
    apps: [{
        name: 'socket-server',
        cwd: __root,
        script: './src/server.js',
        ignore_watch: ['dist/*', '.git/*', 'node_modules/*'],
        watch: true,
        node_args: '--harmony',
        env: {
            PORT: 8050
        }
    }]
};