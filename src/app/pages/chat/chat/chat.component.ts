import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { user: string; text: string }[] = [];
  newMessage: string = '';
  userId: string;

  constructor(private webSocketService: WebSocketService) {
    // Simula un ID único para cada usuario.
    this.userId = `User-${Math.floor(Math.random() * 1000)}`;
  }

  ngOnInit() {
    this.webSocketService.setNameEvent('chat');

    // Escucha mensajes del backend.
    this.webSocketService.callback.subscribe((data) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message = { user: this.userId, text: this.newMessage };
      this.webSocketService.emitEvent(message); // Envía al backend.
      this.newMessage = '';
    }
  }
}
