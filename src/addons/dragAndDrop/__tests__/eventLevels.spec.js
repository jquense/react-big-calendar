import addDays from 'date-fns/add_days';
import getDate from 'date-fns/get_date';
import getHours from 'date-fns/get_hours';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import reorderLevels, { bubbleDownSeg } from '../eventLevels';

const seg = (left, right, span, level, event) => ({ left, right, span, level, event });

const singleSpanLevels = [
  [seg(1, 1, 1, 0, 0)],
  [seg(1, 1, 1, 1, 1)],
  [seg(1, 1, 1, 2, 2)],
  [seg(1, 1, 1, 3, 3)],
  [seg(1, 1, 1, 4, 4)],
];

const singleSpanSegsMultiplePerRow = [
  [seg(1, 1, 1, 0, 0), seg(2, 2, 1, 0, 1)],
  [seg(1, 1, 1, 1, 2), seg(2, 2, 1, 1, 3), seg(3, 3, 1, 1, 4)],
  [seg(1, 1, 1, 2, 5), seg(2, 2, 1, 2, 6)],
  [seg(1, 1, 1, 3, 7), seg(2, 2, 1, 3, 8), seg(3, 3, 1, 3, 9), seg(4, 4, 1, 3, 10)],
];

const multiSpanSegs = [
  [seg(2, 6, 5, 0, 0), seg(7, 7, 1, 0, 1)],
  [seg(2, 2, 1, 1, 2), seg(4, 4, 1, 1, 3), seg(6, 6, 1, 1, 4), seg(7, 7, 1, 1, 15)],
  [seg(1, 1, 1, 2, 5), seg(2, 2, 1, 2, 6)],
  [seg(2, 2, 1, 3, 7), seg(4, 7, 4, 3, 8)],
];

describe('Vertical reorder', () => {
  describe('same span segments', () => {
    test('when drag segment position is before hover segment', () => {
      const levels = singleSpanLevels;
      const drag = levels[0][0];
      const hover = levels[1][0];
      const nextLevels = reorderLevels(levels, drag, hover);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[1][0].event).toEqual(0);
      expect(nextLevels[2][0].event).toEqual(2);
      expect(nextLevels[3][0].event).toEqual(3);
      expect(nextLevels[4][0].event).toEqual(4);

      // levels
      expect(nextLevels[0][0].level).toEqual(0);
      expect(nextLevels[1][0].level).toEqual(1);
      expect(nextLevels[2][0].level).toEqual(2);
      expect(nextLevels[3][0].level).toEqual(3);
      expect(nextLevels[4][0].level).toEqual(4);
    });
    test('when drag segment (4,0) to (1,0)', () => {
      const levels = singleSpanLevels;
      const drag = levels[4][0];
      const hover = levels[1][0];
      const nextLevels = reorderLevels(levels, drag, hover);
      expect(nextLevels[0][0].event).toEqual(0);
      expect(nextLevels[1][0].event).toEqual(4);
      expect(nextLevels[2][0].event).toEqual(1);
      expect(nextLevels[3][0].event).toEqual(2);
      expect(nextLevels[4][0].event).toEqual(3);
    });
    test('when dragging first segment over last segment', () => {
      const levels = singleSpanLevels;
      const drag = levels[0][0];
      const hover = levels[4][0];
      const nextLevels = reorderLevels(levels, drag, hover);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[1][0].event).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(3);
      expect(nextLevels[3][0].event).toEqual(4);
      expect(nextLevels[4][0].event).toEqual(0);

      // levels
      expect(nextLevels[0][0].level).toEqual(0);
      expect(nextLevels[1][0].level).toEqual(1);
      expect(nextLevels[2][0].level).toEqual(2);
      expect(nextLevels[3][0].level).toEqual(3);
      expect(nextLevels[4][0].level).toEqual(4);
    });
    test('when dragging seg 0,0 to 3,2', () => {
      const levels = singleSpanSegsMultiplePerRow;
      const drag = levels[0][0];
      const hover = levels[3][2];
      const nextLevels = reorderLevels(levels, drag, hover);

      // level 0
      expect(nextLevels[0].length).toEqual(1);
      expect(nextLevels[0][0].event).toEqual(1);

      // level 1
      expect(nextLevels[1].length).toEqual(3);
      expect(nextLevels[1][0].event).toEqual(2);
      expect(nextLevels[1][1].event).toEqual(3);
      expect(nextLevels[1][2].event).toEqual(4);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(5);
      expect(nextLevels[2][1].event).toEqual(6);

      // level 3
      expect(nextLevels[3].length).toEqual(4);
      expect(nextLevels[3][0].event).toEqual(7);
      expect(nextLevels[3][1].event).toEqual(8);
      expect(nextLevels[3][2].event).toEqual(0);
      expect(nextLevels[3][3].event).toEqual(10);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(9);
    });
    test('when dragging multi pan seg 0,1 to 1,1', () => {
      const levels = multiSpanSegs;
      const drag = levels[0][0];
      const hover = levels[1][0];
      const nextLevels = reorderLevels(levels, drag, hover);

      // level 0
      expect(nextLevels[0].length).toEqual(4);
      expect(nextLevels[0][0].event).toEqual(2);
      expect(nextLevels[0][1].event).toEqual(3);
      expect(nextLevels[0][2].event).toEqual(4);
      expect(nextLevels[0][3].event).toEqual(1);

      // level 1
      expect(nextLevels[1].length).toEqual(2);
      expect(nextLevels[1][0].event).toEqual(0);
      expect(nextLevels[1][1].event).toEqual(15);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(5);
      expect(nextLevels[2][1].event).toEqual(6);

      // level 3
      expect(nextLevels[3].length).toEqual(2);
      expect(nextLevels[3][0].event).toEqual(7);
      expect(nextLevels[3][1].event).toEqual(8);
    });
    test('when dragging multi pan seg 0,1 to 0,2', () => {
      const levels = [
        [seg(2, 2, 1, 0, 0), seg(4, 4, 1, 0, 1), seg(6, 6, 1, 0, 2), seg(7, 7, 1, 0, 3)],
        [seg(2, 6, 5, 1, 4), seg(7, 7, 1, 1, 5)],
        [seg(2, 2, 1, 2, 6), seg(4, 4, 1, 2, 7), seg(7, 7, 1, 2, 8)],
        [seg(2, 2, 1, 3, 9), seg(4, 7, 4, 3, 10)],
        [seg(4, 4, 1, 4, 11)],
      ];
      const drag = levels[1][0];
      const hover = levels[2][0];
      const nextLevels = reorderLevels(levels, drag, hover);

      // level 0
      expect(nextLevels[0].length).toEqual(4);
      expect(nextLevels[0][0].event).toEqual(0);
      expect(nextLevels[0][1].event).toEqual(1);
      expect(nextLevels[0][2].event).toEqual(2);
      expect(nextLevels[0][3].event).toEqual(3);

      // level 1
      expect(nextLevels[1].length).toEqual(3);
      expect(nextLevels[1][0].event).toEqual(6);
      expect(nextLevels[1][1].event).toEqual(7);
      expect(nextLevels[1][2].event).toEqual(5);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(4);
      expect(nextLevels[2][1].event).toEqual(8);

      // level 3
      expect(nextLevels[3].length).toEqual(2);
      expect(nextLevels[3][0].event).toEqual(9);
      expect(nextLevels[3][1].event).toEqual(10);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(11);
    });
    test('when dragging multi span seg 0,1 to 0,2', () => {
      const levels = [
        [
          { left: 2, right: 2, span: 1, level: 0, event: 0 },
          { left: 4, right: 4, span: 1, level: 0, event: 1 },
          { left: 6, right: 6, span: 1, level: 0, event: 2 },
          { left: 7, right: 7, span: 1, level: 0, event: 3 },
        ],
        [
          { left: 2, right: 2, span: 1, level: 1, event: 4 },
          { left: 4, right: 4, span: 1, level: 1, event: 5 },
          { left: 7, right: 7, span: 1, level: 1, event: 6 },
        ],
        [
          { left: 2, right: 2, span: 1, level: 2, event: 7 },
          { left: 4, right: 7, span: 4, level: 2, event: 8 },
          { left: 7, right: 7, span: 1, level: 2, event: 9 },
        ],
        [{ left: 2, right: 6, span: 5, level: 3, event: 10 }],
        [{ left: 4, right: 4, span: 1, level: 4, event: 11 }],
      ];
      const drag = levels[3][0];
      const hover = levels[2][0];
      const nextLevels = reorderLevels(levels, drag, hover);

      // level 0
      expect(nextLevels[0].length).toEqual(4);
      expect(nextLevels[0][0].event).toEqual(0);
      expect(nextLevels[0][1].event).toEqual(1);
      expect(nextLevels[0][2].event).toEqual(2);
      expect(nextLevels[0][3].event).toEqual(3);

      // level 1
      expect(nextLevels[1].length).toEqual(3);
      expect(nextLevels[1][0].event).toEqual(4);
      expect(nextLevels[1][1].event).toEqual(5);
      expect(nextLevels[1][2].event).toEqual(6);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(10);
      expect(nextLevels[2][1].event).toEqual(9);

      // level 3
      expect(nextLevels[3].length).toEqual(2);
      expect(nextLevels[3][0].event).toEqual(7);
      expect(nextLevels[3][1].event).toEqual(8);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(11);
    });
    test('when dragging multi pan seg 3,0 to 2,0', () => {
      const levels = [
        [seg(2, 6, 5, 0, 1), seg(7, 7, 1, 0, 2)],
        [seg(2, 2, 1, 1, 3), seg(4, 4, 1, 1, 4), seg(6, 6, 1, 1, 5), seg(7, 7, 1, 1, 6)],
        [seg(2, 2, 1, 2, 7), seg(4, 4, 1, 2, 8), seg(7, 7, 1, 2, 9)],
        [seg(2, 2, 1, 3, 10), seg(4, 7, 4, 3, 11)],
        [seg(4, 4, 1, 4, 12)],
      ];
      const drag = levels[3][0];
      const hover = levels[2][0];
      const nextLevels = reorderLevels(levels, drag, hover);
      // level 0
      expect(nextLevels[0].length).toEqual(2);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[0][1].event).toEqual(2);

      // level 1
      expect(nextLevels[1].length).toEqual(4);
      expect(nextLevels[1][0].event).toEqual(3);
      expect(nextLevels[1][1].event).toEqual(4);
      expect(nextLevels[1][2].event).toEqual(5);
      expect(nextLevels[1][3].event).toEqual(6);

      // level 2
      expect(nextLevels[2].length).toEqual(3);
      expect(nextLevels[2][0].event).toEqual(10);
      expect(nextLevels[2][1].event).toEqual(8);
      expect(nextLevels[2][2].event).toEqual(9);

      // level 3
      expect(nextLevels[3].length).toEqual(2);
      expect(nextLevels[3][0].event).toEqual(7);
      expect(nextLevels[3][1].event).toEqual(11);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(12);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(2, 6, 5, 0, 1), seg(7, 7, 1, 0, 2)],
        [seg(2, 2, 1, 1, 3), seg(4, 4, 1, 1, 4), seg(6, 6, 1, 1, 5), seg(7, 7, 1, 1, 6)],
        [seg(2, 2, 1, 2, 7), seg(4, 4, 1, 2, 8), seg(7, 7, 1, 2, 9)],
        [seg(2, 2, 1, 3, 10), seg(4, 7, 4, 3, 11)],
        [seg(4, 4, 1, 4, 12)],
      ];
      const drag = levels[3][1];
      const hover = levels[2][1];
      const nextLevels = reorderLevels(levels, drag, hover);
      // level 0
      expect(nextLevels[0].length).toEqual(2);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[0][1].event).toEqual(2);

      // level 1
      expect(nextLevels[1].length).toEqual(4);
      expect(nextLevels[1][0].event).toEqual(3);
      expect(nextLevels[1][1].event).toEqual(4);
      expect(nextLevels[1][2].event).toEqual(5);
      expect(nextLevels[1][3].event).toEqual(6);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(7);
      expect(nextLevels[2][1].event).toEqual(11);

      // level 3
      expect(nextLevels[3].length).toEqual(3);
      expect(nextLevels[3][0].event).toEqual(10);
      expect(nextLevels[3][1].event).toEqual(8);
      expect(nextLevels[3][2].event).toEqual(9);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(12);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(2, 6, 5, 0, 1), seg(7, 7, 1, 0, 2)],
        [seg(2, 2, 1, 1, 3), seg(4, 4, 1, 1, 4), seg(6, 6, 1, 1, 5), seg(7, 7, 1, 1, 6)],
        [seg(2, 2, 1, 2, 7), seg(4, 4, 1, 2, 8), seg(7, 7, 1, 2, 9)],
        [seg(2, 2, 1, 3, 10), seg(4, 7, 4, 3, 11)],
        [seg(4, 4, 1, 4, 12)],
      ];
      const drag = levels[2][1];
      const hover = levels[3][1];
      const nextLevels = reorderLevels(levels, drag, hover);
      // level 0
      expect(nextLevels[0].length).toEqual(2);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[0][1].event).toEqual(2);

      // level 1
      expect(nextLevels[1].length).toEqual(4);
      expect(nextLevels[1][0].event).toEqual(3);
      expect(nextLevels[1][1].event).toEqual(4);
      expect(nextLevels[1][2].event).toEqual(5);
      expect(nextLevels[1][3].event).toEqual(6);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(7);
      expect(nextLevels[2][1].event).toEqual(11);

      // level 3
      expect(nextLevels[3].length).toEqual(3);
      expect(nextLevels[3][0].event).toEqual(10);
      expect(nextLevels[3][1].event).toEqual(8);
      expect(nextLevels[3][2].event).toEqual(9);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(12);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(2, 6, 5, 0, 1), seg(7, 7, 1, 0, 2)],
        [seg(2, 2, 1, 1, 3), seg(4, 4, 1, 1, 4), seg(6, 6, 1, 1, 5), seg(7, 7, 1, 1, 6)],
        [seg(2, 2, 1, 2, 7), seg(4, 4, 1, 2, 8), seg(7, 7, 1, 2, 9)],
        [seg(2, 2, 1, 3, 10), seg(4, 7, 4, 3, 11)],
        [seg(4, 4, 1, 4, 12), seg(7, 7, 1, 4, 13)],
      ];
      const drag = levels[2][1];
      const hover = levels[3][1];
      const nextLevels = reorderLevels(levels, drag, hover);
      // level 0
      expect(nextLevels[0].length).toEqual(2);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[0][1].event).toEqual(2);

      // level 1
      expect(nextLevels[1].length).toEqual(4);
      expect(nextLevels[1][0].event).toEqual(3);
      expect(nextLevels[1][1].event).toEqual(4);
      expect(nextLevels[1][2].event).toEqual(5);
      expect(nextLevels[1][3].event).toEqual(6);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(7);
      expect(nextLevels[2][1].event).toEqual(11);

      // level 3
      expect(nextLevels[3].length).toEqual(3);
      expect(nextLevels[3][0].event).toEqual(10);
      expect(nextLevels[3][1].event).toEqual(8);
      expect(nextLevels[3][2].event).toEqual(9);

      // level 4
      expect(nextLevels[4].length).toEqual(2);
      expect(nextLevels[4][0].event).toEqual(12);
      expect(nextLevels[4][1].event).toEqual(13);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(1, 1, 1, 0, 1), seg(2, 2, 1, 0, 2)],
        [seg(1, 1, 1, 1, 3), seg(2, 3, 2, 1, 4)],
        [seg(1, 1, 1, 2, 7), seg(2, 2, 1, 2, 8)],
        [seg(1, 1, 1, 3, 10)],
        [seg(1, 1, 1, 4, 12)],
      ];
      const drag = levels[0][0];
      const hover = levels[0][1];
      const nextLevels = reorderLevels(levels, drag, hover);
      expect(nextLevels.length).toEqual(5);
      // level 0
      expect(nextLevels[0].length).toEqual(1);
      expect(nextLevels[0][0].event).toEqual(1);

      // level 1
      expect(nextLevels[1].length).toEqual(2);
      expect(nextLevels[1][0].event).toEqual(3);
      expect(nextLevels[1][1].event).toEqual(2);

      // level 2
      expect(nextLevels[2].length).toEqual(2);
      expect(nextLevels[2][0].event).toEqual(7);
      expect(nextLevels[2][1].event).toEqual(4);

      // level 3
      expect(nextLevels[3].length).toEqual(2);
      expect(nextLevels[3][0].event).toEqual(10);
      expect(nextLevels[3][1].event).toEqual(8);

      // level 4
      expect(nextLevels[4].length).toEqual(1);
      expect(nextLevels[4][0].event).toEqual(12);
    });
    test('when dragging multi pan seg 0,1 to 1,1', () => {
      const levels = [
        [seg(2, 6, 5, 0, 1), seg(7, 7, 1, 0, 2)],
        [seg(2, 2, 1, 1, 3), seg(4, 4, 1, 1, 4), seg(6, 6, 1, 1, 5), seg(7, 7, 1, 1, 6)],
      ];
      const drag = levels[0][0];
      const hover = levels[1][2];
      const nextLevels = reorderLevels(levels, drag, hover);

      // level 0
      expect(nextLevels[0].length).toEqual(4);
      expect(nextLevels[0][0].event).toEqual(3);
      expect(nextLevels[0][1].event).toEqual(4);
      expect(nextLevels[0][2].event).toEqual(5);
      expect(nextLevels[0][3].event).toEqual(2);

      // level 1
      expect(nextLevels[1].length).toEqual(2);
      expect(nextLevels[1][0].event).toEqual(1);
      expect(nextLevels[1][1].event).toEqual(6);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(2, 2, 1, 0, 1)],
        [seg(2, 2, 1, 1, 3)],
        [seg(2, 2, 1, 2, 7)],
        [seg(2, 2, 1, 3, 10)],
        [seg(4, 4, 1, 4, 12)],
      ];
      const drag = levels[0][0];
      const hover = seg(1, 1, 1, 0, 1);
      const nextLevels = reorderLevels(levels, drag, hover);
      // level 0
      expect(nextLevels[0].length).toEqual(1);
      expect(nextLevels[0][0].level).toEqual(0);
      expect(nextLevels[0][0].left).toEqual(1);
      expect(nextLevels[0][0].event).toEqual(1);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(2, 2, 1, 0, 1), seg(4, 7, 4, 0, 5)],
        [seg(2, 2, 1, 1, 3)],
        [seg(2, 2, 1, 2, 7)],
        [seg(2, 2, 1, 3, 10)],
        [seg(4, 4, 1, 4, 12)],
      ];
      const drag = levels[0][0];
      const hover = seg(1, 1, 1, 0, 1);
      const nextLevels = reorderLevels(levels, drag, hover);
      // level 0
      expect(nextLevels[0].length).toEqual(2);
      expect(nextLevels[0][0].level).toEqual(0);
      expect(nextLevels[0][0].left).toEqual(1);
      expect(nextLevels[0][0].event).toEqual(1);

      expect(nextLevels[0][1].level).toEqual(0);
      expect(nextLevels[0][1].left).toEqual(4);
      expect(nextLevels[0][1].event).toEqual(5);
    });
    test('when dragging multi pan seg 3,3 to 3,2', () => {
      const levels = [
        [seg(1, 1, 1, 0, 13), seg(2, 2, 1, 0, 1), seg(4, 7, 4, 0, 5)],
        [seg(2, 2, 1, 1, 3)],
        [seg(2, 2, 1, 2, 7)],
        [seg(2, 2, 1, 3, 10)],
        [seg(4, 4, 1, 4, 12)],
      ];
      const drag = levels[0][0];
      const hover = levels[1][0];
      const nextLevels = reorderLevels(levels, drag, hover);

      // level 0
      expect(nextLevels[0].length).toEqual(2);
      expect(nextLevels[0][0].event).toEqual(1);
      expect(nextLevels[0][1].event).toEqual(5);

      expect(nextLevels[1].length).toEqual(1);
      expect(nextLevels[1][0].event).toEqual(13);
    });
    /*test('bubble down', () => {
      const levels = [
        [seg(2, 2, 1, 0, 1)],
        [seg(2, 2, 1, 1, 2)],
        [seg(2, 2, 1, 2, 3)],
        [seg(2, 2, 1, 3, 4)],
      ];

      bubbleDownSeg(levels, seg(2, 2, 1, 4, 5), 1);

      expect(levels[0][0].event).toEqual(1);
      expect(levels[1][0].event).toEqual(5);
      expect(levels[2][0].event).toEqual(2);
      expect(levels[3][0].event).toEqual(3);
      expect(levels[4][0].event).toEqual(4);
    });*/
  });
});
