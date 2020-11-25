// import MatRipple from 'mat-ripple';
let root = document.documentElement;
let setTheme = (toSwap) => {
  if (toSwap == 'dark') {
    window.localStorage.setItem('theme', 'dark');
    root.style.setProperty('--bg-primary', '#191919');
    root.style.setProperty('--bg-secondary', '#2a2a2a');
    root.style.setProperty('--bg-tertiary', '#2a2a2a');
    root.style.setProperty('--text', '#fff');
    root.style.setProperty('--border', '#2c2c2c');
  } else if (toSwap == 'light') {
    window.localStorage.setItem('theme', 'light');
    root.style.setProperty('--bg-primary', '#fff');
    root.style.setProperty('--bg-secondary', '#eeeeee');
    root.style.setProperty('--bg-tertiary', '#000');
    root.style.setProperty('--text', '#000');
    root.style.setProperty('--border', '#ddd');
  } else {
    return 1;
  }
}
setTheme(window.localStorage.getItem('theme'));
setTheme('dark')
document.addEventListener('deviceready', detectTheme);

function detectTheme() {
  cordova.plugins.ThemeDetection.isDarkModeEnabled(
    function(success) {
      console.log(success.message);
      if (success.value) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    },
    function(error) {
      console.log(error);
    }
  );
}

let buttons = document.getElementsByClassName('ripple');
for (let i = 0; i < buttons.length; i++) {
  let ripple = document.createElement('mat-ripple');
  buttons[i].appendChild(ripple);
}