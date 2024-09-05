import * as Blockly from 'blockly';
// Ref: https://github.com/google/blockly-samples/blob/master/examples/pitch-field-demo/field_pitch.js
export class MyCustomTextField extends Blockly.FieldDropdown {
  constructor(menuGenerator: Blockly.MenuGenerator, validator, config) {
    super(menuGenerator, validator, config);
  }
  searchKey: string = '';
  override showEditor() {
    super.showEditor_();
    this.searchKey = '';
    const editor = document.createElement('div');
    editor.style.display = 'flex';
    editor.style.flexDirection = 'column';
    editor.style.width = '100px';

    const input = document.createElement('input');

    editor.appendChild(input);
    const x = this.renderOptions();
    editor.appendChild(x);

    input.oninput = (e) => {
      console.log('onchange', (e.target as HTMLInputElement).value);

      this.searchKey = (e.target as HTMLInputElement).value;
      editor.removeChild(document.getElementById('myDropdown'));
      const x = this.renderOptions();
      editor.appendChild(x);
    };
    Blockly.DropDownDiv.getContentDiv().innerHTML = '';
    Blockly.DropDownDiv.getContentDiv().appendChild(editor);
    Blockly.DropDownDiv.showPositionedByField(this, () => {});
  }

  renderOptions() {
    const x = document.createElement('div');
    x.style.display = 'flex';
    x.style.flexDirection = 'column';
    x.id = 'myDropdown';
    this.getOptions()
      .filter((item) =>
        (item[0] as string).toLowerCase().includes(this.searchKey.toLowerCase())
      )
      .forEach((element) => {
        const option = document.createElement('button');
        option.onclick = () => {
          this.setValue(element[1]);
          this.hide_();
        };
        option.appendChild(document.createTextNode(element[0] as string));
        x.appendChild(option);
      });

    return x;
  }

  hide_() {
    this.searchKey = '';
    Blockly.WidgetDiv.hide();
    Blockly.DropDownDiv.hideWithoutAnimation();
  }
}
