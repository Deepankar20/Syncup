// utils/peer.ts
import Peer, { MediaConnection } from 'peerjs';

export class PeerManager {
  private peer: Peer | null = null;

  constructor() {
    // Initialize PeerJS instance
    this.peer = new Peer();

    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      // Join the room and trigger the PeerJS connection
      // You can emit events or perform other actions here
    });

    this.peer.on('error', (error) => {
      console.error('PeerJS error:', error);
    });
  }

  // Example function to initiate a call
  public call(peerId: string, stream: MediaStream): MediaConnection {
    if (!this.peer) {
      throw new Error('PeerJS instance not initialized');
    }
    return this.peer.call(peerId, stream);
  }

  // Add more PeerJS functions here as needed
}
