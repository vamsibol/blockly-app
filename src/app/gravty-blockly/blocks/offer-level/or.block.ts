import { CustomBlock } from '../../ngx-blockly/models/custom-block';

export class OrBlock extends CustomBlock {
  constructor() {
    super('or');
    this.class = OrBlock;
  }
  override defineBlock() {
    this.block.appendDummyInput().appendField('OR');
    this.block
      .appendStatementInput('OPERAND1')
      .setCheck(['If', 'Filter', 'OR'])
      .appendField(' ');
    this.block
      .appendStatementInput('OPERAND2')
      .setCheck(['If', 'Filter', 'OR'])
      .appendField(' ');
    this.block.setPreviousStatement(true, ['OR', 'If']);
    this.block.setNextStatement(true, ['OR', 'If']);
    this.block.setColour('#9E2B56');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
