//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Branch(begin, end, thickness)
{   
    // pos-vectors where the branch starts and ends
    this.begin = begin;
    this.end = end;
    // stroke weight thickness of this branch
    this.thickness = thickness;
    // magnitude of the branch vector
    this.magnitude = p5.Vector.sub(this.end, this.begin).mag();
    // records whether the branch has spawned other branches/leaves
    this.hasChild = false;
    // draws the branch
    this.draw = function()
    {   
        strokeWeight(this.thickness);
        stroke(139,69,19);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
    
    // Attaches a new branch to the current branch
    this.addBranch = function(angle, thickness) {
        /* Calculates the displacement vector from the beginning and
        the end points of the current branch
        */
        var dir = p5.Vector.sub(this.end, this.begin);
        /*Rotates this current branch's vector by the angle given in
        the args*/
        dir.rotate(angle);
        /* Shrinks size of the new branch */
        dir.mult(0.67);
        /* Now that a new branch is being added to the old one, change hasChild
        property to 'true' */
        this.hasChild= true;
        /* If the magnitude of the new branch is greater than 5, add the
            new branch vector to the end of the current branch and return
            the new branch
         */
        if (dir.mag() > 5)
        {   
            var newEnd = p5.Vector.add(this.end, dir);
            var br = new Branch(this.end, newEnd, thickness); 
            return br;
        }
        /* If the length of the new branch would be < 5, make leaf instead */
        else
        {   
            var beginLeaf = this.end;
            var leaf = new Leaf(beginLeaf);
            return leaf;
        } 
    }

}