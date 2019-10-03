var videoshow = require('videoshow')

var images = [
  {
    path :'src/step1.jpg',
    caption: 'SAS'
  },
  {
    path :'src/step2.jpg',
    caption: 'FBI SWAT'
  },
  {
    path :'src/step3.jpg',
    caption: 'GIGN'
  },
  {
    path :'src/step4.jpg',
    caption: 'GSG-9'
  },
  {
    path :'src/step5.jpg',
    caption: 'Spetsnaz'
  }
]

var videoOptions = {
  fps: 30,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x640',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p',
  useSubRipSubtitles: false, // Use ASS/SSA subtitles instead
  subtitleStyle: {
    Fontname: 'Verdana',
    Fontsize: '26',
    PrimaryColour: '11861244',
    SecondaryColour: '11861244',
    TertiaryColour: '11861244',
    BackColour: '-2147483640',
    Bold: '2',
    Italic: '0',
    BorderStyle: '2',
    Outline: '2',
    Shadow: '3',
    Alignment: '2', // left, middle, right
    MarginL: '40',
    MarginR: '60',
    MarginV: '40'
  }
}

videoshow(images, videoOptions)
//   .audio('song.mp3')
  .save('video.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })
