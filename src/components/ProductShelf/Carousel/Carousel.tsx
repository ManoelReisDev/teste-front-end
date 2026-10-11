import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'

import chevron from '../../../assets/icons/chevron-left.svg'
import styles from './Carousel.module.scss'

export interface CarouselProps<T> {
  label: string
  items: T[]
  getKey: (item: T, index: number) => string
  renderItem: (item: T, index: number) => ReactNode
  busy?: boolean
}

export function Carousel<T>({ label, items, getKey, renderItem, busy = false }: CarouselProps<T>) {
  const viewportId = useId()
  const viewportRef = useRef<HTMLUListElement>(null)
  const canScroll = useRef({ previous: false, next: false })
  const [controls, setControls] = useState(canScroll.current)

  const updateControls = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    const nextControls = {
      previous: viewport.scrollLeft > 2,
      next: viewport.scrollLeft < maxScroll - 2,
    }
    if (
      canScroll.current.previous !== nextControls.previous ||
      canScroll.current.next !== nextControls.next
    ) {
      canScroll.current = nextControls
      setControls(nextControls)
    }
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    updateControls()
    viewport.addEventListener('scroll', updateControls, { passive: true })
    const observer = new ResizeObserver(updateControls)
    observer.observe(viewport)
    return () => {
      viewport.removeEventListener('scroll', updateControls)
      observer.disconnect()
    }
  }, [items.length, updateControls])

  const scroll = useCallback((direction: 1 | -1) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const firstItem = viewport.firstElementChild
    const gap = Number.parseFloat(getComputedStyle(viewport).columnGap) || 0
    const itemWidth = firstItem instanceof HTMLElement ? firstItem.offsetWidth : viewport.clientWidth
    const visibleItems = Math.max(1, Math.floor((viewport.clientWidth + gap) / (itemWidth + gap)))
    viewport.scrollBy({
      left: direction * visibleItems * (itemWidth + gap),
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  return (
    <div
      aria-busy={busy || undefined}
      aria-label={label}
      aria-roledescription="carrossel"
      className={styles.carousel}
      role="region"
    >
      <button
        aria-controls={viewportId}
        aria-label="Produtos anteriores"
        className={`${styles.arrow} ${styles.previous}`}
        disabled={!controls.previous}
        onClick={() => scroll(-1)}
        type="button"
      >
        <img alt="" height={13} src={chevron} width={8} />
      </button>
      <ul className={styles.products} id={viewportId} ref={viewportRef}>
        {items.map((item, index) => (
          <li className={styles.slide} key={getKey(item, index)}>
            {renderItem(item, index)}
          </li>
        ))}
      </ul>
      <button
        aria-controls={viewportId}
        aria-label="Próximos produtos"
        className={`${styles.arrow} ${styles.next}`}
        disabled={!controls.next}
        onClick={() => scroll(1)}
        type="button"
      >
        <img alt="" className={styles.flipped} height={13} src={chevron} width={8} />
      </button>
    </div>
  )
}
