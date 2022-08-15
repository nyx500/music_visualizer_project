// Attribution 1: https://mathworld.wolfram.com/HeartCurve.html - trig equations for cardiods
/* Attribution 2: https://www.youtube.com/watch?v=oUBAi9xQ2X4 -
"Coding Challenge #134.1: Heart Curve" */

// Ctor for small heart which will be the building block of the hearts animation
function Heart(x, y, c, bin, strokeOrFill) {
    colorMode(RGB, 255);
    // How much to translate by in the x- and y- directions
    var x_pos = x;
    var y_pos = y;
    this.color = c;
    
    this.strokeOrFill = strokeOrFill;

    this.radius;

    // 2types of hearts - filled heart (rows) and outline-only heart (center)
    if (this.strokeOrFill == 'fill')
    {
        this.radius = 3.6;
    }
    else
    {
        this.radius = 10;
    }
    // for smaller hearts in rows --> the corresponding frequency bin that the
    // radius is mapped to 
    this.bin = bin;


    this.draw = function(){
        
        // 2 different drawing modes for filled types and stroke types
        if (this.strokeOrFill == 'fill')
        {
            noStroke();
            fill(this.color);
        }
        else
        {
            noFill();
            stroke(this.color);
            strokeWeight(20);
            strokeCap(ROUND);
        }
        
        // translates the heart to the correct position on the screen
        push();
        translate(x_pos, y_pos);
        beginShape();
        for (var angle = 0; angle < TWO_PI; angle += 0.01)
        {   
            // formula for a cardioid shape from https://mathworld.wolfram.com/HeartCurve.html
            var x_coord = this.radius * 16 * Math.pow(sin(angle), 3);
            var y_coord = -this.radius * (13 * cos(angle) - 5 * cos (2 * angle) - 2 
            * cos(3 * angle)
            - cos(4 * angle));
            vertex(x_coord, y_coord);
        }
        endShape();
        pop();
    }
}


function Hearts() {
    this.name = 'hearts';
    // rows and columns of small hearts will be stored in this 2d array
    this.heartsMatrix = [];
    // one big heart in center of screen which will have size mapped to amplitude
    this.centralHeart = new Heart(width / 2, height / 2, 'white', null, 'stroke');
    this.bigAmplitude = new p5.Amplitude();

    // how many hearts per row
    this.rowDimension = 6;
    // calculates borders of canvas around hearts
    this.offsetHorizontal = width / this.rowDimension;
    // calculates horizontal span where hearts will be drawn
    this.heartsWidth = width - this.offsetHorizontal;
    // calculates how much space necessary between each heart in the x-direction
    this.rowSpace = this.heartsWidth / (this.rowDimension - 1);

    // how many hearts per column
    this.columnDimension = 5;
    // same as for horizontal (above) calculations but for y-direction
    this.offsetVertical = height/this.columnDimension;
    this.heartsHeight = height - this.offsetVertical;
    this.columnSpace = this.heartsHeight / (this.columnDimension - 1);

    // populates the heart matrix property
    for (var i = 0; i < this.columnDimension; i++)
    {   
        // a row is made for every ith iteration
        var row = [];
        var rowColor;
        // going to store heart color
        var c;
        // going to store heart frequency bin
        var bin;
        colorMode(RGB, 255);

        // first row --> red starting heart
        if (i % 5 == 0)
        {   
            rowColor = red;
            c = color(255, 0, 0);
            bin = 'bass';
        }
        // second row --> yellow starting heart
        else if (i % 5 == 1)
        {   
            rowColor = 'yellow';
            c = color(255, 255, 0);
            bin = 'lowMid';
        }
        // third row --> green starting heart
        else if (i % 5 == 2)
        {   
            rowColor = 'green';
            c = color(0, 255, 0);
            bin = 'mid';
        }
        // fourth row --> blue starting heart
        else if (i % 5 == 3)
        {   
            rowColor = 'blue';
            c = color(0, 0, 255);
            bin = 'highMid';
        }
        // fourth row --> purple starting heart
        else if (i % 5 == 4)
        {   
            rowColor = 'purple';
            c = color(150, 0, 150);
            bin = 'treble';
        }

        // makes the column-hearts for each row of hearts with the j'th iteration
        for (var j = 0; j < this.rowDimension; j++)
        {
    
            let x_position = (this.offsetHorizontal / 2) + this.rowSpace * j;

            let y_position = (this.offsetVertical / 2) + this.columnSpace * i;

            // change hearts in row from red to orange for first row
            if (rowColor == 'red')
            {
                c = color(red(c) - (j * 3), green(c) + (j * 20), blue(c));
            }
            // change hearts in row  from yellow to green for second row
            else if (rowColor == 'yellow')
            {
                c = color(red(c) - (j * 20), green(c), blue(c));
            }
            // change hearts in row from green to blue for third row
            else if (rowColor == 'green')
            {
                c = color(red(c), green(c) - (j * 5), blue(c) + (j * 20))
            }
            // change hearts in row  from blue to violet for fourth row
            else if (rowColor == 'blue')
            {
                c = color(red(c) + (j * 10), green(c), blue(c) - (j * 5));
            }
            // change hearts in row  from violet to pink for fourth row
            else
            {
                c = color(red (c) + (j * 2), green(c) + (j * 5), blue(c) - (j* 5));
            }

            c.setAlpha(50);

            var heart = new Heart(
                x_position,
                y_position,
                c,
                bin,
                'fill'
            );
            row.push(heart);
        }
        this.heartsMatrix.push(row);
    }

    this.getBeat = function(bin){
        fourier.analyze();
        var amplitude = fourier.getEnergy(bin);
        return amplitude;
    }

    this.draw = function(){
        for (var i = 0; i < this.heartsMatrix.length; i++)
        {   
            for (var j = 0; j < this.heartsMatrix[i].length; j++)
            {   
                var amplitude = this.getBeat(this.heartsMatrix[i][j].bin);
                var radiusMapped = map(amplitude, 150, 255, 3.6, 5);

                var alpha = map(amplitude, 0, 255, 50, 255);
                this.heartsMatrix[i][j].color.setAlpha(alpha);
                this.heartsMatrix[i][j].radius = radiusMapped;
                this.heartsMatrix[i][j].draw();
            }
        }
        var bigAmplitude = this.bigAmplitude.getLevel();
        if (bigAmplitude < 0.25)
        {
            
            console.log(bigAmplitude);
            this.centralHeart.radius = map(bigAmplitude, 0, 0.4, 10, 15);
            this.centralHeart.color = 'white';
            this.centralHeart.strokeOrFill = 'stroke';
        }
        else if (bigAmplitude >= 0.25 && bigAmplitude < 0.3)
        {   
            this.centralHeart.radius = 20;
        }
        else
        {
            this.centralHeart.radius = 25;
        }
        this.centralHeart.draw();
    }
}