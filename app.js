const https = require("https");

function printError(error) {
  console.error(error.message);
}

function getDefinition(word) {
  try {
    const request = https.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=a5984853-9a4b-40d7-8820-99c4af5d254c`,
      (response) => {
        if (response.statusCode === 200) {
          let body = "";
          response.on("data", (data) => {
            body += data.toString();
          });
          response.on("end", () => {
            try {
              let wordParse = JSON.parse(body);
              const wordDef = wordParse[0].shortdef;
              console.log(wordDef)
            } catch (error) {
              printError(error);
            }
          });
        } else {
          const message = `There was an error getting the word for ${word} (${
            http.STATUS_CODES[response.statusCode]
          })`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
      }
    );
    request.on("error", (error) => printError(error));
  } catch (error) {
    printError(error);
  }
}

const words = process.argv.slice(2);
console.log(words);
words.forEach(getDefinition);
