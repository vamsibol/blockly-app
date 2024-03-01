import { Component } from '@angular/core';
import {
  NgxBlocklyConfig,
  NgxBlocklyGenerator,
} from './gravty-blockly/ngx-blockly/ngx-blockly.config';
import { CustomRenderer } from './blocks/custom.render';
import { EventBlock } from './blocks/offer-level/event.block';
import { OfferActivityBlock } from './blocks/offer-level/offer-activity.block';
import { OfferGenericBlock } from './blocks/offer-level/offer-generic.block';
import { OrBlock } from './blocks/offer-level/or.block';
import { Category } from './gravty-blockly/ngx-blockly/models/category';
import { CustomBlock } from './gravty-blockly/ngx-blockly/models/custom-block';
import { NgxBlocklyToolbox } from './gravty-blockly/ngx-blockly/plugins/ngx-blockly.toolbox';
import './blocks/offer-level';
import * as Blockly from 'blockly/core';
import { createPlayground } from '@blockly/dev-tools';
import { NgxBlocklyComponent } from './gravty-blockly/ngx-blockly/ngx-blockly.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blockly-poc';
  public config: NgxBlocklyConfig = {
    trashcan: true,
    generators: [
      NgxBlocklyGenerator.DART,
      NgxBlocklyGenerator.LUA,
      NgxBlocklyGenerator.JAVASCRIPT,
      NgxBlocklyGenerator.PHP,
      NgxBlocklyGenerator.PYTHON,
      NgxBlocklyGenerator.XML,
    ],
    defaultBlocks: true,
    horizontalLayout: true,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    move: {
      scrollbars: true,
      wheel: true,
    },
  };

  customBlocks: CustomBlock[] = [
    new OfferGenericBlock(),
    new OfferActivityBlock(),
    new EventBlock(),
    new OrBlock(),
  ];

  constructor() {
    Blockly.blockRendering.register('custom_renderer', CustomRenderer);
    const workspace = new Blockly.WorkspaceSvg(new Blockly.Options({}));
    const toolbox: NgxBlocklyToolbox = new NgxBlocklyToolbox(workspace);
    toolbox.nodes = [
      new Category('Offer Level Block', '', [...this.customBlocks]),
      new Category('Rule Level Block', '', []),
    ];
    this.config.toolbox = toolbox.toXML();
    this.config.renderer = 'custom_renderer';

    NgxBlocklyComponent.initCustomBlocks(this.customBlocks);
    // this.config.rendererOverrides
  }

  ngAfterViewInit() {
    createPlayground(
      document.getElementById('blocklyDiv'),
      (blocklyDiv, options) => {
        return Blockly.inject(blocklyDiv, options);
      },
      this.config
    );
  }
}
