//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Snowball(begin)
{   
    // Vector where snowball begins
    this.begin = begin;
    this.red =  255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 200;
    this.size = Math.random() * 10 + 15;
    this.fallen = false;
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

    this.fall = function(isBeat)
    {   
        if (!this.fallen)
        {   

            if (isBeat)
            {   
                this.begin.x += 10;
                this.size += 0.3;

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
        

        if (this.begin.y > window.height)
        {   
            this.fallen = true;
        }

        this.fallCounter++;
    }
}