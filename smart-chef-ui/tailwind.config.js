const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, './src/**/*.{js,jsx,ts,tsx}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
