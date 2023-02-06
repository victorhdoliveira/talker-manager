const fs = require('fs/promises');

async function readTalkerFile() {
    try {
        const content = await fs.readFile('src/talker.json', 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(error.message);
    }
  }

async function readTalkerID(id) {
    try {
        const data = await readTalkerFile();
        const searchID = data.find((e) => e.id === Number(id));
        return searchID;
    } catch (error) {
        console.error(error.message);
    }
  }

module.exports = {
    readTalkerFile,
    readTalkerID,
};