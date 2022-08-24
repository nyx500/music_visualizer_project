//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Snowball(begin)
{   
    // Vector where snowball begins
    this.begin = begin;
    // Color variables
    this.red =  255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 200;
    // Random size between 15 and 25
    this.size = Math.random() * 10 + 15;
    // Records if snowball has fallen
    this.fallen = false;
    // Records how far down the snowball is once it has began to fall
    this.fallCounter = 0;

    this.draw = function()
    {   
        fill(this.red, this.green, this.blue, this.alpha);
        noStroke();
        push();
        translate(this.begin.x, this.begin.y);
        ellipse(0, 0, this.size);
        pop();
    }

    // Makes snowball fall in diagonal way (like wind)
    this.fall = function(isBeat)
    {   
        if (!this.fallen)
        {   

            if (isBeat)
            {   
                // Shift right by 10 pixels
                this.begin.x += 10;

                // Flash between blue and white
                if (this.red == 0)
                {
                    this.red = 167;
                }
                else
                {
                    this.red = 0;
                }
                if (this.green == 0)
                {
                    this.green = 199;
                }
                else
                {
                    this.green = 0;
                }
            }
            else
            {
                this.red = 255;
                this.green = 255;
            }
            this.begin.y += 5;
        }
        
        // Once snowball has reached the height position, change this.fallen to true
        if (this.begin.y > window.height)
        {   
            this.fallen = true;
        }

        this.fallCounter++;
    }
}