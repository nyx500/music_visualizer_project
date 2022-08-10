//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Fruit(pos)
{  
    this.pos = pos;
    this.red = 150;
    this.green = 200;
    this.blue = 0;
    this.alpha = 255;
    this.ripe = false;
    // Number between 5 and 8
    this.size = Math.random() * 3 + 5;
    this.isFalling = false;
    this.fallen = false;

    this.draw = function()
    {   
        fill(this.red, this.green, this.blue, this.alpha);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    // increase red color component in fruit and decrease green
    this.ripen = function()
    {   
        if (this.red < 250)
        {  
            this.red += 2;
            this.green = max(this.green - 5, 0);
            this.blue += 0.5;
        }
        else
        {   
            // fruit is ready to fall
            this.ripe = true;
            console.log(this.red, this.green, this.blue);
        }
    }

    this.fall = function(isBeat)
    {   
        if (this.isFalling = true)
        {
            if (this.pos.y < height)
            {     
                this.pos.x += Math.random() * 2 - 1;
                if (isBeat)
                {
                    this.pos.y += Math.random() * 3 + 2;
                }
                else
                {  
                    this.pos.y += Math.random();
                }
            }
            else
            {
                this.fallen = true;
            }
        } 
    }

    this.fadeOldFruit = function()
    {
        if (this.fallen)
        {
            this.alpha = max(this.alpha - 1, 0);
        }
    }
}