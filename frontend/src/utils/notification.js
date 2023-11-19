import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const notify = ({ text, duration = 3000, gravity = 'top', position = 'right', style = {} }) => {
  Toastify({
    text,
    duration,
    gravity,
    position,
    style,
  }).showToast();
};

export { notify };