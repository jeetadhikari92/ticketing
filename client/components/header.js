import Link from 'next/link';

const Header = ({ currentUser }) => {

  const links = [
    !currentUser && {label: 'Sign up', href: '/auth/signup'},
    !currentUser && {label: 'Sign in', href: '/auth/signin'},
    currentUser && {label: 'Sign out', href: '/auth/signout'}
  ].filter(x => x)
  .map(({label, href}) => {
    return <li key={href} className="nav-item">
      <Link href={href}>
        <a className="nav-link">{label}</a>
      </Link>
    </li>
  })

  return <nav className="navbar navbar-light bg-light px-2">
    <Link href="/">
      <a className="navbar-brand">Ticketing</a>
    </Link>
    <div className="d-flex justify-content-end">
      <ul className="nav d-flex align-items-center">
        {links}
      </ul>
    </div>
  </nav>
  
}

export default Header;