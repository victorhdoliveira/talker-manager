const fs = require('fs/promises');

async function writeFile(data) {
 await fs.writeFile('src/talker.json', JSON.stringify(data));
}

async function readTalkerFile() {
    try {
        const content = await fs.readFile('src/talker.json', 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return console.log('Erro em encontrar a lista de palestrantes');
    }
  }

  async function searchTalker(searching) {
    try {
        const data = await readTalkerFile();
        const filtering = data.filter((e) => e.name.includes(searching));
        if (!searching || searching.length === 0) return data;
        return filtering;
    } catch (error) {
        return console.log('Erro ao buscar um palestrante');
    }
}

async function readTalkerID(id) {
    try {
        const data = await readTalkerFile();
        const searchId = data.find((e) => e.id === Number(id));
        return searchId;
    } catch (error) {
        return console.log('Erro em encontrar o palestrante através ID');
    }
  }

async function insertData(post) {
    try {
        const data = await readTalkerFile();
        const newId = data.length + 1;
        const newTalker = { id: newId, ...post };
        data.push(newTalker);
        writeFile(data);
        return newTalker;
    } catch (error) {
        return console.log('Erro ao adicionar palestrante');
    }
}

async function editData(id, name, age, talk) {
    try {
        const data = await readTalkerFile();
        const searchId = data.find((e) => e.id === Number(id));
        const update = [{ id: searchId.id, name, age, talk }];
        writeFile(update);
        return update[0];
    } catch (error) {
        return console.log('Erro ao editar o palestrante através ID');
    }
}

async function deleteData(id) {
    try {
        const data = await readTalkerFile();
        const notDeleteId = data.filter((e) => e.id !== Number(id));
        writeFile(notDeleteId);
        return notDeleteId;
    } catch (error) {
        return console.log('Erro ao deletar palestrante');
    }
}

module.exports = {
    readTalkerFile,
    readTalkerID,
    insertData,
    editData,
    deleteData,
    searchTalker,
};