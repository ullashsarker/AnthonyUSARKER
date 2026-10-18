const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Reverting Portfolio to Previous Cybernetic Theme ===\n');

try {
  console.log('Step 1: Reverting modified source code files...');
  execSync('git checkout HEAD -- src index.html', { stdio: 'inherit' });
  console.log('✔ Modified files successfully reverted.\n');

  console.log('Step 2: Cleaning up newly created components...');
  execSync('git clean -fd src', { stdio: 'inherit' });
  console.log('✔ New components successfully cleaned up.\n');

  console.log('Step 3: Removing temporary scripts...');
  const scripts = ['revert.js', 'copy_assets.js'];
  scripts.forEach(script => {
    const p = path.join(__dirname, script);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
    }
  });

  console.log('🎉 Theme reversion successfully complete! You are back to your previous cyan/cybernetic theme.');
} catch (err) {
  console.error('\n❌ Reversion failed. Please make sure git is installed and configured in your path.');
  console.error('Error details:', err.message);
}
