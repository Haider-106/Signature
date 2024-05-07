// Get the canvas element
var canvas = document.getElementById('signature-pad');
// Get the 2D drawing context of the canvas
var ctx = canvas.getContext('2d');
// Set the canvas width and height
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
// Calculate the scale factor for normalizing the coordinates
var scaleFactorX = canvas.width / canvas.offsetWidth;
var scaleFactorY = canvas.height / canvas.offsetHeight;

// Initialize the Signature Pad with normalized coordinates
var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)', // necessary to save background as part of the image
    penColor: 'rgb(0, 0, 0)'
});

// Add event listener for the clear button
document.getElementById('clear-btn').addEventListener('click', function () {
    signaturePad.clear();
});

// Add event listener for the save button
document.getElementById('save-btn').addEventListener('click', function () {
    if (!signaturePad.isEmpty()) {
        var dataURL = signaturePad.toDataURL('image/png');
        download(dataURL, 'signature.png');
    } else {
        alert("Please provide a signature first.");
    }
});

// Add event listener for changing background color
document.getElementById('bg-color').addEventListener('change', function (e) {
    signaturePad.backgroundColor = e.target.value;
    signaturePad.clear(); // Must clear to see color change
});

// Add event listener for changing pen color
document.getElementById('pen-color').addEventListener('change', function (e) {
    signaturePad.penColor = e.target.value;
});

// Function to normalize the signature points
function normalizePoint(point) {
    return {
        x: point.x * scaleFactorX,
        y: point.y * scaleFactorY
    };
}

// Function to download the signature as PNG
function download(dataURL, filename) {
    var a = document.createElement('a');
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
