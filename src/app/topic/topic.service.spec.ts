import { TestBed } from '@angular/core/testing';

import { topicService } from './topic.service';

describe('topicService', () => {
  let service: topicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(topicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
