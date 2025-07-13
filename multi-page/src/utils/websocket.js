class CWs {
  constructor(url) {
      if (!CWs.instance) {
          CWs.instance = new WebSocket(url);
      }
      return CWs.instance;
  }

  sendMessage(message) {
      this.send(JSON.stringify(message));
  }

  onMessage(callback) {
      this.onmessage = (event) => callback(event.data);
  }
}
export default CWs;