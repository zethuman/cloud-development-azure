require('dotenv').config();
const cosmos = require('@azure/cosmos');
const CosmosClient = cosmos.CosmosClient;

const endpoint = process.env.COSMOS_ENDPOINT;
const masterKey = process.env.COSMOS_KEY;
const client = new CosmosClient({endpoint: endpoint, auth: { masterKey: masterKey } });
const databaseId = process.env.COSMOS_DATABASE_ID;
const containerId = process.env.COSMOS_CONTAINER_ID;

async function initdb(){
    const { database } = await client.databases.createIfNotExists({ id: "zooshopdb" });
    console.log(database.id);
    const { container } = await database.containers.createIfNotExists({ id: "zooshopcontainer" });
    console.log(container.id);
}

async function createPet(category, name, image, facts){
    const pet = {
        categories: category,
        name: name,
        imagename: image, 
        facts: facts
    }
    return await client.database(databaseId).container(containerId).items.create(pet);
}

async function getPets(){
    // initdb()
    const { result: results } = await client.database(databaseId).container(containerId).items.query("SELECT * FROM c").toArray();
    return results
}

async function deletePet(id){
    const { result: results } = await client.database(databaseId).container(containerId).item(id).delete();
    return results
}

async function updatePet(id, name, facts, category, imagename){
    const doc = {}
    doc.id = id
    doc.name = name
    doc.facts = facts
    doc.category = category
    doc.imagename = imagename
    const { result: results } = await client.database(databaseId).container(containerId).item(id).replace(doc)
    return results
}

module.exports = {
    getPets,
    createPet,
    deletePet,
    updatePet
}