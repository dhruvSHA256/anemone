const setTheme = (theme) => {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
    if(theme == 'light')
        changeGiscusTheme("noborder_light");
    else
        changeGiscusTheme("noborder_dark");
}

const hasCodeRun = localStorage.getItem('hasCodeRun');

if (!hasCodeRun) {
  const defaultTheme = "{{ config.extra.default_theme }}";
  setTheme(defaultTheme);
  localStorage.setItem('hasCodeRun', 'true');
}

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
}

getTheme();

const globalColorMode = 'noborder_dark'; // or you get it from some function/global state

// https://github.com/giscus/giscus/issues/336#issuecomment-1007922777
function changeGiscusTheme(theme) {
    function sendMessage(message) {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (!iframe) return;
      iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
    sendMessage({
      setConfig: {
        theme: theme
      }
    });
}

// set giscus theme after giscus has been loaded
function handleGiscusMessage(event) {
    if (event.origin !== 'https://giscus.app') return;
    if (!(typeof event.data === 'object' && event.data.giscus)) return;

    // const giscusData = event.data.giscus;
    changeGiscusTheme(globalColorMode);
    // window.removeEventListener('message', handleMessage);
}

window.addEventListener('message', handleGiscusMessage);
