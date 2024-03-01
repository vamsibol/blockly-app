import {
  InsideCorners,
  Notch,
  OutsideCorners,
} from 'blockly/core/renderers/common/constants';
import * as Blockly from 'blockly/core';

export class CustomRenderer extends Blockly.blockRendering.Renderer {
  constructor() {
    super('custom_renderer');
  }

  override makeConstants_() {
    return new CustomConstantProvider();
  }

  protected override makeRenderInfo_(
    block: Blockly.BlockSvg
  ): Blockly.blockRendering.RenderInfo {
    return new CustomRenderInfo(this, block);
  }
}

// For Reference: https://developers.google.com/blockly/reference/js/blockly.blockrendering_namespace.constantprovider_class

class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
  constructor() {
    super();
    this.NOTCH_WIDTH = 0;
    this.NOTCH_HEIGHT = 0;
    this.NOTCH_OFFSET_LEFT = 8;
    this.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 0;
  }
  override makeOutsideCorners(): OutsideCorners {
    const topLeft =
      Blockly.utils.svgPaths.moveBy(0, this.CORNER_RADIUS) +
      Blockly.utils.svgPaths.lineTo(this.CORNER_RADIUS, -this.CORNER_RADIUS);
    const bottomLeft = Blockly.utils.svgPaths.lineTo(-this.CORNER_RADIUS, 0);

    return {
      ...super.makeOutsideCorners(),
      topLeft,
      bottomLeft,
      bottomRight: '',
      topRight: '',
      rightHeight: 0,
    };
  }
  protected override makeInsideCorners(): InsideCorners {
    const radius = this.CORNER_RADIUS;

    const pathTop = Blockly.utils.svgPaths.arc(
      'a',
      '0 0,0',
      0,
      Blockly.utils.svgPaths.point(-radius, radius)
    );

    const pathBottom = '';

    return {
      ...super.makeInsideCorners(),
      pathTop,
      pathBottom,
      height: 2,
      width: radius,
    };
  }

  protected override makeNotch(): Notch {
    return {
      ...super.makeNotch(),
      pathLeft: '',
      pathRight: '',
      width: 0,
    };
  }
}

class CustomRenderInfo extends Blockly.blockRendering.RenderInfo {
  constructor(
    public renderer: Blockly.blockRendering.Renderer,
    public block: Blockly.BlockSvg
  ) {
    super(renderer, block);
  }

  protected override addElemSpacing_(): void {
    for (let i = 0, row; (row = this.rows[i]); i++) {
      const oldElems = row.elements;

      row.elements = [];
      // No spacing needed before the corner on the top row or the bottom row.
      if (row.startsWithElemSpacer()) {
        // There's a spacer before the first element in the row.
        row.elements.push(
          new Blockly.blockRendering.InRowSpacer(
            this.constants_,
            this.getInRowSpacing_(null, oldElems[0]) + 8
          )
        );
      }
      if (!oldElems.length) {
        continue;
      }

      for (let e = 0; e < oldElems.length - 1; e++) {
        if (i !== this.rows.length - 1) {
          row.elements.push(oldElems[e]);
        }
        const spacing = this.getInRowSpacing_(oldElems[e], oldElems[e + 1]);
        row.elements.push(
          new Blockly.blockRendering.InRowSpacer(this.constants_, spacing + 8)
        );
      }

      row.elements.push(oldElems[oldElems.length - 1]);
      if (row.endsWithElemSpacer()) {
        row.elements.push(
          new Blockly.blockRendering.InRowSpacer(
            this.constants_,
            this.getInRowSpacing_(oldElems[oldElems.length - 1], null) + 16
          )
        );
      }
    }
  }
  override measure() {
    super.measure();

    // Logic to 
    let currentRowWidth = 0;
    for (let i = 0, row; (row = this.rows[i]); i++) {
      if (row instanceof Blockly.blockRendering.InputRow) {
        const extraWidth = row.elements[row.elements.length - 1].width;
        row.width -= extraWidth;
        currentRowWidth = row.width;
      }
      if (i == this.rows.length - 1) {
        row.elements = [row.elements[0]];
        row.elements.map((elem) => {
          elem.width = currentRowWidth;
        });
      }
    }
  }
}
