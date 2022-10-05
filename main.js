import './style.css'
import Weather from './src/Weather.js'

const weather = new Weather('7ea25643391a4de38fb63330220510');

// on click h1 element, clear app and load new content
const h1 = document.querySelector('h1');
h1.addEventListener('click', () => {
   document.querySelector('#app').innerHTML = '';
    
});