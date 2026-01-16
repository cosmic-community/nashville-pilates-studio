(function() {
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(function(arg) {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, function(key, value) {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp: timestamp,
      level: level,
      message: message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }
  
  console.log = function() {
    captureLog('log', Array.prototype.slice.call(arguments));
    originalConsole.log.apply(console, arguments);
  };
  
  console.warn = function() {
    captureLog('warn', Array.prototype.slice.call(arguments));
    originalConsole.warn.apply(console, arguments);
  };
  
  console.error = function() {
    captureLog('error', Array.prototype.slice.call(arguments));
    originalConsole.error.apply(console, arguments);
  };
  
  console.info = function() {
    captureLog('info', Array.prototype.slice.call(arguments));
    originalConsole.info.apply(console, arguments);
  };
  
  console.debug = function() {
    captureLog('debug', Array.prototype.slice.call(arguments));
    originalConsole.debug.apply(console, arguments);
  };
  
  window.addEventListener('error', function(event) {
    captureLog('error', ['Uncaught Error:', event.message, 'at', event.filename + ':' + event.lineno]);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled Promise Rejection:', String(event.reason)]);
  });
  
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  var originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    sendRouteChange();
  };
  
  var originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  }
})();