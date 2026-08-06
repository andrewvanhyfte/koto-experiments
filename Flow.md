## Home
/ →  Start at Home
/default → Navigation
/Navigation → Widget Menu

## Navigation
- Main Navigation: persistent overlay, opens from top-left
- Widget menu: persistent overlay, opens from top-right clock/grid
- Closes on: Escape, backdrop, navigation

## Play
- Widget: closed | open
- Filter menu: closed | open

### Card states (all cards share the same UI + interaction)

| State | Canvas appearance | Controls |
| --- | --- | --- |
| **rest** | Compact row (thumb + copy + **+**) | Click / **+** → expand |
| **hover** | Compact + light ring | Same as rest |
| **expand** | Advanced preview: header (category / tools + **−**), media (pause + progress), footer **Explore →** | **−** → minimize; **Explore** → side-panel |
| **move** | Same visual as prior state; drag shadow while repositioning | Release keeps prior state |
| **minimize** | Compact row | Click / **+** → expand |
| **side-panel** | All canvas cards forced compact (no **+**); deep-dive panel on right | Escape / close on yellow strip → minimize |

- One expand / side-panel at a time
- Explore CTA: `p-1.5`, `rounded-[8px]` hover affordance
- ± controls share the same 26×26 icon button treatment
