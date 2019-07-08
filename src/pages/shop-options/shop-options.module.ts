import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopOptionsPage } from './shop-options';

@NgModule({
  declarations: [
    ShopOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopOptionsPage),
  ],
})
export class ShopOptionsPageModule {}
