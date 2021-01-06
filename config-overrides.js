// const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
// const path = require('path');
// module.exports = function override(config, env) {
//         const workboxConfig = {
//             ...defaultInjectConfig,
//             swSrc: path.join(__dirname,'src','customServiceWorker.js'),
//         };

//         config = rewireWorkboxInject(workboxConfig)(config, env);

//         return config;
//     }

    const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
    const path = require('path');
    
    module.exports = function override(config, env) {
      if (env === "production") {
        console.log("Production build - Adding Workbox for PWAs");
        // Extend the default injection config with required swSrc
        const workboxConfig = {
          ...defaultInjectConfig,
          swSrc: path.join(__dirname, 'src', 'customServiceWorker.js'),
          importWorkboxFrom: "local"
        };
        config = rewireWorkboxInject(workboxConfig)(config, env);
      }
    
      return config;
    };