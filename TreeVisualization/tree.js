/*Attribution: https://www.youtube.com/watch?v=0jjeOYMjmDU */
function Tree()
{
    this.name='tree';
    this.gui = createGui('Tree Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals(
        'treeBeatThreshold'
    );
      
    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }
    

    /* Set higher constant/sensitivity for beat detector than other visualizations
     because I do not want the tree to change color TOO quickly*/
    this.beatDetector = new AdvancedBeatDetector();
    // Length of the tree's trunk
    this.beginLength = height / 3.5;
    // Records if the tree is fully grown (--> can now stop adding new branches)
    this.isCompleted = false;
    /* Notes the season/stage of tree building. 0 = grow tree. 1 = lighten leaves (spring
        to summer)
    */
    this.seasonPhase = 0;

    /* This variable will be used to calculate which branches spawn new branches with every iteration
    */
    this.powerOfTwoBranchCount = 0;

    /* Begin the tree by drawing the trunk from bottomTrunk to topTrunk */
    this.bottomTrunk = createVector(width / 2, height);
    this.topTrunk = createVector(width / 2, height - this.beginLength);

    /* Creates the starting Branch/Trunk by calling the Branch constructor */
    this.root = new Branch(this.bottomTrunk, this.topTrunk, 50);
    // Every branch must spawn 2 other branches attached to it
    this.branches = [this.root];
    // Array storing leaves at the ends of the branches in the tree
    this.leaves = [];
    // Array recording number of leaves lightened for Summer
    this.howManyLeavesLightened = 0;
    // Array of fruit objects
    this.fruits = [];
    // Array recording number of fruits in existence
    this.fruitCount = 0;
    // Array recording number of ripened fruits
    this.fruitsRipened = 0;
    // Array recording number of fallen fruits (summer)
    this.fruitsFallen = 0;
    // Array counting number of leaves
    this.maxLeafCount = 0;
    // Array of snowball objects
    this.snowballs = [];

    /* Checks if an object returned by the Branch constructor's
    addBranch method is a leaf OR another branch, 
    and pushes it to the corresponding array*/
    this.appendBranchOrLeaf = function(newObject)
    {   
        // Attribution: https://flexiple.com/javascript/instanceof-javascript/
        // Checks if the new object is a branch or a leaf
        if (newObject instanceof Branch)
        {
            this.branches.push(newObject)
        }
        else
        {
            this.leaves.push(newObject);
        }   
    }

    /*Adds two symmetrical branches to a previous branch in the tree */
    this.addTwoLeavesOrBranches = function(previousBranch)
    {   /*Thickness of branch is reduced by factor 0.6
         every time a branch grows 2 more branches,
          until a thickness of 1 is reached */
        let thickness = previousBranch.thickness;
        if (previousBranch.thickness > 1)      
        {
            thickness = previousBranch.thickness * 0.6;
        }
        /* Creates two branches symmetrical to each other, every branch at
        approximately 45 degrees --> the random function from Math library
        has been used to include some variation of 10 degrees each side from
        45 degrees, so that the tree looks more "natural" in shape*/
        let angle = Math.random() * PI/9 + (PI/4 - PI/18);
        /* Creates 2 new branches or leaves using this.appendBranchOrLeaf
        to check type of object returned by branch's addBranch method - see above.
        */
        let newBranchOrLeaf = previousBranch.addBranch(angle, thickness);
        this.appendBranchOrLeaf(newBranchOrLeaf);
        newBranchOrLeaf = previousBranch.addBranch(-angle, thickness);
        this.appendBranchOrLeaf(newBranchOrLeaf);
    }

    // Creates the tree
    // Adds branches and then leaves to a tree from the trunk upwards
    this.growTree = function()
    {
        // Array storing branches with no children --> must be appended
        var childlessBranches = [];
        /* Childless branches' indices are found
        by iterating from the back of the Branches array -
        2^n backwards into the branches array for each iteration through which the tree grew,
        n, of the current process in the beat n*/
        for (
            var i = this.branches.length - 1;
            i > this.branches.length - 1 - Math.pow(2, this.powerOfTwoBranchCount);
            i--
        )
        {   
            /* If power of 2 gets bigger than the number of branches, stop the 
            branch-adding process, otherwise it would be infinite and the
            browser will crash!*/
            if (Math.pow(2, this.powerOfTwoBranchCount) > this.branches.length)
            {   
                /* All the branches have leaves now --> the tree has grown
                fully and can be marked completed, signal to change season
                to 1 (spring to summer) */
                this.isCompleted = true;
                this.maxLeafCount++;
                this.seasonPhase = 1;
            }
            else
            {  
                /*If some branches still need children, add the *index* of
                this branch to the childlessBranches array */
                if (!this.branches[i].hasChild)
                { 
                    childlessBranches.push(i);
                }
            }
        }

        /* For each branch which has an index in the childlessBranches
        array, add two more branches or leaves*/
        for (var i = 0; i < childlessBranches.length; i++)
        {   
            var branchIndex = childlessBranches[i];
            this.addTwoLeavesOrBranches(this.branches[branchIndex]);
        }
        /* Number of childless branches will increase exponentially
         by powers of 2 every time
        */
          if (!this.isCompleted)
          {
            this.powerOfTwoBranchCount++;
          }
    }

    // After winter, add just leaves to all the branches again
    this.regrowLeaves = function()
    {
        for (var i = 0; i < 40; i++)
        {   
            // Random branch to put leaves on (don't want it to go just from
            // left to right as this doesn't look organic)
            let random = this.returnRandomArrayIndex(this.branches);
            // If branch is one at the end (mustGrowLeaf property) and 
            // does not have a leaf (hasLeaf property), then add leaves to the branch
            if (this.branches[random].mustGrowLeaf && !this.branches[random].hasLeaf)
            {
                this.addTwoLeavesOrBranches(this.branches[random]);
                this.branches[random].hasLeaf = true;
            }
        }
    }

    // Changes the color of a leaf from dark green to light green in Springtime
    this.colorLeaf = function(leaf)
    {
        leaf.green += 50;
        leaf.red += 20;
        leaf.blue += 20;
        // Stores the property of whether the leaf has been lightened
        leaf.isLightened = true;
    }

    // Returns an index for a random item in an array (e.g. to choose a leaf)
    this.returnRandomArrayIndex = function(arr)
    {
        var index = Math.floor((Math.random() * arr.length));
        return index;
    }

    // Lightens leaves randomly in the tree 
    this.lightenLeaves = function()
    {    
        // Ten leaves at a time
        for (var i = 0; i < 10; i++)
        {   
            // Chooses a random leaf using random array index generator
            var randomLeafIndex = this.returnRandomArrayIndex(this.leaves);
            var randomLeaf = this.leaves[randomLeafIndex];
            // Lightens the leaf if not lightened already
            if (!randomLeaf.isLightened)
            {
                this.colorLeaf(randomLeaf);
                this.howManyLeavesLightened++;
            }
            // If leaf was already lightened, try again, until 10 leaves have been lightened
            else
            {
                i -= 1;
            }
        }    
    }

    // Adds fruits in random locations (based on leaves) in the tree)
    this.addFruits = function()
    {   
        // Same process as for lightenLeaves(), but 5 fruits at a time
        for (var i = 0; i < 5; i++)
        {   
            var randomLeafIndex = this.returnRandomArrayIndex(this.leaves);
            var randomLeaf = this.leaves[randomLeafIndex];
            if (!randomLeaf.hasFruit)
            {
                this.fruits.push(randomLeaf.addFruit());
                this.fruitCount++;
            }
            else
            {
                i -= 1;
            }
        }
    }

    // Adds a certain number of snowballs to the array
    // Want to number to be changeable, so snowballs peter out gradually
    this.addSnowballs = function(num)
    {   
        for (var i = 0; i < num; i++)
        {   
            let x_coord = Math.random() * (width + 200) - 200;
            let y_coord = (Math.random() * height) - height;
            let snowballVector = createVector(x_coord, y_coord);
            let snowball = new Snowball(snowballVector);
            this.snowballs.push(snowball);
        }
    }

    //  Ripens fruits in the whole fruit array by gradually changing color every time it's called
    this.ripenFruits = function()
    {   
        for (var i = 0; i < this.fruits.length; i++)
        {   
            if (!this.fruits[i].ripe)
            {  
                this.fruits[i].ripen();
            }
            else
            {   
                // If the fruit is ripe, increment the ripened count
                this.fruitsRipened++;
            }
        }
    }

    // Fruits fall off the tree in autumn
    this.dropFruits = function()
    {   
        let randomIndex;
        for (var i = 0; i < 1; i++)
        {
            randomIndex = this.returnRandomArrayIndex(this.fruits);
            this.fruits[randomIndex].isFalling = true;
        }
    }

    // Counts number of fruits that have fallen
    this.countFallenFruits = function()
    {
        let fallen = 0;

        for (var i = 0; i < this.fruits.length; i++)
        {
            if (this.fruits[i].fallen)
            {
                fallen++;
            }
        }
        return fallen;
    }

    // Changes 'isTurning' property on each leaf up to 20 leaves
    // This tells the Leaf object to begin changing color
    this.autumnLeaves = function()
    {
        var randomIndex;
        for (var i = 0; i < 20; i++)
        {
            randomIndex = this.returnRandomArrayIndex(this.leaves);
            this.leaves[randomIndex].isTurning = true;
        }
    }

    // Counts the number of leaves that have changed colour for autumn
    // Returns the number of how many have changed colour
    this.countAutumnLeaves = function()
    {
        var turned = 0;
        for (var i = 0; i < this.leaves.length; i++)
        {
            if (this.leaves[i].autumn)
            {
                turned++;
            }
        }
        return turned;
    }

    // Tells Leaf object to change property isFalling to true
    // Therefore, the Leaf can begin to fall when .fall() method on the Leaf is called in draw()
    this.dropLeaves = function(howManyLeaves)
    {   
        var randomIndex;
        for (var i = 0; i < howManyLeaves; i++)
        {
            randomIndex = this.returnRandomArrayIndex(this.leaves);
            this.leaves[randomIndex].isFalling = true;
        }
    }

    // Counts how many of the leaves have true for their 'fallen' property
    // Means that they are lying on the ground and can start to fade
    this.countFallenLeaves = function()
    {
        var fallen = 0;

        for (var i = 0; i < this.leaves.length; i++)
        {
            if (this.leaves[i].fallen)
            {
                fallen++;
            }
        }
        return fallen;
    }

    
    // Draws the basis of the tree: the branches
    this.drawBranches = function()
    {
        for (var i = 0; i < this.branches.length; i++)
        {   
            this.branches[i].draw();
        }
    }

    
    // Iterates backwards through the leaves array, draws leaves, and changes color if necessary
    // Fades and deletes leaves if they have fallen
    this.drawAndUpdateLeaves = function()
    {
        for (var i = this.leaves.length - 1; i >= 0; i--)
        {   
            this.leaves[i].draw();

            // If leaf has not change color yet and it's autumn, then change its color
            if (!this.leaves[i].autumn && this.leaves[i].isTurning)
            {   
                // Returns a random integer from 0 to 2
                // 0: red color, 1: orange color, 2: yellow color in constructor
                var randomColorValue = Math.floor(Math.random() * 3);

                this.leaves[i].fadeForAutumn(randomColorValue);
            }

            
            this.leaves[i].fade();

            // If leaf is faded completely, remove it from the leaves array
            if (this.leaves[i].alpha == 0)
            {
                this.leaves.splice(i, 1);
            }
        }
    }

    
    // Iterates over fruits array backwards
    // Draws the fruits
    // If a fruit is fallen (conditional in Fruit object!), then use the fade() method on it
    this.drawAndUpdateFruits = function()
    {
        for (var i = this.fruits.length - 1; i >= 0 ; i--)
        {   
            this.fruits[i].draw();
            this.fruits[i].fade();

            // If a fruit is faded and has disappeared, remove it from the this.fruits array
            if (this.fruits[i].alpha == 0)
            {
                this.fruits.splice(i, 1);
            }
        }
    }

    // Draws, shifts and deletes snowballs (if fallen)
    this.drawAndUpdateSnowballs = function()
    { 
        // Draws snowballs for Winter
        for (var i = this.snowballs.length - 1; i >= 0; i--)
        {   
            this.snowballs[i].draw();
            
            // Snowballs move only when beat is detected to create a rhythm
            this.snowballs[i].fall(this.beatDetector.detectBeat(treeBeatThreshold));
            
            // If snowball is fallen, then delete it from the snowballs array
            if (this.snowballs[i].fallen)
            {
                this.snowballs.splice(i, 1);
            }
        }
    }


    this.draw = function()
    {   
	    controls.draw();
        colorMode(RGB);
        strokeCap(PROJECT);

        // Drawing different components of the tree and weather
        this.drawBranches();
        this.drawAndUpdateLeaves();
        this.drawAndUpdateFruits();
        this.drawAndUpdateSnowballs();

        // Complete functionality for when beat is detected
        if (this.beatDetector.detectBeat(treeBeatThreshold) && frameCount > 120)
        {   
            // If seasonPhase is 4, let fruits all fall from tree
            for (var i = 0; i < this.fruits.length; i++)
            {   
                if (this.seasonPhase == 4)
                {  
                    this.fruits[i].fall(true);
                }
            }

            // If a beat is detected, make the leaves shake!
            for (var i = 0; i < this.leaves.length; i++)
            {
                this.leaves[i].jitter();
                this.leaves[i].fall(true);
            }


            // BEGINNING OF SEASONS:
            // Expand the branches and leaves on tree
            if (this.seasonPhase == 0)
            {
                this.growTree();
            }
            // SPRING: Lighten leaves on the tree
            else if (this.seasonPhase == 1)
            {       
                if (this.howManyLeavesLightened > 0.99 * this.leaves.length)
                {
                    this.seasonPhase = 2;
                }
                else
                {
                    this.lightenLeaves();
                }
                
            }
            // SPRING: grow the fruits on the tree
            else if (this.seasonPhase == 2)
            {   
                // Resets the howManyLeavesLightened counter back to 0 now finished with it
                this.howManyLeavesLightened = 0;

                // Adds fruits on 20% of end-branches/leaves in the tree
                if(this.fruits.length < this.leaves.length * 0.2)
                {   
                    this.addFruits();
                }
                else
                {
                    this.seasonPhase = 3;
                }
            }  
            // SUMMER: Ripen the fruits (make them change color)
            else if (this.seasonPhase == 3)
            {   
                // if all fruits are ripened, change season
                if (this.fruitsRipened == this.fruits.length)
                {   
                    this.seasonPhase = 4;
                }
                else
                {
                    this.ripenFruits();
                }
            }
            // LATE SUMMER: Drop the fruits off the tree
            else if (this.seasonPhase == 4)
            {   
                this.fruitsRipened = 0;
                // Sets count for fallen fruits using countFallenFruits() method
                var fruitsFallen = this.countFallenFruits();
                // If not all fruits have fallen, drop some more
                if (fruitsFallen != this.fruits.length)
                {   
                   this.dropFruits();
                }
                // Else, change the season
                else
                {
                    this.seasonPhase = 5;
                }
            }  
            // AUTUMN: Turn color of leaves
            else if (this.seasonPhase == 5)
            {   
                // Records number of leaves which have changed color
                var leavesTurned = this.countAutumnLeaves();
                // If less than 95% of leaves have turned color, turn more
                if (leavesTurned < 0.95 * this.leaves.length)
                {   
                    this.autumnLeaves();
                }
                // Else, change the season
                else
                {
                    this.seasonPhase = 6;
                }
            }
            // LATE AUTUMN: drop leaves from the tree
            else if (this.seasonPhase == 6)
            {   
                // Fallen leaves counter
                var leavesFallen = this.countFallenLeaves();

                // Drop leaves slower if autumn is just beginning
                if (leavesFallen <= this.leaves.length * 0.5)
                {   
                   this.dropLeaves(5);
                }
                // If less leaves left on tree, make them drop faster
                else if (
                    leavesFallen > this.leaves.length * 0.5
                    && leavesFallen < this.leaves.length
                    )
                {   
                    // Faster because more leaves are dropped at a time
                    this.dropLeaves(20);
                }
                // WINTER: All leaves have fallen
                // Set the hasLeaf property of the branches to false
                else
                {   
                    for (var i = 0; i < this.branches.length; i++)
                    {
                        if (this.branches[i].hasLeaf)
                        {
                            this.branches[i].hasLeaf = false;
                        }
                    }
                    this.seasonPhase = 7;
                }
            }
            // WINTER: No leaves left on the tree. Snowballs start falling (look below)
            else if (this.seasonPhase == 7)
            {   
                
                console.log('phase 7');

                if (this.leaves.length == 0)
                {   
                    this.seasonPhase = 8;
                }
            }
            // WINTER FINISHES: all snowballs have dropped
            else if (this.seasonPhase == 8)
            {   
                console.log('phase 8');

                if (this.snowballs.length == 0)
                {   
                    this.seasonPhase = 9;
                }
            }
            // SPRING AGAIN: regrow the leaves on the tree
            else if (this.seasonPhase == 9)
            {   
                this.regrowLeaves();
                // If all leaves regrown, change seasonPhase back to 1 to cycle
                if (this.leaves.length == this.maxLeafCount)
                {
                    this.seasonPhase = 1;
                }
            }
        }
        // NO BEAT DETECTED
        else
        {
            // for (var i = 0; i < this.fruits.length; i++)
            // {   
            //     // Make fruits fall if seasonPhase is 4
            //     if (this.seasonPhase == 4)
            //     {  
            //         this.fruits[i].fall(true);
            //     }
            // }

            // Leaves should not fall if no beat
            for (var i = 0; i < this.leaves.length; i++)
            {
                this.leaves[i].fall(false);
            }
        }

        // WINTER/SEASON 7: Add snowballs
        if (
            this.seasonPhase == 7
        )
        {   // Vary the number of snowballs falling
            if (this.leaves.length >= 100)
            {
                this.addSnowballs(25);
            }
            else if (this.leaves.length < 100 > this.leaves.length > 50 )
            {
                if (frameCount % 2 == 0)
                {
                    this.addSnowballs(10);
                }
            }
            else
            {
                if (frameCount % 3 == 0)
                {
                    this.addSnowballs(5);
                }
            }
        }

        // Add text showing which season it is
        textSize(40);
        if (this.seasonPhase <= 1 || this.seasonPhase == 2 ||
             this.seasonPhase == 9)
        {
            
            fill(40, 255, 60);
            text('Spring', 20, height - 50);
        }
        else if (this.seasonPhase == 3 || this.seasonPhase == 4)
        {
            fill(255, 255, 50);
            text('Summer', 20, height - 50);
        }
        else if (this.seasonPhase == 5 || this.seasonPhase == 6)
        {
            fill(255, 160, 0);
            text('Autumn', 20, height - 50);
        }
        else
        {
            fill(100, 100, 255);
            text('Winter', 20, height - 50);
        }

    }
}