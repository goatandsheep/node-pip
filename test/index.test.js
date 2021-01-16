const Pip = require('../index');

const settings = require('./settings');

describe('basic ffmpeg', () => {
    it('should process an MP4 file', () => {
        expect(() => {
            Pip({
                    inputs: [
                        settings.BASE_INPUT_MP4_FILENAME,
                        settings.PIP_INPUT_MP4_FILENAME
                    ],
                    template: {
                        views: [
                            {
                                x: 0,
                                y: 0,
                                hieght: 7200
                            },
                            {
                                x: 10,
                                y: 10,
                                hieght: 250
                            }
                        ]
                    }
                },
                settings.INPUT_DIRECTORY
            )
        }).not.toThrow();
    })
})
