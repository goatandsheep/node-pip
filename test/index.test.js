const Pip = require('../index');
const path = require('path');

const settings = require('./settings');

describe('basic ffmpeg', () => {
    it('should process an MP4 file', () => {
        expect(async () => {
            await Pip({
                    inputs: [
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
                            }
                        ],
                        height: 720
                    },
                    verbose: true
                },
                path.join(__dirname, '..', settings.INPUT_DIRECTORY)
            )
        }).not.toThrow();
    })
    it('should process 4 videos', () => {
        expect(async () => {
            await Pip({
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
                                x: 400,
                                y: 10,
                                height: 250
                            },
                            {
                                x: 400,
                                y: 400,
                                height: 250
                            }
                        ],
                        height: 720
                    },
                    verbose: true
                },
                path.join(__dirname, '..', settings.INPUT_DIRECTORY)
            )
        }).not.toThrow();
    })
})
