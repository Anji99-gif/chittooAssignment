import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chittooApp';

  constructor(private router: Router){

  }

  navigateTo(val: any){
    if(val=='users'){
      this.router.navigate(['/users'])
    }else if(val=='winners'){
      this.router.navigate(['/winners'])
    }else{
      this.router.navigate(['/toppers'])

    }
  }
}
