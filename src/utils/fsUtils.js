const fs = require('fs/promises');

async function readTalkerFile() {
    try {
        const content = await fs.readFile('src/talker.json', 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(error.message);
    }
  }

module.exports = {
    readTalkerFile,
};