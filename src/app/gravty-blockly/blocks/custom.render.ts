import {
  InsideCorners,
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
    this.NOTCH_OFFSET_LEFT = 7;
    this.MEDIUM_PADDING = 8;
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
}

// For Reeference: https://github.com/google/blockly/blob/develop/core/renderers/common/info.ts
class CustomRenderInfo extends Blockly.blockRendering.RenderInfo {
  constructor(
    public renderer: Blockly.blockRendering.Renderer,
    public block: Blockly.BlockSvg
  ) {
    super(renderer, block);
  }

  protected override addElemSpacing_() {
    for (let i = 0, row; (row = this.rows[i]); i++) {
      const oldElems = row.elements;
      row.elements = [];
      // No spacing needed before the corner on the top row or the bottom row.
      if (row.startsWithElemSpacer()) {
        // There's a spacer before the first element in the row.
        row.elements.push(
          new Blockly.blockRendering.InRowSpacer(
            this.constants_,
            this.getInRowSpacing_(null, oldElems[0]) + 5
          )
        );
      }
      if (!oldElems.length) {
        continue;
      }
      for (let e = 0; e < oldElems.length - 1; e++) {
        row.elements.push(oldElems[e]);
        const spacing =
          this.getInRowSpacing_(oldElems[e], oldElems[e + 1]) +
          (row instanceof Blockly.blockRendering.BottomRow ? 0 : 4);
        row.elements.push(
          new Blockly.blockRendering.InRowSpacer(this.constants_, spacing)
        );
      }
      row.elements.push(oldElems[oldElems.length - 1]);
      if (row.endsWithElemSpacer()) {
        // There's a spacer after the last element in the row.
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
    if (this.rows.length <= 5) return;

    // Logic to trim extra edges from the last row
    let rowWidth = 0;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      if (row instanceof Blockly.blockRendering.InputRow) {
        const extraWidth = row.elements[row.elements.length - 1].width;
        row.width -= extraWidth;
        rowWidth = row.width;
      }

      if (row instanceof Blockly.blockRendering.BottomRow) {
        row.width = rowWidth;
        const computedWidth = row.elements.reduce((acc, curr) => {
          if (curr instanceof Blockly.blockRendering.InRowSpacer) {
            return acc;
          }
          return acc - curr.width;
        }, rowWidth);

        row.elements.forEach((element) => {
          element.width = 0;
        });
        row.elements[row.elements.length - 2].width = computedWidth;
      }
    }
  }

  protected override getSpacerRowHeight_(
    _prev: Blockly.blockRendering.Row,
    _next: Blockly.blockRendering.Row
  ): number {
    if (
      _prev instanceof Blockly.blockRendering.TopRow ||
      ['activity_criteria', 'if_generic_adaptive'].includes(this.block.type)
    )
      return 0;
    if (
      _next instanceof Blockly.blockRendering.InputRow &&
      _prev instanceof Blockly.blockRendering.InputRow
    )
      return 4;
    return this.constants_.MEDIUM_PADDING;
  }
}
