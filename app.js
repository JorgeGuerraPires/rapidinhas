//---------------------------------------------
const MongoClient = require("mongodb").MongoClient;

//definition of db variables
const dbHost = "localhost";
const dbName = "mongo-course";
const collectionName = "users";

//--------------------------------------------------

//--------------------------------------------------
//Data base connection
MongoClient.connect(`mongodb://${dbHost}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    workingWithMongo(collection);
  })
  .catch(() => {});
//------------------------------------------------

function workingWithMongo(collection) {
  //   insertOne(collection);
  //   print(collection);
  deleteField(collection);
}

//----------------------------------
function deleteField(collection) {
  collection.findOne({ name: "Jorge" }).then(user => {
    console.log(user);
    //--------------
    delete user.email;
    //----------------

    console.log(user);

    collection.replaceOne({ name: "Jorge" }, user);
  });
}
//----------------------------------------
function print(collection) {
  collection
    .find()
    .toArray()
    .then(users => {
      console.log(users);
    });
}

function insertOne(collection) {
  collection
    .insertOne({ name: "Jorge", email: ["jorgeguerrapires@yahoo.com.br"] })
    .then(() => {
      console.log("okay");
    });
}

function replaceOne(collection) {
  collection.findOne({ name: "Jorge" }).then(user => {
    console.log(user);
    delete user.email;
    console.log(user);
    collection.replaceOne({ name: "Jorge" }, user);
  });
}
