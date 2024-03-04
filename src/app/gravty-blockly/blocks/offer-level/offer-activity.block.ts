import { CustomBlock } from '../../ngx-blockly/models/custom-block';

export class OfferActivityBlock extends CustomBlock {
  constructor() {
    super('activity');
    this.class = OfferActivityBlock;
  }
  override defineBlock() {
    this.block.appendDummyInput().appendField('On Activity');
    this.block
      .appendStatementInput('ACTIVITY_CRITERIA')
      .setCheck(['Filter', 'OR'])
      .appendField('F');
    this.block.appendStatementInput('RULES').setCheck('Rule').appendField('R');
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, 'Activity');
    this.block.setNextStatement(true, 'Activity');
    this.block.setColour('#405f97');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
