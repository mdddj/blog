import { appMenuStore } from "@/providers/menu";
import { NavLink } from "umi";
import MyDocMenuElement from "./doc_menu";
type Props = {
    closeMenu: () => void;
}
const MobileAppNavbar : React.FC<Props> = ({closeMenu}) => {
     const menus = appMenuStore((state) => state.menus);
    return (
        <nav className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menus.map((item, index) => (
                        <span key={`${item.href}-${index}`}>
                            {item.href && <li>
                                <NavLink to={item.href}>{item.title}</NavLink>
                            </li>}
                            {item.isDoc && <MyDocMenuElement onClick={closeMenu} />}
                        </span>
                    ))}
                </ul>
            </nav>
    );
    }

    export default MobileAppNavbar;