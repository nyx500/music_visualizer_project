I have done quite a lot of research on YouTube about different kinds of animations and audio visualizations using P5.Js and the 3D WEBGL library, which has inspired me to come up with possible adaptations of the ideas presented in the videos. I found the tutorial videos made by The Coding Train to be particularly helpful. I found this basic sound visualization here: https://www.youtube.com/watch?v=uk96O7N1Yo0) very useful to create spinning circular objects, except I adapted this tutorial to plot the fourier.analyze() instead of the waveform array. It has also inspired me to look further into different adaptations of the Starfield animation and how I can pair it with sound, which I have made notes on below.
I have made 2 visualizations so far that were not based on the lecture videos and which were my own idea, and these are the ones that I feel I have improved my understanding of the p5.js sound library the most with: Piano() and Flowers(). I also extended the visualizations mentioned in the lectures and information, such as Ridgeplots and using Noise().
For my already-completed “Piano” visualization, I knew that too many frequencies would make too many piano notes change color, so that it would be impossible for the user to see different patterns. Therefore, I experimented with the threshold of the piano keys’ responsiveness (how loud a frequency has to be for the corresponding piano key to change color) changeable and including a slider for this in the GUI. I have included pictures of the slider and the code it affects in this directory.
The number of flowers for my Flowers() visualization is also determined by a slider variable on the GUI, because for some music samples, the higher frequencies in the linAverages() array do not change for the whole song, so the screen looks odd with half the flowers not moving. I have also included snippets of this here.
I have also included a screenshot of my mindmap for the kinds of visualizations that my music app should include at least one of. I have also made a brainstorm for the different technical aspects that my Starfield() visualizer has to fulfill to make this part of the project a success.