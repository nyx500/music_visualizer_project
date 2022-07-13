function BeatDetector() {
    this.name = 'beatDetector';
    // special p5.js peak constructor function to get 'peaks' of each fft analyze
    var peakDetect = new p5.PeakDetect(20, 20000, 0.15);

    this.detectBeat = function()
    {
        fourier.analyze();
        peakDetect.update(fourier); 

        if (peakDetect.isDetected)
        {   
            return true;
        }
    }
}