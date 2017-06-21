import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  userLanguage: string;
  people: Array<Object>;
  content: Array<Object>;
  timeouts: Array<Object>;
  questionBeenAnswered: Object; 
  playData: Array<Object>;
  reset: boolean;

  constructor(private http: Http) {
    this.getData();
  }

  ngOnInit() {
    this.userLanguage = 'en';
    this.timeouts = [];
    this.playData = [];
    this.reset = false;    
  }

  getData(): void {
    this.http.request('assets/data.json')
      .subscribe((res: Response) => {
        this.people = res.json().people;
        this.content = res.json().content;
        this.loadSounds();
      })
  }

  questionBeenAsked(data: Object) {
    this.reset = true;
    this.questionBeenAnswered = data;
  }

  playSound(index: number) {
    this.stopAll();
    this.playData[index].play(); 
  }

  stopAll(): void {
    for (var i = 0; i < this.content.length; i++) {
      if (this.content[i]) {
        this.playData[i].stop();
      }
    }
  }

  loadSounds() {
    for (var i = 0; i < this.content.length; i++) {        
      var sound = new Howl({
        src: [this.content[i]['sound']]
      });
      this.playData.push(sound);
    } 
  }

  

}
