/*Attribution: https://editor.p5js.org/rubyang726/sketches/SBoRak2MF */
/* 7th August: make teadrops into objects instead of jagged arrays */

function Graphics()
{   
    this.name = 'graphics';
    var g = createGraphics(width, height, WEBGL);
    console.log(g.height, g.width);
    var resolution = 40;
    this.h = 10;
    this.a = 0;


    //creates 2D array for the main teardrop shape
    // stores latitudes for each longitude

    this.createTeardrop = function(i)
    {   
        var teardrop = {
            index: i,
            array: [],
            height: height * 2.2,
            radius: Math.random() * 100 + 20,
            speed: 20,
            rotate: 1.3
        };

        for (let i = 0; i < resolution + 1; i++)
        {   
            teardrop.array[i] = [];
            for (let j = 0; j < resolution + 1; j++)
            {
                teardrop.array[i][j] = 0;
            }
        }

        for (let i = 0; i < resolution + 1; i++)
        {   
            let longitude = map(i, 0, resolution, 0, PI);

            for (let j = 0; j < resolution + 1; j++)
            {  
                //  let radius = 40;
                let latitude = map(j, 0, resolution, 0, TWO_PI);
                let x = teardrop.radius * 0.4 * 
                        (1-cos(latitude))*sin(latitude)*cos(longitude);
                let y = teardrop.radius * 0.6 * 
                    (1-cos(latitude))*sin(latitude)*sin(longitude);
                let z = teardrop.radius * cos(latitude);
                //fill our 2d array with the generated points, stored as vectors
                teardrop.array[i][j] = createVector(x,y,z);
            }
        }
        return teardrop;
    }

    this.createTeardrops = function()
    {   
        var drops = [];
        for (var i = 0; i < 40; i++)
        {   
            let drop = this.createTeardrop(i);
            drops.push(drop);
        }
        return drops;
    }
    
    var teardrops = this.createTeardrops();

    this.draw = function()
    {   
        console.log(teardrops);
        g.clear();
        for (var i = 0; i < teardrops.length; i++)
        {   
            var teardrop = teardrops[i];
            for (var j = 0; j < resolution; j++)
            {
                g.push();
                g.rotateX(teardrop.rotate);
                g.scale(1.3);
                g.translate(-width * 3 + i * 200, -height * 4,
                     teardrop.height);
                g.beginShape();
                if(j % 2 == 0){
                    g.noStroke()
                    g.fill(255,255,255,100);
                  } else {
                    g.noStroke()
                    g.fill(20, 20, 20,100);
                  }
                  
                g.rotateY(this.a);
                  for (var k = 0; k < resolution + 1; k++)
                  {
                    let v1 = new p5.Vector(teardrop.array[j][k].x, teardrop.array[j][k].y,
                        teardrop.array[j][k].z);
                    let v2 = new p5.Vector(teardrop.array[j + 1][k].x, 
                        teardrop.array[j + 1][k].y, teardrop.array[j + 1][k].z);
                    g.vertex(v1.x, v1.y, v1.z);
                    g.vertex(v2.x, v2.y, v2.z);
                  }
                g.endShape(CLOSE);
                g.pop();
            }
            if (teardrop.height < 0)
            {
                teardrops.splice(i, 1);
                teardrops.push(this.createTeardrop(i));
            }
            teardrop.height -= teardrop.speed;
        }
        
        image(g, 0, 0);
        this.a += 0.01;
    }
}
