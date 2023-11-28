//This is to add notification sitewide.
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const notify = (text, style, duration = 3000, gravity = 'top', position = 'right') => {
  //Changes notification color based in style
  if (style == 'success') {
    style = { background: "linear-gradient(to right, #43a047, #43a047)" }
  } else if (style == 'warning') {
    style = { background: "linear-gradient(to right, #fb8c00, #fb8c00)" }
  } else if (style == 'danger') {
    style = { background: "linear-gradient(to right, #d81b60, #d81b60)" }
  } else {
    style = { background: "linear-gradient(to right, #1e88e5, #1e88e5)" }
  }
  //Runs toastify
  Toastify({
    text,
    duration,
    gravity,
    position,
    style,
  }).showToast();
};

export { notify };