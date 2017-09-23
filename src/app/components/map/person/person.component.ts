import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person',
  outputs: ['questionBeenAsked', 'playSound'],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnChanges {
  @Input() userLanguage: string; // Browser language
  @Input() person: any; // Item on a map representing a person
  @Input() content: Array<any>; // Array of requests/responses
  @Input() timeouts: Array<any>;
  @Input() index: number;
  @Input() reset: boolean;
  @Input() questionBeenAnswered: Object;

  opacity: number;
  fade: boolean;
  shake: boolean;
  request: any;
  responseId: number;
  showRequestBubble: boolean;
  showResponseBubble: boolean;
  questionBeenAsked: EventEmitter<Object>;
  playSound: EventEmitter<number>;

  constructor() {
    this.questionBeenAsked = new EventEmitter();
    this.playSound = new EventEmitter();
    this.showRequestBubble = false;
    this.showResponseBubble = false;

  }

  ngOnInit() {
    // Persons avatars fade-in with random delay
    setTimeout(()=>{
      this.opacity = 1;
    }, Math.floor(Math.random() * 900) + 1 )

    this.request = this.content[this.person['requestId']];
    this.responseId = 0;
  }

  clickOnPerson() {

    // clear all previous animations
    for (var i=0; i<this.timeouts.length; i++) {
      if (this.timeouts[i]) {
        clearTimeout(this.timeouts[i]);
      }
    }

    // reset
    this.fade = false;

    this.showRequestBubble = true;
    this.questionBeenAsked.emit({'senderIndex': this.index, 'requestId': this.person['requestId']});
  }

  clickOnResponseBubble() {
    console.log('clickOnResponse');
    this.playSound.emit(this.responseId);
  }

  // Every person listens for questions
  ngOnChanges(changes: SimpleChanges) {

    let answer = changes['questionBeenAnswered'];

    let reset = changes['reset'];
    // console.log('ngOnChanges');
    // console.log(reset.currentValue);

    if (answer.currentValue) {

      // hide all people apart from the sender
      if (answer.currentValue['senderIndex'] !== this.index) {
        this.fade = true;
        this.showRequestBubble = false;
        this.showResponseBubble = false;
        this.shake = false;
      }

      // check if person has answer to request
      if (this.person['responseIds'].indexOf(answer.currentValue['requestId']) >= 0) {

        // update response bubble content
        this.responseId = answer.currentValue['requestId']

        // animate person
        this.timeouts.push(
          setTimeout(()=>{
              this.fade = false;
              this.shake = true;
          }, 1200)
        )

        // show bubble
        this.timeouts.push(
          setTimeout(()=>{
            this.showResponseBubble = true;
          }, 2400)
        )
      }
    }

  }


}
