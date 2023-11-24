//This is to add notification sitewide.
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const notify = (text, style, duration = 3000, gravity = 'top', position = 'right') => {
  //Changes notification color based in style
  if (style == 'success') {
    style = { background: "linear-gradient(to right, #43a047, #7cb342)" }
  } else if (style == 'warning') {
    style = { background: "linear-gradient(to right, #f4511e, #fb8c00)" }
  } else if (style == 'danger') {
    style = { background: "linear-gradient(to right, #e53935, #d81b60)" }
  } else {
    style = { background: "linear-gradient(to right, #1e88e5, #039be5)" }
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