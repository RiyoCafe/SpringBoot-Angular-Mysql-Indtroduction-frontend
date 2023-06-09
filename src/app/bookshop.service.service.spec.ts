import { TestBed } from '@angular/core/testing';

import { BookshopServiceService } from './bookshop.service.service';

describe('BookshopServiceService', () => {
  let service: BookshopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookshopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
