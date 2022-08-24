// Factory pattern for a single flower animation

function Flower(index, x_pos, color)
    
{   
    // Index of flower corresponding to a value in linAverages array
    var index = index;
    // X-position of the flower
    var x_pos = x_pos;
    // Petal color
    var color = color;
    
    // Positions of leaves' stalks
    var leaf_pivots = [
        createVector(x_pos + 18, height * 0.9),
        createVector(x_pos - 18, height * 0.75)
    ];

    // DRAWING FUNCTIONS
    // Draws the green stem of the flowers
    var drawStem = function(vol)
    {
        strokeWeight(2);
        stroke(34,139,34);
        noFill();
        line(x_pos, height * 0.6 - vol, x_pos, height);
    }
    // Draws petals and center of the flower
    var drawHeadOfFlower = function(vol, center)
    {
        noStroke();

        // Position of center of flower head
        this.pivot = createVector(x_pos, height * 0.6 - vol - 15);

        // Draws the petals for each flower
        push();
        translate(center.x, center.y);
        // Loop for each petal around each flower
        // Increment angle by 2PI / petal number
        for (var i = 0; i < numberOfPetals; i++)
        {   
            // Amount of rotation for each petal around the center of the flower
            let petalIncrement = (2 * PI) / numberOfPetals;
            fill(color);
            push();
            rotate(petalIncrement * i);
            // Petal size depends on the volume for the freqband/the linAverages value
            ellipse(
                0, 0,
                30 + vol / 2,
                90 + vol + (index * 3)
            );
            pop();
        }
        pop();

        // Draws center of the flowers in yellow
        fill(255, 255, 0);
        ellipse(center.x, center.y, 20 + vol / 2);
    }
    // Draws a flower's leaves
    var drawLeaves = function()
    {   
        noStroke();
        fill(34,120,34);
        for (var i = 0; i < leaf_pivots.length; i++)
        {    
            push();
            translate(leaf_pivots[i].x, leaf_pivots[i].y);

            if (i % 2 == 0)
            {
                rotate(PI / 4);
                ellipse(0, 0, 20, 40);
            }
            else
            {
                rotate((3 * PI)/4);
                ellipse(0, 0, 20, 50);
            }
            pop();
        }
    }
    // Draws text describing frequency band
    var drawText = function(center)
    {
        noFill();
        stroke('white');
        strokeWeight(2);
        text(`Band ${index + 1}`, center.x - 60, height - 40, 50, 50);
    }


    // Draws the entire flower
    this.draw = function()
    {   
        // Gets the corresponding linAverages value
        fourier.analyze();
        var linAverages = fourier.linAverages();
        // Stores the corresponding linAverages value
        let volume = linAverages[index];

        // Center of the flower's head
        let centralPivot = createVector(x_pos, height * 0.6 - volume - 15);

        // Draws the stem
        drawStem(volume);

        // Draws petals and center
        drawHeadOfFlower(volume, centralPivot);

        // Draws leaves
        drawLeaves();

        // Draws text displaying num of freq band
        drawText(centralPivot);
    }


    // Updates the x-positions of the flowers if the global variable numFlowers increases or decreases
    this.update_x_pos = function()
    {   
        // Updates x-position depending on value of global numFlowers
        x_pos = map(index, 0, numFlowers, width * 0.1, width * 0.95);

        // Updates the leaf positions to the new x-coordinate
        leaf_pivots = [
            createVector(x_pos + 18, height * 0.9),
            createVector(x_pos - 18, height * 0.75)
        ];
    }
 
}