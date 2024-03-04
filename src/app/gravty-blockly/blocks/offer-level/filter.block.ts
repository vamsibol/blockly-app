import { CustomBlock } from '../../ngx-blockly/models/custom-block';

import * as Blockly from 'blockly/core';

export class FilterBlock extends CustomBlock {
  constructor() {
    super('activity_criteria');
    this.class = FilterBlock;
  }
  override defineBlock() {
    const lhs_dropdown = new Blockly.FieldDropdown([
      ['--', ''],
      ['BIT', 'activity'],
      ['Member', 'member'],
      ['Sponsor', 'sponsor'],
      ['Location', 'location'],
      ['Airport', 'airport'],
    ]);

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
