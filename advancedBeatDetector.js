/* Attribution: http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html */
function AdvancedBeatDetector() {
    this.name = 'advancedBeatDetector';
    // 'sampleBuffers' stores the energies for each of 5 frequency ranges
    this.sampleBuffersCollection = [
        {
            name: "bass",
            sampleBufferArray: [],
            sampleAverage: 0,
            variance: 0
        },
        {
            name: "lowMid",
            sampleBufferArray: [],
            sampleAverage: 0,
            variance: 0
        },
        {
            name: "mid",
            sampleBufferArray: [],
            sampleAverage: 0,
            variance: 0
        },
        {
            name: "highMid",
            sampleBufferArray: [],
            sampleAverage: 0,
            variance: 0
        }
        ,
        {
            name: "treble",
            sampleBufferArray: [],
            sampleAverage: 0,
            variance: 0
        }
    ];

    // must be a power of 2 less than 1024 (total fft spectrum has 1024 freqs)
    this.numSubBands = this.sampleBuffersCollection.length;
    this.numFrequenciesInBuffer = 1024/this.numSubBands;
    // default frame rate set to 60
    this.frameRate = 60;

    // sets how many times the draw() loop is called per second
    this.setFrameRate = function(rate)
    {
        frameRate(rate);
    }

    this.calculateSampleAverage = function (binObject)
    {
        var sampleSum = 0;
        for (var i = 0; i < binObject.sampleBufferArray.length; i++)
        {
            sampleSum += binObject.sampleBufferArray[i];
        }
        var sampleAverage = sampleSum /  binObject.sampleBufferArray.length;

        return sampleAverage;
    }

    this.calculateVariance = function(binObject, sampleAverage)
    {
        var varianceSum = 0;

        for (var i = 0; i < binObject.sampleBufferArray.length; i++)
        {
            varianceSum += Math.abs(sampleAverage - binObject.sampleBufferArray[i]);
        }

        var variance = varianceSum / binObject.sampleBufferArray.length;

        return variance;
    }

    
    this.compareVariances = function(collectionOfBuffers)
    {   
        var max = 0;
        var maxIndex = 0;

        for (var i = 0; i < collectionOfBuffers.length; i++)
        {
            if (collectionOfBuffers[i].variance > max)
            {
                max = collectionOfBuffers[i].variance;
                maxIndex = i;
            }
        }

        return maxIndex;
    }

    this.checkBufferForBeat = function(index, threshold)
    {
        var name = this.sampleBuffersCollection[index].name;

        /*https://www.gamedev.net/tutorials/programming/math-and-physics/beat-detection-algorithms-r1952/*/
        /*
            "Now the 'C' constant of this algorithm has nothing to do with the 'C' of the
                first algorithm, because we deal here with separated subbands the energy varies
                globally much more than with colorblind algorithms.
                Thus 'C' must be about 250." - Frédéric Patin,
                I tried 250 for the constant but this gave an enormous number that clearly
                did not work in this case. Therefore I experimented with the numbers to find
                a constant that worked for this song by using console.log() and trial and error.
                In the end, I found that a slider would let the user adjust the sensitivity
                themselves in between two bounds of reasonable values that would enable
                a constant best suited to the song.
            */

        if (fourier.getEnergy(name) > this.sampleBuffersCollection[index].sampleAverage * threshold)
        {   
            return true;
        }
        else
        {   
            return false;
        }

    }
    
    this.checkBuffersForBeat = function(threshold)
    {   
        
        fourier.analyze();
      
        for (var i = 0; i < this.sampleBuffersCollection.length; i++)
        {   
            var name = this.sampleBuffersCollection[i].name;
            if (this.sampleBuffersCollection[i].sampleBufferArray.length == this.frameRate)
            {
                var sampleAverage = this.calculateSampleAverage(this.sampleBuffersCollection[i]);
                var variance = this.calculateVariance(this.sampleBuffersCollection[i], sampleAverage);

                this.sampleBuffersCollection[i].variance = variance;
                this.sampleBuffersCollection[i].sampleAverage = sampleAverage;

                this.sampleBuffersCollection[i].sampleBufferArray.splice(0, 1);
                this.sampleBuffersCollection[i].sampleBufferArray.push(fourier.getEnergy(name))

            }
            else
            {
                this.sampleBuffersCollection[i].sampleBufferArray.push(fourier.getEnergy(name));
            }
        }

        var indexBuffHighestVar = this.compareVariances(this.sampleBuffersCollection);

        var beat = false;

        /* Only start detecting beats after a few seconds BECAUSE more
        data for the variance needs to be gathered before the beat
        detector starts to be reliable
        */
        beat =  this.checkBufferForBeat(indexBuffHighestVar, threshold);

        return beat;

    }

    this.detectBeat = function(threshold)
    {
        // make the draw loop be called 60 times per second (adaptable)
        this.setFrameRate(70);
        var isBeat = this.checkBuffersForBeat(threshold);
        return isBeat;
    }
}