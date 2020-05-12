var readline = require('readline');
var stream = require('stream');
var fs = require('fs')
var es = require('event-stream');
var wav = require('wav');
var Speaker = require('speaker');
file = 'cmudict-0.7b.txt'
_list = {}
const regex = /[A-Z]+/g;

function __init__(words_pron_dict = file) {
    _load_words(words_pron_dict)
}

function _load_words(words_pron_dict) {
    try {
        var s = fs.createReadStream(words_pron_dict)
            .pipe(es.split())
            .pipe(es.mapSync(function (line) {
                s.pause();
                if (!line.startsWith(';;;')) {
                    var res = line.toString().split('  ', 2)
                    try {
                        _list[res[0]] = res[1].match(regex)
                    } catch (err) {
                        console.log(res[0])
                    }
                }
                s.resume();
            }).on('error', function (err) {
                console.log('Error while reading file.', err);
            }).on('end', function () {
                get_pronunciation('SURE')
            })
            );
    } catch (error) {
        console.log("Whoops _load_words Error");
    }
}


function get_pronunciation(input) {
    try {
        list_pron = [];
        input = input.match(/[\w']+/g)
        input.forEach(element => {
            if (element.toUpperCase() in _list) {
                list_pron.push(_list[element.toUpperCase()])
            } else {
                console.log(false)
            }

        });
        var list_pron = [].concat(...list_pron);
        console.log(list_pron);
        list_pron = ['A', 'KWA', 'BA']
        list_pron.forEach(res => {
            play_audio(res)
        });
    } catch (error) {
        console.log("Whoops Pronunciation Error");
    }
}

function play_audio(sound, delay) {
    try {
        var file = fs.createReadStream("sounds/" + "wav/" + sound + ".wav");
        var reader = new wav.Reader();
        reader.on('format', function (format) {
            // reader.pipe(new Speaker({
            //     channels: 1,          // 2 channels
            //     bitDepth: 32,         // 16-bit samples
            //     sampleRate: 44100     // 44,100 Hz sample rate
            // }));
            reader.pipe(new Speaker(format));
        });
        file.pipe(reader);
    } catch (error) {
        console.log("Whoops Play_Audio");
    }
}

__init__()