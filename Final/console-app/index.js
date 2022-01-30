require('dotenv').config();
const path = require('path')
const fs = require('fs');
const readline = require("readline");
const { uploadToAzure } = require('./util')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

  const main = async () => {
    rl.question("Please enter image path or type 'quit' to exit\n", function (answer) {
      if (answer === 'quit' || answer === 'q'){
        rl.close()
      }
      const srcPath = answer ? answer : undefined
      console.log(srcPath)
      try {
        if (fs.existsSync(srcPath) && fs.lstatSync(srcPath).isFile()){
          rl.question(`Catch your file ${path.basename(srcPath)}.\nWould you like to upload it to Azure? Y/N\n`, async function(yesorno) {
            if (yesorno.toLowerCase() === 'y'){
              const response = await uploadToAzure(srcPath)
              response ? console.log(`Your file ${path.basename(srcPath)} successfully uploaded`) : 
              console.log('There is troubles with uploading to Azure. PLease repeat it.')
              main()
            } else{
              console.log('Ok. You can choose another file\n')
              main()
            }
          })
        } else {
          console.log('Oops filed does not exists or its directory\n')
          main();
        }
      } catch (err) {
        console.log('Something went wrong', err)
        rl.close()
      }
    });

  }

  rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
  
  main()

