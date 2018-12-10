## [0.20.2](https://github.com/intljusticemission/react-big-calendar/compare/v0.20.0...v0.20.2) (2018-11-07)


### Bug Fixes

* add runtime to deps ([ade68bb](https://github.com/intljusticemission/react-big-calendar/commit/ade68bb))
* calculation of slots number for date when DST ends. ([#1046](https://github.com/intljusticemission/react-big-calendar/issues/1046)) ([2ca0226](https://github.com/intljusticemission/react-big-calendar/commit/2ca0226))
* dragging is disabled if resizing is not allowed ([#1072](https://github.com/intljusticemission/react-big-calendar/issues/1072)) ([#1073](https://github.com/intljusticemission/react-big-calendar/issues/1073)) ([0d5ed30](https://github.com/intljusticemission/react-big-calendar/commit/0d5ed30))
* elements position on TimeGrid if max prop is set ([#1057](https://github.com/intljusticemission/react-big-calendar/issues/1057)) ([f174a60](https://github.com/intljusticemission/react-big-calendar/commit/f174a60))
* move [@babel](https://github.com/babel)/cli to devDependencies ([#1062](https://github.com/intljusticemission/react-big-calendar/issues/1062)) ([4cfcb1f](https://github.com/intljusticemission/react-big-calendar/commit/4cfcb1f))
* onRangeChange not passing localizer ([#1056](https://github.com/intljusticemission/react-big-calendar/issues/1056)) ([80855e8](https://github.com/intljusticemission/react-big-calendar/commit/80855e8))
* proptype warnings ([#1084](https://github.com/intljusticemission/react-big-calendar/issues/1084)) ([08c2494](https://github.com/intljusticemission/react-big-calendar/commit/08c2494))
* reference to draggable/resizable Accessor ([#1070](https://github.com/intljusticemission/react-big-calendar/issues/1070)) ([1889a51](https://github.com/intljusticemission/react-big-calendar/commit/1889a51))


### Features

* hide single day header with css ([#1019](https://github.com/intljusticemission/react-big-calendar/issues/1019)) ([5857d8f](https://github.com/intljusticemission/react-big-calendar/commit/5857d8f))


### Performance Improvements

* increase startup time of event dragging ([#1020](https://github.com/intljusticemission/react-big-calendar/issues/1020)) ([167b69f](https://github.com/intljusticemission/react-big-calendar/commit/167b69f))





## v0.19.2 - Wed, 27 Jun 2018 14:24:55 GMT

## v0.19.1 - Thu, 03 May 2018 15:22:43 GMT

## v0.19.0 - Fri, 23 Mar 2018 17:13:33 GMT

## v0.18.0 - Wed, 07 Feb 2018 16:14:20 GMT

## v0.17.1 - Tue, 05 Dec 2017 19:42:18 GMT

* [#634](../../pull/634) added a new optional callback `dayPropGetter` to allow customization of the cell backgrounds of month, week, and work week views without the need for custom components

## v0.17.0 - Thu, 02 Nov 2017 15:26:08 GMT

## v0.16.1 - Fri, 29 Sep 2017 15:49:07 GMT

## v0.16.0 - Fri, 29 Sep 2017 15:42:08 GMT

## v0.15.0 - Tue, 29 Aug 2017 18:20:39 GMT

## v0.14.4 - Fri, 23 Jun 2017 13:59:31 GMT

## v0.14.3 - Wed, 21 Jun 2017 14:23:07 GMT

## v0.14.2 - Mon, 19 Jun 2017 15:41:40 GMT

## v0.14.1 - Mon, 19 Jun 2017 15:41:20 GMT

## v0.14.0 - Tue, 02 May 2017 13:14:45 GMT

## v0.13.0 - Wed, 22 Mar 2017 15:09:54 GMT

## v0.12.3 - Sun, 15 Jan 2017 17:15:59 GMT

## v0.12.2 - Sun, 15 Jan 2017 17:09:50 GMT

* [45687c9](../../commit/45687c9) [fixed] allow string names in `move()`

## v0.12.1 - Thu, 12 Jan 2017 20:47:22 GMT

* [5578559](../../commit/5578559) [fixed] all day event selection

## v0.12.0 - Sat, 07 Jan 2017 22:03:45 GMT

## v0.11.1 - Sun, 20 Nov 2016 17:48:51 GMT

## v0.11.0 - Sat, 08 Oct 2016 20:24:51 GMT

## v0.10.3 - Fri, 15 Jul 2016 17:56:54 GMT

## v0.10.2 - Fri, 10 Jun 2016 12:50:39 GMT

* [741c882](../../commit/741c882) [fixed] rm jsx imports

## v0.10.1 - Thu, 09 Jun 2016 18:39:57 GMT

## v0.10.0 - Thu, 09 Jun 2016 15:33:06 GMT

## v0.9.12 - Fri, 20 May 2016 12:54:29 GMT

## v0.9.11 - Fri, 15 Apr 2016 13:39:50 GMT

## v0.9.10 - Fri, 15 Apr 2016 13:31:58 GMT

## v0.9.9 - Fri, 15 Apr 2016 12:28:00 GMT

* [a2a49c8](../../commit/a2a49c8) [fixed] consistent handling of end dates as _exclusive_ ranges
* [1c12b16](../../commit/1c12b16) [fixed] DST issue with events
* [f526e23](../../commit/f526e23) [added] onSelecting callback
* [18c0234](../../commit/18c0234) [fixed] incorrect page offset
* [4eeacd4](../../commit/4eeacd4) [fixed] more cross browser flex issues.
* [2dc61ec](../../commit/2dc61ec) [fixed] add minHeight for week view overflow

## v0.9.8 - Thu, 14 Jan 2016 19:35:07 GMT

* [5fa7012](../../commit/5fa7012) [fixed] Incorrect gutter widths

## v0.9.7 - Sun, 13 Dec 2015 22:01:09 GMT

* [ebf8908](../../commit/ebf8908) [fixed] agenda header display

## v0.9.6 - Sun, 13 Dec 2015 21:39:49 GMT

* [a69600b](../../commit/a69600b) [fixed] Pass correct date to DaySlot for selections.
* [5ac5c30](../../commit/5ac5c30) [fixed] reset gutter widths before calculations

## v0.9.5 - Wed, 02 Dec 2015 18:09:32 GMT

* [c2e8aa4](../../commit/c2e8aa4) [fixed] accidental breaking change on the localizers
* [dc90943](../../commit/dc90943) [fixed] some style issues
* [ea8e085](../../commit/ea8e085) [added] modern globalize support
* [4b3d3ba](../../commit/4b3d3ba) [fixed] have gutter use culture prop
* [7922882](../../commit/7922882) [fixed] better gutter width detection

## v0.9.4 - Sun, 29 Nov 2015 02:19:49 GMT

* [a41c9f9](../../commit/a41c9f9) [added] right-to-left support
* [8bb6589](../../commit/8bb6589) [fixed] properly select time ranges with min/max set

## v0.9.3 - Sat, 28 Nov 2015 20:00:24 GMT

* [fff1914](../../commit/fff1914) [fixed] pass culture to View

## v0.9.2 - Thu, 12 Nov 2015 23:34:33 GMT

* [58f008f](../../commit/58f008f) [fixed] none integer slot spaces (again)
* [f2084ef](../../commit/f2084ef) [fixed] month event rows not fitting in their cells
* [73e449d](../../commit/73e449d) [fixed] day view clicks return the correct slot

## v0.9.1 - Thu, 12 Nov 2015 14:52:20 GMT

* [d5a0d20](../../commit/d5a0d20) [fixed] month event rows not fitting in their cells
* [f4b18d6](../../commit/f4b18d6) [fixed] day view clicks return the correct slot

## v0.9.0 - Tue, 03 Nov 2015 11:33:38 GMT

* [ee53bbc](../../commit/ee53bbc) [changed] default "show more" behavior navigates to day view
* [80aa08f](../../commit/80aa08f) [added] popupOffset prop for configuring distance from viewport edge

## v0.8.3 - Thu, 29 Oct 2015 06:07:22 GMT

* [d98af8d](../../commit/d98af8d) [added] edge detection for event popup
* [69b092d](../../commit/69b092d) [fixed] accidental hash changes
* [0351b71](../../commit/0351b71) [fixed] incorrect 'show more' layout

## v0.8.2 - Wed, 28 Oct 2015 08:09:39 GMT

* [892af3d](../../commit/892af3d) [fixed] use correct handler for "show more"

## v0.8.1 - Wed, 28 Oct 2015 07:58:13 GMT

* [4560ff7](../../commit/4560ff7) [changed] better thin event title collapse
* [0eeb43f](../../commit/0eeb43f) [fixed] event layout sort
* [0574eed](../../commit/0574eed) [fixed] show more row layout issues
* [7ee9959](../../commit/7ee9959) [added] title to time view events
* [c07d0ab](../../commit/c07d0ab) [changed] better event overlays for overlapping events

## v0.8.0 - Mon, 26 Oct 2015 12:32:54 GMT

* [4dac3f5](../../commit/4dac3f5) [added] rbc-event-allday class in month view
* [e314128](../../commit/e314128) [fixed] missing keys in popup
* [0d5df79](../../commit/0d5df79) [changed] "show more" behavior is cleaner

## v0.7.2 - Sat, 24 Oct 2015 03:21:53 GMT

* [0b0fa0f](../../commit/0b0fa0f) [fixed] prevent selection when clicking show more
* [57c8843](../../commit/57c8843) [fixed] allow event selection when selectable, in day views

## v0.7.1 - Wed, 30 Sep 2015 12:34:43 GMT

* [f7969b3](../../commit/f7969b3) [fixed] use client coords to get node during selection

## v0.7.0 - Tue, 15 Sep 2015 08:37:50 GMT

* [8ad4ee7](../../commit/8ad4ee7) [changed] selection bound to Calendar container, respects overlays
* [98b3dad](../../commit/98b3dad) [fixed] selecting events in All Day row of week/Day views

## v0.6.1 - Sun, 13 Sep 2015 16:52:20 GMT

* [c3092f4](../../commit/c3092f4) [fixed] event rows incorrect duration styles
* [dade2b9](../../commit/dade2b9) [fixed] more month event layout issues

## v0.6.0 - Sun, 13 Sep 2015 15:32:08 GMT

* [49e321f](../../commit/49e321f) [fixed] layout of events in months that don't start evenly at weekday 0
* [720675e](../../commit/720675e) [added] eventPropsGetter for event markup customization

## v0.5.2 - Sun, 13 Sep 2015 12:56:02 GMT

* [386d4bc](../../commit/386d4bc) [fixed] `selectable` can properly be toggled on and off

## v0.5.1 - Sun, 13 Sep 2015 10:08:24 GMT

* [a7dc435](../../commit/a7dc435) [fixed] className and style props being applied in multiple places
* [c8f8281](../../commit/c8f8281) [fixed] null exception on empty agenda view

## v0.5.0 - Sun, 13 Sep 2015 09:03:11 GMT

* [00435ad](../../commit/00435ad) [fixed] view propType validation
* [ae039b9](../../commit/ae039b9) [added] expose `move` and `label` methods for easier external toolbars
* [7e7bc17](../../commit/7e7bc17) [changed] clarified accidental ambigious license

## v0.4.1 - Thu, 03 Sep 2015 19:08:11 GMT
