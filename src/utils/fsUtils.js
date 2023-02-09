const fs = require('fs/promises');

const writeFile = async (data) => {
    await fs.writeFile('src/talker.json', JSON.stringify(data));
};

const readTalkerFile = async () => {
    try {
        const content = await fs.readFile('src/talker.json', 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return console.log('Erro em encontrar a lista de palestrantes');
    }
};

const searchTalker = async (searching) => {
    try {
        const data = await readTalkerFile();
        const filtering = data.filter((e) => e.name.includes(searching));
        if (!searching || searching.length === 0) return data;
        return filtering;
    } catch (error) {
        return console.log('Erro ao buscar um palestrante');
    }
};

const readTalkerID = async (id) => {
    try {
        const data = await readTalkerFile();
        const searchId = data.find((e) => e.id === Number(id));
        return searchId;
    } catch (error) {
        return console.log('Erro em encontrar o palestrante através ID');
    }
};

const insertNewTalker = async (post) => {
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
};

const editTalker = async (id, name, age, talk) => {
    try {
        const data = await readTalkerFile();
        const searchId = data.find((e) => e.id === Number(id));
        const update = [{ id: searchId.id, name, age, talk }];
        writeFile(update);
        return update[0];
    } catch (error) {
        return console.log('Erro ao editar o palestrante através ID');
    }
};

const deleteTalker = async (id) => {
    try {
        const data = await readTalkerFile();
        const notDeleteId = data.filter((e) => e.id !== Number(id));
        writeFile(notDeleteId);
        return notDeleteId;
    } catch (error) {
        return console.log('Erro ao deletar palestrante');
    }
};

module.exports = {
    readTalkerFile,
    readTalkerID,
    insertNewTalker,
    editTalker,
    deleteTalker,
    searchTalker,
};