function PastelShape(v1, v2, v3, c, a)
{
    this.vector1 = v1;
    this.vector2 = v2;
    this.vector3 = v3;
    this.color = c;
    this.angle = a;

    this.draw = function()
    {   
        push();
        translate(width / 2, height /2);
        // Stretches the shapes so they fill the whole screen when they rotate
        scale(1.5);
        if (sound.isPlaying())
        { 
            rotate(this.angle);
            if (this.angle > 0)
            {
                this.angle += 0.05;
            }
            else
            {
                this.angle -= 0.05;
            }
        }
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

    this.makePastelShapes = function(){

        var pastelShapes = [];

        var vector1 = createVector(0, 0);
        var vector2 = createVector(0, -height/1.5);
        var vector3 = createVector(width / 1.5, -height/1.5);
        var pastelShape = new PastelShape(vector1, vector2, vector3, 'blanchedalmond', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 1.5, height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'yellow', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 7, height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'aquamarine', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 1.5, height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'lightgrey', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 1.5, -height / 8);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'salmon', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 1.5, -height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'wheat', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(0, -height / 1.5);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'plum', 0.05);
        pastelShapes.push(pastelShape);

        vector2 = createVector(- width / 12, 0);
        vector3 = createVector(-width / 12, -width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'peachpuff', -0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 12, -width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'powderblue', -0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 12, 0);
        pastelShape= new PastelShape(vector1, vector2, vector3, 'rosybrown', -0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(width / 12, width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'mediumpurple',-0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 12, width / 12);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'mediumspringgreen', -0.05);
        pastelShapes.push(pastelShape);

        vector2 = vector3;
        vector3 = createVector(-width / 12, 0);
        pastelShape = new PastelShape(vector1, vector2, vector3, 'lightgoldenrodyellow', -0.05);
        pastelShapes.push(pastelShape);

        return pastelShapes;
    }

    this.pastelShapes = this.makePastelShapes();


    this.draw = function()
    {   
        console.log(this.pastelShapes);
        for (var i = 0; i < this.pastelShapes.length; i++)
        {   
            push();
            rotate(this.rotationAngle);
            this.pastelShapes[i].draw();
            pop();
        }
    }
}