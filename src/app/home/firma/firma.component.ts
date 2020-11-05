import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { DrawingPad } from 'nativescript-drawingpad';
import { Page, View } from "tns-core-modules/ui/page";
import { screen } from 'tns-core-modules/platform';
import { orientation } from 'tns-core-modules/application/application';
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'ns-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions, private page: Page) {
  }

  ngOnInit(): void {
  }

  cancelar() {
    this.routerExtensions.navigate(["/home"], { clearHistory: true });
  }

  public getMyDrawing() {
    const drawingPad = this.page.getViewById('myDrawingPad') as DrawingPad;
    console.log("drawing: " + drawingPad);
    drawingPad.getDrawing().then((res) => {
      console.log(res);
    });
  }

  public clearMyDrawing() {
    const drawingPad = this.page.getViewById('myDrawingPad') as DrawingPad;
    drawingPad.clearDrawing();
  }

}
