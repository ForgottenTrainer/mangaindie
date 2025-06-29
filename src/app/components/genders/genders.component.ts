import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Genre {
  value: string;
  name: string;
  color: string;
  count: number;
  selected: boolean;
}

@Component({
  selector: 'app-genders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './genders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GendersComponent { 
  @Output() onGenresSelected = new EventEmitter<string[]>();

  searchTerm: string = '';
  selectedGenres: string[] = [];
  
  genres: Genre[] = [
    { value: 'action', name: 'Acción', color: 'red', count: 156, selected: false },
    { value: 'romance', name: 'Romance', color: 'pink', count: 89, selected: false },
    { value: 'comedy', name: 'Comedia', color: 'yellow', count: 203, selected: false },
    { value: 'drama', name: 'Drama', color: 'purple', count: 74, selected: false },
    { value: 'fantasy', name: 'Fantasía', color: 'indigo', count: 112, selected: false },
    { value: 'scifi', name: 'Sci-Fi', color: 'cyan', count: 67, selected: false },
    { value: 'horror', name: 'Terror', color: 'gray', count: 43, selected: false },
    { value: 'adventure', name: 'Aventura', color: 'green', count: 128, selected: false },
    { value: 'mystery', name: 'Misterio', color: 'amber', count: 56, selected: false },
    { value: 'slice-of-life', name: 'Slice of Life', color: 'teal', count: 91, selected: false },
    { value: 'supernatural', name: 'Sobrenatural', color: 'violet', count: 78, selected: false },
    { value: 'sports', name: 'Deportes', color: 'orange', count: 45, selected: false }
  ];

  filteredGenres: Genre[] = [...this.genres];

  constructor(private cdr: ChangeDetectorRef) {}

  filterGenres() {
    if (!this.searchTerm.trim()) {
      this.filteredGenres = [...this.genres];
    } else {
      this.filteredGenres = this.genres.filter(genre => 
        genre.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.cdr.markForCheck();
  }

  onGenreChange(genre: Genre, event: any) {
    genre.selected = event.target.checked;
    this.updateSelectedGenres();
  }

  updateSelectedGenres() {
    this.selectedGenres = this.genres
      .filter(genre => genre.selected)
      .map(genre => genre.value);
    
    // Emitir evento para filtrar contenido
    this.onGenresSelected.emit(this.selectedGenres);
    this.cdr.markForCheck();
  }

  selectAll() {
    const allSelected = this.genres.every(genre => genre.selected);
    this.genres.forEach(genre => genre.selected = !allSelected);
    this.updateSelectedGenres();
  }

  clearFilters() {
    this.genres.forEach(genre => genre.selected = false);
    this.searchTerm = '';
    this.filteredGenres = [...this.genres];
    this.updateSelectedGenres();
  }

  trackByGenre(index: number, genre: Genre): string {
    return genre.value;
  }

  getGenreClasses(color: string): string {
    const colorMap: { [key: string]: string } = {
      'red': 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-500/30',
      'pink': 'bg-pink-100 dark:bg-pink-500/20 text-pink-800 dark:text-pink-400 border border-pink-200 dark:border-pink-500/30',
      'yellow': 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30',
      'purple': 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30',
      'indigo': 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30',
      'cyan': 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30',
      'gray': 'bg-gray-200 dark:bg-gray-600/50 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-500/30',
      'green': 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-500/30',
      'amber': 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30',
      'teal': 'bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30',
      'violet': 'bg-violet-100 dark:bg-violet-500/20 text-violet-800 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30',
      'orange': 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30'
    };
    return colorMap[color] || colorMap['gray'];
  }
}