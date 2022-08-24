//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM


// Fruit object for tree
function Fruit(pos)
{  
    this.pos = pos;
    // Color variables
    this.red = 150;
    this.green = 200;
    this.blue = 0;
    this.alpha = 255;
    // Indicates if fruit has change color
    this.ripe = false;
    // Generates a floating point number between 5 and 8
    this.size = Math.random() * 3 + 5;

    // If true, then fruit can fall
    this.isFalling = false;
    // If true, fruit is at bottom of the screen
    this.fallen = false;

    this.draw = function()
    {   
        fill(this.red, this.green, this.blue, this.alpha);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    // Increase red color component in fruit and decrease green when ripening
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
            // Fruit is ready to fall once ripened
            this.ripe = true;
        }
    }

    // Fruits falls if there is a beat (argument takes the output of beat detector)
    this.fall = function(isBeat)
    {   
        if (this.isFalling = true)
        {
            if (this.pos.y < height)
            {     
                this.pos.x += Math.random() * 4 - 2;
                if (isBeat)
                {   
                    // Increase y-position by a value between 5 and 10
                    this.pos.y += Math.random() * 5 + 5;
                }
                else
                {  
                    // Increase y-position by a value between 0 and 1
                    this.pos.y += Math.random();
                }
            }
            else
            {
                this.fallen = true;
            }
        } 
    }

    // Reduces the alpha (called once fruit is fallen) to make the fruit gradually disappear
    this.fade = function()
    {
        if (this.fallen)
        {
            this.alpha = max(this.alpha - 1, 0);
        }
    }
}