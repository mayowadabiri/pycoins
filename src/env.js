const {
  REACT_APP_BASE_URL,
  REACT_APP_PUSHER_APP_ID,
  REACT_APP_PUSHER_APP_KEY,
  REACT_APP_PUSHER_APP_CLUSTER,
} = process.env;

const serverConfig = {
  baseurl: REACT_APP_BASE_URL,
  pusher: {
    appId: REACT_APP_PUSHER_APP_ID,
    key: REACT_APP_PUSHER_APP_KEY,
    cluster: REACT_APP_PUSHER_APP_CLUSTER,
  },
};

export default serverConfig;
