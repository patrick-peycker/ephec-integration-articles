import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  values: string[];
  endpoint: string = '/api/values/index';

  constructor(private http: HttpClient, private helper: HelperService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("jwt");
    this.http.get<string[]>(
      this.helper.base + this.endpoint,
      { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) }
    ).subscribe(
      content => {this.values = content},
      error => { console.log('signin error into Value Component' + JSON.stringify(error)); }
    )
  }
}
