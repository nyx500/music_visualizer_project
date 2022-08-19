// Attribution: inspired by this video https://www.youtube.com/watch?v=GD0aorbX3Wk
// However, I didn't look at the code on GitHub until I had coded this,
// I was solely influenced by the aesthetics and used different principles
// in the code to the ones used in the GitHub repository for this video -
// I only compared them later, and the visualizations are based on
// completely different logic and functionality

function PastelShape(v1, v2, v3, c, a, s)
{
    this.vector1 = v1;
    this.vector2 = v2;
    this.vector3 = v3;
    this.color = c;
    this.angle = a;
    this.scale = s;

    this.draw = function(ang)
    {   
        push();
        translate(width / 2, height /2);
        
        if (this.scale)
        {
            scale(1.8);
        }

        rotate(this.angle);
         
        stroke(0);
        strokeWeight(2);
        fill(this.color);
        

        beginShape();
        vertex(v1.x, v1.y);
        vertex(v2.x, v2.y);
        vertex(v3.x, v3.y);
        endShape();
        
        pop();
    }
}

function PastelRoom() {
    this.name = 'pastelroom';
    this.angle = 0.01;
    this.beatDetector = new BassBeatDetector();
    this.flashColors = ['mediumpurple', 'mediumturquoise', 'mistyrose',
                        'paleturquoise', 'rosybrown', 'salmon', 'wheat',
                        'papayawhip', 'peachpuff', 'lightgreen', 'lemonchiffon',
                        'lavender', 'gray', 'coral', 'orange', 'thistle',
                        'yellow', 'lightblue', 'gold', 'lightgrey', 'lightpurple'
                         ]

    this.makePastelShapes = function(){

        var pastelShapes = [];

        var vector1 = createVector(0, 0);
        var vector2 = createVector(0, -height/1.5);
        var vector3 = createVector(width / 1.5, -height/1.5);
        var pastelShape = new PastelShape(vector1, vector2, vector3, 'blanchedalmond', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 1.5, height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'yellow', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 7, height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'aquamarine', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 1.5, height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'lightgrey', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 1.5, -height / 8);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'salmon', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 1.5, -height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'lightgreen', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(0, -height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'plum', 0.01, true);
        pastelShapes.push(pastelShape);

        vector2 = createVector(- width / 12, 0);
        vector3 = createVector(-width / 12, -width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'peachpuff', -0.01, false);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 12, -width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'powderblue', -0.01, false);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 12, 0);
        pastelShape= new PastelShape(vector1, vector2, vector3, 'rosybrown', -0.01, false);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 12, width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'mediumpurple',-0.01, false);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 12, width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'mediumspringgreen', -0.01, false);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 12, 0);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'lightgoldenrodyellow', -0.01);
        pastelShapes.push(pastelShape);

        return pastelShapes;
    }

    this.pastelShapes = this.makePastelShapes();


    this.draw = function()
    {   
        if (this.beatDetector.detectBeat())
        {
            for (var i = 0; i < this.pastelShapes.length; i++)
            {   
                if (this.pastelShapes[i].angle > 0)
                {
                    this.pastelShapes[i].angle += 1;
                }
                else
                {
                    this.pastelShapes[i].angle -= 1;
                }

                /* change the color of the shape when a beat is detected
                by choosing a random color from the this.colors array*/
                let randomColorIndex = Math.floor(Math.random() * this.flashColors.length);
                let randomColor = this.flashColors[randomColorIndex];
                this.pastelShapes[i].color = randomColor;
            }
        }
        else
        {
            for (var i = 0; i < this.pastelShapes.length; i++)
            {   
                if (this.pastelShapes[i].angle > 0)
                {
                    this.pastelShapes[i].angle += 0.01;
                }
                else
                {
                    this.pastelShapes[i].angle -= 0.01;
                }
            }
        }
        
        for (var i = 0; i < this.pastelShapes.length; i++)
        { 
            this.pastelShapes[i].draw();
        }
        
        }
 }