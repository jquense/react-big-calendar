## [1.2.2](https://github.com/Xetoxyc/react-big-calendar/compare/v1.2.1...v1.2.2) (2025-05-07)


### Bug Fixes

* rollup config ([3c3599b](https://github.com/Xetoxyc/react-big-calendar/commit/3c3599b1397d32bf332926e6219fd345529c0883))

## [1.2.1](https://github.com/Xetoxyc/react-big-calendar/compare/v1.2.0...v1.2.1) (2024-08-30)


### Bug Fixes

* day is now checked by milliseconds ([408d375](https://github.com/Xetoxyc/react-big-calendar/commit/408d3755a4492fb6fbfcd2cd976e2f56acdb74d0))

# [1.2.0](https://github.com/Xetoxyc/react-big-calendar/compare/v1.1.1...v1.2.0) (2024-08-13)


### Features

* add withDragAndDrop to build ([bfc5d99](https://github.com/Xetoxyc/react-big-calendar/commit/bfc5d99620e7d10303371247f82a6721856c5b4b))

## [1.1.1](https://github.com/Xetoxyc/react-big-calendar/compare/v1.1.0...v1.1.1) (2024-08-13)


### Bug Fixes

* missing types and wrong type path ([4616e6a](https://github.com/Xetoxyc/react-big-calendar/commit/4616e6a316017df7530b2e2d1a7b4180ffefe0f8))

# [1.1.0](https://github.com/Xetoxyc/react-big-calendar/compare/v1.0.0...v1.1.0) (2024-08-13)


### Bug Fixes

* add *.d.ts to eslintingore ([43a4640](https://github.com/Xetoxyc/react-big-calendar/commit/43a46405c445482de5a5c191c1c442a7097d5a5d))
* build error only on github ([05a9b7c](https://github.com/Xetoxyc/react-big-calendar/commit/05a9b7c76cc53bdaa1c44c0d4610287e1af2c337))
* remove package-lock.json ([4816e37](https://github.com/Xetoxyc/react-big-calendar/commit/4816e37042b3257c36628a172871ac9216e3608b))
* use relative path ([b9d8bce](https://github.com/Xetoxyc/react-big-calendar/commit/b9d8bce044179742aa9933798a34cb492e4154f0))


### Features

* adding typescript directly to the lib ([b320462](https://github.com/Xetoxyc/react-big-calendar/commit/b320462a43fb4454467c0f8f974647f845462814))

# 1.0.0 (2024-08-12)


### Bug Fixes

*  `dayLayoutAlgorithm` prop with custom function ([#1562](https://github.com/Xetoxyc/react-big-calendar/issues/1562)) ([3fb3c49](https://github.com/Xetoxyc/react-big-calendar/commit/3fb3c49c05903e703e896f61ef1b9d1d18d7b2b2))
* 1px misalignment ([#2367](https://github.com/Xetoxyc/react-big-calendar/issues/2367)) ([7479b4d](https://github.com/Xetoxyc/react-big-calendar/commit/7479b4d5955511ae1a42ed666d245bd411be7868))
* a bug that the height of the column is broken when displayed in IE11 ([#1789](https://github.com/Xetoxyc/react-big-calendar/issues/1789)) ([a0538ee](https://github.com/Xetoxyc/react-big-calendar/commit/a0538eeba1cc2e405a46b6fc1369ecce93739919))
* add isBackgroundEvent to onSelectEvent event obj ([#2491](https://github.com/Xetoxyc/react-big-calendar/issues/2491)) ([fdbb496](https://github.com/Xetoxyc/react-big-calendar/commit/fdbb496eb50696c8b1744fc69249535121b2f4b1))
* add new method to get correct time indicator top position | fixes [#1396](https://github.com/Xetoxyc/react-big-calendar/issues/1396) ([#1447](https://github.com/Xetoxyc/react-big-calendar/issues/1447)) ([1cf0205](https://github.com/Xetoxyc/react-big-calendar/commit/1cf0205def00630e68157aff6cbdfb5f7a16589c))
* add runtime to deps ([ade68bb](https://github.com/Xetoxyc/react-big-calendar/commit/ade68bbd5b9e36c36ee68c6c65a435a480b9b7b6))
* added fallback to getNow ([#1140](https://github.com/Xetoxyc/react-big-calendar/issues/1140)) ([13459b0](https://github.com/Xetoxyc/react-big-calendar/commit/13459b0d70ff1b6e27ed62ab8351bf00ef32aff7))
* **addons:** do not cut end while dragging multiday event ([#1342](https://github.com/Xetoxyc/react-big-calendar/issues/1342)) ([6fab261](https://github.com/Xetoxyc/react-big-calendar/commit/6fab261114bcee166ac6fd7be2e6230c34d73d63))
* adjust TimeGutter for DST ([#2205](https://github.com/Xetoxyc/react-big-calendar/issues/2205)) ([4ba1255](https://github.com/Xetoxyc/react-big-calendar/commit/4ba1255ac80239e3a35d8adb32cbaa3da526619f))
* **Agenda:** consider start & end of day to filter events ([6c9c05b](https://github.com/Xetoxyc/react-big-calendar/commit/6c9c05bf30edc52291ba286df8382ca42cf50039))
* allow override onShowMore callback ([#1214](https://github.com/Xetoxyc/react-big-calendar/issues/1214)) ([8fefeee](https://github.com/Xetoxyc/react-big-calendar/commit/8fefeee393d7173a37734da7e34af5da64959214)), closes [/github.com/intljusticemission/react-big-calendar/blob/f9a873368a78f5ced81b799c4dffe1095b3ab712/src/Calendar.jsx#L280](https://github.com//github.com/intljusticemission/react-big-calendar/blob/f9a873368a78f5ced81b799c4dffe1095b3ab712/src/Calendar.jsx/issues/L280) [/github.com/intljusticemission/react-big-calendar/blob/1d62c432eaa183ed6b38f08cfcec5ee7edcbfe41/src/Month.js#L300-L307](https://github.com//github.com/intljusticemission/react-big-calendar/blob/1d62c432eaa183ed6b38f08cfcec5ee7edcbfe41/src/Month.js/issues/L300-L307) [#1147](https://github.com/Xetoxyc/react-big-calendar/issues/1147)
* Allow resize to last visible slot ([f26c8a7](https://github.com/Xetoxyc/react-big-calendar/commit/f26c8a75a5e7ad667eb6dbc4d392dac32e51dc10)), closes [#2147](https://github.com/Xetoxyc/react-big-calendar/issues/2147)
* **ARIA:** remove tabindex ([#2508](https://github.com/Xetoxyc/react-big-calendar/issues/2508)) ([7e01c3d](https://github.com/Xetoxyc/react-big-calendar/commit/7e01c3d0495808cf3bf49a95c7cdd8ef98f54fed)), closes [#2498](https://github.com/Xetoxyc/react-big-calendar/issues/2498)
* auto scroll on event selection ([#2235](https://github.com/Xetoxyc/react-big-calendar/issues/2235)) ([6d87ebb](https://github.com/Xetoxyc/react-big-calendar/commit/6d87ebbab146ba5a122180a376919bd6601f15c0)), closes [#2233](https://github.com/Xetoxyc/react-big-calendar/issues/2233)
* bad propType. ([#1351](https://github.com/Xetoxyc/react-big-calendar/issues/1351)) ([e704e17](https://github.com/Xetoxyc/react-big-calendar/commit/e704e176ffba1c303c77c9e03bf8b814f83f1307))
* bug where appointments can appear outside the calendar ([#1204](https://github.com/Xetoxyc/react-big-calendar/issues/1204)) ([9689b7d](https://github.com/Xetoxyc/react-big-calendar/commit/9689b7d112dd9dba4a5424808de08fdd5738db79))
* bug with dayWrapper not applying ([#1196](https://github.com/Xetoxyc/react-big-calendar/issues/1196)) ([f3ea6f8](https://github.com/Xetoxyc/react-big-calendar/commit/f3ea6f838005626a5107a4d1d9fc6ac8a7fd78ba))
* bug with dnd drag drop ([#2602](https://github.com/Xetoxyc/react-big-calendar/issues/2602)) ([799a72a](https://github.com/Xetoxyc/react-big-calendar/commit/799a72ad5d1782f4d8518e834585728c32e1b7e3)), closes [#2601](https://github.com/Xetoxyc/react-big-calendar/issues/2601)
* bug with resize segments not being removed ([#1800](https://github.com/Xetoxyc/react-big-calendar/issues/1800)) ([34aec3a](https://github.com/Xetoxyc/react-big-calendar/commit/34aec3a64d018ec0f9dce780a6d4eeb03692c9fd))
* bump memoize-one and migrate new isEqual API ([#1583](https://github.com/Xetoxyc/react-big-calendar/issues/1583)) ([4c904c2](https://github.com/Xetoxyc/react-big-calendar/commit/4c904c2f06ad7fe6f6602d04cf14bcdaeab03ad2))
* calculation of slots number for date when DST ends. ([#1046](https://github.com/Xetoxyc/react-big-calendar/issues/1046)) ([2ca0226](https://github.com/Xetoxyc/react-big-calendar/commit/2ca02266ef372f7ff4c48e85125bcc70114be3d0))
* calendar auto scroll while dragging event at top/bottom edge ([#2230](https://github.com/Xetoxyc/react-big-calendar/issues/2230)) ([d1c5085](https://github.com/Xetoxyc/react-big-calendar/commit/d1c5085b004bb3c606a682b488a92585e50b12b4)), closes [#2231](https://github.com/Xetoxyc/react-big-calendar/issues/2231)
* change toolbar API to match top level onViewChange prop name ([b0a6dd7](https://github.com/Xetoxyc/react-big-calendar/commit/b0a6dd7088f22c29d3f763cfbea9f6dacbdb4ffe))
* changed flex-direction for rbc-toolbar mobile ([#2497](https://github.com/Xetoxyc/react-big-calendar/issues/2497)) ([8d7b20d](https://github.com/Xetoxyc/react-big-calendar/commit/8d7b20d8c971411d05757344d9eb422af1d8241c)), closes [#1699](https://github.com/Xetoxyc/react-big-calendar/issues/1699)
* common.nest() discarding custom components ([#1114](https://github.com/Xetoxyc/react-big-calendar/issues/1114)) ([5a432de](https://github.com/Xetoxyc/react-big-calendar/commit/5a432deb70ea2bd089a0227ae33eb81f566153a7))
* Correct display of beginning DST ([bd8e0e9](https://github.com/Xetoxyc/react-big-calendar/commit/bd8e0e971a5c5e2590ca0016df4e186b326dec19)), closes [#1617](https://github.com/Xetoxyc/react-big-calendar/issues/1617)
* Correct DragAndDrop event resizing in 'month' view ([e3d96e5](https://github.com/Xetoxyc/react-big-calendar/commit/e3d96e5b5899e809092051e32274c8cfdd11d4e9)), closes [#2012](https://github.com/Xetoxyc/react-big-calendar/issues/2012)
* Correct duration in DnD ([#2034](https://github.com/Xetoxyc/react-big-calendar/issues/2034)) ([304f78b](https://github.com/Xetoxyc/react-big-calendar/commit/304f78bdcfd044f0b69cc7d4ba2c0d68233c1254)), closes [#2033](https://github.com/Xetoxyc/react-big-calendar/issues/2033)
* Correct issue with semantic-release and yarn-lock ([cc48854](https://github.com/Xetoxyc/react-big-calendar/commit/cc48854c87b03ca23541484e30061576c2edfe98)), closes [#2096](https://github.com/Xetoxyc/react-big-calendar/issues/2096)
* Correct listener teardown ([abd4594](https://github.com/Xetoxyc/react-big-calendar/commit/abd4594b72069d945d4ea74dadd3f0f312c7188a)), closes [#2072](https://github.com/Xetoxyc/react-big-calendar/issues/2072)
* correct luxon localizer formatting ([#2172](https://github.com/Xetoxyc/react-big-calendar/issues/2172)) ([b130351](https://github.com/Xetoxyc/react-big-calendar/commit/b130351966fa6a3870607bbb78394db11a10915b))
* correct nested sass ([#2641](https://github.com/Xetoxyc/react-big-calendar/issues/2641)) ([88bdf77](https://github.com/Xetoxyc/react-big-calendar/commit/88bdf77d05d0548cf9228b11f49c550adbc07c4c))
* Correct no overlap algorithm stretch behavior ([#2120](https://github.com/Xetoxyc/react-big-calendar/issues/2120)) ([c3f25eb](https://github.com/Xetoxyc/react-big-calendar/commit/c3f25eb61545af36ada0c940f0f05b440250341f))
* correct popupOffset ([#2218](https://github.com/Xetoxyc/react-big-calendar/issues/2218)) ([6fdec30](https://github.com/Xetoxyc/react-big-calendar/commit/6fdec3049660a97dcf42819b16bfc01aa5764267))
* correct publishing ([#2350](https://github.com/Xetoxyc/react-big-calendar/issues/2350)) ([ae15118](https://github.com/Xetoxyc/react-big-calendar/commit/ae151187fdedccccfdbf84ce64d499d4b4e4b511))
* Correct resize for multi-day event. ([#2138](https://github.com/Xetoxyc/react-big-calendar/issues/2138)) ([3632345](https://github.com/Xetoxyc/react-big-calendar/commit/363234520ad3289bf4b182d8fc2f02dba2460f56))
* Correct resizing event bug in Week & Day ([#2143](https://github.com/Xetoxyc/react-big-calendar/issues/2143)) ([afa8468](https://github.com/Xetoxyc/react-big-calendar/commit/afa84683fc6d3cd637013f08eac6d7bc1314c254))
* Correct scrollToTime functionailty ([#2055](https://github.com/Xetoxyc/react-big-calendar/issues/2055)) ([76e6254](https://github.com/Xetoxyc/react-big-calendar/commit/76e625494c3c9344c322604d1f4aaf17d3944dbd)), closes [#2028](https://github.com/Xetoxyc/react-big-calendar/issues/2028) [#1717](https://github.com/Xetoxyc/react-big-calendar/issues/1717)
* Correct selection issues ([def4934](https://github.com/Xetoxyc/react-big-calendar/commit/def4934b45804c1ccdeaa4c5c8ddb52b346b0d08))
* correct slotMetrics issue in TimeGrid ([e25f187](https://github.com/Xetoxyc/react-big-calendar/commit/e25f1878a8d8aaf37b7b5721f76a1be4ceb0e988)), closes [#2529](https://github.com/Xetoxyc/react-big-calendar/issues/2529)
* correct storybook deploy ([#2145](https://github.com/Xetoxyc/react-big-calendar/issues/2145)) ([8c98fb2](https://github.com/Xetoxyc/react-big-calendar/commit/8c98fb25bc063cbd88260fb4d2cf709c52912a67))
* Correct the listeners reference ([a202d60](https://github.com/Xetoxyc/react-big-calendar/commit/a202d60264b3a83a6a200dc6e3ee6ed86ec37462)), closes [#2072](https://github.com/Xetoxyc/react-big-calendar/issues/2072)
* correct time-header-gutter ([#2219](https://github.com/Xetoxyc/react-big-calendar/issues/2219)) ([160e251](https://github.com/Xetoxyc/react-big-calendar/commit/160e251f288174a469932599251af06f179a47f9))
* correct TimeGutter ref ([#2204](https://github.com/Xetoxyc/react-big-calendar/issues/2204)) ([055cdd0](https://github.com/Xetoxyc/react-big-calendar/commit/055cdd01c153752e90b889cfa37ad5734fe8217e)), closes [#2201](https://github.com/Xetoxyc/react-big-calendar/issues/2201)
* correct TimeGutter ref use ([574dbf7](https://github.com/Xetoxyc/react-big-calendar/commit/574dbf73d9c0acd10fb2fa25a128a8a3b9c05c16)), closes [#2200](https://github.com/Xetoxyc/react-big-calendar/issues/2200)
* correct treatment of boolean view in 'views' ([#2368](https://github.com/Xetoxyc/react-big-calendar/issues/2368)) ([0e6b771](https://github.com/Xetoxyc/react-big-calendar/commit/0e6b7717985e626413347fcc196d38c0d071d759))
* Correct typo in custom view example ([267629b](https://github.com/Xetoxyc/react-big-calendar/commit/267629b5d253b5247b2cd2071764e6bb86c4d3a5))
* Correct variable name that gets passed on to EventWrapper so dragndrop ha… ([#2121](https://github.com/Xetoxyc/react-big-calendar/issues/2121)) ([19294de](https://github.com/Xetoxyc/react-big-calendar/commit/19294de0de5c3aaf4280bfb9c28f37d88254d51d))
* correcting doubleClick ([#2571](https://github.com/Xetoxyc/react-big-calendar/issues/2571)) ([775993c](https://github.com/Xetoxyc/react-big-calendar/commit/775993cee756c681a351678874007b175258714d)), closes [#2565](https://github.com/Xetoxyc/react-big-calendar/issues/2565)
* **date-fns localizer:** display dayFormat correctly ([#1633](https://github.com/Xetoxyc/react-big-calendar/issues/1633)) ([dd1e1a4](https://github.com/Xetoxyc/react-big-calendar/commit/dd1e1a4ec6c3183b2d69b58a59301133b2d81ca7))
* day events sort fixed ([#2512](https://github.com/Xetoxyc/react-big-calendar/issues/2512)) ([ac1ff00](https://github.com/Xetoxyc/react-big-calendar/commit/ac1ff004a2f6384a1540e66ed47f219e1f9101c5))
* **dayViewLayout:** container event check ([3c4934e](https://github.com/Xetoxyc/react-big-calendar/commit/3c4934e2077065263e7f8e7e711c407f0d678581))
* different time format for multi day events when using moment ([#919](https://github.com/Xetoxyc/react-big-calendar/issues/919)) ([630b630](https://github.com/Xetoxyc/react-big-calendar/commit/630b630165df11e3a586e1c19f3d00f1f3e97bd9))
* disable `absoluteRuntime` in babel-preset-react-app ([#2155](https://github.com/Xetoxyc/react-big-calendar/issues/2155)) ([b8fcb93](https://github.com/Xetoxyc/react-big-calendar/commit/b8fcb9337bb5eb3e2c19f766d18cddba43ea1a06))
* DnD corner cases in allDay move/resize ([5380fee](https://github.com/Xetoxyc/react-big-calendar/commit/5380fee1e187207ff50c19ba95eaffed9675a25f))
* dnd freezes an event intermittently ([#1631](https://github.com/Xetoxyc/react-big-calendar/issues/1631)) ([e8609af](https://github.com/Xetoxyc/react-big-calendar/commit/e8609af6a76cdc24387fbabb5a0e8c8f1700a617))
* **DND:** Corrects issue of losing droppable event when releasing on non-event related containers ([#2199](https://github.com/Xetoxyc/react-big-calendar/issues/2199)) ([508b668](https://github.com/Xetoxyc/react-big-calendar/commit/508b668f4adb17635b47f435fdc3b676058a7405)), closes [#2198](https://github.com/Xetoxyc/react-big-calendar/issues/2198) [#1902](https://github.com/Xetoxyc/react-big-calendar/issues/1902)
* **dnd:** dont use classname ([#2232](https://github.com/Xetoxyc/react-big-calendar/issues/2232)) ([2332f12](https://github.com/Xetoxyc/react-big-calendar/commit/2332f121260bc772f4a709f6334bd9bb96c05e69))
* **DnD:** dragAndDrop EventWrapper.js error: cannot add property 'X', object is not extensible ([0c4826a](https://github.com/Xetoxyc/react-big-calendar/commit/0c4826a70378de7923bd772b15d481e3c30c530b))
* **dnd:** move merge components ([fd02261](https://github.com/Xetoxyc/react-big-calendar/commit/fd02261a66d80892a95e9e9ae4cbfe2779d4643c)), closes [#2359](https://github.com/Xetoxyc/react-big-calendar/issues/2359)
* **Dnd:** Offset is not needed ([#1892](https://github.com/Xetoxyc/react-big-calendar/issues/1892)) ([caf820b](https://github.com/Xetoxyc/react-big-calendar/commit/caf820b36ff9eb6b3ec7a0ea7f4c81a190a5eee8))
* **DnD:** selection in WeekView ([2813631](https://github.com/Xetoxyc/react-big-calendar/commit/281363149280278a81dd247aa8442342b22bef7b))
* do not autoscroll on event selection ([#2234](https://github.com/Xetoxyc/react-big-calendar/issues/2234)) ([b85b1ff](https://github.com/Xetoxyc/react-big-calendar/commit/b85b1ff884862c8116e0e571e0715499f4e7d5f4)), closes [#2233](https://github.com/Xetoxyc/react-big-calendar/issues/2233)
* do not handle move event after terminating ([#1104](https://github.com/Xetoxyc/react-big-calendar/issues/1104)) ([bcc4d93](https://github.com/Xetoxyc/react-big-calendar/commit/bcc4d932f43071ca3e6dea35b3a6068eaf2fc219))
* do not send undefined/null gutterRef to getWidth ([#2300](https://github.com/Xetoxyc/react-big-calendar/issues/2300)) ([7b5f5b8](https://github.com/Xetoxyc/react-big-calendar/commit/7b5f5b8ef438ff469e7d098a6274118149883238))
* do the math ourselves ([#2220](https://github.com/Xetoxyc/react-big-calendar/issues/2220)) ([cace54e](https://github.com/Xetoxyc/react-big-calendar/commit/cace54e8b4b0f6baef35f1dac11bcf8f541f5301))
* **docs:** correct link for 'props' in 'Understanding Dates' guide ([#2562](https://github.com/Xetoxyc/react-big-calendar/issues/2562)) ([59982ae](https://github.com/Xetoxyc/react-big-calendar/commit/59982ae073e9afda4370a8a5f1589c65b0d4580d))
* drag cancelation for month view ([#1322](https://github.com/Xetoxyc/react-big-calendar/issues/1322)) ([9c81e9e](https://github.com/Xetoxyc/react-big-calendar/commit/9c81e9e8db76f011edc24baaddb2c93d9dde5619))
* dragging is disabled if resizing is not allowed ([#1072](https://github.com/Xetoxyc/react-big-calendar/issues/1072)) ([#1073](https://github.com/Xetoxyc/react-big-calendar/issues/1073)) ([0d5ed30](https://github.com/Xetoxyc/react-big-calendar/commit/0d5ed30cfb6a7e997750825068b454f81c15521c))
* duplicate events ([#1159](https://github.com/Xetoxyc/react-big-calendar/issues/1159)) ([b8e26b0](https://github.com/Xetoxyc/react-big-calendar/commit/b8e26b02267b6d9f5deca44dd941ca2f3237230f))
* elements position on TimeGrid if max prop is set ([#1057](https://github.com/Xetoxyc/react-big-calendar/issues/1057)) ([f174a60](https://github.com/Xetoxyc/react-big-calendar/commit/f174a6010625ae5563a3dc2f6760ba10d97d1559))
* enforce `resizable` prop ([#1796](https://github.com/Xetoxyc/react-big-calendar/issues/1796)) ([a18acc2](https://github.com/Xetoxyc/react-big-calendar/commit/a18acc225bede4e15fde782c654c5212cef16215))
* firefox event click bug ([#1262](https://github.com/Xetoxyc/react-big-calendar/issues/1262)) ([b526416](https://github.com/Xetoxyc/react-big-calendar/commit/b52641661e8811b5e27538f9945d264042fd6762)), closes [#1173](https://github.com/Xetoxyc/react-big-calendar/issues/1173)
* Fix top part of 24hour event in week/day view ([#1732](https://github.com/Xetoxyc/react-big-calendar/issues/1732)) ([e1e06b5](https://github.com/Xetoxyc/react-big-calendar/commit/e1e06b54fcc71f35010448bfea858aa33b106eb1))
* Fixed publish script (fix [#2330](https://github.com/Xetoxyc/react-big-calendar/issues/2330)) ([#2358](https://github.com/Xetoxyc/react-big-calendar/issues/2358)) ([a4e54be](https://github.com/Xetoxyc/react-big-calendar/commit/a4e54bed8d534086af87bff8b48c7c9a47ac4141))
* fixing Drag and Drop Examples link ([fa4a378](https://github.com/Xetoxyc/react-big-calendar/commit/fa4a378f32ed298394fc4716f9d788c22205347e)), closes [#2585](https://github.com/Xetoxyc/react-big-calendar/issues/2585)
* fixing invalid ref with invalid scrollHeight ([#2459](https://github.com/Xetoxyc/react-big-calendar/issues/2459)) ([a4bc8f3](https://github.com/Xetoxyc/react-big-calendar/commit/a4bc8f3f275ccfba5b6861330b87b39f05505ca8))
* for TimeSlots ([#1462](https://github.com/Xetoxyc/react-big-calendar/issues/1462)) ([c31639a](https://github.com/Xetoxyc/react-big-calendar/commit/c31639ab46f097ffd1b483aaba87832d14c01d73))
* handleNavigate for undefined date ([#889](https://github.com/Xetoxyc/react-big-calendar/issues/889)) ([cc84f17](https://github.com/Xetoxyc/react-big-calendar/commit/cc84f17bfd5782584126bb4634e2b020157c8589))
* hide indicator when current time is not in the interval ([#1639](https://github.com/Xetoxyc/react-big-calendar/issues/1639)) ([92974bf](https://github.com/Xetoxyc/react-big-calendar/commit/92974bf00abe067db981c00c734cd4f756fad4c7))
* ie fix for event bindings on unmounted components ([#1338](https://github.com/Xetoxyc/react-big-calendar/issues/1338)) ([8ef00d6](https://github.com/Xetoxyc/react-big-calendar/commit/8ef00d60ed82b2c1ea0d49417565d25f2982bad9))
* incorrect babel imports in CJS/ESM builds ([#2157](https://github.com/Xetoxyc/react-big-calendar/issues/2157)) ([687b121](https://github.com/Xetoxyc/react-big-calendar/commit/687b1213d91ded826e92ab1ec39314676aa24bf5))
* invalid prop-types. ([#1435](https://github.com/Xetoxyc/react-big-calendar/issues/1435)) ([61e1a1e](https://github.com/Xetoxyc/react-big-calendar/commit/61e1a1ea1a7c484fa007038ae3267d88c8dfe1e0))
* issue with gutter width initialization ([#1181](https://github.com/Xetoxyc/react-big-calendar/issues/1181)) ([69b28af](https://github.com/Xetoxyc/react-big-calendar/commit/69b28af9b0c841649925d6358934552d8563c737))
* item preview inside cell while dragging from outside not working… ([#1770](https://github.com/Xetoxyc/react-big-calendar/issues/1770)) ([8fd6329](https://github.com/Xetoxyc/react-big-calendar/commit/8fd63298322ba506823f3c44eadd8820c2bf684b))
* make day event to hourly event after move ([b72fb30](https://github.com/Xetoxyc/react-big-calendar/commit/b72fb307e1e53bd84a5b28ab2dce927bf33e623a))
* make scrollToTime=00:00 working ([#1501](https://github.com/Xetoxyc/react-big-calendar/issues/1501)) ([ee5a558](https://github.com/Xetoxyc/react-big-calendar/commit/ee5a5586814bfc56c4963e21b0d48ac9a22718db))
* make sure time indicator is updated after navigation ([#1082](https://github.com/Xetoxyc/react-big-calendar/issues/1082)) ([07b2fa4](https://github.com/Xetoxyc/react-big-calendar/commit/07b2fa4ef876ecca21d9ac9a92bab4e0eda3e42e))
* Memory leak if Calendar is selectable [#1940](https://github.com/Xetoxyc/react-big-calendar/issues/1940) ([#1941](https://github.com/Xetoxyc/react-big-calendar/issues/1941)) ([a26e933](https://github.com/Xetoxyc/react-big-calendar/commit/a26e933f041c5dfece17311920470910bd7a759c))
* minimum start difference for same row computation ([#886](https://github.com/Xetoxyc/react-big-calendar/issues/886)) ([#909](https://github.com/Xetoxyc/react-big-calendar/issues/909)) ([#910](https://github.com/Xetoxyc/react-big-calendar/issues/910)) ([a440b82](https://github.com/Xetoxyc/react-big-calendar/commit/a440b8264af82c8b04c4265d285cd0ec6e200467))
* misplacement of current time indicator ([#1239](https://github.com/Xetoxyc/react-big-calendar/issues/1239)) ([2d6e99e](https://github.com/Xetoxyc/react-big-calendar/commit/2d6e99e5d36864461dfc158c16270138984d380a)), closes [#1054](https://github.com/Xetoxyc/react-big-calendar/issues/1054)
* Modify events.js ([#2444](https://github.com/Xetoxyc/react-big-calendar/issues/2444)) ([2a838d9](https://github.com/Xetoxyc/react-big-calendar/commit/2a838d981ed08c0be7ff6702f64b79db3158ff90))
* moment format strings -> date-fns format strings ([#1568](https://github.com/Xetoxyc/react-big-calendar/issues/1568)) ([1603902](https://github.com/Xetoxyc/react-big-calendar/commit/16039022378c428bc4a04b9f0fc20aa7f9892896))
* **moment:** wrong time on the day when DST changes ([#2374](https://github.com/Xetoxyc/react-big-calendar/issues/2374)) ([b82ceb7](https://github.com/Xetoxyc/react-big-calendar/commit/b82ceb7f4213e166c64ce643eef912b2ba4cd3a9)), closes [#2296](https://github.com/Xetoxyc/react-big-calendar/issues/2296)
* mouse event propagation probs ([759a232](https://github.com/Xetoxyc/react-big-calendar/commit/759a2324f6f83f7e745b74d2a020336469122287))
* move @babel/cli to devDependencies ([#1062](https://github.com/Xetoxyc/react-big-calendar/issues/1062)) ([4cfcb1f](https://github.com/Xetoxyc/react-big-calendar/commit/4cfcb1f3d63e44bf22f9861ccc502dafe79dcc16))
* move react, react-dom to devDependencies ([#2160](https://github.com/Xetoxyc/react-big-calendar/issues/2160)) ([6917c15](https://github.com/Xetoxyc/react-big-calendar/commit/6917c15f25bad5462392003dcae59ef7fe20f24d))
* no-overlap layout algorithm ([#2239](https://github.com/Xetoxyc/react-big-calendar/issues/2239)) ([f7bfd11](https://github.com/Xetoxyc/react-big-calendar/commit/f7bfd11f6ce475dd4390e8ed0bf0efea0f1c0a69)), closes [#2240](https://github.com/Xetoxyc/react-big-calendar/issues/2240)
* numGroups calculation ([#1963](https://github.com/Xetoxyc/react-big-calendar/issues/1963)) ([319a81c](https://github.com/Xetoxyc/react-big-calendar/commit/319a81c580d01621cd624c07fe76ea7f1b1c7c1d))
* onRangeChange not passing localizer ([#1056](https://github.com/Xetoxyc/react-big-calendar/issues/1056)) ([80855e8](https://github.com/Xetoxyc/react-big-calendar/commit/80855e8f00c3458f8767faa3e4edcdf843e4ba33))
* pass dates to slotGroupPropGetter ([#2066](https://github.com/Xetoxyc/react-big-calendar/issues/2066)) ([943ae6e](https://github.com/Xetoxyc/react-big-calendar/commit/943ae6edbadb48ca866c256bcbbac7059356fdee))
* prefix React lifecycle methods with UNSAFE ([#1578](https://github.com/Xetoxyc/react-big-calendar/issues/1578)) ([7b5a6a7](https://github.com/Xetoxyc/react-big-calendar/commit/7b5a6a79c43591014fa7e009b8b3f00b4f74c7c9))
* preserve time on horizontal resizing ([#1795](https://github.com/Xetoxyc/react-big-calendar/issues/1795)) ([1b186da](https://github.com/Xetoxyc/react-big-calendar/commit/1b186daa3c77f8716960104933514aff05b03f87))
* prevent endless loop when adding event the DST begin day ([#1635](https://github.com/Xetoxyc/react-big-calendar/issues/1635)) ([b9abf77](https://github.com/Xetoxyc/react-big-calendar/commit/b9abf7714e54ef01a212366adffe09fec29039ba))
* prevent un/mounting of date components ([#1276](https://github.com/Xetoxyc/react-big-calendar/issues/1276)) ([3c25009](https://github.com/Xetoxyc/react-big-calendar/commit/3c25009d31d9255688e96e55ecbada25bd057196)), closes [/github.com/intljusticemission/react-big-calendar/blob/master/src/DateContentRow.js#L121](https://github.com//github.com/intljusticemission/react-big-calendar/blob/master/src/DateContentRow.js/issues/L121)
* proptype warnings ([#1084](https://github.com/Xetoxyc/react-big-calendar/issues/1084)) ([08c2494](https://github.com/Xetoxyc/react-big-calendar/commit/08c24942e5aa0a7414c987ba1bcf10559f30b98a))
* reference to draggable/resizable Accessor ([#1070](https://github.com/Xetoxyc/react-big-calendar/issues/1070)) ([1889a51](https://github.com/Xetoxyc/react-big-calendar/commit/1889a51d4616194acd1bcade83f95c4c157180ee))
* remove duplicate getter prop ([#1185](https://github.com/Xetoxyc/react-big-calendar/issues/1185)) ([6b90182](https://github.com/Xetoxyc/react-big-calendar/commit/6b901824e00649868149fbb968b981f899c2b9ff))
* remove global window from Map() usage, update eslint rules for new es6 environment ([#1195](https://github.com/Xetoxyc/react-big-calendar/issues/1195)) ([4768188](https://github.com/Xetoxyc/react-big-calendar/commit/4768188e7fbffd0ee9cdc6ff48c5f33259b52cca))
* Replace deprecated dependency ([a88da3f](https://github.com/Xetoxyc/react-big-calendar/commit/a88da3f5a803ca08b3fd4d2f2c974f6a9c6bd201))
* replace deprecated onKeyPress by onKeyDown ([21f51f2](https://github.com/Xetoxyc/react-big-calendar/commit/21f51f2bc4e218542fb09bf0e7d22be99ed50028))
* replace findDOMNode with refs ([a902d20](https://github.com/Xetoxyc/react-big-calendar/commit/a902d20a7413016a662e1f7b3f7a5241213ce354)), closes [#2193](https://github.com/Xetoxyc/react-big-calendar/issues/2193)
* replace findDOMNode with refs (react 17) ([24f92fb](https://github.com/Xetoxyc/react-big-calendar/commit/24f92fb12f7d488c65c54ca3f9f9bd14b09fc96a))
* resolve resizing events in Month view ([c7b105f](https://github.com/Xetoxyc/react-big-calendar/commit/c7b105f8d59b460b8ed2e45fa90653296651b52c)), closes [#2207](https://github.com/Xetoxyc/react-big-calendar/issues/2207)
* revert ([#2227](https://github.com/Xetoxyc/react-big-calendar/issues/2227)) ([b81fa14](https://github.com/Xetoxyc/react-big-calendar/commit/b81fa146a97b83cd0bff063eb5004f1583eb365c))
* revert a bug that the height of the column is broken when displayed in IE11 ([#1789](https://github.com/Xetoxyc/react-big-calendar/issues/1789))" ([#1805](https://github.com/Xetoxyc/react-big-calendar/issues/1805)) ([41104fa](https://github.com/Xetoxyc/react-big-calendar/commit/41104fad0281721ccc9885280b4ee085f64d17f5))
* revert change ([#2223](https://github.com/Xetoxyc/react-big-calendar/issues/2223)) ([bdb0595](https://github.com/Xetoxyc/react-big-calendar/commit/bdb0595400eaf0a612af3bb39d27f3c0c0fc5867))
* rounding behavior in Luxon localizer ([#2362](https://github.com/Xetoxyc/react-big-calendar/issues/2362)) ([409cff1](https://github.com/Xetoxyc/react-big-calendar/commit/409cff1d74a3130f89dca71f19e6832dd7c6e98c)), closes [#2361](https://github.com/Xetoxyc/react-big-calendar/issues/2361)
* **rtl DnD:** Dragging an event in the RTL month view calendar gets confused to the wrong side ([#2426](https://github.com/Xetoxyc/react-big-calendar/issues/2426)) ([ebe8c2c](https://github.com/Xetoxyc/react-big-calendar/commit/ebe8c2c3846ee8822e24756a82084f5b2a1d348f)), closes [#2310](https://github.com/Xetoxyc/react-big-calendar/issues/2310) [#1801](https://github.com/Xetoxyc/react-big-calendar/issues/1801)
* rtl incorrectly named or not propagated ([#1353](https://github.com/Xetoxyc/react-big-calendar/issues/1353)) ([caa863f](https://github.com/Xetoxyc/react-big-calendar/commit/caa863fb78b9ddc9cfb6c06a5d6c27601f300ac9))
* rtl prop has to be passed to the DateContentRow ([#915](https://github.com/Xetoxyc/react-big-calendar/issues/915)) ([e0ae4f1](https://github.com/Xetoxyc/react-big-calendar/commit/e0ae4f1723b8e5c768800f12a3e9257e83927596))
* **sass:** Reference distributed folder in SASS compile ([#2091](https://github.com/Xetoxyc/react-big-calendar/issues/2091)) ([20502f3](https://github.com/Xetoxyc/react-big-calendar/commit/20502f334a3c9ce62a1322a88d897b9afa66ee23)), closes [#2086](https://github.com/Xetoxyc/react-big-calendar/issues/2086)
* scrollToTime does not work properly, when min specified ([#2051](https://github.com/Xetoxyc/react-big-calendar/issues/2051)) ([04c1888](https://github.com/Xetoxyc/react-big-calendar/commit/04c18886f46acd17f09dec5d73a06bc32e6c75e5))
* selecting events in chrome ([#884](https://github.com/Xetoxyc/react-big-calendar/issues/884)) ([558ee2d](https://github.com/Xetoxyc/react-big-calendar/commit/558ee2d86bd06c4d84a13b1f7976825c2002d444))
* selecting events in mobile browsers ([#1233](https://github.com/Xetoxyc/react-big-calendar/issues/1233)) ([2bc9fee](https://github.com/Xetoxyc/react-big-calendar/commit/2bc9fee6b413e061333aa6c352bf9e8e7e12b71e))
* **Selection:** handling of terminating event ([937b4c5](https://github.com/Xetoxyc/react-big-calendar/commit/937b4c5019a327310d7e27dbbf6f6bd71876aaf4))
* set width ([#2332](https://github.com/Xetoxyc/react-big-calendar/issues/2332)) ([86b26cd](https://github.com/Xetoxyc/react-big-calendar/commit/86b26cd8a20ec11e953999650c10d59f4170f1ce))
* short-circuit handleInteractionEnd when no action is in progress ([#1118](https://github.com/Xetoxyc/react-big-calendar/issues/1118)) ([7a48b6a](https://github.com/Xetoxyc/react-big-calendar/commit/7a48b6a0186ad4197fd406d251316fea210122d2))
* single/Double clicks on an event work again ([#952](https://github.com/Xetoxyc/react-big-calendar/issues/952)) ([ee8cdbe](https://github.com/Xetoxyc/react-big-calendar/commit/ee8cdbef4263a4b18059487b94bf7a1e4fd61f3d))
* **stories:** fix not working links in docs ([#2559](https://github.com/Xetoxyc/react-big-calendar/issues/2559)) ([295957c](https://github.com/Xetoxyc/react-big-calendar/commit/295957c352a9e416c4ba43cb2fb81eaae2d62a69))
* support point-in-time events in the Agenda view ([#1246](https://github.com/Xetoxyc/react-big-calendar/issues/1246)) ([58c39c3](https://github.com/Xetoxyc/react-big-calendar/commit/58c39c383ff1f25595605e7484fbdd6017b8f42f))
* switch DnD to modern context API (was legacy) ([6def209](https://github.com/Xetoxyc/react-big-calendar/commit/6def209913b6c7191442ec7aaeff31a1651afc4e)), closes [#1795](https://github.com/Xetoxyc/react-big-calendar/issues/1795) [#1776](https://github.com/Xetoxyc/react-big-calendar/issues/1776)
* temp fix for DayColumn render ([#2224](https://github.com/Xetoxyc/react-big-calendar/issues/2224)) ([48b23a2](https://github.com/Xetoxyc/react-big-calendar/commit/48b23a26edb2383abee9978a2b99eb4520a97f12)), closes [#2222](https://github.com/Xetoxyc/react-big-calendar/issues/2222)
* time indicator placement ([071fa88](https://github.com/Xetoxyc/react-big-calendar/commit/071fa888b023e9d7fdcc1d2be1467ee23f518917))
* TimeGrid display on DST change days when min is after the transition ([#1303](https://github.com/Xetoxyc/react-big-calendar/issues/1303)) ([b436017](https://github.com/Xetoxyc/react-big-calendar/commit/b43601764c55d705690233eab95f8c01526639ce)), closes [#1098](https://github.com/Xetoxyc/react-big-calendar/issues/1098) [#1273](https://github.com/Xetoxyc/react-big-calendar/issues/1273)
* to build ([#2517](https://github.com/Xetoxyc/react-big-calendar/issues/2517)) ([621fc7e](https://github.com/Xetoxyc/react-big-calendar/commit/621fc7ed25d95c0a65bc12bf513e6fd4e37cd2ef))
* totalMin calculation in TimeSlots. ([#965](https://github.com/Xetoxyc/react-big-calendar/issues/965)) ([b761e86](https://github.com/Xetoxyc/react-big-calendar/commit/b761e8666c7fc95c5c2bf9b0a501a80d342de388))
* Trade href="#" anchors for stylized buttons ([#2074](https://github.com/Xetoxyc/react-big-calendar/issues/2074)) ([cd385f5](https://github.com/Xetoxyc/react-big-calendar/commit/cd385f5f9fc9f998d944e9a3db643e6152fbb5d1))
* typo ([#2443](https://github.com/Xetoxyc/react-big-calendar/issues/2443)) ([407e168](https://github.com/Xetoxyc/react-big-calendar/commit/407e168921a861e171ec3c8aee23f5ffe855323d))
* typo for prop titles ([#2298](https://github.com/Xetoxyc/react-big-calendar/issues/2298)) ([11fd6c8](https://github.com/Xetoxyc/react-big-calendar/commit/11fd6c83685bf6c0345623366247bcb294e6325c))
* update react & react-dom peer-dep range to support 17.x ([#1880](https://github.com/Xetoxyc/react-big-calendar/issues/1880)) ([dbcc578](https://github.com/Xetoxyc/react-big-calendar/commit/dbcc5785a0d2edd2c710706538389344dba737a8))
* update time indicator position if max prop changes ([#1379](https://github.com/Xetoxyc/react-big-calendar/issues/1379)) ([ac945b7](https://github.com/Xetoxyc/react-big-calendar/commit/ac945b70349a841b55b3413a9f101e20a062891b))
* update time indicator position if min prop changes ([#1311](https://github.com/Xetoxyc/react-big-calendar/issues/1311)) ([97ea841](https://github.com/Xetoxyc/react-big-calendar/commit/97ea841d52a2d0126bb90c09f421355fe63e57c7))
* update TimeGrid on resources list change ([#1135](https://github.com/Xetoxyc/react-big-calendar/issues/1135)) ([91c6ec0](https://github.com/Xetoxyc/react-big-calendar/commit/91c6ec0adb7f2840e9439de1cf4690ef832f078e))
* update to current react-overlays ([#2217](https://github.com/Xetoxyc/react-big-calendar/issues/2217)) ([27ebe46](https://github.com/Xetoxyc/react-big-calendar/commit/27ebe46f6d4900d1bac5986f57770c93f2ab1287)), closes [#2186](https://github.com/Xetoxyc/react-big-calendar/issues/2186)
* use accessors when determining dnd height. ([#954](https://github.com/Xetoxyc/react-big-calendar/issues/954)) ([be81065](https://github.com/Xetoxyc/react-big-calendar/commit/be81065393655ea76c6bb6ea5ccc66e66c058f4b))
* use fixed date arithmetic lib and move bt-sass to devdepen… ([#1374](https://github.com/Xetoxyc/react-big-calendar/issues/1374)) ([b223a61](https://github.com/Xetoxyc/react-big-calendar/commit/b223a61e4bb78f139373eb208e6225eea4b6a855))
* use React.createRef instead of string refs ([#1282](https://github.com/Xetoxyc/react-big-calendar/issues/1282)) ([239f0a3](https://github.com/Xetoxyc/react-big-calendar/commit/239f0a30af80aee4a1d7caf7d46ab743822e2f8a))
* using wrong bounding box for hit testing ([f670719](https://github.com/Xetoxyc/react-big-calendar/commit/f670719641423e0c5b1b8026bacc56fa0c9ff222))
* warning defaultProps in Agenda ([#2620](https://github.com/Xetoxyc/react-big-calendar/issues/2620)) ([d1c31c2](https://github.com/Xetoxyc/react-big-calendar/commit/d1c31c2d55e5a4a74043261a4e1f5de80396e071))
* zero duration no-overlap events ([#2213](https://github.com/Xetoxyc/react-big-calendar/issues/2213)) ([bbe1109](https://github.com/Xetoxyc/react-big-calendar/commit/bbe11094c0bfcfc162022711f848905e57479152))


### Features

* [#1390](https://github.com/Xetoxyc/react-big-calendar/issues/1390) use en dashes in ranges ([#1391](https://github.com/Xetoxyc/react-big-calendar/issues/1391)) ([7619e59](https://github.com/Xetoxyc/react-big-calendar/commit/7619e592a6e880860c7fc2e9cbc6473ede386955))
* Add `onSelectEvent` & `onDoubleClickEvent` support to Agenda ([c14f427](https://github.com/Xetoxyc/react-big-calendar/commit/c14f427195115f4d994795722c709bdc2ac44288))
* add `showAllEvents` Calendar Prop ([#1808](https://github.com/Xetoxyc/react-big-calendar/issues/1808)) ([8ffe39d](https://github.com/Xetoxyc/react-big-calendar/commit/8ffe39dccce5ec7bcac618f9494c21ae557b3537))
* add ability to set custom resource headers ([#1187](https://github.com/Xetoxyc/react-big-calendar/issues/1187)) ([6708a45](https://github.com/Xetoxyc/react-big-calendar/commit/6708a4583a2179112dbc9c999a68161bb46de186)), closes [#1174](https://github.com/Xetoxyc/react-big-calendar/issues/1174)
* add agenda no events msg ([#923](https://github.com/Xetoxyc/react-big-calendar/issues/923)) ([51304f5](https://github.com/Xetoxyc/react-big-calendar/commit/51304f52cc51430149ff396c7ba74bc9a8398ee8))
* add ARIA roles to month view ([#1863](https://github.com/Xetoxyc/react-big-calendar/issues/1863)) ([02bbeb1](https://github.com/Xetoxyc/react-big-calendar/commit/02bbeb1bc2bd91343fc30b9fea3098d962338b55))
* add background events feature ([#1851](https://github.com/Xetoxyc/react-big-calendar/issues/1851)) ([e797ab3](https://github.com/Xetoxyc/react-big-calendar/commit/e797ab3a6507bd0a9bb98971f693cc86e42cdc3a)), closes [#1727](https://github.com/Xetoxyc/react-big-calendar/issues/1727)
* add citation file ([#2523](https://github.com/Xetoxyc/react-big-calendar/issues/2523)) ([3de0059](https://github.com/Xetoxyc/react-big-calendar/commit/3de00592fd68a93582511e83ce9051078188e100))
* add commitlint ([b35e156](https://github.com/Xetoxyc/react-big-calendar/commit/b35e156cb660cfaf6571add66eb4c7db9f26c095))
* add custom timeSlotWrapper support ([#930](https://github.com/Xetoxyc/react-big-calendar/issues/930)) ([172c316](https://github.com/Xetoxyc/react-big-calendar/commit/172c316b0ecba59d6ef9f10649be62a34ffed22a))
* add Date-fns localizer ([#1542](https://github.com/Xetoxyc/react-big-calendar/issues/1542)) ([749c91c](https://github.com/Xetoxyc/react-big-calendar/commit/749c91cc030bb45132da1870176d99156d6b784e))
* add dragging ability from the monthly Popup component ([#1554](https://github.com/Xetoxyc/react-big-calendar/issues/1554)) ([12233ef](https://github.com/Xetoxyc/react-big-calendar/commit/12233efc7efdcb222954e9c6b2692e01a8101c42))
* add horizontal scrolling for wide resource calendars ([#921](https://github.com/Xetoxyc/react-big-calendar/issues/921)) ([d1e90b1](https://github.com/Xetoxyc/react-big-calendar/commit/d1e90b148a0be2b71f2c1887b196cf5df088535c))
* add onKeyPressEvent ([#1754](https://github.com/Xetoxyc/react-big-calendar/issues/1754)) ([ca8d77b](https://github.com/Xetoxyc/react-big-calendar/commit/ca8d77b89403217047a801711d90cf3f8e8339d5))
* add Rearrangement Algorithm Implementation ([#1473](https://github.com/Xetoxyc/react-big-calendar/issues/1473)) ([e622651](https://github.com/Xetoxyc/react-big-calendar/commit/e622651aac059ff6040a263e0d73521cd75bb42d))
* add resource to handleDropFromOutside ([#1319](https://github.com/Xetoxyc/react-big-calendar/issues/1319)) ([2b7ad2a](https://github.com/Xetoxyc/react-big-calendar/commit/2b7ad2a78c897f3860ee7ce26f3f85858ae9620e))
* add resourceId to handleSelectAllDaySlot fns slotInfo ([#1735](https://github.com/Xetoxyc/react-big-calendar/issues/1735)) ([f00a516](https://github.com/Xetoxyc/react-big-calendar/commit/f00a516cdd7b1876d654bf863979b4f391bdb0bc))
* add resourceId to onSelecting callback ([#1416](https://github.com/Xetoxyc/react-big-calendar/issues/1416)) ([0c9b1f2](https://github.com/Xetoxyc/react-big-calendar/commit/0c9b1f2d3a6bc742b3b0b84c4bb4aee8cb5abc63))
* add selecting and drag cancelation ([#1119](https://github.com/Xetoxyc/react-big-calendar/issues/1119)) ([aa8f08b](https://github.com/Xetoxyc/react-big-calendar/commit/aa8f08b35b94fec631b9cbe5555c28e3cce0563e))
* add Time Zone support using localizer date math ([#2023](https://github.com/Xetoxyc/react-big-calendar/issues/2023)) ([ad8defa](https://github.com/Xetoxyc/react-big-calendar/commit/ad8defa643692911fd0b00c71b70de94715140a9))
* add timeGutterHeaderComponent ([#874](https://github.com/Xetoxyc/react-big-calendar/issues/874)) ([adc2078](https://github.com/Xetoxyc/react-big-calendar/commit/adc20783d114d61eb562e2cc2badaf179a6d2226)), closes [intljusticemission/react-big-calendar#853](https://github.com/intljusticemission/react-big-calendar/issues/853)
* added continuesPrior and continuesAfter props to Event component ([#1201](https://github.com/Xetoxyc/react-big-calendar/issues/1201)) ([74a2233](https://github.com/Xetoxyc/react-big-calendar/commit/74a22335995d7983af62262624a16d35941f6bfe))
* adding bounds and box on slot select in Month view ([#1241](https://github.com/Xetoxyc/react-big-calendar/issues/1241)) ([2a870b0](https://github.com/Xetoxyc/react-big-calendar/commit/2a870b0f795d7493db74124b8d4056aeada461d7))
* adding tabbable events ([#987](https://github.com/Xetoxyc/react-big-calendar/issues/987)) ([6a94e72](https://github.com/Xetoxyc/react-big-calendar/commit/6a94e72ad27affc0d00bd298659bfa987ce33b0e))
* Adding TS, hooks, and Vite ([1559333](https://github.com/Xetoxyc/react-big-calendar/commit/15593336c5a38839894422df3b260557c2117461))
* **allDayMaxRows:** Allow for more granular control ([36871bf](https://github.com/Xetoxyc/react-big-calendar/commit/36871bf509603dd05ad16f6cb9c5f5d9517cae16)), closes [#2386](https://github.com/Xetoxyc/react-big-calendar/issues/2386)
* allow using custom event wrapper component while dragging ([#2228](https://github.com/Xetoxyc/react-big-calendar/issues/2228)) ([afa8824](https://github.com/Xetoxyc/react-big-calendar/commit/afa882426b893e300da25202b5c56b23d591e9f1)), closes [#1864](https://github.com/Xetoxyc/react-big-calendar/issues/1864)
* Dayjs localizer ([#2264](https://github.com/Xetoxyc/react-big-calendar/issues/2264)) ([537c6f3](https://github.com/Xetoxyc/react-big-calendar/commit/537c6f3f08344191588f2ab3ad52667de7ee261f))
* Disable autoscroll functionality,  Add a functionality to disable auto-scroll on calendar render. ([aa8f374](https://github.com/Xetoxyc/react-big-calendar/commit/aa8f374bed642703639db8f659f2771bfae346e7))
* DnD support for custom DropWrapper components (dayWrapper and dateCellWrapper) ([#843](https://github.com/Xetoxyc/react-big-calendar/issues/843)) ([d372f0d](https://github.com/Xetoxyc/react-big-calendar/commit/d372f0de1647195c701282727245a36f5864dc83))
* **dnd:** add onDropFromOutside prop for Dnd Cal ([#1290](https://github.com/Xetoxyc/react-big-calendar/issues/1290)) ([b9fdce4](https://github.com/Xetoxyc/react-big-calendar/commit/b9fdce46ff5d49712090bae8426c400624f10fe4)), closes [#1090](https://github.com/Xetoxyc/react-big-calendar/issues/1090)
* **dnd:** add preview of an item inside cell while dragging ([#1369](https://github.com/Xetoxyc/react-big-calendar/issues/1369)) ([ac715f8](https://github.com/Xetoxyc/react-big-calendar/commit/ac715f8fac0b2aa338b3062d78b344aea2619211))
* **dnd:** implement callback on initializing drag or resize action ([#1206](https://github.com/Xetoxyc/react-big-calendar/issues/1206)) ([0fa2c30](https://github.com/Xetoxyc/react-big-calendar/commit/0fa2c307c4de345c5987111dd34096242e5b51fa)), closes [#1205](https://github.com/Xetoxyc/react-big-calendar/issues/1205)
* **DnD:** support to/from allDay events in demos ([b067ad0](https://github.com/Xetoxyc/react-big-calendar/commit/b067ad0541d4ea4b93c7fc4a6da61cc93d7ba2d9))
* drop warning ([#1455](https://github.com/Xetoxyc/react-big-calendar/issues/1455)) ([77004e2](https://github.com/Xetoxyc/react-big-calendar/commit/77004e2a51dfa466341e14d2dab35466822d0efb))
* **event sort:** update event sort for multi day ([#2502](https://github.com/Xetoxyc/react-big-calendar/issues/2502)) ([ff209d0](https://github.com/Xetoxyc/react-big-calendar/commit/ff209d035aca4865c4211dc03f27f7da0147c9a1))
* **events:** default events prop to an empty array ([#2161](https://github.com/Xetoxyc/react-big-calendar/issues/2161)) ([efac0b2](https://github.com/Xetoxyc/react-big-calendar/commit/efac0b26b365bbddb803ad256e22a5844cf36052)), closes [#1708](https://github.com/Xetoxyc/react-big-calendar/issues/1708)
* handleRangeChange, handleViewChange refactored to pass fresh `view` to onRangeChange when view changed; ([#1100](https://github.com/Xetoxyc/react-big-calendar/issues/1100)) ([befac9f](https://github.com/Xetoxyc/react-big-calendar/commit/befac9fb0e72fcfd7107cb2ee2770120eb312e04))
* hide single day header with css ([#1019](https://github.com/Xetoxyc/react-big-calendar/issues/1019)) ([5857d8f](https://github.com/Xetoxyc/react-big-calendar/commit/5857d8fb44d614047d43838be8c52bbbe2dbff55))
* improve toolbar responsiveness for mobile devices ([#900](https://github.com/Xetoxyc/react-big-calendar/issues/900)) ([cd10e6f](https://github.com/Xetoxyc/react-big-calendar/commit/cd10e6ffa800d17c36198a7b7941c9cadef2ce4e))
* **localizers:** move localizer dependencies ([e4a3235](https://github.com/Xetoxyc/react-big-calendar/commit/e4a323538c2d2c3cd6c56300ef560ac5f18519c4))
* pass resource prop to DayColumnWrapper ([77760aa](https://github.com/Xetoxyc/react-big-calendar/commit/77760aa7ca60c83eaaf587fb2711e29586f5f635)), closes [#2607](https://github.com/Xetoxyc/react-big-calendar/issues/2607)
* pass resourceId to slotPropGetter ([#1101](https://github.com/Xetoxyc/react-big-calendar/issues/1101)) ([0e1e1a0](https://github.com/Xetoxyc/react-big-calendar/commit/0e1e1a084af984106e8b01fe51628ff1572df948))
* provide named exports api ([#1348](https://github.com/Xetoxyc/react-big-calendar/issues/1348)) ([4e09704](https://github.com/Xetoxyc/react-big-calendar/commit/4e09704eb7228bd14462ad85306d6db9639b0275))
* redeclared all sass variables as !default ([#1321](https://github.com/Xetoxyc/react-big-calendar/issues/1321)) ([c4f09cd](https://github.com/Xetoxyc/react-big-calendar/commit/c4f09cdc1cbbe67552a92a194d2077a935e34605))
* remove propTypes in production ([#1180](https://github.com/Xetoxyc/react-big-calendar/issues/1180)) ([ce0d56b](https://github.com/Xetoxyc/react-big-calendar/commit/ce0d56bcec61dfb604eb2edc99726a813687ad1d))
* remove unneeded dependencies ([#2215](https://github.com/Xetoxyc/react-big-calendar/issues/2215)) ([fb05151](https://github.com/Xetoxyc/react-big-calendar/commit/fb05151252ad02610c7fafa7fbe13dd00b5d40af))
* replace unsafe deprecated methods ([#2216](https://github.com/Xetoxyc/react-big-calendar/issues/2216)) ([c5c6a8b](https://github.com/Xetoxyc/react-big-calendar/commit/c5c6a8bf8f710402dc69bf1322d76b83c19824c4)), closes [#1200](https://github.com/Xetoxyc/react-big-calendar/issues/1200) [#1777](https://github.com/Xetoxyc/react-big-calendar/issues/1777) [#1481](https://github.com/Xetoxyc/react-big-calendar/issues/1481) [#2126](https://github.com/Xetoxyc/react-big-calendar/issues/2126) [#2104](https://github.com/Xetoxyc/react-big-calendar/issues/2104) [#2105](https://github.com/Xetoxyc/react-big-calendar/issues/2105) [#1526](https://github.com/Xetoxyc/react-big-calendar/issues/1526)
* revamp Drag and drop ([d2e02c4](https://github.com/Xetoxyc/react-big-calendar/commit/d2e02c4bfde41b39ea22db344cbd8b948b17fc8b))
* showMore message add event info ([#2496](https://github.com/Xetoxyc/react-big-calendar/issues/2496)) ([18012b7](https://github.com/Xetoxyc/react-big-calendar/commit/18012b70ad48a5613bcb08f0a13251d88a9d258f))
* Slot group prop getter ([#1471](https://github.com/Xetoxyc/react-big-calendar/issues/1471)) ([#1510](https://github.com/Xetoxyc/react-big-calendar/issues/1510)) ([fcb9b9a](https://github.com/Xetoxyc/react-big-calendar/commit/fcb9b9ac4752bf9a68498672b2f4178dbc5770e5))
* sort by event end date if start dates are equal ([dddf4e1](https://github.com/Xetoxyc/react-big-calendar/commit/dddf4e189ad3c1900ab30097357464c699a60021))
* starting to hooks to avoid deprecation warnings ([#1687](https://github.com/Xetoxyc/react-big-calendar/issues/1687)) ([b8368f9](https://github.com/Xetoxyc/react-big-calendar/commit/b8368f982d2463031a22979796ecd099bb1d7ee6))
* Support multiple resources on an event ([91155c5](https://github.com/Xetoxyc/react-big-calendar/commit/91155c5193f0a0b3899cb84c1dbfc6480fca4c0c)), closes [#2405](https://github.com/Xetoxyc/react-big-calendar/issues/2405) [#1649](https://github.com/Xetoxyc/react-big-calendar/issues/1649)
* switch to Sass for styles ([884bece](https://github.com/Xetoxyc/react-big-calendar/commit/884bece979e5c02603f0905ad25da07a9e7f48c7))
* **time-gutter-wrapper:** expose time gutter wrapper component ([#2236](https://github.com/Xetoxyc/react-big-calendar/issues/2236)) ([39ff8a1](https://github.com/Xetoxyc/react-big-calendar/commit/39ff8a10ee4901b950780c0fc4a697f53a0d9d2b))
* **translations:** translate CONTRIBUTING.md to Arabic ([#2558](https://github.com/Xetoxyc/react-big-calendar/issues/2558)) ([ae64158](https://github.com/Xetoxyc/react-big-calendar/commit/ae64158f102c10e3d1dc555e394c02cca85d7cc2))
* update react-overlays dependency ([#1816](https://github.com/Xetoxyc/react-big-calendar/issues/1816)) ([5490207](https://github.com/Xetoxyc/react-big-calendar/commit/5490207feaa0e488180344a4891aa68c877c487c)), closes [#1813](https://github.com/Xetoxyc/react-big-calendar/issues/1813)
* upgrade react-overlays ([#1421](https://github.com/Xetoxyc/react-big-calendar/issues/1421)) ([9117549](https://github.com/Xetoxyc/react-big-calendar/commit/9117549ad820c56f1b00943eb694be7fe99c7a40))
* use custom event wrapper when dragging ([#2221](https://github.com/Xetoxyc/react-big-calendar/issues/2221)) ([73ed69a](https://github.com/Xetoxyc/react-big-calendar/commit/73ed69ad39383a5a19f90150a373e9f0038c2dee)), closes [#1864](https://github.com/Xetoxyc/react-big-calendar/issues/1864)
* use lodash-es for esm bundle ([#1350](https://github.com/Xetoxyc/react-big-calendar/issues/1350)) ([fb0fe5e](https://github.com/Xetoxyc/react-big-calendar/commit/fb0fe5eef16381e917c64040dcaf6462d3bc6a17))


### Performance Improvements

* increase startup time of event dragging ([#1020](https://github.com/Xetoxyc/react-big-calendar/issues/1020)) ([167b69f](https://github.com/Xetoxyc/react-big-calendar/commit/167b69f05fadcc2526ac55053f78c767373b83b0))


### BREAKING CHANGES

* **localizers:** moment, luxon and globalize are no longer bundled
* must use named exports for additional RBC imports

```js
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components
} from 'react-big-calendar';
```
* Less files have been replaced with Sass versions
* Calendar wrapper components props have changed
* react-dnd is no longer used internally with no external API

## [1.13.2](https://github.com/jquense/react-big-calendar/compare/v1.13.1...v1.13.2) (2024-08-06)


### Bug Fixes

* correct nested sass ([#2641](https://github.com/jquense/react-big-calendar/issues/2641)) ([88bdf77](https://github.com/jquense/react-big-calendar/commit/88bdf77d05d0548cf9228b11f49c550adbc07c4c))

## [1.13.1](https://github.com/jquense/react-big-calendar/compare/v1.13.0...v1.13.1) (2024-07-12)


### Bug Fixes

* warning defaultProps in Agenda ([#2620](https://github.com/jquense/react-big-calendar/issues/2620)) ([d1c31c2](https://github.com/jquense/react-big-calendar/commit/d1c31c2d55e5a4a74043261a4e1f5de80396e071))

# [1.13.0](https://github.com/jquense/react-big-calendar/compare/v1.12.2...v1.13.0) (2024-06-11)


### Features

* pass resource prop to DayColumnWrapper ([77760aa](https://github.com/jquense/react-big-calendar/commit/77760aa7ca60c83eaaf587fb2711e29586f5f635)), closes [#2607](https://github.com/jquense/react-big-calendar/issues/2607)

## [1.12.2](https://github.com/jquense/react-big-calendar/compare/v1.12.1...v1.12.2) (2024-05-14)


### Bug Fixes

* bug with dnd drag drop ([#2602](https://github.com/jquense/react-big-calendar/issues/2602)) ([799a72a](https://github.com/jquense/react-big-calendar/commit/799a72ad5d1782f4d8518e834585728c32e1b7e3)), closes [#2601](https://github.com/jquense/react-big-calendar/issues/2601)

## [1.12.1](https://github.com/jquense/react-big-calendar/compare/v1.12.0...v1.12.1) (2024-04-30)


### Bug Fixes

* fixing Drag and Drop Examples link ([fa4a378](https://github.com/jquense/react-big-calendar/commit/fa4a378f32ed298394fc4716f9d788c22205347e)), closes [#2585](https://github.com/jquense/react-big-calendar/issues/2585)

# [1.12.0](https://github.com/jquense/react-big-calendar/compare/v1.11.7...v1.12.0) (2024-04-25)


### Features

* **translations:** translate CONTRIBUTING.md to Arabic ([#2558](https://github.com/jquense/react-big-calendar/issues/2558)) ([ae64158](https://github.com/jquense/react-big-calendar/commit/ae64158f102c10e3d1dc555e394c02cca85d7cc2))

## [1.11.7](https://github.com/jquense/react-big-calendar/compare/v1.11.6...v1.11.7) (2024-04-25)


### Bug Fixes

* correcting doubleClick ([#2571](https://github.com/jquense/react-big-calendar/issues/2571)) ([775993c](https://github.com/jquense/react-big-calendar/commit/775993cee756c681a351678874007b175258714d)), closes [#2565](https://github.com/jquense/react-big-calendar/issues/2565)

## [1.11.6](https://github.com/jquense/react-big-calendar/compare/v1.11.5...v1.11.6) (2024-04-15)


### Bug Fixes

* **docs:** correct link for 'props' in 'Understanding Dates' guide ([#2562](https://github.com/jquense/react-big-calendar/issues/2562)) ([59982ae](https://github.com/jquense/react-big-calendar/commit/59982ae073e9afda4370a8a5f1589c65b0d4580d))

## [1.11.5](https://github.com/jquense/react-big-calendar/compare/v1.11.4...v1.11.5) (2024-04-15)


### Bug Fixes

* **stories:** fix not working links in docs ([#2559](https://github.com/jquense/react-big-calendar/issues/2559)) ([295957c](https://github.com/jquense/react-big-calendar/commit/295957c352a9e416c4ba43cb2fb81eaae2d62a69))

## [1.11.4](https://github.com/jquense/react-big-calendar/compare/v1.11.3...v1.11.4) (2024-04-15)


### Bug Fixes

* Correct selection issues ([def4934](https://github.com/jquense/react-big-calendar/commit/def4934b45804c1ccdeaa4c5c8ddb52b346b0d08))

## [1.11.3](https://github.com/jquense/react-big-calendar/compare/v1.11.2...v1.11.3) (2024-04-02)


### Bug Fixes

* **Selection:** handling of terminating event ([937b4c5](https://github.com/jquense/react-big-calendar/commit/937b4c5019a327310d7e27dbbf6f6bd71876aaf4))

## [1.11.2](https://github.com/jquense/react-big-calendar/compare/v1.11.1...v1.11.2) (2024-03-12)


### Bug Fixes

* correct slotMetrics issue in TimeGrid ([e25f187](https://github.com/jquense/react-big-calendar/commit/e25f1878a8d8aaf37b7b5721f76a1be4ceb0e988)), closes [#2529](https://github.com/jquense/react-big-calendar/issues/2529)

## [1.11.1](https://github.com/jquense/react-big-calendar/compare/v1.11.0...v1.11.1) (2024-03-04)


### Bug Fixes

* replace deprecated onKeyPress by onKeyDown ([21f51f2](https://github.com/jquense/react-big-calendar/commit/21f51f2bc4e218542fb09bf0e7d22be99ed50028))

# [1.11.0](https://github.com/jquense/react-big-calendar/compare/v1.10.3...v1.11.0) (2024-02-26)


### Features

* add citation file ([#2523](https://github.com/jquense/react-big-calendar/issues/2523)) ([3de0059](https://github.com/jquense/react-big-calendar/commit/3de00592fd68a93582511e83ce9051078188e100))

## [1.10.3](https://github.com/jquense/react-big-calendar/compare/v1.10.2...v1.10.3) (2024-02-21)


### Bug Fixes

* to build ([#2517](https://github.com/jquense/react-big-calendar/issues/2517)) ([621fc7e](https://github.com/jquense/react-big-calendar/commit/621fc7ed25d95c0a65bc12bf513e6fd4e37cd2ef))

## [1.10.2](https://github.com/jquense/react-big-calendar/compare/v1.10.1...v1.10.2) (2024-02-19)


### Bug Fixes

* day events sort fixed ([#2512](https://github.com/jquense/react-big-calendar/issues/2512)) ([ac1ff00](https://github.com/jquense/react-big-calendar/commit/ac1ff004a2f6384a1540e66ed47f219e1f9101c5))

## [1.10.1](https://github.com/jquense/react-big-calendar/compare/v1.10.0...v1.10.1) (2024-02-14)


### Bug Fixes

* **ARIA:** remove tabindex ([#2508](https://github.com/jquense/react-big-calendar/issues/2508)) ([7e01c3d](https://github.com/jquense/react-big-calendar/commit/7e01c3d0495808cf3bf49a95c7cdd8ef98f54fed)), closes [#2498](https://github.com/jquense/react-big-calendar/issues/2498)

# [1.10.0](https://github.com/jquense/react-big-calendar/compare/v1.9.2...v1.10.0) (2024-02-09)


### Features

* **event sort:** update event sort for multi day ([#2502](https://github.com/jquense/react-big-calendar/issues/2502)) ([ff209d0](https://github.com/jquense/react-big-calendar/commit/ff209d035aca4865c4211dc03f27f7da0147c9a1))

## [1.9.2](https://github.com/jquense/react-big-calendar/compare/v1.9.1...v1.9.2) (2024-02-09)


### Bug Fixes

* changed flex-direction for rbc-toolbar mobile ([#2497](https://github.com/jquense/react-big-calendar/issues/2497)) ([8d7b20d](https://github.com/jquense/react-big-calendar/commit/8d7b20d8c971411d05757344d9eb422af1d8241c)), closes [#1699](https://github.com/jquense/react-big-calendar/issues/1699)

## [1.9.1](https://github.com/jquense/react-big-calendar/compare/v1.9.0...v1.9.1) (2024-02-07)


### Bug Fixes

* **dnd:** move merge components ([fd02261](https://github.com/jquense/react-big-calendar/commit/fd02261a66d80892a95e9e9ae4cbfe2779d4643c)), closes [#2359](https://github.com/jquense/react-big-calendar/issues/2359)

# [1.9.0](https://github.com/jquense/react-big-calendar/compare/v1.8.7...v1.9.0) (2024-02-07)


### Features

* showMore message add event info ([#2496](https://github.com/jquense/react-big-calendar/issues/2496)) ([18012b7](https://github.com/jquense/react-big-calendar/commit/18012b70ad48a5613bcb08f0a13251d88a9d258f))

## [1.8.7](https://github.com/jquense/react-big-calendar/compare/v1.8.6...v1.8.7) (2024-01-26)


### Bug Fixes

* add isBackgroundEvent to onSelectEvent event obj ([#2491](https://github.com/jquense/react-big-calendar/issues/2491)) ([fdbb496](https://github.com/jquense/react-big-calendar/commit/fdbb496eb50696c8b1744fc69249535121b2f4b1))

## [1.8.6](https://github.com/jquense/react-big-calendar/compare/v1.8.5...v1.8.6) (2024-01-08)


### Bug Fixes

* **DnD:** dragAndDrop EventWrapper.js error: cannot add property 'X', object is not extensible ([0c4826a](https://github.com/jquense/react-big-calendar/commit/0c4826a70378de7923bd772b15d481e3c30c530b))

## [1.8.5](https://github.com/jquense/react-big-calendar/compare/v1.8.4...v1.8.5) (2023-10-30)


### Bug Fixes

* fixing invalid ref with invalid scrollHeight ([#2459](https://github.com/jquense/react-big-calendar/issues/2459)) ([a4bc8f3](https://github.com/jquense/react-big-calendar/commit/a4bc8f3f275ccfba5b6861330b87b39f05505ca8))

## [1.8.4](https://github.com/jquense/react-big-calendar/compare/v1.8.3...v1.8.4) (2023-09-18)


### Bug Fixes

* typo ([#2443](https://github.com/jquense/react-big-calendar/issues/2443)) ([407e168](https://github.com/jquense/react-big-calendar/commit/407e168921a861e171ec3c8aee23f5ffe855323d))

## [1.8.3](https://github.com/jquense/react-big-calendar/compare/v1.8.2...v1.8.3) (2023-09-18)


### Bug Fixes

* Modify events.js ([#2444](https://github.com/jquense/react-big-calendar/issues/2444)) ([2a838d9](https://github.com/jquense/react-big-calendar/commit/2a838d981ed08c0be7ff6702f64b79db3158ff90))

## [1.8.2](https://github.com/jquense/react-big-calendar/compare/v1.8.1...v1.8.2) (2023-08-07)


### Bug Fixes

* **rtl DnD:** Dragging an event in the RTL month view calendar gets confused to the wrong side ([#2426](https://github.com/jquense/react-big-calendar/issues/2426)) ([ebe8c2c](https://github.com/jquense/react-big-calendar/commit/ebe8c2c3846ee8822e24756a82084f5b2a1d348f)), closes [#2310](https://github.com/jquense/react-big-calendar/issues/2310) [#1801](https://github.com/jquense/react-big-calendar/issues/1801)

## [1.8.1](https://github.com/jquense/react-big-calendar/compare/v1.8.0...v1.8.1) (2023-06-05)


### Bug Fixes

* scrollToTime does not work properly, when min specified ([#2051](https://github.com/jquense/react-big-calendar/issues/2051)) ([04c1888](https://github.com/jquense/react-big-calendar/commit/04c18886f46acd17f09dec5d73a06bc32e6c75e5))

# [1.8.0](https://github.com/jquense/react-big-calendar/compare/v1.7.0...v1.8.0) (2023-06-02)


### Features

* **allDayMaxRows:** Allow for more granular control ([36871bf](https://github.com/jquense/react-big-calendar/commit/36871bf509603dd05ad16f6cb9c5f5d9517cae16)), closes [#2386](https://github.com/jquense/react-big-calendar/issues/2386)

# [1.7.0](https://github.com/jquense/react-big-calendar/compare/v1.6.9...v1.7.0) (2023-06-02)


### Features

* Support multiple resources on an event ([91155c5](https://github.com/jquense/react-big-calendar/commit/91155c5193f0a0b3899cb84c1dbfc6480fca4c0c)), closes [#2405](https://github.com/jquense/react-big-calendar/issues/2405) [#1649](https://github.com/jquense/react-big-calendar/issues/1649)

## [1.6.9](https://github.com/jquense/react-big-calendar/compare/v1.6.8...v1.6.9) (2023-03-24)


### Bug Fixes

* **moment:** wrong time on the day when DST changes ([#2374](https://github.com/jquense/react-big-calendar/issues/2374)) ([b82ceb7](https://github.com/jquense/react-big-calendar/commit/b82ceb7f4213e166c64ce643eef912b2ba4cd3a9)), closes [#2296](https://github.com/jquense/react-big-calendar/issues/2296)

## [1.6.8](https://github.com/jquense/react-big-calendar/compare/v1.6.7...v1.6.8) (2023-02-17)


### Bug Fixes

* correct treatment of boolean view in 'views' ([#2368](https://github.com/jquense/react-big-calendar/issues/2368)) ([0e6b771](https://github.com/jquense/react-big-calendar/commit/0e6b7717985e626413347fcc196d38c0d071d759))

## [1.6.7](https://github.com/jquense/react-big-calendar/compare/v1.6.6...v1.6.7) (2023-02-15)


### Bug Fixes

* 1px misalignment ([#2367](https://github.com/jquense/react-big-calendar/issues/2367)) ([7479b4d](https://github.com/jquense/react-big-calendar/commit/7479b4d5955511ae1a42ed666d245bd411be7868))

## [1.6.6](https://github.com/jquense/react-big-calendar/compare/v1.6.5...v1.6.6) (2023-02-15)


### Bug Fixes

* pass dates to slotGroupPropGetter ([#2066](https://github.com/jquense/react-big-calendar/issues/2066)) ([943ae6e](https://github.com/jquense/react-big-calendar/commit/943ae6edbadb48ca866c256bcbbac7059356fdee))

## [1.6.5](https://github.com/jquense/react-big-calendar/compare/v1.6.4...v1.6.5) (2023-02-14)


### Bug Fixes

* calendar auto scroll while dragging event at top/bottom edge ([#2230](https://github.com/jquense/react-big-calendar/issues/2230)) ([d1c5085](https://github.com/jquense/react-big-calendar/commit/d1c5085b004bb3c606a682b488a92585e50b12b4)), closes [#2231](https://github.com/jquense/react-big-calendar/issues/2231)

## [1.6.4](https://github.com/jquense/react-big-calendar/compare/v1.6.3...v1.6.4) (2023-02-09)


### Bug Fixes

* rounding behavior in Luxon localizer ([#2362](https://github.com/jquense/react-big-calendar/issues/2362)) ([409cff1](https://github.com/jquense/react-big-calendar/commit/409cff1d74a3130f89dca71f19e6832dd7c6e98c)), closes [#2361](https://github.com/jquense/react-big-calendar/issues/2361)

## [1.6.3](https://github.com/jquense/react-big-calendar/compare/v1.6.2...v1.6.3) (2023-02-01)


### Bug Fixes

* Fixed publish script (fix [#2330](https://github.com/jquense/react-big-calendar/issues/2330)) ([#2358](https://github.com/jquense/react-big-calendar/issues/2358)) ([a4e54be](https://github.com/jquense/react-big-calendar/commit/a4e54bed8d534086af87bff8b48c7c9a47ac4141))

## [1.6.2](https://github.com/jquense/react-big-calendar/compare/v1.6.1...v1.6.2) (2023-01-31)


### Bug Fixes

* correct publishing ([#2350](https://github.com/jquense/react-big-calendar/issues/2350)) ([ae15118](https://github.com/jquense/react-big-calendar/commit/ae151187fdedccccfdbf84ce64d499d4b4e4b511))
* no-overlap layout algorithm ([#2239](https://github.com/jquense/react-big-calendar/issues/2239)) ([f7bfd11](https://github.com/jquense/react-big-calendar/commit/f7bfd11f6ce475dd4390e8ed0bf0efea0f1c0a69)), closes [#2240](https://github.com/jquense/react-big-calendar/issues/2240)

## [1.6.1](https://github.com/jquense/react-big-calendar/compare/v1.6.0...v1.6.1) (2023-01-05)


### Bug Fixes

* set width ([#2332](https://github.com/jquense/react-big-calendar/issues/2332)) ([86b26cd](https://github.com/jquense/react-big-calendar/commit/86b26cd8a20ec11e953999650c10d59f4170f1ce))

# [1.6.0](https://github.com/jquense/react-big-calendar/compare/v1.5.2...v1.6.0) (2023-01-04)


### Features

* Dayjs localizer ([#2264](https://github.com/jquense/react-big-calendar/issues/2264)) ([537c6f3](https://github.com/jquense/react-big-calendar/commit/537c6f3f08344191588f2ab3ad52667de7ee261f))

## [1.5.2](https://github.com/jquense/react-big-calendar/compare/v1.5.1...v1.5.2) (2022-11-10)


### Bug Fixes

* do not send undefined/null gutterRef to getWidth ([#2300](https://github.com/jquense/react-big-calendar/issues/2300)) ([7b5f5b8](https://github.com/jquense/react-big-calendar/commit/7b5f5b8ef438ff469e7d098a6274118149883238))

## [1.5.1](https://github.com/jquense/react-big-calendar/compare/v1.5.0...v1.5.1) (2022-11-09)


### Bug Fixes

* typo for prop titles ([#2298](https://github.com/jquense/react-big-calendar/issues/2298)) ([11fd6c8](https://github.com/jquense/react-big-calendar/commit/11fd6c83685bf6c0345623366247bcb294e6325c))

# [1.5.0](https://github.com/jquense/react-big-calendar/compare/v1.4.3...v1.5.0) (2022-07-19)


### Features

* **time-gutter-wrapper:** expose time gutter wrapper component ([#2236](https://github.com/jquense/react-big-calendar/issues/2236)) ([39ff8a1](https://github.com/jquense/react-big-calendar/commit/39ff8a10ee4901b950780c0fc4a697f53a0d9d2b))

## [1.4.3](https://github.com/jquense/react-big-calendar/compare/v1.4.2...v1.4.3) (2022-07-19)


### Bug Fixes

* auto scroll on event selection ([#2235](https://github.com/jquense/react-big-calendar/issues/2235)) ([6d87ebb](https://github.com/jquense/react-big-calendar/commit/6d87ebbab146ba5a122180a376919bd6601f15c0)), closes [#2233](https://github.com/jquense/react-big-calendar/issues/2233)

## [1.4.2](https://github.com/jquense/react-big-calendar/compare/v1.4.1...v1.4.2) (2022-07-15)


### Bug Fixes

* do not autoscroll on event selection ([#2234](https://github.com/jquense/react-big-calendar/issues/2234)) ([b85b1ff](https://github.com/jquense/react-big-calendar/commit/b85b1ff884862c8116e0e571e0715499f4e7d5f4)), closes [#2233](https://github.com/jquense/react-big-calendar/issues/2233)

## [1.4.1](https://github.com/jquense/react-big-calendar/compare/v1.4.0...v1.4.1) (2022-07-15)


### Bug Fixes

* **dnd:** dont use classname ([#2232](https://github.com/jquense/react-big-calendar/issues/2232)) ([2332f12](https://github.com/jquense/react-big-calendar/commit/2332f121260bc772f4a709f6334bd9bb96c05e69))

# [1.4.0](https://github.com/jquense/react-big-calendar/compare/v1.3.3...v1.4.0) (2022-07-12)


### Features

* allow using custom event wrapper component while dragging ([#2228](https://github.com/jquense/react-big-calendar/issues/2228)) ([afa8824](https://github.com/jquense/react-big-calendar/commit/afa882426b893e300da25202b5c56b23d591e9f1)), closes [#1864](https://github.com/jquense/react-big-calendar/issues/1864)

## [1.3.3](https://github.com/jquense/react-big-calendar/compare/v1.3.2...v1.3.3) (2022-07-12)


### Bug Fixes

* revert ([#2227](https://github.com/jquense/react-big-calendar/issues/2227)) ([b81fa14](https://github.com/jquense/react-big-calendar/commit/b81fa146a97b83cd0bff063eb5004f1583eb365c))

## [1.3.2](https://github.com/jquense/react-big-calendar/compare/v1.3.1...v1.3.2) (2022-07-12)


### Bug Fixes

* temp fix for DayColumn render ([#2224](https://github.com/jquense/react-big-calendar/issues/2224)) ([48b23a2](https://github.com/jquense/react-big-calendar/commit/48b23a26edb2383abee9978a2b99eb4520a97f12)), closes [#2222](https://github.com/jquense/react-big-calendar/issues/2222)

## [1.3.1](https://github.com/jquense/react-big-calendar/compare/v1.3.0...v1.3.1) (2022-07-12)


### Bug Fixes

* revert change ([#2223](https://github.com/jquense/react-big-calendar/issues/2223)) ([bdb0595](https://github.com/jquense/react-big-calendar/commit/bdb0595400eaf0a612af3bb39d27f3c0c0fc5867))

# [1.3.0](https://github.com/jquense/react-big-calendar/compare/v1.2.4...v1.3.0) (2022-07-11)


### Features

* use custom event wrapper when dragging ([#2221](https://github.com/jquense/react-big-calendar/issues/2221)) ([73ed69a](https://github.com/jquense/react-big-calendar/commit/73ed69ad39383a5a19f90150a373e9f0038c2dee)), closes [#1864](https://github.com/jquense/react-big-calendar/issues/1864)

## [1.2.4](https://github.com/jquense/react-big-calendar/compare/v1.2.3...v1.2.4) (2022-07-11)


### Bug Fixes

* do the math ourselves ([#2220](https://github.com/jquense/react-big-calendar/issues/2220)) ([cace54e](https://github.com/jquense/react-big-calendar/commit/cace54e8b4b0f6baef35f1dac11bcf8f541f5301))

## [1.2.3](https://github.com/jquense/react-big-calendar/compare/v1.2.2...v1.2.3) (2022-07-11)


### Bug Fixes

* correct time-header-gutter ([#2219](https://github.com/jquense/react-big-calendar/issues/2219)) ([160e251](https://github.com/jquense/react-big-calendar/commit/160e251f288174a469932599251af06f179a47f9))

## [1.2.2](https://github.com/jquense/react-big-calendar/compare/v1.2.1...v1.2.2) (2022-07-11)


### Bug Fixes

* correct popupOffset ([#2218](https://github.com/jquense/react-big-calendar/issues/2218)) ([6fdec30](https://github.com/jquense/react-big-calendar/commit/6fdec3049660a97dcf42819b16bfc01aa5764267))

## [1.2.1](https://github.com/jquense/react-big-calendar/compare/v1.2.0...v1.2.1) (2022-07-08)


### Bug Fixes

* update to current react-overlays ([#2217](https://github.com/jquense/react-big-calendar/issues/2217)) ([27ebe46](https://github.com/jquense/react-big-calendar/commit/27ebe46f6d4900d1bac5986f57770c93f2ab1287)), closes [#2186](https://github.com/jquense/react-big-calendar/issues/2186)

# [1.2.0](https://github.com/jquense/react-big-calendar/compare/v1.1.0...v1.2.0) (2022-07-08)


### Features

* replace unsafe deprecated methods ([#2216](https://github.com/jquense/react-big-calendar/issues/2216)) ([c5c6a8b](https://github.com/jquense/react-big-calendar/commit/c5c6a8bf8f710402dc69bf1322d76b83c19824c4)), closes [#1200](https://github.com/jquense/react-big-calendar/issues/1200) [#1777](https://github.com/jquense/react-big-calendar/issues/1777) [#1481](https://github.com/jquense/react-big-calendar/issues/1481) [#2126](https://github.com/jquense/react-big-calendar/issues/2126) [#2104](https://github.com/jquense/react-big-calendar/issues/2104) [#2105](https://github.com/jquense/react-big-calendar/issues/2105) [#1526](https://github.com/jquense/react-big-calendar/issues/1526)

# [1.1.0](https://github.com/jquense/react-big-calendar/compare/v1.0.1...v1.1.0) (2022-07-08)


### Features

* remove unneeded dependencies ([#2215](https://github.com/jquense/react-big-calendar/issues/2215)) ([fb05151](https://github.com/jquense/react-big-calendar/commit/fb05151252ad02610c7fafa7fbe13dd00b5d40af))

## [1.0.1](https://github.com/jquense/react-big-calendar/compare/v1.0.0...v1.0.1) (2022-07-07)


### Bug Fixes

* zero duration no-overlap events ([#2213](https://github.com/jquense/react-big-calendar/issues/2213)) ([bbe1109](https://github.com/jquense/react-big-calendar/commit/bbe11094c0bfcfc162022711f848905e57479152))

# [1.0.0](https://github.com/jquense/react-big-calendar/compare/v0.40.8...v1.0.0) (2022-07-07)


### Features

* **localizers:** move localizer dependencies ([e4a3235](https://github.com/jquense/react-big-calendar/commit/e4a323538c2d2c3cd6c56300ef560ac5f18519c4))


### BREAKING CHANGES

* **localizers:** moment, luxon and globalize are no longer bundled

## [0.40.8](https://github.com/jquense/react-big-calendar/compare/v0.40.7...v0.40.8) (2022-07-07)


### Bug Fixes

* resolve resizing events in Month view ([c7b105f](https://github.com/jquense/react-big-calendar/commit/c7b105f8d59b460b8ed2e45fa90653296651b52c)), closes [#2207](https://github.com/jquense/react-big-calendar/issues/2207)

## [0.40.7](https://github.com/jquense/react-big-calendar/compare/v0.40.6...v0.40.7) (2022-07-05)


### Bug Fixes

* adjust TimeGutter for DST ([#2205](https://github.com/jquense/react-big-calendar/issues/2205)) ([4ba1255](https://github.com/jquense/react-big-calendar/commit/4ba1255ac80239e3a35d8adb32cbaa3da526619f))

## [0.40.6](https://github.com/jquense/react-big-calendar/compare/v0.40.5...v0.40.6) (2022-07-05)


### Bug Fixes

* correct TimeGutter ref ([#2204](https://github.com/jquense/react-big-calendar/issues/2204)) ([055cdd0](https://github.com/jquense/react-big-calendar/commit/055cdd01c153752e90b889cfa37ad5734fe8217e)), closes [#2201](https://github.com/jquense/react-big-calendar/issues/2201)

## [0.40.5](https://github.com/jquense/react-big-calendar/compare/v0.40.4...v0.40.5) (2022-07-05)


### Bug Fixes

* correct TimeGutter ref use ([574dbf7](https://github.com/jquense/react-big-calendar/commit/574dbf73d9c0acd10fb2fa25a128a8a3b9c05c16)), closes [#2200](https://github.com/jquense/react-big-calendar/issues/2200)

## [0.40.4](https://github.com/jquense/react-big-calendar/compare/v0.40.3...v0.40.4) (2022-07-01)


### Bug Fixes

* replace findDOMNode with refs ([a902d20](https://github.com/jquense/react-big-calendar/commit/a902d20a7413016a662e1f7b3f7a5241213ce354)), closes [#2193](https://github.com/jquense/react-big-calendar/issues/2193)

## [0.40.3](https://github.com/jquense/react-big-calendar/compare/v0.40.2...v0.40.3) (2022-07-01)


### Bug Fixes

* **DND:** Corrects issue of losing droppable event when releasing on non-event related containers ([#2199](https://github.com/jquense/react-big-calendar/issues/2199)) ([508b668](https://github.com/jquense/react-big-calendar/commit/508b668f4adb17635b47f435fdc3b676058a7405)), closes [#2198](https://github.com/jquense/react-big-calendar/issues/2198) [#1902](https://github.com/jquense/react-big-calendar/issues/1902)

## [0.40.2](https://github.com/jquense/react-big-calendar/compare/v0.40.1...v0.40.2) (2022-06-16)


### Bug Fixes

* Allow resize to last visible slot ([f26c8a7](https://github.com/jquense/react-big-calendar/commit/f26c8a75a5e7ad667eb6dbc4d392dac32e51dc10)), closes [#2147](https://github.com/jquense/react-big-calendar/issues/2147)

## [0.40.1](https://github.com/jquense/react-big-calendar/compare/v0.40.0...v0.40.1) (2022-04-18)


### Bug Fixes

* correct luxon localizer formatting ([#2172](https://github.com/jquense/react-big-calendar/issues/2172)) ([b130351](https://github.com/jquense/react-big-calendar/commit/b130351966fa6a3870607bbb78394db11a10915b))

# [0.40.0](https://github.com/jquense/react-big-calendar/compare/v0.39.7...v0.40.0) (2022-03-24)


### Features

* **events:** default events prop to an empty array ([#2161](https://github.com/jquense/react-big-calendar/issues/2161)) ([efac0b2](https://github.com/jquense/react-big-calendar/commit/efac0b26b365bbddb803ad256e22a5844cf36052)), closes [#1708](https://github.com/jquense/react-big-calendar/issues/1708)

## [0.39.7](https://github.com/jquense/react-big-calendar/compare/v0.39.6...v0.39.7) (2022-03-23)


### Bug Fixes

* move react, react-dom to devDependencies ([#2160](https://github.com/jquense/react-big-calendar/issues/2160)) ([6917c15](https://github.com/jquense/react-big-calendar/commit/6917c15f25bad5462392003dcae59ef7fe20f24d))

## [0.39.6](https://github.com/jquense/react-big-calendar/compare/v0.39.5...v0.39.6) (2022-03-23)


### Bug Fixes

* incorrect babel imports in CJS/ESM builds ([#2157](https://github.com/jquense/react-big-calendar/issues/2157)) ([687b121](https://github.com/jquense/react-big-calendar/commit/687b1213d91ded826e92ab1ec39314676aa24bf5))

## [0.39.5](https://github.com/jquense/react-big-calendar/compare/v0.39.4...v0.39.5) (2022-03-21)


### Bug Fixes

* disable `absoluteRuntime` in babel-preset-react-app ([#2155](https://github.com/jquense/react-big-calendar/issues/2155)) ([b8fcb93](https://github.com/jquense/react-big-calendar/commit/b8fcb9337bb5eb3e2c19f766d18cddba43ea1a06))

## [0.39.4](https://github.com/jquense/react-big-calendar/compare/v0.39.3...v0.39.4) (2022-03-15)


### Bug Fixes

* correct storybook deploy ([#2145](https://github.com/jquense/react-big-calendar/issues/2145)) ([8c98fb2](https://github.com/jquense/react-big-calendar/commit/8c98fb25bc063cbd88260fb4d2cf709c52912a67))

## [0.39.3](https://github.com/jquense/react-big-calendar/compare/v0.39.2...v0.39.3) (2022-03-11)

### Bug Fixes

- Trade href="#" anchors for stylized buttons ([#2074](https://github.com/jquense/react-big-calendar/issues/2074)) ([cd385f5](https://github.com/jquense/react-big-calendar/commit/cd385f5f9fc9f998d944e9a3db643e6152fbb5d1))

## [0.39.2](https://github.com/jquense/react-big-calendar/compare/v0.39.1...v0.39.2) (2022-03-10)

### Bug Fixes

- Correct resize for multi-day event. ([#2138](https://github.com/jquense/react-big-calendar/issues/2138)) ([3632345](https://github.com/jquense/react-big-calendar/commit/363234520ad3289bf4b182d8fc2f02dba2460f56))

## [0.39.1](https://github.com/jquense/react-big-calendar/compare/v0.39.0...v0.39.1) (2022-03-10)

### Bug Fixes

- Correct resizing event bug in Week & Day ([#2143](https://github.com/jquense/react-big-calendar/issues/2143)) ([afa8468](https://github.com/jquense/react-big-calendar/commit/afa84683fc6d3cd637013f08eac6d7bc1314c254))

# [0.39.0](https://github.com/jquense/react-big-calendar/compare/v0.38.9...v0.39.0) (2022-03-02)

### Features

- Disable autoscroll functionality, Add a functionality to disable auto-scroll on calendar render. ([aa8f374](https://github.com/jquense/react-big-calendar/commit/aa8f374bed642703639db8f659f2771bfae346e7))

## [0.38.9](https://github.com/jquense/react-big-calendar/compare/v0.38.8...v0.38.9) (2022-02-10)

### Bug Fixes

- Correct no overlap algorithm stretch behavior ([#2120](https://github.com/jquense/react-big-calendar/issues/2120)) ([c3f25eb](https://github.com/jquense/react-big-calendar/commit/c3f25eb61545af36ada0c940f0f05b440250341f))

## [0.38.8](https://github.com/jquense/react-big-calendar/compare/v0.38.7...v0.38.8) (2022-02-10)

### Bug Fixes

- Correct variable name that gets passed on to EventWrapper so dragndrop ha… ([#2121](https://github.com/jquense/react-big-calendar/issues/2121)) ([19294de](https://github.com/jquense/react-big-calendar/commit/19294de0de5c3aaf4280bfb9c28f37d88254d51d))

## [0.38.7](https://github.com/jquense/react-big-calendar/compare/v0.38.6...v0.38.7) (2022-02-03)

### Bug Fixes

- Correct display of beginning DST ([bd8e0e9](https://github.com/jquense/react-big-calendar/commit/bd8e0e971a5c5e2590ca0016df4e186b326dec19)), closes [#1617](https://github.com/jquense/react-big-calendar/issues/1617)

## [0.38.6](https://github.com/jquense/react-big-calendar/compare/v0.38.5...v0.38.6) (2022-01-25)

### Bug Fixes

- Correct DragAndDrop event resizing in 'month' view ([e3d96e5](https://github.com/jquense/react-big-calendar/commit/e3d96e5b5899e809092051e32274c8cfdd11d4e9)), closes [#2012](https://github.com/jquense/react-big-calendar/issues/2012)

## [0.38.5](https://github.com/jquense/react-big-calendar/compare/v0.38.4...v0.38.5) (2022-01-16)

### Bug Fixes

- Correct issue with semantic-release and yarn-lock ([cc48854](https://github.com/jquense/react-big-calendar/commit/cc48854c87b03ca23541484e30061576c2edfe98)), closes [#2096](https://github.com/jquense/react-big-calendar/issues/2096)

## [0.38.4](https://github.com/jquense/react-big-calendar/compare/v0.38.3...v0.38.4) (2022-01-04)

### Bug Fixes

- **sass:** Reference distributed folder in SASS compile ([#2091](https://github.com/jquense/react-big-calendar/issues/2091)) ([20502f3](https://github.com/jquense/react-big-calendar/commit/20502f334a3c9ce62a1322a88d897b9afa66ee23)), closes [#2086](https://github.com/jquense/react-big-calendar/issues/2086)

## [0.38.3](https://github.com/jquense/react-big-calendar/compare/v0.38.2...v0.38.3) (2022-01-04)

### Bug Fixes

- Correct typo in custom view example ([267629b](https://github.com/jquense/react-big-calendar/commit/267629b5d253b5247b2cd2071764e6bb86c4d3a5))

## [0.22.1](https://github.com/jquense/react-big-calendar/compare/v0.22.0...v0.22.1) (2019-09-13)

### Bug Fixes

- add new method to get correct time indicator top position | fixes [#1396](https://github.com/jquense/react-big-calendar/issues/1396) ([#1447](https://github.com/jquense/react-big-calendar/issues/1447)) ([1cf0205](https://github.com/jquense/react-big-calendar/commit/1cf0205))
- drag cancelation for month view ([#1322](https://github.com/jquense/react-big-calendar/issues/1322)) ([9c81e9e](https://github.com/jquense/react-big-calendar/commit/9c81e9e))
- invalid prop-types. ([#1435](https://github.com/jquense/react-big-calendar/issues/1435)) ([61e1a1e](https://github.com/jquense/react-big-calendar/commit/61e1a1e))
- update time indicator position if max prop changes ([#1379](https://github.com/jquense/react-big-calendar/issues/1379)) ([ac945b7](https://github.com/jquense/react-big-calendar/commit/ac945b7))
- use fixed date arithmetic lib and move bt-sass to devdepen… ([#1374](https://github.com/jquense/react-big-calendar/issues/1374)) ([b223a61](https://github.com/jquense/react-big-calendar/commit/b223a61))

### Features

- [#1390](https://github.com/jquense/react-big-calendar/issues/1390) use en dashes in ranges ([#1391](https://github.com/jquense/react-big-calendar/issues/1391)) ([7619e59](https://github.com/jquense/react-big-calendar/commit/7619e59))
- added continuesPrior and continuesAfter props to Event component ([#1201](https://github.com/jquense/react-big-calendar/issues/1201)) ([74a2233](https://github.com/jquense/react-big-calendar/commit/74a2233))
- upgrade react-overlays ([#1421](https://github.com/jquense/react-big-calendar/issues/1421)) ([9117549](https://github.com/jquense/react-big-calendar/commit/9117549))
- **dnd:** add preview of an item inside cell while dragging ([#1369](https://github.com/jquense/react-big-calendar/issues/1369)) ([ac715f8](https://github.com/jquense/react-big-calendar/commit/ac715f8))

## 0.22.0 (2019-06-18)

- Chore: clean up prop-types (#1344) ([94e3679](https://github.com/jquense/react-big-calendar/commit/94e3679)), closes [#1344](https://github.com/jquense/react-big-calendar/issues/1344)
- Publish v0.22.0 ([321d8cf](https://github.com/jquense/react-big-calendar/commit/321d8cf))
- save snapshot ([8480413](https://github.com/jquense/react-big-calendar/commit/8480413))
- stale-bot ([0e0ebb2](https://github.com/jquense/react-big-calendar/commit/0e0ebb2))
- chore: fix linting ([976faf1](https://github.com/jquense/react-big-calendar/commit/976faf1))
- chore: remove prop-types-extra (#1349) ([c3b7734](https://github.com/jquense/react-big-calendar/commit/c3b7734)), closes [#1349](https://github.com/jquense/react-big-calendar/issues/1349)
- chore(deps): upgrade date-math (#1354) ([762e8cf](https://github.com/jquense/react-big-calendar/commit/762e8cf)), closes [#1354](https://github.com/jquense/react-big-calendar/issues/1354)
- chore(deps): upgrade uncontrollable (#1357) ([689f74e](https://github.com/jquense/react-big-calendar/commit/689f74e)), closes [#1357](https://github.com/jquense/react-big-calendar/issues/1357)
- fix: bad propType. (#1351) ([e704e17](https://github.com/jquense/react-big-calendar/commit/e704e17)), closes [#1351](https://github.com/jquense/react-big-calendar/issues/1351)
- fix: bug where appointments can appear outside the calendar (#1204) ([9689b7d](https://github.com/jquense/react-big-calendar/commit/9689b7d)), closes [#1204](https://github.com/jquense/react-big-calendar/issues/1204)
- fix: bug with dayWrapper not applying (#1196) ([f3ea6f8](https://github.com/jquense/react-big-calendar/commit/f3ea6f8)), closes [#1196](https://github.com/jquense/react-big-calendar/issues/1196)
- fix: ie fix for event bindings on unmounted components (#1338) ([8ef00d6](https://github.com/jquense/react-big-calendar/commit/8ef00d6)), closes [#1338](https://github.com/jquense/react-big-calendar/issues/1338)
- fix: rtl incorrectly named or not propagated (#1353) ([caa863f](https://github.com/jquense/react-big-calendar/commit/caa863f)), closes [#1353](https://github.com/jquense/react-big-calendar/issues/1353)
- fix(addons): do not cut end while dragging multiday event (#1342) ([6fab261](https://github.com/jquense/react-big-calendar/commit/6fab261)), closes [#1342](https://github.com/jquense/react-big-calendar/issues/1342)
- docs: update docs and examples with named exports (#1352) ([f478be0](https://github.com/jquense/react-big-calendar/commit/f478be0)), closes [#1352](https://github.com/jquense/react-big-calendar/issues/1352)
- docs(dnd): remove deprecated comment about `react-dnd` (#1323) ([4d933c1](https://github.com/jquense/react-big-calendar/commit/4d933c1)), closes [#1323](https://github.com/jquense/react-big-calendar/issues/1323)
- feat: provide named exports api (#1348) ([4e09704](https://github.com/jquense/react-big-calendar/commit/4e09704)), closes [#1348](https://github.com/jquense/react-big-calendar/issues/1348)
- feat: redeclared all sass variables as !default (#1321) ([c4f09cd](https://github.com/jquense/react-big-calendar/commit/c4f09cd)), closes [#1321](https://github.com/jquense/react-big-calendar/issues/1321)
- feat: use lodash-es for esm bundle (#1350) ([fb0fe5e](https://github.com/jquense/react-big-calendar/commit/fb0fe5e)), closes [#1350](https://github.com/jquense/react-big-calendar/issues/1350)
- Feat: expose date localizer (#1347) ([5d93c9d](https://github.com/jquense/react-big-calendar/commit/5d93c9d)), closes [#1347](https://github.com/jquense/react-big-calendar/issues/1347)

### BREAKING CHANGE

- must use named exports for additional RBC imports

```js
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'
```

# [0.21.0](https://github.com/jquense/react-big-calendar/compare/v0.20.4...v0.21.0) (2019-05-14)

### Bug Fixes

- prevent un/mounting of date components ([#1276](https://github.com/jquense/react-big-calendar/issues/1276)) ([3c25009](https://github.com/jquense/react-big-calendar/commit/3c25009)), closes [/github.com/jquense/react-big-calendar/blob/master/src/DateContentRow.js#L121](https://github.com//github.com/jquense/react-big-calendar/blob/master/src/DateContentRow.js/issues/L121)
- support point-in-time events in the Agenda view ([#1246](https://github.com/jquense/react-big-calendar/issues/1246)) ([58c39c3](https://github.com/jquense/react-big-calendar/commit/58c39c3))
- TimeGrid display on DST change days when min is after the transition ([#1303](https://github.com/jquense/react-big-calendar/issues/1303)) ([b436017](https://github.com/jquense/react-big-calendar/commit/b436017)), closes [#1098](https://github.com/jquense/react-big-calendar/issues/1098) [#1273](https://github.com/jquense/react-big-calendar/issues/1273)
- update time indicator position if min prop changes ([#1311](https://github.com/jquense/react-big-calendar/issues/1311)) ([97ea841](https://github.com/jquense/react-big-calendar/commit/97ea841))
- use React.createRef instead of string refs ([#1282](https://github.com/jquense/react-big-calendar/issues/1282)) ([239f0a3](https://github.com/jquense/react-big-calendar/commit/239f0a3))

### Features

- **dnd:** add onDropFromOutside prop for Dnd Cal ([#1290](https://github.com/jquense/react-big-calendar/issues/1290)) ([b9fdce4](https://github.com/jquense/react-big-calendar/commit/b9fdce4)), closes [#1090](https://github.com/jquense/react-big-calendar/issues/1090)
- **dnd:** implement callback on initializing drag or resize action ([#1206](https://github.com/jquense/react-big-calendar/issues/1206)) ([0fa2c30](https://github.com/jquense/react-big-calendar/commit/0fa2c30)), closes [#1205](https://github.com/jquense/react-big-calendar/issues/1205)
- add resource to handleDropFromOutside ([#1319](https://github.com/jquense/react-big-calendar/issues/1319)) ([2b7ad2a](https://github.com/jquense/react-big-calendar/commit/2b7ad2a))
- switch to Sass for styles ([884bece](https://github.com/jquense/react-big-calendar/commit/884bece))

### BREAKING CHANGES

- Less files have been replaced with Sass versions

## [0.20.4](https://github.com/jquense/react-big-calendar/compare/v0.20.3...v0.20.4) (2019-03-21)

### Bug Fixes

- allow override onShowMore callback ([#1214](https://github.com/jquense/react-big-calendar/issues/1214)) ([8fefeee](https://github.com/jquense/react-big-calendar/commit/8fefeee)), closes [/github.com/jquense/react-big-calendar/blob/f9a873368a78f5ced81b799c4dffe1095b3ab712/src/Calendar.jsx#L280](https://github.com//github.com/jquense/react-big-calendar/blob/f9a873368a78f5ced81b799c4dffe1095b3ab712/src/Calendar.jsx/issues/L280) [/github.com/jquense/react-big-calendar/blob/1d62c432eaa183ed6b38f08cfcec5ee7edcbfe41/src/Month.js#L300-L307](https://github.com//github.com/jquense/react-big-calendar/blob/1d62c432eaa183ed6b38f08cfcec5ee7edcbfe41/src/Month.js/issues/L300-L307) [#1147](https://github.com/jquense/react-big-calendar/issues/1147)
- firefox event click bug ([#1262](https://github.com/jquense/react-big-calendar/issues/1262)) ([b526416](https://github.com/jquense/react-big-calendar/commit/b526416)), closes [#1173](https://github.com/jquense/react-big-calendar/issues/1173)
- issue with gutter width initialization ([#1181](https://github.com/jquense/react-big-calendar/issues/1181)) ([69b28af](https://github.com/jquense/react-big-calendar/commit/69b28af))
- misplacement of current time indicator ([#1239](https://github.com/jquense/react-big-calendar/issues/1239)) ([2d6e99e](https://github.com/jquense/react-big-calendar/commit/2d6e99e)), closes [#1054](https://github.com/jquense/react-big-calendar/issues/1054)
- remove duplicate getter prop ([#1185](https://github.com/jquense/react-big-calendar/issues/1185)) ([6b90182](https://github.com/jquense/react-big-calendar/commit/6b90182))
- remove global window from Map() usage, update eslint rules for new es6 environment ([#1195](https://github.com/jquense/react-big-calendar/issues/1195)) ([4768188](https://github.com/jquense/react-big-calendar/commit/4768188))
- selecting events in mobile browsers ([#1233](https://github.com/jquense/react-big-calendar/issues/1233)) ([2bc9fee](https://github.com/jquense/react-big-calendar/commit/2bc9fee))

### Features

- add ability to set custom resource headers ([#1187](https://github.com/jquense/react-big-calendar/issues/1187)) ([6708a45](https://github.com/jquense/react-big-calendar/commit/6708a45)), closes [#1174](https://github.com/jquense/react-big-calendar/issues/1174)
- adding bounds and box on slot select in Month view ([#1241](https://github.com/jquense/react-big-calendar/issues/1241)) ([2a870b0](https://github.com/jquense/react-big-calendar/commit/2a870b0))
- remove propTypes in production ([#1180](https://github.com/jquense/react-big-calendar/issues/1180)) ([ce0d56b](https://github.com/jquense/react-big-calendar/commit/ce0d56b))

## [0.20.2](https://github.com/jquense/react-big-calendar/compare/v0.20.0...v0.20.2) (2018-11-07)

### Bug Fixes

- add runtime to deps ([ade68bb](https://github.com/jquense/react-big-calendar/commit/ade68bb))
- calculation of slots number for date when DST ends. ([#1046](https://github.com/jquense/react-big-calendar/issues/1046)) ([2ca0226](https://github.com/jquense/react-big-calendar/commit/2ca0226))
- dragging is disabled if resizing is not allowed ([#1072](https://github.com/jquense/react-big-calendar/issues/1072)) ([#1073](https://github.com/jquense/react-big-calendar/issues/1073)) ([0d5ed30](https://github.com/jquense/react-big-calendar/commit/0d5ed30))
- elements position on TimeGrid if max prop is set ([#1057](https://github.com/jquense/react-big-calendar/issues/1057)) ([f174a60](https://github.com/jquense/react-big-calendar/commit/f174a60))
- move [@babel](https://github.com/babel)/cli to devDependencies ([#1062](https://github.com/jquense/react-big-calendar/issues/1062)) ([4cfcb1f](https://github.com/jquense/react-big-calendar/commit/4cfcb1f))
- onRangeChange not passing localizer ([#1056](https://github.com/jquense/react-big-calendar/issues/1056)) ([80855e8](https://github.com/jquense/react-big-calendar/commit/80855e8))
- proptype warnings ([#1084](https://github.com/jquense/react-big-calendar/issues/1084)) ([08c2494](https://github.com/jquense/react-big-calendar/commit/08c2494))
- reference to draggable/resizable Accessor ([#1070](https://github.com/jquense/react-big-calendar/issues/1070)) ([1889a51](https://github.com/jquense/react-big-calendar/commit/1889a51))

### Features

- hide single day header with css ([#1019](https://github.com/jquense/react-big-calendar/issues/1019)) ([5857d8f](https://github.com/jquense/react-big-calendar/commit/5857d8f))

### Performance Improvements

- increase startup time of event dragging ([#1020](https://github.com/jquense/react-big-calendar/issues/1020)) ([167b69f](https://github.com/jquense/react-big-calendar/commit/167b69f))

## v0.19.2 - Wed, 27 Jun 2018 14:24:55 GMT

## v0.19.1 - Thu, 03 May 2018 15:22:43 GMT

## v0.19.0 - Fri, 23 Mar 2018 17:13:33 GMT

## v0.18.0 - Wed, 07 Feb 2018 16:14:20 GMT

## v0.17.1 - Tue, 05 Dec 2017 19:42:18 GMT

- [#634](../../pull/634) added a new optional callback `dayPropGetter` to allow customization of the cell backgrounds of month, week, and work week views without the need for custom components

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

- [45687c9](../../commit/45687c9) [fixed] allow string names in `move()`

## v0.12.1 - Thu, 12 Jan 2017 20:47:22 GMT

- [5578559](../../commit/5578559) [fixed] all day event selection

## v0.12.0 - Sat, 07 Jan 2017 22:03:45 GMT

## v0.11.1 - Sun, 20 Nov 2016 17:48:51 GMT

## v0.11.0 - Sat, 08 Oct 2016 20:24:51 GMT

## v0.10.3 - Fri, 15 Jul 2016 17:56:54 GMT

## v0.10.2 - Fri, 10 Jun 2016 12:50:39 GMT

- [741c882](../../commit/741c882) [fixed] rm jsx imports

## v0.10.1 - Thu, 09 Jun 2016 18:39:57 GMT

## v0.10.0 - Thu, 09 Jun 2016 15:33:06 GMT

## v0.9.12 - Fri, 20 May 2016 12:54:29 GMT

## v0.9.11 - Fri, 15 Apr 2016 13:39:50 GMT

## v0.9.10 - Fri, 15 Apr 2016 13:31:58 GMT

## v0.9.9 - Fri, 15 Apr 2016 12:28:00 GMT

- [a2a49c8](../../commit/a2a49c8) [fixed] consistent handling of end dates as _exclusive_ ranges
- [1c12b16](../../commit/1c12b16) [fixed] DST issue with events
- [f526e23](../../commit/f526e23) [added] onSelecting callback
- [18c0234](../../commit/18c0234) [fixed] incorrect page offset
- [4eeacd4](../../commit/4eeacd4) [fixed] more cross browser flex issues.
- [2dc61ec](../../commit/2dc61ec) [fixed] add minHeight for week view overflow

## v0.9.8 - Thu, 14 Jan 2016 19:35:07 GMT

- [5fa7012](../../commit/5fa7012) [fixed] Incorrect gutter widths

## v0.9.7 - Sun, 13 Dec 2015 22:01:09 GMT

- [ebf8908](../../commit/ebf8908) [fixed] agenda header display

## v0.9.6 - Sun, 13 Dec 2015 21:39:49 GMT

- [a69600b](../../commit/a69600b) [fixed] Pass correct date to DaySlot for selections.
- [5ac5c30](../../commit/5ac5c30) [fixed] reset gutter widths before calculations

## v0.9.5 - Wed, 02 Dec 2015 18:09:32 GMT

- [c2e8aa4](../../commit/c2e8aa4) [fixed] accidental breaking change on the localizers
- [dc90943](../../commit/dc90943) [fixed] some style issues
- [ea8e085](../../commit/ea8e085) [added] modern globalize support
- [4b3d3ba](../../commit/4b3d3ba) [fixed] have gutter use culture prop
- [7922882](../../commit/7922882) [fixed] better gutter width detection

## v0.9.4 - Sun, 29 Nov 2015 02:19:49 GMT

- [a41c9f9](../../commit/a41c9f9) [added] right-to-left support
- [8bb6589](../../commit/8bb6589) [fixed] properly select time ranges with min/max set

## v0.9.3 - Sat, 28 Nov 2015 20:00:24 GMT

- [fff1914](../../commit/fff1914) [fixed] pass culture to View

## v0.9.2 - Thu, 12 Nov 2015 23:34:33 GMT

- [58f008f](../../commit/58f008f) [fixed] none integer slot spaces (again)
- [f2084ef](../../commit/f2084ef) [fixed] month event rows not fitting in their cells
- [73e449d](../../commit/73e449d) [fixed] day view clicks return the correct slot

## v0.9.1 - Thu, 12 Nov 2015 14:52:20 GMT

- [d5a0d20](../../commit/d5a0d20) [fixed] month event rows not fitting in their cells
- [f4b18d6](../../commit/f4b18d6) [fixed] day view clicks return the correct slot

## v0.9.0 - Tue, 03 Nov 2015 11:33:38 GMT

- [ee53bbc](../../commit/ee53bbc) [changed] default "show more" behavior navigates to day view
- [80aa08f](../../commit/80aa08f) [added] popupOffset prop for configuring distance from viewport edge

## v0.8.3 - Thu, 29 Oct 2015 06:07:22 GMT

- [d98af8d](../../commit/d98af8d) [added] edge detection for event popup
- [69b092d](../../commit/69b092d) [fixed] accidental hash changes
- [0351b71](../../commit/0351b71) [fixed] incorrect 'show more' layout

## v0.8.2 - Wed, 28 Oct 2015 08:09:39 GMT

- [892af3d](../../commit/892af3d) [fixed] use correct handler for "show more"

## v0.8.1 - Wed, 28 Oct 2015 07:58:13 GMT

- [4560ff7](../../commit/4560ff7) [changed] better thin event title collapse
- [0eeb43f](../../commit/0eeb43f) [fixed] event layout sort
- [0574eed](../../commit/0574eed) [fixed] show more row layout issues
- [7ee9959](../../commit/7ee9959) [added] title to time view events
- [c07d0ab](../../commit/c07d0ab) [changed] better event overlays for overlapping events

## v0.8.0 - Mon, 26 Oct 2015 12:32:54 GMT

- [4dac3f5](../../commit/4dac3f5) [added] rbc-event-allday class in month view
- [e314128](../../commit/e314128) [fixed] missing keys in popup
- [0d5df79](../../commit/0d5df79) [changed] "show more" behavior is cleaner

## v0.7.2 - Sat, 24 Oct 2015 03:21:53 GMT

- [0b0fa0f](../../commit/0b0fa0f) [fixed] prevent selection when clicking show more
- [57c8843](../../commit/57c8843) [fixed] allow event selection when selectable, in day views

## v0.7.1 - Wed, 30 Sep 2015 12:34:43 GMT

- [f7969b3](../../commit/f7969b3) [fixed] use client coords to get node during selection

## v0.7.0 - Tue, 15 Sep 2015 08:37:50 GMT

- [8ad4ee7](../../commit/8ad4ee7) [changed] selection bound to Calendar container, respects overlays
- [98b3dad](../../commit/98b3dad) [fixed] selecting events in All Day row of week/Day views

## v0.6.1 - Sun, 13 Sep 2015 16:52:20 GMT

- [c3092f4](../../commit/c3092f4) [fixed] event rows incorrect duration styles
- [dade2b9](../../commit/dade2b9) [fixed] more month event layout issues

## v0.6.0 - Sun, 13 Sep 2015 15:32:08 GMT

- [49e321f](../../commit/49e321f) [fixed] layout of events in months that don't start evenly at weekday 0
- [720675e](../../commit/720675e) [added] eventPropsGetter for event markup customization

## v0.5.2 - Sun, 13 Sep 2015 12:56:02 GMT

- [386d4bc](../../commit/386d4bc) [fixed] `selectable` can properly be toggled on and off

## v0.5.1 - Sun, 13 Sep 2015 10:08:24 GMT

- [a7dc435](../../commit/a7dc435) [fixed] className and style props being applied in multiple places
- [c8f8281](../../commit/c8f8281) [fixed] null exception on empty agenda view

## v0.5.0 - Sun, 13 Sep 2015 09:03:11 GMT

- [00435ad](../../commit/00435ad) [fixed] view propType validation
- [ae039b9](../../commit/ae039b9) [added] expose `move` and `label` methods for easier external toolbars
- [7e7bc17](../../commit/7e7bc17) [changed] clarified accidental ambigious license

## v0.4.1 - Thu, 03 Sep 2015 19:08:11 GMT
