import { Blockly, CustomBlock } from 'ngx-blockly';

export class RuleBlock extends CustomBlock {
  constructor() {
    super('rule');
    this.class = RuleBlock;
  }

  override defineBlock() {
    this.block
      .appendDummyInput()
      .appendField('Payment Rule')
      .appendField(new Blockly.FieldTextInput('tag'), 'IDENTIFIER');

    this.block
      .appendStatementInput('CONDITION')
      .setCheck(['If Payment'])
      .appendField('C');
    this.block
      .appendStatementInput('ACTION')
      .setCheck(['Action'])
      .appendField('A');
    this.block.setPreviousStatement(true, ['Rule']);
    this.block.setNextStatement(true, ['Rule']);
    this.block.setColour('#2fc5a8');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
