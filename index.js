const csvPath = './data/users.csv';
const xmlPath = './data/users.xml';
const jsonPath = './data/users.json';

const jsonData = require(jsonPath);
let csvData = null;
let xmlData = null;

// Using this package to convert csv file to json
const csvParser = require("csvtojson");

// Using this package to convert xml file to json
const xmlParser = require('xml2json');
// Using this package to read files
const fs = require('fs');

// const csvwriter = require('csv-writer');

// const createCsvWriter = csvwriter.createObjectCsvWriter;

// Convert csv to json - using asynchrnous calls since data can be large and time taking
async function csvToJson() {
  return await csvParser()
    .fromFile(csvPath);
}

// Convert xml to json
async function xmlToJson(data) {
      const usersString = xmlParser.toJson(data)
      let usersJson = JSON.parse(usersString);
      let result = usersJson['users']['user'];

       // Replacing 'userid' with 'user_id' to perform sort operation later
      result.map((res) => {
        res['user_id'] = parseInt(res['userid']);
        delete res['userid'];
      })

      return result;
}

const promise1 = new Promise((resolve, reject) => {
  csvToJson().then((result) => {

    // Replacing 'User ID' with 'user_id' to perform sort operation later
    result.map((res) => {
      res['user_id'] = parseInt(res['User ID']);
      delete res['User ID'];
    })

    csvData = result;
    console.log('csv', result);
    resolve(csvData);
  });
});

const promise2 = new Promise((resolve, reject) => {
  fs.readFile(xmlPath, 'utf-8', (err, data) => {
    xmlToJson(data)
    .then((res) => {
      xmlData = res;
      console.log('res', res);
      resolve(xmlData);
    });
  });
});


// Merging data
function mergeData(jsonData, csvData, xmlData) {

  let mergedData = [];
  jsonData.map(data => {
    mergedData.push(data);
  });

  csvData.map(data => {
    mergedData.push(data);
  });

  xmlData.map(data => {
    mergedData.push(data);
  });

  return mergedData;
}

// Sorting merged data by user_id
function sortDataByUserId(data) {
  data = data.sort((a, b) => a['user_id'] - b['user_id']);
  return data;
}

// Using promises to wait for async operation to finish before merging and sorting
Promise.all([promise1, promise2])
  .then(() => {
    console.log('here');
    let mergedResult = mergeData(jsonData, csvData, xmlData);
    // console.log('mergedResult', mergedResult);
    let sortedResult = sortDataByUserId(mergedResult);

    // Push updated data to files
    new Promise((resolve, reject) => {
      json = JSON.stringify(sortedResult);
      fs.writeFile('./examples/users.json', json, (err, data) => {
        resolve(data);
      })
    });

    /*
    new Promise((resolve, reject) => {
      // Logic to convert json to csv and then writing to ./examples/users.csv
      resolve(1);
    });

    new Promise((resolve, reject) => {
      // Logic to convert json to xml and then writing to ./examples/users.xml
      resolve(1);
    });
    */
  })
  .then(() => {
    console.log('SUCCESS');
  });



