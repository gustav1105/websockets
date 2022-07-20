import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ContentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  clients: Socket[] = [];

  broadcastPlaybookUpdated(playbookUid: number) {
    const allowedAPIKeys = 'database[playbookUid]';

    for (const client of this.clients) {
      const apiKey = client.handshake.auth.token;

      const clientIsAllowedAccess = true;
      if (clientIsAllowedAccess) {
        client.emit('new-content-hierarchy', { playbook: playbookUid });
      }
    }
  }

  handleConnection(client: Socket) {
    const apiKey = client.handshake.auth.token;

    // Check if API key exists in database
    const apiKeyIsValid = apiKey === 'abc';
    if (apiKeyIsValid) {
      this.clients.push(client);
    }
  }

  handleDisconnect(client: Socket) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === client.id) {
        this.clients.splice(i, 1);
        break;
      }
    }
  }
}
