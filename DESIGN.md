---
name: 100個最好用的 ChatGPT 指令大全
description: 台式單色印刷點菜單：分區、編號、勾格即複製
colors:
  paper: "#e4efe0"
  paper-deep: "#d5e5cf"
  ink: "#1b3796"
  ink-soft: "#4a5a96"
  pencil: "#5b5a55"
  rule: "rgb(27 55 150 / 0.28)"
  rule-strong: "rgb(27 55 150 / 0.75)"
  on-ink: "#e4efe0"
  reverse-paper: "#000000"
  reverse-paper-deep: "#141a14"
  reverse-ink: "#d6ead1"
  reverse-ink-soft: "#a9b8a4"
  reverse-pencil: "#b3b3ab"
  reverse-rule: "rgb(214 234 209 / 0.22)"
  reverse-rule-strong: "rgb(214 234 209 / 0.7)"
typography:
  display:
    fontFamily: "'Noto Sans TC', -apple-system, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "21px"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "0.01em"
  headline:
    fontFamily: "'Noto Sans TC', -apple-system, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "18px"
    fontWeight: 900
    lineHeight: 1.3
    letterSpacing: "0.04em"
  title:
    fontFamily: "'Barlow', -apple-system, 'PingFang TC', 'Microsoft JhengHei', 'Heiti TC', sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "'Barlow', -apple-system, 'PingFang TC', 'Microsoft JhengHei', 'Heiti TC', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Barlow', -apple-system, 'PingFang TC', 'Microsoft JhengHei', 'Heiti TC', sans-serif"
    fontSize: "14px"
    fontWeight: 500
    fontFeature: "'tnum'"
  numeral:
    fontFamily: "'Barlow', -apple-system, 'PingFang TC', 'Microsoft JhengHei', 'Heiti TC', sans-serif"
    fontSize: "15px"
    fontWeight: 600
    fontFeature: "'tnum'"
  command:
    fontFamily: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
rounded:
  none: "0px"
  seal: "50%"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  touch: "44px"
  row: "60px"
  column-gap: "40px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.on-ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-line-hover:
    backgroundColor: "{colors.paper}"
  index-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  index-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  tick-box:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "44px"
  tick-box-ticked:
    textColor: "{colors.pencil}"
  search-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 70px 0 44px"
    height: "48px"
  ticket:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 14px 16px"
  slip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  slip-error:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
---

# Design System: 100個最好用的 ChatGPT 指令大全

## Overview

**Creative North Star: "點菜單 (The Single-Spot Order Menu)"**

The whole site is a Taiwanese printed order menu: pale-green woodfree paper, one printing-blue spot ink for every line, letter and box, and a grey pencil for the diner's marks. The hundred prompts are dishes. They sit in numbered sections under double-rule heads, each one a ruled table row (number, name with its slash command, tick box). Ticking the box copies the template. The pencil then ticks the box and circles the row number, so a returning visitor can see what they ordered last time.

The page is dense like a real menu, not like a gallery: hairline-ruled rows, tabular numerals, at least four rows in the first mobile viewport, and two or three continuous columns on desktop. Depth comes from print devices only (double rules, a tinted tear-off ticket, a double-ringed seal), never from light. Dark mode is a reverse print. The paper becomes the blue and the ink becomes the pale green, so it is still one colour on one stock.

Confirmed rejection: the generic "rounded card grid + purple accent + category sidebar" layout.

**Key Characteristics:**
- One spot colour (ink) on one paper; pencil grey is the only other mark, and it is reserved for the user's ticks.
- Square corners everywhere except the circular 100 seal.
- Ruled table rows with a fixed numeral column, not cards.
- Section heads framed by a 3px double rule above and a 1px rule below.
- Motion in printed steps (`steps()`), never fades.

## Colors

One spot ink on tinted paper, plus a pencil; dark mode swaps paper and ink rather than adding colours.

### Primary
- **Printing Blue** (ink): every glyph, rule, border, icon stroke and filled state. Also the selection highlight, focus outline and caret.
- **Muted Plate Blue** (ink-soft): secondary text such as subtitle, ranges, slash names, notes, placeholders and the faded rows. Also the hover fill of the inked button.

### Neutral
- **Pale Woodfree Green** (paper): page stock, the sticky bar, the search field, slips, and the fill behind 【】 blanks. Text on solid ink (on-ink) uses the same value.
- **Deep Woodfree Green** (paper-deep): the expanded template ticket and the hover fill of rows, tabs and boxes.
- **Pencil Grey** (pencil): only the user's own marks, meaning the tick in a copied box, the hand-drawn circle round a copied row number, and the "已點過" tally.
- **Hairline / Strong Rule** (rule, rule-strong): the ink at 28% and 75% alpha. Hairlines sit between rows; strong rules draw borders, frames and double rules.

### Black print (dark, the default)
- Reverse Paper, Reverse Paper Deep, Reverse Ink, Reverse Ink Soft, Reverse Pencil and the two reverse rules take over the same roles under `data-theme="dark"` on `<html>`. In this theme on-ink equals reverse-paper. The `theme-color` metas follow the paper of the active theme (#e4efe0 / #000000). Dark is the default on first load regardless of the system setting; the header toggle switches to the light paper..

### Named Rules
**The One Spot Rule.** Ink is the only colour. Hierarchy comes from ink-soft, the rule alphas, weight and paper-deep, never from a second hue.

**The Pencil Belongs to the Diner Rule.** Pencil grey marks only what the user did (copied, ticked, already ordered). It is never used for system chrome.

**The Black Print Rule.** The default theme prints the pale-green ink on true black paper. Dark never turns into a grey or blue-black UI: paper is #000000 and the only lift is paper-deep (#141a14), a green-tinted near-black.

**The Inverse Error Rule.** A failure is shown as the same slip printed in reverse (ink fill, on-ink text) with plain words. No red.

## Typography

**Display Font:** Noto Sans TC, 900 only, which is the only weight loaded (falls back to PingFang TC / Microsoft JhengHei)
**Body Font:** Barlow 400–700 for Latin and numerals, with the system CJK stack (PingFang TC, Microsoft JhengHei, Heiti TC) for Han text
**Mono Font:** system ui-monospace, for slash command names only

**Character:** A black-weight CJK sans like a menu's printed section titles, over a compact, slightly condensed Latin grotesque that gives the numbers a printed price-list feel.

### Hierarchy
- **Display** (900, 21px → 32px at ≥640px → 40px at ≥1024px, 1.25): the site title in the masthead only.
- **Headline** (900, 18px, 1.3, 0.04em): section names. The Chinese section numeral (一、二…) sits beside it at 900 / 20px. The same face at 17–18px titles the notice and the empty state, and at 15px it sets the slip message.
- **Title** (700, 16px, 1.4): dish (prompt) names in rows. They underline on row hover.
- **Body** (400, 15px, 1.75, max 68ch): template text inside the ticket. 【】 blanks are set at 700 on paper with a 1.5px ink underline.
- **Label** (500, 14px, tabular): index tabs. Ranges and tallies sit at 12–13px in ink-soft with tabular numerals.
- **Numeral** (600, 15px, tabular): row numbers in a 4.4ch column. The seal's 100 is 700 at 19px, or 25px at ≥640px.
- **Command** (mono, 12.5px, ink-soft, single line with ellipsis): `/slash` names.

### Named Rules
**The Tabular Rule.** Every number (row number, ranges, tally, seal, notice step counters) uses `font-variant-numeric: tabular-nums` so the columns line up like a printed price list.

**The 900-Only Display Rule.** Noto Sans TC is loaded at 900 alone. Display text is either 900 or set in the text stack, never at an intermediate Noto weight.

**The Mono Is For Commands Rule.** Monospace appears only for slash command names.

## Layout

The container is centred with a max width of 1280px. Side gutters are 16px, rising to 24px at ≥640px and 32px at ≥1024px.

- **Masthead:** the seal (58px, or 76px at ≥640px), then the title and one-line subtitle, then the 44px theme toggle at the right.
- **Sticky bar (single):** the search field above the section index. A 3px double rule runs on top and a 1px strong rule on the bottom. Below 640px the index scrolls horizontally edge to edge with the scrollbar hidden. At ≥640px it wraps.
- **Sheet:** one column, two columns at ≥900px and three at ≥1240px, with a 40px column gap. Sections flow continuously like a menu and are spaced 22px apart.
- **Rows:** at least 60px tall, with a 4.4ch numeral column, an 8px gap, the text, and a 44px tick box on the right.
- **Rhythm:** small steps of 2, 6, 8, 10, 12, 14, 16, 18 and 22px, with 40–44px for major breaks (the notice and the bottom padding plus the safe-area inset).

**The 44 Rule.** Every interactive target is at least 44px (tabs, boxes, buttons, the clear button and the "已點過" clear link). The search field is 48px tall and its text is 16px below 640px, so iOS does not zoom.

## Elevation & Depth

This system is flat. There are no drop shadows, no gradients and no blur. Separation comes from printing devices: the 3px double rule over section heads, the sticky bar and the empty state; a 1px border with a 3px-offset outline as a double frame (notice, slip); the paper-deep tint of the expanded ticket with a dashed tear line on top; and the fading of the other rows when one is open. The only `box-shadow` in the system is an inset ring pair on the seal (`inset 0 0 0 3px paper, inset 0 0 0 4px ink`) that draws its inner printed ring. That is linework, not elevation.

**The Printed Frame Rule.** To set something apart, print another line (double rule, offset outline, dashed tear). Never lift it with shadow.

## Shapes

Corners are square (0px) everywhere: tabs, boxes, buttons, the search field, ticket, slip and notice. The single round form is the 100 seal (50%), a stamped chop with a 2px outer ring and an inset inner ring. Adjacent index tabs overlap by -1px so their borders merge into one printed strip. The pencil circle around a copied row number is a hand-drawn SVG path, rotated -6deg with a 1.6 stroke and round caps. It is the only freehand shape.

## Components

### Buttons
- **Shape:** square (0px), 1.5px ink border, at least 44px tall, 0 18px padding, Barlow 700 15px.
- **Inked (primary):** an ink fill with on-ink text. On hover the fill and border shift to ink-soft.
- **Line (secondary):** transparent with ink text. On hover it fills with paper, which reads against the ticket's paper-deep.
- **Icon button:** 44px square with a 1px strong-rule border. On hover it fills with paper-deep.
- **Focus:** a global 2px ink outline at 2px offset.

### Index tabs (chips)
- **Style:** 44px tall, 0 14px padding, label type, with a 1px strong-rule border. Neighbours overlap by -1px. A tabular range sits after the name and is hidden below 640px.
- **State:** the selected tab (`aria-pressed`) is solid ink with on-ink text and its range at 0.85 opacity. On hover the tab fills with paper-deep.

### Menu row (signature)
- **Structure:** a full-width button with the numeral column and the title plus slash name, followed by the tick box. A 1px hairline sits beneath each row.
- **Open:** while one row is expanded, every other row fades to ink-soft at weight 500 and its boxes drop to strong-rule borders.
- **Ticket:** a tinted paper-deep panel under the open row. It has a dashed top rule, a note that teaches 【】, the template body and its actions. From 640px to 899px it is indented to align with the text column.

### Tick box (copy)
- **Style:** 44px square with a 1.5px ink border and a copy icon.
- **Ticked:** the box and icon turn pencil, and the tick is drawn with a dashed stroke over `steps(4)` in 0.22s. The row number gains the pencil circle, which persists in localStorage.

### Inputs / Fields
- **Search:** square, with a 1px strong-rule border on paper, a 48px minimum height, a leading 18px SVG icon in ink-soft, and an underlined "清除" text button on the right. The native cancel button is hidden.
- **Focus:** a 2px ink outline at 1px offset on the field frame.

### Slip (toast)
- **Style:** a centred fixed slip on paper with a 1.5px ink border and a 1px ink outline at a 3px offset. The message is in display 900 at 15px, with a 13px hint below at 0.85 opacity. It enters with `steps(3)` over 0.18s and has no fade.
- **Error:** the same slip in reverse, with an ink fill, on-ink text and `role="alert"`.

### Notice
A double-framed box (1px border plus a 3px-offset outline) holding numbered steps with tabular counters, a tip in ink-soft, and a colophon above a hairline.

### Icons
Inline SVG only, with strokes in `currentColor` at 1.6–1.8 (square caps on the search and sun icons). The pencil tick uses a 2.4 round stroke.

## Do's and Don'ts

### Do:
- **Do** draw everything in the single ink (`var(--ink)`) and its rule alphas on paper, and swap both in dark mode.
- **Do** keep a 4.4ch tabular numeral column and hairline-ruled rows for any list of items.
- **Do** separate regions with a 3px double rule over a 1px strong rule.
- **Do** keep every target at least 44px and the mobile search text at 16px.
- **Do** step motion with `steps()` and disable it under `prefers-reduced-motion`.
- **Do** print 【】 blanks as bold ink on paper with a 1.5px underline wherever template text appears.

### Don't:
- **Don't** introduce a second hue, including for error or success states. Errors print in inverse ink.
- **Don't** use drop shadows, gradients, blur or rounded cards. The seal's inset ring is the one sanctioned `box-shadow`.
- **Don't** use pencil grey for anything the user didn't do.
- **Don't** load more Noto Sans TC weights or use monospace beyond slash command names.
- **Don't** fade states in. Toggle them in two frames or in printed steps.
