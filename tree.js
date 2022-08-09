/*Attribution: https://www.youtube.com/watch?v=0jjeOYMjmDU */
function Tree()
{
    this.name='tree';
    /* Set higher constant/sensitivity for beat detector than other visualizations
     because I do not want the tree to change color TOO quickly*/
    this.beatDetector = new AdvancedBeatDetector(1.3);
    this.beginLength = 200;
    // Records if the tree is fully grown (-->can now stop adding new branches)
    this.isCompleted = false;
    /* Notes the season/stage of tree building. 0 = grow tree. 1 = lighten leaves (spring
        to summer)
    */
    this.seasonPhase = 0;
    /* This will be used to calculate which branches spawn new branches with every iteration
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
    this.howManyLeavesLightened = 0;
    this.fruits = [];
    this.fruitCount = 0;

    /* Checks if an object returned by the Branch constructor's
    addBranch method is a leaf or another branch, 
    and pushes it to the corresponding array*/
    this.appendBranchOrLeaf = function(newObject)
    {   
        // Attribution: https://flexiple.com/javascript/instanceof-javascript/
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
        var thickness = previousBranch.thickness;
        if (previousBranch.thickness > 1)      
        {
            thickness = previousBranch.thickness * 0.6;
        }
        /* Creates two branches symmetrical to each other, every branch at
        approximately 45 degrees --> the random function from Math library
        has been used to include some variation of 10 degrees each side from
        45 degrees, so that the tree looks more "natural" in shape*/
        var angle = Math.random() * PI/9 + (PI/4 - PI/18);
        /* Creates 2 new branches or leaves using this.appendBranchOrLeaf
        to check type of object returned by branch's addBranch method - see above.
        */
        var newBranchOrLeaf = previousBranch.addBranch(angle, thickness);
        this.appendBranchOrLeaf(newBranchOrLeaf);
        newBranchOrLeaf = previousBranch.addBranch(-angle, thickness);
        this.appendBranchOrLeaf(newBranchOrLeaf);
    }

    // Adds branches and then leaves to a tree from the trunk upwards
    this.growTree = function()
    {
        // Array storing branches with no children --> must be appended
        var childlessBranches = [];
        /* Childless branches' indices are found
        by iterating from the back of the Branches array -
        2^n backwards into thebranches array for each iteration,
        n, of the current process in the
        beat n*/
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
                /*All the branches have leaves now --> the tree has grown
                fully and can be marked completed, signal to change season
                to 1 (spring to summer) */
                this.isCompleted = true;
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

    // Changes the color of a leaf from dark green to light green
    this.colorLeaf = function(leaf)
    {
        leaf.green += 50;
        leaf.red += 20;
        leaf.blue += 20;
        leaf.isLightened = true;
    }

    // Returns an index for a random item in an array (e.g. to choose a leaf)
    this.returnRandomArrayIndex = function(arr)
    {
        var index = Math.floor((Math.random() * arr.length));
        return index;
    }

    // Lightens random leaves in the tree 
    this.lightenLeaves = function()
    {   
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
            // If leaf was already lightened, try again
            else
            {
                i -= 1;
            }
        }    
    }

    // Adds fruits in random locations (based on leaves) in the tree)
    this.addFruits = function()
    {   
        // Same process as for lightenLeaves()
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

    this.draw = function()
    {   
        background(0);
	    controls.draw();
        colorMode(RGB);
        strokeCap(PROJECT);

        for (var i = 0; i < this.branches.length; i++)
        {   
            this.branches[i].draw();
        }
        for (var i = 0; i < this.leaves.length; i++)
        {   
            this.leaves[i].draw();
        }
        for (var i = 0; i < this.fruits.length; i++)
        {   
            this.fruits[i].draw();
        }

        // Functionality for when beat is detected
        if (this.beatDetector.detectBeat() && frameCount > 120)
        {   
            // expand the branches and leaves on tree
            if (this.seasonPhase == 0)
            {
                this.growTree();
            }
            // lighten the leaves on the tree
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
            // grow fruits on the tree
            else if (this.seasonPhase == 2)
            {
                if(this.fruits.length < this.leaves.length * 0.3)
                {   
                    this.addFruits();
                }
                else
                {
                    this.seasonPhase = 3;
                }
            }  
            else if (this.seasonPhase == 3)
            {
                console.log('reached it');
            }    
        }
    }
}