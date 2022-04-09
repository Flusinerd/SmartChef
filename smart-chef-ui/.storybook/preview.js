import '../src/index.css';
import '../src/App.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Boostrap White',
    values: [
      { name: 'Boostrap White', value: '#f8f9fa' },
      { name: 'White', value: '#fff' },
      { name: 'Black', value: '#000' },
    ]
  }
}
