const video = document.getElementById('video')

// Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo)

// function startVideo() {
//     navigator.getUserMedia(
//         { video : {} },
//         stream => video.srcObject = stream,
//         err => console.error(err)
//     )
// }

// video.addEventListener('play', () => {
//     const canvas = faceapi.createCanvasFromMedia(video)
//     document.body.append(canvas)
//     const displaySize = { width: video.width, height: video.height }
//     faceapi.matchDimensions(canvas, displaySize)
//     setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(video, 
//         new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//         console.log(detections)
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//         faceapi.draw.drawDetections(canvas, resizedDetections)
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//     }, 100)
// })

const loadFaceAPI = async() => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
}

function getCameraStream(){
    if (navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        });
    }
}

video.addEventListener('playing', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight
    }

    setInterval(async () => {
        const detects = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
        console.log(detects);
        const resizeDetects = faceapi.resizeResults(detects, displaySize);
        canvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
        faceapi.draw.drawDetections(canvas, resizeDetects);
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetects);
        faceapi.draw.drawFaceExpressions(canvas, resizeDetects);
    }, 300);
});

loadFaceAPI().then(getCameraStream);