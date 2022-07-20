import { Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class ContentService {
  socket: Socket;

  constructor() {
    const server = process.env.SERVER ?? 'localhost';
    this.socket = io(`ws://${server}:3000`, {
      auth: {
        token: 'abc',
      },
    });

    this.socket.on(
      'new-content-hierarchy',
      this._handleNewPlaybookHierarchyVersion,
    );

    this.socket.on('connect', () => {
      console.error('Connected :)');
    });

    this.socket.on('connect_error', (error) => {
      console.error(error);
    });
  }

  _handleNewPlaybookHierarchyVersion(data: any) {
    console.log('New playbook hierarchy', data);
  }
}
