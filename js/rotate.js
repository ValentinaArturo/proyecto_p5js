let serial; // variable for the serial object
let latestData = 0; // variable to hold the data from the potentiometer
let img; // variable to hold the image

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Load the image (replace 'image_path.jpg' with the actual path to your image file)
  img = loadImage('../assets/umg.png');

  // Serial constructor
  serial = new p5.SerialPort();
  // Get a list of all connected serial devices
  serial.list();
  // Serial port to use - you'll need to change this
  serial.open('/dev/tty.usbmodem1423201');
  // Callback for when the sketch connects to the server
  serial.on('connected', serverConnected);
  // Callback to print the list of serial devices
  serial.on('list', gotList);
  // What to do when we get serial data
  serial.on('data', gotData);
  // What to do when there's an error
  serial.on('error', gotError);
  // When to do when the serial port opens
  serial.on('open', gotOpen);
  // What to do when the port closes
  serial.on('close', gotClose);
}

function serverConnected() {
  console.log("Connected to Server");
}

// List the ports
function gotList(thelist) {
  console.log("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  console.log("Serial Port is Open");
}

function gotClose() {
  console.log("Serial Port is Closed");
  latestData = 0;
}

function gotError(theerror) {
  console.log(theerror);
}

// When data is received in the serial buffer
function gotData() {
  let currentString = serial.readLine(); // Store the data in a variable
  trim(currentString); // Get rid of whitespace
  if (!currentString) return; // If there's nothing in there, ignore it
  console.log(currentString); // Print it out
  latestData = Number(currentString); // Convert the received string to a number
}

function draw() {
  background(255);

  // Calculate the rotation angle based on the potentiometer data
  let rotationAngle = map(latestData, 0, 1023, 0, TWO_PI);

  // Translate to the center of the canvas
  translate(width / 2, height / 2);
  // Rotate the canvas
  rotate(rotationAngle);

  // Draw the image at the center with the rotation applied
  imageMode(CENTER);
  image(img, 0, 0, 200, 200);
}
