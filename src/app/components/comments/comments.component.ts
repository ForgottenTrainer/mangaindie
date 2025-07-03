import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

interface Comment {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: Date;
  content: string;
  likes: number;
  replies?: Comment[]; // For nested comments, if you want to implement
}
@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent { 
  newComment: string = '';
  replyText: string = '';
  showReplyForm: boolean = false;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  likes: number = 124;
  dislikes: number = 3;

  constructor() { }

  // Método para enviar comentario
  submitComment(): void {
    if (this.newComment.trim()) {
      console.log('Nuevo comentario:', this.newComment);
      // Aquí iría la lógica para enviar el comentario al backend
      this.newComment = '';
    }
  }

  // Método para dar like
  toggleLike(): void {
    if (this.isLiked) {
      this.likes--;
      this.isLiked = false;
    } else {
      this.likes++;
      this.isLiked = true;
      
      // Si tenía dislike, quitarlo
      if (this.isDisliked) {
        this.dislikes--;
        this.isDisliked = false;
      }
    }
  }

  // Método para dar dislike
  toggleDislike(): void {
    if (this.isDisliked) {
      this.dislikes--;
      this.isDisliked = false;
    } else {
      this.dislikes++;
      this.isDisliked = true;
      
      // Si tenía like, quitarlo
      if (this.isLiked) {
        this.likes--;
        this.isLiked = false;
      }
    }
  }

  // Método para mostrar/ocultar formulario de respuesta
  toggleReply(): void {
    this.showReplyForm = !this.showReplyForm;
    if (!this.showReplyForm) {
      this.replyText = '';
    }
  }

  // Método para cancelar respuesta
  cancelReply(): void {
    this.showReplyForm = false;
    this.replyText = '';
  }

  // Método para enviar respuesta
  submitReply(): void {
    if (this.replyText.trim()) {
      console.log('Nueva respuesta:', this.replyText);
      // Aquí iría la lógica para enviar la respuesta al backend
      this.replyText = '';
      this.showReplyForm = false;
    }
  }

  // Método para cargar más comentarios
  loadMore(): void {
    console.log('Cargando más comentarios...');
    // Aquí iría la lógica para cargar más comentarios del backend
  }

}
