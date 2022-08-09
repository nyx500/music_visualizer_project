//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Fruit(pos)
{  
    this.pos = pos;
    this.red = 150;
    this.green = 200;
    this.blue = 0;
    this.draw = function()
    {   
        fill(this.red, this.green, this.blue);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 8, 8);
    }
}