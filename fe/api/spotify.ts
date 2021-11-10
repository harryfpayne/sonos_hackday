const { Client } = require("spotify-api.js");

const client_id = '342d8aa2c22c4847a7ed319ddb87e768';
const client_secret = '8c0194c87f304a1fa8cabed834cf5f65';

export async function getClient() {
  return new Promise(res => {
    const client = new Client({
      token: { clientID: client_id, clientSecret: client_secret },
      // Ready event is required if you are providing clientID and clientSecret fields.
      // As the client has to create the token first with it and then emits the ready event.
      onReady() {
        res(client)
      }
    })
  })
}
