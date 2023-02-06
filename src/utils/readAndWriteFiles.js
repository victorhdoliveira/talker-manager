const fs = require('fs/promises');

const readTalkerFile = async () => {
    try {
      const content = await fs.readFile('src/talker.json', 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  };

module.exports = readTalkerFile;