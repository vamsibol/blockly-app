import { Component } from '@angular/core';
import {
  NgxBlocklyConfig,
  NgxBlocklyGenerator,
} from './gravty-blockly/ngx-blockly/ngx-blockly.config';
import { CustomRenderer } from './gravty-blockly/blocks/custom.render';
import { EventBlock } from './gravty-blockly/blocks/offer-level/event.block';
import { OfferActivityBlock } from './gravty-blockly/blocks/offer-level/offer-activity.block';
import { OfferGenericBlock } from './gravty-blockly/blocks/offer-level/offer-generic.block';
import { OrBlock } from './gravty-blockly/blocks/offer-level/or.block';
import { Category } from './gravty-blockly/ngx-blockly/models/category';
import { CustomBlock } from './gravty-blockly/ngx-blockly/models/custom-block';
import { NgxBlocklyToolbox } from './gravty-blockly/ngx-blockly/plugins/ngx-blockly.toolbox';
import * as Blockly from 'blockly/core';
import { createPlayground } from '@blockly/dev-tools';
import { NgxBlocklyComponent } from './gravty-blockly/ngx-blockly/ngx-blockly.component';
import { RuleBlock } from './gravty-blockly/blocks/rule-level/rule.block';
import { FilterBlock } from './gravty-blockly/blocks/offer-level';
import { MyCustomTextField } from './gravty-blockly/fields/typeahead.field';

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
    collapse: true,
    comments: true,
  };

  offerLevelBlocks: CustomBlock[] = [
    new OfferGenericBlock(),
    new OfferActivityBlock(),
    new EventBlock(),
    new OrBlock(),
    new FilterBlock(),
  ];
  ruleLevelBlocks: CustomBlock[] = [new RuleBlock()];

  constructor() {
    Blockly.blockRendering.register('custom_renderer', CustomRenderer);
    const workspace = new Blockly.WorkspaceSvg(new Blockly.Options({}));
    const toolbox: NgxBlocklyToolbox = new NgxBlocklyToolbox(workspace);
    toolbox.nodes = [
      new Category('Offer Level Block', '', [...this.offerLevelBlocks]),
      new Category('Rule Level Block', '', [...this.ruleLevelBlocks]),
    ];
    this.config.toolbox = toolbox.toXML();
    this.config.renderer = 'custom_renderer';
    Blockly.fieldRegistry.register('my_custom_text_field', MyCustomTextField);

    NgxBlocklyComponent.initCustomBlocks([
      ...this.offerLevelBlocks,
      ...this.ruleLevelBlocks,
    ]);
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
