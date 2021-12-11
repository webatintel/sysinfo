function browser(si) {
  let ua = navigator.userAgent;
  let browserName;
  let browserVersion;
  let browserMajorVersion;
  let nameOffset, verOffset, index;

  // Opera
  if ((verOffset = ua.indexOf('Opera')) != -1) {
    browserName = 'Opera';
    browserVersion = ua.substring(verOffset + 6);
    if ((verOffset = ua.indexOf('Version')) != -1) {
      browserVersion = ua.substring(verOffset + 8);
    }
  }
  // Opera Next
  if ((verOffset = ua.indexOf('OPR')) != -1) {
    browserName = 'Opera';
    browserVersion = ua.substring(verOffset + 4);
  }
  // Legacy Edge
  else if ((verOffset = ua.indexOf('Edge')) != -1) {
    browserName = 'Microsoft Legacy Edge';
    browserVersion = ua.substring(verOffset + 5);
  }
  // Edge (Chromium)
  else if ((verOffset = ua.indexOf('Edg')) != -1) {
    browserName = 'Microsoft Edge';
    browserVersion = ua.substring(verOffset + 4);
  }
  // MSIE
  else if ((verOffset = ua.indexOf('MSIE')) != -1) {
    browserName = 'Microsoft Internet Explorer';
    browserVersion = ua.substring(verOffset + 5);
  }
  // Chrome
  else if ((verOffset = ua.indexOf('Chrome')) != -1) {
    browserName = 'Chrome';
    browserVersion = ua.substring(verOffset + 7);
  }
  // Safari
  else if ((verOffset = ua.indexOf('Safari')) != -1) {
    browserName = 'Safari';
    browserVersion = ua.substring(verOffset + 7);
    if ((verOffset = ua.indexOf('Version')) != -1) {
      browserVersion = ua.substring(verOffset + 8);
    }
  }
  // Firefox
  else if ((verOffset = ua.indexOf('Firefox')) != -1) {
    browserName = 'Firefox';
    browserVersion = ua.substring(verOffset + 8);
  }
  // MSIE 11+
  else if (ua.indexOf('Trident/') != -1) {
    browserName = 'Microsoft Internet Explorer';
    browserVersion = ua.substring(ua.indexOf('rv:') + 3);
  }
  // Other browsers
  else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
    browserName = ua.substring(nameOffset, verOffset);
    browserVersion = ua.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // trim the browserVersion string
  if ((index = browserVersion.indexOf(';')) != -1) browserVersion = browserVersion.substring(0, index);
  if ((index = browserVersion.indexOf(' ')) != -1) browserVersion = browserVersion.substring(0, index);
  if ((index = browserVersion.indexOf(')')) != -1) browserVersion = browserVersion.substring(0, index);

  browserMajorVersion = parseInt('' + browserVersion, 10);
  if (isNaN(browserMajorVersion)) {
    browserVersion = '' + parseFloat(navigator.appVersion);
    browserMajorVersion = parseInt(navigator.appVersion, 10);
  }

  si['browser.name'] = browserName;
  si['browser.userAgent'] = navigator.userAgent;
  si['browser.vendor'] = navigator.vendor;
  si['browser.version'] = browserVersion;
  si['browser.majorVersion'] = browserMajorVersion;
}
