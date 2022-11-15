## Technical challenges behind the infinite scroller

- The links in the footer becoming practically unreachable because content keeps pushing the footer away
- How do you handle a resize event when someone turns their phone from portrait to landscape or 
- How do you prevent your phone from grinding to a painful halt when the list gets too long?

## Techniques to solve this
- DOM recycling
- tombstones
- scroll anchoring

## Technical Details

### DOM recycling
DOM recycling is a underutilized technique to keep the DOM node count low. The general idea is to use already created DOM elements that are off-screen instead of creating new ones.

- DOM nodes are cheap but not free
- low-end devices will get noticeably slower if website has too big of DOM to manage

High level Approach:
- Since we will have only tiny subset of all available items in the DOM at a given time, we need to find a way to make **browser's scrollbar correctly reflect the amount of content that is theoritically there**
- We will use 1px by 1px sentinel element to force the container element to have the desired height
- We will have every element have their own layer to make sure the layer of the runway itself is completely empty (to make it eligible for the browser's optimizations)
- Whenever we scroll, we will check if the viewport has come sufficiently close to the end of the runway. If so, we will extend the runway by moving the sentinel element and moving the items that have left the viewport to the bottom of the runway and populate them with new content
- The same goes for scrolling in the other direction. We will, however, never shrink the runway in our implementation, so that the scrollbar position stays consistent.

