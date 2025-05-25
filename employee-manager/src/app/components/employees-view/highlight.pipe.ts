import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search) return value;
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escaped, 'gi');   // create a case-insensitive, global RegExp to find all search matches
    return value.replace(re, match => `<span class="highlight">${match}</span>`);   // Wrap each match in a <span> for highlighting
  }
} 