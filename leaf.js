//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Leaf(begin)
{   
    // Vector where leaf begins
    this.begin = begin;
    this.red =  Math.random() * 50;
    this.green = Math.random() * 50 + 100;
    this.blue = Math.random() * 50;
    this.angle = Math.random() * PI/2 + -PI/4;
    this.size = (Math.random() * 5 + 10);
    this.isLightened = false;
    this.hasFruit = false;

    this.draw = function()
    {   
        fill(this.red, this.green, this.blue);
        noStroke();
        // Translates the coordinates from the origin to the middle of the leaf
        // so that the leaf can be rotated around itself
        push();
        translate(this.begin.x, this.begin.y);
        rotate(this.angle);
        ellipse(0, 0, this.size, this.size * 2.2);
        pop();
    }

    this.addFruit = function()
    {   
        let varX = Math.floor(Math.round * 2 + -1);
        let varY = Math.floor(Math.round * 3 + -1.5);
        let fruitPos = createVector(this.begin.x, this.begin.y);
        this.hasFruit = true;
        var fruit = new Fruit(fruitPos);
        return fruit;
    }
}