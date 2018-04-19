import { Component, Input, OnInit } from '@angular/core';

@Component ({
    selector: 'loading'
    , templateUrl: 'app/loading/loading.component.html',
    styleUrls: ['app/loading/loading-bars.css']
})

export class LoadingComponent implements OnInit{
    ngOnInit(): void {
        //console.log(this.message);
    }
    @Input() message: string
    //title: string = this.message;
}