import { CustomBlock } from '../../ngx-blockly/models/custom-block';
import * as Blockly from 'blockly/core';

export class OrBlock extends CustomBlock {
  constructor() {
    super('or');
    this.class = OrBlock;
  }
  override defineBlock() {
    this.block
      .appendDummyInput()
      .appendField('Rule')
      .appendField(new Blockly.FieldTextInput('tag'), 'IDENTIFIER');
    this.block
      .appendStatementInput('CONDITION')
      .setCheck(null)
      .appendField('C');
    this.block
      .appendValueInput('REDEEM_ACTION')
      .appendField('Redeem ' + 0 + ' ' + 100)
      .appendField(new Blockly.FieldDropdown([['--', '']]), 'operator');

    this.block.setPreviousStatement(true);
    this.block.setNextStatement(true);
    this.block.setColour('#8a69c8');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
