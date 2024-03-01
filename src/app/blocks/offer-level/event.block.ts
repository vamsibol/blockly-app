import { CustomBlock } from "src/app/gravty-blockly/ngx-blockly/models/custom-block";


export class EventBlock extends CustomBlock {
  constructor() {
    super('event');
    this.class = EventBlock;
  }
  override defineBlock() {
    this.block.appendDummyInput().appendField('On Event');
    this.block
      .appendStatementInput('RULES')
      .setCheck('Rule')
      .appendField('Rules');
    this.block.setInputsInline(true);
    this.block.setPreviousStatement(true, 'Event');
    this.block.setNextStatement(true, 'Event');
    this.block.setColour('#59ae00');
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }
}
