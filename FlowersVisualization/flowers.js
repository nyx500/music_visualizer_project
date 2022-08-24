// Draws and updates the positions of up to 16 for the main visualization
function Flowers()
{
    this.name = "flowers";

    // Has a GUI that lets user determine number of petals and flowers
    /* Some flowers might look best hidden, as for some sound tracks the
    highest frequencies do not have any amplitude, so including them
    might give the visualization an unbalanced appearance */
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

    // 16 colors for max 16 flowers
    var colors = ["crimson",  "darkorange", "tomato", "lightpink", "hotpink",  "mediumvioletred", 'indigo',
                    "royalblue", "steelblue", "midnightblue", "darkslateblue", "darkblue", "teal",
                    "lightseagreen", "mediumturquoise", "paleturquoise"
                ];

    var flowers = [];
    
    // Populates the flowers array with instances of the Flower object
    for (var i = 0; i < 16; i++)
    {   
        // x-value is basically a value along the width of the screen depending on number of flowers
        let x_pos = map(i, 0, 16, width * 0.05, width * 0.95);

        // Creates a new Flower object using the factory pattern
        let flower = new Flower(i, x_pos, colors[i]);

        // Adds the flower to the this.flowers array
        flowers.push(flower);
    }

    // For each draw-loop, draw flowers and update their positions
    this.draw = function()
    {   
        for (var i = 0; i < numFlowers; i++)
        {   
            // Draws the correct number of flowers
            flowers[i].draw();

            // Updates flowers' coords depending on global var numFlowers
            flowers[i].update_x_pos();
        }
    }     

}