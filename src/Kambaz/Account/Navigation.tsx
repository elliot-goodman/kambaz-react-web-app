import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ['Profile'] : ['Signin', 'Signup'];
  return (
    <div className="me-5" id="wd-account-navigation">
      {links.map((link) => (
        <Link
          to={`/Kambaz/Account/${link}`}
          id={`wd-${link.toLocaleLowerCase()}-link`}
          className={`list-group-item text-center ps-2 mb-2 ${pathname.includes(link) ? 'border-start border-black border-3' : 'text-danger'}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
