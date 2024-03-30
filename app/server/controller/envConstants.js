// envConstants.js


// Export the appropriate constants based on the environment
const getEnvironmentConstants = () => {


  const sharedCONST = {
    API_URL: 'http://localhost',
    ENV_PORT_BDD: 1049,
    ENV_IP_BDD: 'jeedom.guillaumehugot.fr',
    // Define other common constants here
  };

  // Setup pour faire tourner les serveurs sur les machines de l'unistra.
  // Utilise aussi le serveur mongodb externe.
  const vmCONST = {
    ...sharedCONST,
    ENV_TYPE: 'VM',
    ENV_PORT_WEB: 80,
    ENV_PORT_SERVER: 10002,
  };


  // Constantes par défaut pour tout faire fonctionner localement.
  // Nécessite Mongodb sur la machine.
  const defaultConstants = {
    ...sharedCONST,
    ENV_TYPE: 'DefaultLocal',
    ENV_PORT_WEB: 3000,
    ENV_PORT_SERVER: 3001,
    ENV_PORT_BDD: 27017,
    ENV_IP_BDD: 'http://127.0.0.1',
  };


  // Par défaut local sans bdd.
  const defaultNoBDD = {
    ...defaultConstants,
    ENV_PORT_BDD: sharedCONST.ENV_PORT_BDD,
    ENV_IP_BDD: sharedCONST.ENV_IP_BDD,

  }

  if (process.env.NODE_ENV === 'vm') {
    return vmCONST;
  } else if(process.env.NODE_ENV === 'local'){
    return defaultConstants;
  }
   else {
    return defaultNoBDD;
  }
};

module.exports = getEnvironmentConstants;
