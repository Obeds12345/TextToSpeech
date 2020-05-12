var fs = require('fs')

const before = Date.now();
var s = fs.createReadStream('cmudict-0.7b.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {

        // pause the readstream
        s.pause();

        lineNr += 1;
        console.log(line);

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        // logMemoryUsage(lineNr);

        // resume the readstream, possibly from a callback
        s.resume();
    })
        .on('error', function (err) {
            console.log('Error while reading file.', err);
        })
        .on('end', function () {
            console.log(Date.now() - before);
            console.log('Read entire file.')
        })
    );









// var fs = require('fs')

// function __init__(words_pron_dict = 'cmudict-0.7b.txt') {
//     _l = {}
//     _load_words(words_pron_dict)
// }
// var e = 1;
// function _load_words(words_pron_dict) {
//     let chunks = [];
//     let fileBuffer;
//     let fileStream = fs.createReadStream(words_pron_dict);
//     fileStream.once('error', (err) => {
//         console.error(err);
//     });
//     fileStream.once('end', () => {
//         fileBuffer = Buffer.concat(chunks);
//         console.log(e);
//     });
//     fileStream.on('data', (chunk) => {
//         chunks.push(chunk);
//         if (!chunk.toString().startsWith(';;;')) {
//             var key, val = chunk.toString().split('  ', 2)
//             console.log(key, val)
//             e++
//             // _l[key] = re.matchAll("[A-Z]+", val)

//             // console.log(chunk.toString())
//         }

//     });
// }


__init__();