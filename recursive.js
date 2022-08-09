// //Attribution: https://www.youtube.com/watch?v=fcdNSZ9IzJM

// class Tree{
//     constructor(
//         x_pos, 
//         startingLength,
//         startingAngle,
//         startingThickness,
//         color
//         )
//     {
//         this.x_pos = x_pos;
//         this.y_pos = height;
//         this.length = startingLength;
//         this.angle = startingAngle;
//         this.thickness = startingThickness;
//         this.color = color;
//     }
//     branch(length, thickness, angle)
//     {   
//         var self = this;
//         strokeWeight(thickness);
//         line(0, 0, 0, -length);
//         translate(0, -length);

//         /*NB: I tried to time the expansion of the branches
//         on the tree to the beat of the music, but this is
//         not possible with the recursive call stack -
//         due to the structure of the base-case being executed first
//         in terms of drawing the line of the smallest branch,
//         this means that the tree would be drawn backwards if
//         branch() were called only when a beat was detected.
//         Therefore, I had to adapt my original idea to make
//         the trees slowly change color with the 'seasons' when
//         a beat is detected. However, even 
//         creating one tree like this, recursively,
//         was much too slow for my browser and made it crash,
//         meaning that I couldn't test it - the tree would
//         take a long time to load and then everything
//         would freeze.
//         I could have tried to implement the first
//         effect I wanted using iteration, but I wanted
//         to have the opportunity to practice making differently-
//         shaped recursive fractal trees in p5.js.
//         Although this ended up being impossible to implement
//         given the restrictions of my browser, I thought
//         I should mention it because trying to do this
//         gave a very good conception of how recursion
//         and the call stack work. */
//         if (length > 4)
//         {
//             if (thickness > 1)
//             {
//                 thickness = thickness/2;
//             }
//             angle = angle / 1.1;
//             length = length * 2/3;

//             push();
//             rotate(angle);
//             self.branch(length, thickness, angle);
//             pop();

//             push();
//             rotate(-angle);
//             self.branch(length, thickness, angle);
//             pop();
            
//         } 
//         else
//         {   
           
//         }   
//     }
//     draw()
//     {
//         stroke(this.color);
//         strokeCap(PROJECT);
//         push();
//             translate(this.x_pos, this.y_pos);
//             this.branch(this.length, this.thickness, this.angle);
//         pop();
//     }
//     checkCompleted()
//     {
//         if (this.completed)
//         {
//             return true;
//         }
//         else
//         {
//             return false;
//         }
//     }
// }


// // Attribution: https://www.youtube.com/watch?v=0jjeOYMjmDU
// // A fractal tree has a recursive definition
// function Recursive()
// {   
//     colorMode(RGB);
//     this.name = 'recursive';
//     this.loopBackground = false;
//     this.angleOfRotation = PI/4;
//     this.trees = [];
//     this.beatDetector = new AdvancedBeatDetector();
//     this.trunkColors = [
//         //peru
//         color(205,133,63),
//         //saddlebrown
//         color(139,69,19),
//         //sienna
//         color(136,45,23),
//         //raw umber
//         color(130,102,68),
//         //coconut
//         color(150,90,62),
//         //tuscan brown
//         color(111,78,55),
//         //dark chestnut
//         color(152,105,96),
//         //pullman brown
//         color(100,65,23),
//         // caput mortuum
//         color(89,39,32),
//         //cafe noir
//         color(75,54,33),
//         //bistre
//         color(61,43,31),
//         // black bean
//         color(61,12,2),
//         // seal brown
//         color(50,20,20),
//         // dark sienna
//         color(60,20,20)
//     ]

//     this.leafColors = [
//         //greenyellow
//         color(173,255,47),
//         //chartreuse
//         color(127,255,0),
//         //limegreen
//         color(50,205,50),
//         //lawngreen
//         color(124,252,0),
//         //inchworm
//         color(178,236,93),
//         //limerick
//         color(157,194,9),
//         //vivid lime green
//         color(166,214,8),
//         //dark lemon line
//         color(139,190,27),
//         //olivine
//         color(154,185,115),
//         //android green
//         color(164,198,57),
//         //bitter lime
//         color(100,140,17),
//         //moss green
//         color(138,154,91),
//         //forest green
//         color(34,139,34),
//         //bud green
//         color(123,182,97),
//         //napier green
//         color(42,128,0),
//         //spring green
//         color(0,255,127)
//     ]

//     this.addTree = function()
//     {   
//         let randomLength = Math.floor(Math.random() + 3);
//         let random_X = Math.floor(Math.random() * (width - 200)) + 100;
//         let leafColor1 = this.leafColors[
//             Math.floor(Math.random() * this.trunkColors.length - 1) + 1
//         ];
//         let leafColor2 = this.leafColors[
//             Math.floor(Math.random() * this.trunkColors.length - 1) + 1
//         ];
//         let leafColor3 = this.leafColors[
//             Math.floor(Math.random() * this.trunkColors.length - 1) + 1
//         ];
//         let leafColor4 = this.leafColors[
//             Math.floor(Math.random() * this.trunkColors.length - 1) + 1
//         ];
//         let tree = new Tree(
//             width/2,
//             height/randomLength,
//             this.angleOfRotation,
//             50,
//             /*Attribution (creating random integers):
//             https://www.udacity.com/blog/2021/04/javascript-random-numbers.html */
//             this.trunkColors[Math.floor(Math.random() * this.trunkColors.length - 1) + 1],
//             this.beatDetector,
//             leafColor1,
//             leafColor2,
//             leafColor3,
//             leafColor4
//             );
//         this.trees.push(tree);
//     }

    
//     for (var i = 0; i < 1; i++)
//     {
//         this.addTree();
//     }

//     this.draw = function()
//     {   

//         for(var i = 0; i < this.trees.length; i++)
//         {
//             this.trees[i].draw();
//         }
        
//     }
// }