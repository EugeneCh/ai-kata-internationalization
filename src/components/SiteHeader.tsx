import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type AppLanguage } from '../i18n'

export function SiteHeader() {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? 'en') as AppLanguage
  const navItems = [
    { to: '/', label: t('header.nav.planner') },
    { to: '/guides', label: t('header.nav.guides') },
    { to: '/help', label: t('header.nav.help') },
  ]

  return (
    <header className="site-header">
      <div className="brand-block">
        <p className="brand-mark">{t('header.brand')}</p>
        <span>{t('header.tagline')}</span>
      </div>

      <div className="header-actions">
        <nav className="main-nav" aria-label={t('header.mainNavAria')}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <select
          className="language-switcher"
          aria-label={t('header.languageLabel')}
          value={currentLanguage}
          onChange={(event) => i18n.changeLanguage(event.target.value)}
        >
          {supportedLanguages.map((language) => (
            <option key={language} value={language}>
              {t(`header.languages.${language}`)}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}
