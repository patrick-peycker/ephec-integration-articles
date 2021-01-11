import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  base : string = 'http://localhost:5001/';

  constructor() { }
}
