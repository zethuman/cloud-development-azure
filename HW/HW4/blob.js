const { DefaultAzureCredential, ManagedIdentityCredential } = require("@azure/identity");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { ClientSecretCredential, ChainedTokenCredential } = require("@azure/identity");
const { getBlobSasUri } = require("./functions");

// When an access token is requested, the chain will try each
// credential in order, stopping when one provides a token
// const credential = new ClientSecretCredential(process.env.TENANT, process.env.OAUTH_APP_ID, process.env.OAUTH_APP_SECRET);
const credential = new StorageSharedKeyCredential(process.env.ACCOUNT, process.env.SECRET);
const account = process.env.ACCOUNT;
// const defaultAzureCredential = new ManagedIdentityCredential(userAssignedClientId)

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`, credential
);

const containerName = process.env.CONTAINER;
async function retrieve() {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  console.log(containerClient)
//   const sasuri = await getBlobSasUri(containerClient, account, '538466.marx2x.jpg', credential, null)
    let i = 1;
    let arrayOfBlobs = []
    let blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {
        const sasuri = await getBlobSasUri(containerClient, blob.name, credential, null)
        arrayOfBlobs.push(sasuri)
        console.log(`Blob ${i++}: ${blob.name} , ${sasuri}`);
    }
    return arrayOfBlobs
}

module.exports = {
    retrieve
}