if (!String.prototype.format) {
  String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

if (!Object.keys) {
  Object.keys = function (object) {
    let keys = [];

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
  }
}

function toggleClass(el, className) {
  if (el.className.indexOf(className) >= 0) {
    el.className = el.className.replace(className, '');
  } else {
    el.className += className;
  }
}

function getParam(context, str) {
  ret = context.getParameter(str);
  if ((Object.prototype.toString.call(ret) === '[object Array]' || Object.prototype.toString.call(ret) === '[object Uint32Array]') && ret.length === 0)
    return ['None']
  else if (ret == 0 || ret)
    return ret;
  else
    return 'None'
}

function getParamByName(name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  let results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
