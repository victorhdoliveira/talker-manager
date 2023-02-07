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

async function insertData(post) {
try {
    const data = await readTalkerFile();
    const newId = data.length + 1;
    const newTalker = { id: newId, ...post };
    data.push(newTalker);
    await fs.writeFile('src/talker.json', JSON.stringify(data));
    return newTalker;
} catch (error) {
    console.error(error.message);
}
}

module.exports = {
    readTalkerFile,
    readTalkerID,
    insertData,
};