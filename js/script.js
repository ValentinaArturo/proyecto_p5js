let serial; 
let distanceCm = 0;

function setup() {
  createCanvas(400, 200);
  
  serial = new p5.SerialPort();
  serial.open('COM3'); 

  serial.on('open', () => {
    serial.write('s');
    serial.on('data', parseData);
  });
}

function parseData() {
  let data = serial.readLine();
  if (data) {
    distanceCm = parseInt(data); 
  }
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(`Distance: ${distanceCm} cm`, width / 2, height / 2);
}
