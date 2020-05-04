const fs = require('fs');
const path = require('path');
const appName = 'Core Sample - Client';
const bundleDestinationDir = '../wwwroot/';
const filesToDelete = ['.map'];

let env = process.argv[2];

if (env === 'dev') {
    log((new Array(80)).join('*'), 'S');
    log(`Build process started for '${appName}' in Development with --watch Mode`);
    log(`When finished, run "npm run prod" to bundle '${appName}' in Production Mode`, 'S');
    process.exit();
}

log((new Array(100)).join('*'), 'S');

try {
    deleteExtraFiles();
    updateLinks(appName);


} catch (err) {
    log(err, 'E');
    throw err;
}

log(`Custom build for '${appName}' completed successfully`, 'S');
log(`You can also run "npm run dev" to bundle '${appName}' in Dev Mode.\n`, 'S');
log((new Array(100)).join('*'), 'S');


//Logs message for user in color coded way in console
//E (error) - Red, S (success) - Green, W (Warning) - Yellow, Default - cyan
function log(txt, type) {
    let color = type === 'E' ? '\x1b[31m' : type === 'S' ? '\x1b[32m' : type === 'W' ? '\x1b[33m' : '\x1b[36m';
    console.log(`${color}${txt}\x1b[0m`);
}

//Copies generated javascript bundle file to the bundleDestinationDir folder
function deleteExtraFiles() {

    log(`\nDeleting Started...\n`, 'W');

    let files = fs.readdirSync(bundleDestinationDir);

    files = files.filter(filename => filesToDelete.includes(path.extname(filename)));

    files.forEach(sourceFile => {

        log(`Deleting ${sourceFile}...`, 'W');

        fs.unlink(path.join(bundleDestinationDir, sourceFile), err => {
            if (err)
                log(err, "E");
        });

    });

}

function updateLinks(appName) {

    let htmlFile = path.join(bundleDestinationDir, "index.html");
    let htmlFileContent = fs.readFileSync(htmlFile, { encoding: 'utf8' });

    let ts = new Date();

    let month = ("0" + (ts.getMonth() + 1)).slice(-2);
    let day = ("0" + ts.getDate()).slice(-2);
    let year = ts.getFullYear();
    let hours = ("0" + ts.getHours()).slice(-2);
    let minutes = ("0" + ts.getMinutes()).slice(-2);

    let timeStamp = `${year}${month}${day}.${hours}${minutes}`;

    //Add Query string to main.js and styles
    htmlFileContent = htmlFileContent.replace(/main\.js/, `main.js?v=${timeStamp}`);
    htmlFileContent = htmlFileContent.replace(/styles\.css/, `styles.css?v=${timeStamp}`);

    fs.writeFileSync(htmlFile, htmlFileContent, { encoding: 'utf8' });

    log(`\nAdded time stamps to files to avoid caching.\n`);

}
