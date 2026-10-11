import { useId, useState } from 'react'
import type { FormEvent, MouseEventHandler, ReactNode } from 'react'

import backToStoreIcon from '../../../assets/icons/back-to-store.svg'
import creditCardIcon from '../../../assets/icons/credit-card.svg'
import crownIcon from '../../../assets/icons/crown-simple.svg'
import heartIcon from '../../../assets/icons/heart.svg'
import searchIcon from '../../../assets/icons/magnifying-glass.svg'
import shieldIcon from '../../../assets/icons/shield-check.svg'
import cartIcon from '../../../assets/icons/shopping-cart.svg'
import truckIcon from '../../../assets/icons/truck.svg'
import userIcon from '../../../assets/icons/user-circle.svg'
import logo from '../../../assets/logo/logo.svg'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import { Label } from '../../ui/Label/Label'
import { Link } from '../../ui/Link/Link'
import styles from './Header.module.scss'

export type HeaderAction =
  | { href: string; onClick?: never }
  | { href?: never; onClick: MouseEventHandler<HTMLButtonElement> }

export interface HeaderNavigationDestinations {
  allCategories?: string
  supermarket?: string
  books?: string
  fashion?: string
  releases?: string
  offers?: string
  subscription?: string
}

export interface HeaderProps {
  onSearch?: (term: string) => void
  backToStore?: HeaderAction
  favorites?: HeaderAction
  account?: HeaderAction
  cart?: HeaderAction
  navigation?: HeaderNavigationDestinations
}

interface ActionControlProps {
  action?: HeaderAction
  accessibleName: string
  icon: string
  iconClassName?: string
}

interface NavigationItemProps {
  children: ReactNode
  className?: string
  href?: string
}

function ActionControl({
  action,
  accessibleName,
  icon,
  iconClassName,
}: ActionControlProps) {
  // A mesma ação pode ser um link ou um botão sem duplicar a estrutura visual do header.
  const image = <img alt="" className={iconClassName} src={icon} />

  if (action?.href) {
    return (
      <Link aria-label={accessibleName} href={action.href} variant="icon">
        {image}
      </Link>
    )
  }

  return (
    <Button
      aria-label={accessibleName}
      onClick={action?.onClick}
      unavailable={!action}
      variant="icon"
    >
      {image}
    </Button>
  )
}

function NavigationItem({ children, className, href }: NavigationItemProps) {
  return (
    <li>
      {href ? (
        <Link className={className} href={href} variant="navigation">
          {children}
        </Link>
      ) : (
        <Link className={className} unavailable variant="navigation">
          {children}
        </Link>
      )}
    </li>
  )
}

export function Header({
  account,
  backToStore,
  cart,
  favorites,
  navigation = {},
  onSearch,
}: HeaderProps) {
  const searchId = useId()
  const [searchTerm, setSearchTerm] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedTerm = searchTerm.trim()
    if (!onSearch || !normalizedTerm) return

    onSearch(normalizedTerm)
  }

  return (
    <header className={styles.header}>
      <div className={styles.benefitsBar}>
        <ul aria-label="Benefícios da loja" className={styles.benefits}>
          <li>
            <img alt="" src={shieldIcon} />
            <span>
              Compra <strong>100% segura</strong>
            </span>
          </li>
          <li>
            <img alt="" src={truckIcon} />
            <span>
              <strong>Frete grátis</strong> acima de R$ 200
            </span>
          </li>
          <li>
            <img alt="" src={creditCardIcon} />
            <span>
              <strong>Parcele</strong> suas compras
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.mainBar}>
        <Link aria-label="Econverse — página inicial" className={styles.logoLink} href="/" variant="icon">
          <img alt="" src={logo} />
        </Link>

        <form className={styles.search} onSubmit={handleSubmit} role="search">
          <Label htmlFor={searchId} visuallyHidden>
            Buscar produtos
          </Label>
          <Input
            autoComplete="off"
            className={styles.searchInput}
            id={searchId}
            name="search"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="O que você está buscando?"
            type="search"
            value={searchTerm}
            variant="search"
          />
          <Button
            aria-label="Buscar produtos"
            className={styles.searchButton}
            type="submit"
            unavailable={!onSearch}
            variant="icon"
          >
            <img alt="" src={searchIcon} />
          </Button>
        </form>

        <div aria-label="Ações da conta" className={styles.actions} role="group">
          <ActionControl
            accessibleName="Voltar para a loja"
            action={backToStore}
            icon={backToStoreIcon}
            iconClassName={styles.backToStoreIcon}
          />
          <ActionControl accessibleName="Favoritos" action={favorites} icon={heartIcon} />
          <ActionControl accessibleName="Minha conta" action={account} icon={userIcon} />
          <ActionControl accessibleName="Carrinho" action={cart} icon={cartIcon} />
        </div>
      </div>

      <nav aria-label="Navegação principal" className={styles.navigation}>
        <ul className={styles.navigationList}>
          <NavigationItem href={navigation.allCategories}>Todas Categorias</NavigationItem>
          <NavigationItem href={navigation.supermarket}>Supermercado</NavigationItem>
          <NavigationItem href={navigation.books}>Livros</NavigationItem>
          <NavigationItem href={navigation.fashion}>Moda</NavigationItem>
          <NavigationItem href={navigation.releases}>Lançamentos</NavigationItem>
          <NavigationItem className={styles.offers} href={navigation.offers}>
            Ofertas do dia
          </NavigationItem>
          <NavigationItem href={navigation.subscription}>
            <span className={styles.subscription}>
              <img alt="" src={crownIcon} />
              Assinatura
            </span>
          </NavigationItem>
        </ul>
      </nav>
    </header>
  )
}
