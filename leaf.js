//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Leaf(begin)
{   
    // Vector where leaf begins
    this.begin = begin;
    this.red =  Math.random() * 50;
    this.green = Math.random() * 50 + 100;
    this.blue = Math.random() * 50;
    this.alpha = 200;
    this.angle = Math.random() * PI/2 + -PI/4;
    this.size = (Math.random() * 5 + 10);
    this.isLightened = false;
    this.hasFruit = false;
    this.isTurning = false;
    this.autumn = false;
    this.isFalling = false;
    this.fallen = false;
    this.xSway = Math.random() * 2;
    this.fallCounter = 0;

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

    this.jitter = function()
    {
        var jitterAmount = Math.random() * 2 - 1;
        this.begin.y = this.begin.y + jitterAmount;
        jitterAmount = Math.random() * 2 - 1;
        this.begin.x = this.begin.x + jitterAmount;
    }

    this.fadeForAutumn = function(color)
    {   
        console.log('color: ' + color);
        if (this.isTurning)
        {   
            // orange
            if (color == 0)
            {   
                this.red = 255;
                this.green = 140;
                this.blue = 0;
            }
            //red
            else if (color == 1)
            {   
                this.red = 255;
                this.green = 0;
                this.blue = 0;
            }
            // yellow
            else
            {   
                this.red = 255;
                this.green = 255;
                this.blue = 0;
            }
            this.autumn = true;
            this.isTurning = false;
        }      
    }

    this.fall = function(isBeat)
    {   
        if (this.isFalling && !this.fallen)
        {   
            if (this.fallCounter % 40 == 0)
            {
                this.xSway *= -1;
            }

            if (this.begin.y < height)
            {   
                this.begin.x += this.xSway;

                if (isBeat)
                {
                    this.begin.y += 8;
                    this.begin.x += this.xSway * 2;
                }
                else
                {  
                    this.begin.y += Math.random();
                }
            }
            else
            {
                this.fallen = true;
            }
            
            this.fallCounter++;
        }
    }

    this.fade = function()
        {
            if (this.fallen)
            {
                this.alpha = max(this.alpha - 1, 0);
            }
        }
}