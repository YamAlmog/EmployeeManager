import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ // pipe is a way to transform data in Angular templates before displaying it
  name: 'highlight', // name used in the template (html file)
  standalone: true // makes the pipe available to the entire application
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string { 
    // value is the text to search in, search is the text to highlight
    if (!search) return value; // if search is empty, return the value

    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escaped, 'gi');   // create a case-insensitive, global RegExp to find all search matches
    
    return value.replace(re, match => `<span class="highlight">${match}</span>`);   // Wrap each match in a <span> for highlighting
  }
} 