var points = [];
var mult;
var r1;
var r2;
var g1;
var g2;
var b1;
var b2;
var maxFrames = 500; // Stop drawing after this many frames
var frameCounter = 0;
var diagonalDirection; // 0=top-left to bottom-right, 1=top-right to bottom-left

function hexToRGB(hex) {
   hex = hex.replace(/^#/, '');
   let r = parseInt(hex.slice(0, 2), 16)
   let g = parseInt(hex.slice(2, 4), 16);
   let b = parseInt(hex.slice(4, 6), 16);
   return [r,g,b]
}


function setup() {
   pixelDensity(2); // 1x the resolution
   createCanvas(windowWidth, windowHeight);
   background(0);
   angleMode(DEGREES);noiseDetail(1);

   // Scale density based on screen size (125 is perfect for 1920x1080)
   var baseDensity = 200;
   var baseWidth = 1920;
   var denstiy = baseDensity * (width / baseWidth);
   var space = width / denstiy;
   lines_per_point = 2; // >2 impacts performance
   
   for (var x = 0; x < width; x+=space)  {
      for(var y = 0; y < height; y += space)  {
         for (n = 0; n < lines_per_point; n++) {
            var p = createVector(x+ random(-10,10),y+random(-10,10));
            points.push(p);
         }
      }
   }

   var define_colors = true; // Set to true to use custom colors
   if (define_colors) {
      // White and gold color scheme
      [r1,g1,b1] = hexToRGB("FFFFFF"); // White
//      [r2,g2,b2] = hexToRGB("B3A369"); // GT Gold
      [r2,g2,b2] = hexToRGB("D3AF37"); // GT Gold but better
      
   }
   else  {
      r1 = random(50,256);
      g1 = random(50,256);
      b1 = random(50,256);
   
      r2 = random(50,256);
      g2 = random(50,256);
      b2 = random(50,256);
   }

   //dist between perlin values
   // bigger the mult, the more "rivers" you get
   // original mult = random(0.001,0.01) 
   mult = random(0.02,0.045);
   //mult = 0.05;

      //dist between perlin values - controls how much it branches
   // SMALLER mult = more branching/rivers (try 0.002-0.01)
   // LARGER mult = smoother, less branching (try 0.02-0.05)
   //mult = 0.025; // Adjust this value: smaller = more branches, larger = smoother flow
   //mult = random(0.01,0.03); // Uncomment for random branching each time
   
   // Randomly choose diagonal direction
   diagonalDirection = random() > 0.5 ? 1 : 0;
}


function draw() {
   // Stop drawing after maxFrames to prevent slowdown
   if (frameCounter >= maxFrames) {
      noLoop();
      console.log("Rendering complete! Click to save.");
      return;
   }
   frameCounter++;
   
   noStroke();
   for (var i = 0; i < points.length; i++) {
      // Diagonal gradient using both x and y
      var diagonal;
      if (diagonalDirection === 0) {
         // Top-left to bottom-right
         diagonal = points[i].x + points[i].y;
      } else {
         // Top-right to bottom-left
         diagonal = (width - points[i].x) + points[i].y;
      }
      var maxDiagonal = width + height;
      var r = map(diagonal, 0, maxDiagonal, r1, r2);
      var g = map(diagonal, 0, maxDiagonal, g1, g2);
      var b = map(diagonal, 0, maxDiagonal, b1, b2);
      

      var alpha = 50;
      
      fill(r,g,b,alpha);
      var angle = map(noise(points[i].x*mult,points[i].y*mult),0,1,0,720);
      points[i].add(createVector(cos(angle),sin(angle)));
      
      ellipse(points[i].x,points[i].y,1);
      

   }
}


function mouseClicked() {
   saveCanvas("flowfield","png");
}
