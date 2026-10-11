import { useRef, type KeyboardEvent } from 'react'

import styles from './ShelfTabs.module.scss'

export interface ShelfTab {
  id: string
  label: string
}

export interface ShelfTabsProps {
  idPrefix: string
  tabs: ShelfTab[]
  activeId: string
  onChange: (id: string) => void
}

export function ShelfTabs({ idPrefix, tabs, activeId, onChange }: ShelfTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function focusTab(index: number) {
    const nextIndex = (index + tabs.length) % tabs.length
    const tab = tabs[nextIndex]
    if (!tab) return
    onChange(tab.id)
    tabRefs.current[nextIndex]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => focusTab(index - 1),
      ArrowRight: () => focusTab(index + 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    }
    const action = actions[event.key]
    if (!action) return
    event.preventDefault()
    action()
  }

  return (
    <div className={styles.tabs} role="tablist" aria-label="Filtrar vitrine">
      {tabs.map((tab, index) => {
        const selected = tab.id === activeId
        return (
          <button
            aria-controls={`${idPrefix}-panel`}
            aria-selected={selected}
            className={selected ? styles.active : undefined}
            id={`${idPrefix}-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
