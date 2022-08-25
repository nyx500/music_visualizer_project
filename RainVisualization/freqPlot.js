// An adapted version of the spectrum() visualization in grey
function FreqPlot()
{
    this.name = 'freqplot';
    this.gui = null;
    // Plot coordinates
    this.plotX = width * 0.35;
    this.plotY = height * 2/3;
    // Beginning of plot y-coordinate
    this.plotYTop = this.plotY - 255;
    // Number of frequency averages (16 bins)
    this.averages = 16;
    this.numBars = 1024 / this.averages;
    this.barWidth = 20;
    // Calculates plot width based on bar width
    this.plotWidth = this.averages * this.barWidth;
    // Determines a plot height
    this.plotHeight = this.plotY - this.plotYTop;

    this.draw = function()
    {
        fourier.analyze();

        fill(0);
        rect(
            this.plotX - 20,
            this.plotY + 30,
            this.plotWidth + 50,
            -this.plotHeight - 50,
            )
            
        strokeWeight(4);
        strokeCap(ROUND);
       
        
        var freqAmps = fourier.linAverages(this.averages);
        var grey = 40;
        for (var i = 0; i < freqAmps.length; i++)
        {   
            // Maps the frequency group's amplitude to a value that fits on the plot's height
            var rectHeight = map(freqAmps[i], 0, 255, 0, this.plotHeight);
            fill(grey);
            stroke(0);
            // Draws the bars evenly spaced on the plot
            rect(
                this.plotX + this.barWidth * i,
                this.plotY,
                this.barWidth,
                -rectHeight
            );
            // Makes the frequency bars darker as the frequency range value increases
            grey += 10;
        }
        stroke(100);
        line(this.plotX, this.plotY, this.plotX, this.plotYTop);
        line(this.plotX, this.plotY, this.plotX + this.plotWidth,  this.plotY);
        
    }
}