import { HighlightDirective } from './highlight.directive';

import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
	const el: ElementRef = null;
    const renderer: Renderer2 = null;

  it('should create an instance', () => {
     const directive = new HighlightDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
