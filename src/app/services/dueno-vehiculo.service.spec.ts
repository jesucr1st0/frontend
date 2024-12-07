import { TestBed } from '@angular/core/testing';

import { DuenoVehiculoService } from './dueno-vehiculo.service';

describe('DuenoVehiculoService', () => {
  let service: DuenoVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuenoVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
