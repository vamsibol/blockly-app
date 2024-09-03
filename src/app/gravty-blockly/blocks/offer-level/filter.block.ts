import { MyCustomTextField } from '../../fields/typeahead.field';
import { CustomBlock } from '../../ngx-blockly/models/custom-block';

import * as Blockly from 'blockly/core';

export class FilterBlock extends CustomBlock {
  constructor() {
    super('activity_criteria');
    this.class = FilterBlock;
  }
  override defineBlock() {
    // Blockly.FIeld
    let lhs_dropdown = new MyCustomTextField(
      [
        ['--', ''],
        ['BIT', 'activity'],
        ['Member', 'member'],
        ['Sponsor', 'sponsor'],
        ['Location', 'location'],
        ['Airport', 'airport'],
      ],
      (x) => {
        return x;
      },
      {
        tooltip: 'Select the left-hand side of the filter',
      }
    );

    this.block
      .appendDummyInput()
      .appendField('Filter')
      .appendField(lhs_dropdown, 'OBJECT');

    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, ['Filter', 'OR']);
    this.block.setNextStatement(true, ['Filter', 'OR']);
    this.block.setColour('#e75959');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
