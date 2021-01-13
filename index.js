const ffmpegMpeg = require('ffmpeg.js/ffmpeg-mp4');
const ffmpegWebm = require('ffmpeg.js/ffmpeg-webm');
// const ffmpeg = require('ffmpeg.js');
const fs = require('fs');

/**
 * @param {String} directory of base video input
 * @param {String} baseFile of base video input
 * @param {String} pipFile of PIP video input
 * @param {'mp4' | 'webm'} type of input
 * @param {'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'} gravity
 */
const PipLib = function(directory, baseFile, pipFile, type="mp4", gravity='TOP_LEFT') {
    let ffmpeg
    if (type === 'webm') {
        ffmpeg = ffmpegWebm
    } else {
        ffmpeg = ffmpegMpeg
    }
    let xPos = 0
    let yPos = 0
    let padHeight = 10
    let padWidth = 10
    let baseHeight = 0
    let baseWidth = 0
    let overlayHeight = 0
    let overlayWidth = 0
    switch(gravity) {
        case 'TOP_RIGHT':
            xPos = baseWidth - overlayWidth - padWidth
            yPos = padHeight
            break;
        case 'BOTTOM_LEFT':
            xPos = padWidth
            break;
        case 'BOTTOM_RIGHT':
            xPos = baseWidth - overlayWidth - padWidth
            yPos = baseHeight - overlayHeight - padHeight
            break;
        case 'TOP_LEFT':
        default:
            xPos = padWidth
            yPos = padHeight

    }
    try {
        let stdout = ''
        let stderr = ''
        const baseData = new Uint8Array(fs.readFileSync(__dirname + directory + baseFile));
        const pipData = new Uint8Array(fs.readFileSync(__dirname + directory + pipFile));
        ffmpeg({
            mounts: [{type: "NODEFS", opts: {root: "."}, mountpoint: "/data"}],
            MEMFS: [
                { name: baseFile, data: baseData },
                { name: pipFile, data: pipData }
            ],
            arguments: [
                "-i",
                baseFile,
                "-i",
                pipFile,
                "-vf",
                `"movie=${pipFile},scale=250:-1[inner];[in][inner]overlay=${xPos}:${yPos}[out]"`,
                "-y",
                "completed.mp4"
            ],
            print: (data) => { stdout += data + "\n"; },
            printErr: (data) => { stderr += data + "\n"; },
            onExit: (code) => {
                console.log("Process exited with code " + code);
                console.log(stdout);
                if (stderr) {
                    throw stderr;
                }
            },
        })
    } catch (err) {
        throw err
    }
}

module.exports = PipLib
