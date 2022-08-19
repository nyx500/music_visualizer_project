// From the lecture video example for beat detector
// Gets the beat only from the bass
/* By trial and error, I found that not squaring the values in the sample buffer
and using the square of (each sample buffer value - mean), unlike the lecture
video which did not square the variance, then finding the standard deviation
worked better for beat prediction and the linear regression model*/

function BassBeatDetector(){
    this.sampleBuffer = [];
    this.thresholdConstant;
    this.sampleAverage = 0;
    this.isBeat = false;

    // returns the standard deviation of the sample buffer of bass-freq sums
    this.calculateStandardDeviation = function(){
        // first calculate the variance in the sample buffer
        let varianceSum = 0;

        for (var i = 0; i < this.sampleBuffer.length; i++)
        {
            varianceSum += Math.pow((this.sampleBuffer[i] - this.sampleAverage), 2);
        }

        let variance = varianceSum / this.sampleBuffer.length;
        // standard deviation is the square root of the variance
        // gives a more manageable (smaller number) to work with
        let standardDeviation = Math.pow(variance, 0.5);

        return standardDeviation;
    }

    // returns a threshold value based on variance/s.d. of the samples
    this.calculateThreshold = function(){
        let standardDeviation = this.calculateStandardDeviation();

        /* all the songs in my collection had a standard deviation
        between 0 and 10,000 */
        /* following the video, the higher the variance and standard
        deviation, the lower the threshold for detecting a beat should be */
        // let a 500 standard deviation map to a constant threshold of 1.125
        // let a 9000 standard deviation map to a constant threshold of 1.0

        // linear regression to find the constant threshold
        // x = standard deviation
        // y = threshold constant
        
        // m is change in y over change in x
        let m = (1 - 1.125)/(9000 - 500);

        // y = mx + b, calculating b (y-intercept)...
        // b = y - mx, x = 9000, y = 1.0
        let b = 1.0 - (m * 9000);

        /* now we can calculate the threshold value by using y = mx + b
        for the current x, standard deviation... */
        let threshold = (m * standardDeviation) + b;

        // return the threshold for the beat
        return threshold;
    }

    this.setIsBeat = function(){
        var spectrum = fourier.analyze();
        frameRate(60);
        var sum = 0;
         /* adds up all the amplitudes only for the LOWER frequencies / near bass
        in the spectrum */
        for (var i = 0; i < spectrum.length / 4; i++)
        {   
            sum += spectrum[i];
        }

        // detect beat only after about a second of time
        if (this.sampleBuffer.length == 60)
        {   
            var sampleSum = 0;
            // calculates the average of the buffers
            for (var i = 0; i < this.sampleBuffer.length; i++)
            {
                sampleSum += this.sampleBuffer[i];
            }
            // the average value for the sums of the buffer
            this.sampleAverage = sampleSum / this.sampleBuffer.length;

            let threshold = this.calculateThreshold();

            if (sum > this.sampleAverage * threshold)
            {   
                // changes the isBeat property to true
                this.isBeat = true;
            }
            else
            {   
                // changes the isBeat property to false
                this.isBeat = false;
            }
            // removes the first sum in the buffer
            this.sampleBuffer.splice(0, 1);
            // adds a new sum to the buffer
            this.sampleBuffer.push(sum);
        }
        else
        {   
            // makes sure the isBeat property is false
            this.isBeat = false;
            this.sampleBuffer.push(sum);
        }
    }

    /* checks the isBeat public property to return
    whether a beat is detected or not as a Boolean value */
    // the visualizations can call this function to check if there is a beat
    this.detectBeat = function() {
        this.setIsBeat();
        if (this.isBeat)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
}