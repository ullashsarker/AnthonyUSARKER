const fs = require('fs');
const path = require('path');

const srcHero = '/home/anthony/.gemini/antigravity/brain/1d6e8491-8b50-4918-990b-fda7cde4d8d6/media__1783108358424.png';
const destHero = '/run/media/anthony/ULLASH SARKER/remix_-anthony-ullash-sarker-portfolio/anthony_hero.png';

const srcRef = '/home/anthony/.gemini/antigravity/brain/1d6e8491-8b50-4918-990b-fda7cde4d8d6/media__1783108358362.jpg';
const destRef = '/run/media/anthony/ULLASH SARKER/remix_-anthony-ullash-sarker-portfolio/anthony_suit.png'; // or whatever the suit photo is

try {
  if (fs.existsSync(srcHero)) {
    fs.copyFileSync(srcHero, destHero);
    console.log('Successfully copied hero image to:', destHero);
  } else {
    console.log('Source hero image not found at:', srcHero);
  }

  if (fs.existsSync(srcRef)) {
    // Let's also copy the suit photo if it needs to match
    console.log('Found reference image at:', srcRef);
  }
} catch (err) {
  console.error('Error during copy:', err);
}
