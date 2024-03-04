import * as Blockly from 'blockly/core';
import { CustomBlock } from '../../ngx-blockly/models/custom-block';

export class OfferGenericBlock extends CustomBlock {
  constructor() {
    super('offer_generic');
    this.class = OfferGenericBlock;
  }

  public defineBlock() {
    this.block.appendDummyInput().appendField('Offer');
    this.block
      .appendStatementInput('activities')
      .setCheck('Activity')
      .appendField('A');
    this.block
      .appendStatementInput('events')
      .setCheck('Event')
      .appendField('E');
    this.block.setInputsInline(false);
    this.block.setColour('#2c3241');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  public override toPythonCode(block: Blockly.Block): string | any[] {
    return '';
  }
}
