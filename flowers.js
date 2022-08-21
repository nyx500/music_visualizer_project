
// Can adjust number of flowers in Flowers vis
var numFlowers;
var numFlowersMin;
var numFlowersMax;
var numFlowersStep;

// adjust petal number
var numberOfPetals;
var numberOfPetalsMin;
var numberOfPetalsMax;
var numberOfPetalsStep;

numFlowers = 8;
numFlowersMin = 1;
numFlowersMax = 16;
numFlowersStep = 1;

numberOfPetals = 8;
numberOfPetalsMin = 4;
numberOfPetalsMax = 12;
numberOfPetalsStep = 2;

function Flowers()
{
    this.name = "flowers";
    this.gui = createGui('Flowers Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals(
        'numFlowers',
        'numberOfPetals');

    
    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    // linAverages will be an array that stores 16 frequency bands after calling fourier.analyze()
    var linAverages;
    // angle of each petal around the center of the flower
    this.petalIncrement;
    angleMode(RADIANS);
    // will store the center point of the flower
    var pivot;
    // 16 colors for max 16 flowers
    this.colors = ["crimson",  "darkorange", "tomato", "lightpink", "hotpink",  "mediumvioletred", 'indigo',
                    "royalblue", "steelblue", "midnightblue", "darkslateblue", "darkblue", "teal",
                    "lightseagreen", "mediumturquoise", "paleturquoise"
                ];

    this.draw = function()
    {   
        // amount of rotation for each petal around the center of the flower
        this.petalIncrement = (2 * PI) / numberOfPetals;
        fourier.analyze();
        // gets 16 blocks of frequencies each with an amplitude
        linAverages = fourier.linAverages();
        strokeWeight(7);

        let arr_index = 0;

        // distance between each flower, depends on number of flowers
        let pos = width / (numFlowers + 1);

        // iterates over each position across the width where flower is to be drawn
        for (var i = pos; i < width * 0.95; i += pos)
        {   
            // draws the stalk of each flower in green
            stroke(34,139,34);
            noFill();
            let midPlot = ((i + (i + 1)) / 2);
            line(midPlot, height * 0.6 - linAverages[arr_index], midPlot, height);

            noStroke();

            // determines the center of flower x- and y- coordinates
            pivot = {
                x: midPlot,
                y: height * 0.6 - linAverages[arr_index] - 15
            }

            // draws the petals for each flower
            push();
            translate(pivot.x, pivot.y);
            // loop for each petal around each flower
            for (var j = 0; j < numberOfPetals; j++)
            {   
                fill(this.colors[arr_index]);
                push();
                rotate(this.petalIncrement * j);
                ellipse(0, 0, 30 + linAverages[arr_index]/2, 90 + linAverages[arr_index] + (arr_index * 3));
                pop();
            }
            pop();

            
            // draws leaves on flowers' stalks
            var leaf_pivots = [[midPlot + 18, height * 0.9], [midPlot - 18, height * 0.75]];
            fill(34,139,34);
            for (var j = 0; j < leaf_pivots.length; j++)
            {    
                push();
                translate(leaf_pivots[j][0], leaf_pivots[j][1]);
                if (j % 2 == 0)
                {
                    rotate(PI / 4);
                    ellipse(0, 0, 20, 40);
                }
                else
                {
                    rotate((3 *PI)/4);
                    ellipse(0, 0, 20, 50);
                }
                pop();
            }
            
            // draws centers of the flowers in yellow
            fill(255, 255, 0);
            ellipse(pivot.x, pivot.y, 20 + linAverages[arr_index] / 2);

            // draws text for each flower's frequency band
            noFill();
            stroke('darkgreen');
            strokeWeight(1);
            text(`Band ${arr_index + 1}`, pivot.x - 60, height - 40, 50, 50);

            // incrementation for array of average amplitudes for frequency bands & colour array
            arr_index++;

        }
    }
        

}