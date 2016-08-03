"use strict";

exports.__esModule = true;
exports.isSelected = isSelected;
exports.slotWidth = slotWidth;
exports.getCellAtX = getCellAtX;
exports.pointInBox = pointInBox;
exports.dateCellSelection = dateCellSelection;
function isSelected(event, selected) {
  if (!event || selected == null) return false;
  return [].concat(selected).indexOf(event) !== -1;
}

function slotWidth(rowBox, slots) {
  var rowWidth = rowBox.right - rowBox.left;
  var cellWidth = rowWidth / slots;

  return cellWidth;
}

function getCellAtX(rowBox, x, cellWidth) {
  return Math.floor((x - rowBox.left) / cellWidth);
}

function pointInBox(box, _ref) {
  var x = _ref.x;
  var y = _ref.y;

  return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
}

function dateCellSelection(start, rowBox, box, slots) {
  var startIdx = -1;
  var endIdx = -1;
  var lastSlotIdx = slots - 1;

  var cellWidth = slotWidth(rowBox, slots);

  // cell under the mouse
  var currentSlot = getCellAtX(rowBox, box.x, cellWidth);

  // Identify row as either the initial row
  // or the row under the current mouse point
  var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
  var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;

  // this row's position relative to the start point
  var isAboveStart = start.y > rowBox.bottom;
  var isBelowStart = rowBox.top > start.y;
  var isBetween = box.top < rowBox.top && box.bottom > rowBox.bottom;

  // this row is between the current and start rows, so entirely selected
  if (isBetween) {
    startIdx = 0;
    endIdx = lastSlotIdx;
  }

  if (isCurrentRow) {
    if (isBelowStart) {
      startIdx = 0;
      endIdx = currentSlot;
    } else if (isAboveStart) {
      startIdx = currentSlot;
      endIdx = lastSlotIdx;
    }
  }

  if (isStartRow) {
    // select the cell under the initial point
    startIdx = endIdx = Math.floor((start.x - rowBox.left) / cellWidth);

    if (isCurrentRow) {
      if (currentSlot < startIdx) startIdx = currentSlot;else endIdx = currentSlot; //select current range
    }
    // the current row is below start row
    else if (start.y < box.y) {
        // select cells to the right of the start cell
        endIdx = lastSlotIdx;
      } else {
        // select cells to the left of the start cell
        startIdx = 0;
      }
  }

  return { startIdx: startIdx, endIdx: endIdx };
}