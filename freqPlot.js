function FreqPlot()
{
    this.name = 'freqplot';
    this.plotX = width * 0.35;
    this.plotY = height * 2/3;
    this.plotYTop = this.plotY - 255;
    this.averages = 16;
    this.numBars = 1024 / this.averages;
    this.barWidth = 20;
    this.plotWidth = this.averages * this.barWidth;
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
            var rectHeight = map(freqAmps[i], 0, 255, 0, this.plotHeight);
            fill(grey);
            stroke(0);
            rect(
                this.plotX + this.barWidth * i,
                this.plotY,
                this.barWidth,
                -rectHeight
            );
            grey += 10;
        }
        stroke(100);
        line(this.plotX, this.plotY, this.plotX, this.plotYTop);
        
        line(this.plotX, this.plotY, this.plotX + this.plotWidth,  this.plotY);
        
    }
}