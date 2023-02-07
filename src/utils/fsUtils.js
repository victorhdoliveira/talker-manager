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
        const searchId = data.find((e) => e.id === Number(id));
        return searchId;
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

async function editData(id, name, age, talk) {
    try {
        const data = await readTalkerFile();
        const searchId = data.find((e) => e.id === Number(id));
        const update = [{ id: searchId.id, name, age, talk }];
        await fs.writeFile('src/talker.json', JSON.stringify(update));
        return update[0];
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteData(id) {
    try {
        const data = await readTalkerFile();
        const notDeleteId = data.filter((e) => e.id !== Number(id));
        await fs.writeFile('src/talker.json', JSON.stringify(notDeleteId));
        return notDeleteId;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    readTalkerFile,
    readTalkerID,
    insertData,
    editData,
    deleteData,
};