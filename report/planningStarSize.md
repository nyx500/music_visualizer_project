// PLAN: How to stop making some stars too big?
// Must map the star increase in size each frame to the star's velocity

// Get the magnitude of the vector using the p5.js mag() method:

var vel_mag = stars[i].velocity.mag();

// Create a variable to store the size-increment for this star:

var size_increase;

// Decide on range of increments to star (ellipse) size, e.g. 0.0001 to 0.01
// Use map to get the right size increase
// To use map() we need to know the minimum and maximum possible velocity of the star (hard part)...
// The velocity has an x and y component, initially this is the sin or cosine of random angle 0 to 2PI
/* Then the velocity (which will be a number whose **absolute** value is between 0 and 1) is multiplied
a random number between 1.1 and 4*/
/* The vectors magnitude will automatically be > 0 because it is sqrt(x*x + y*y)*/
/* Velocity's starting magnitude will be less than 7.2124... because the highest number the x and y
component of a vector can take is 5.1 and the square root of 5.1^2 + 5.^2*/
/* Then the acceleration added each frame will mean the vector magnitude will be multiplied by 1.01 (without beat), so this is quite slow, even if we increase acceleration updating with the beat analyzer, the velocities at the end of a star's 'life' seems to not be more than 20 using console.log, so let's map 
between 0 and 30 for the velocity to initially test this (can adjust this value later when add the beats)*/

size_increase = map(vel_mag, 0, 30, 1.001, 1.1);

// Now let's test this:
// After testing different values in the map() function, this set of values seems to work best for now, but
will look back to this later after adding the beat analyzer
let size_increment = map(velocity_magnitude, 0, 15, 1.0005, 1.018);

