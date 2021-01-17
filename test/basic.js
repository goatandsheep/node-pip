const Pip = require('../index');

const settings = require('./settings');
Pip({
    inputs: [
        settings.BASE_INPUT_MP4_FILENAME,
        settings.PIP_INPUT_MP4_FILENAME,
        settings.BASE_INPUT_MP4_FILENAME,
        settings.PIP_INPUT_MP4_FILENAME
    ],
    template: {
        views: [
            {
                x: 0,
                y: 0,
                height: 720
            },
            {
                x: 10,
                y: 10,
                height: 250
            },
            {
                x: 10,
                y: 400,
                height: 250
            },
            {
                x: 400,
                y: 400,
                height: 250
            }
        ],
        height: 720
    }
},
settings.INPUT_DIRECTORY
)