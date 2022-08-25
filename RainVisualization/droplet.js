/* Tutorial for making a raindrop shape attribution: 
https://editor.p5js.org/samchasan/sketches/SJfzWJviW
 */
function Droplet(x_pos, y_pos)
{
    // Add randomness to spread of raindrops --> not usually evenly-spaced
    // in nature on a window screen!
    this.x_pos = x_pos;
    // Gives raindrops different heights because rain doesn't just come from one level
    // all at once
    this.y_pos = y_pos;
    this.size = Math.round(Math.random() * 20 + 20),
    this.opacity = 255,
    this.speed = Math.random() + 2,
    // This determines the amount the raindrop shifts horizontally when it runs down the background
    this.x_wiggleValue = Math.random() * 0.4 - 0.2,
    // dirChange is a variable that randomizes on which frameCount the raindrop should
    // change x-direction. I will divide frameCount by dirChange to get a random
    // frame on which each different raindrop will change direction. Randomized value
    // is between 50 and 100
    this.dirChange =  Math.floor(Math.random() * 50 + 101)
}