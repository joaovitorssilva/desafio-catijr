import { Link } from "../pages/Link";
import { useAuth } from "../contexts/AuthContext";
import { UserMenu } from "./UserMenu";

export function Navbar() {
    const { isAuthenticated } = useAuth()

    return (
        <>
            <nav className='bg-linear-to-r from-bgLight to-bgDark shadow-md flex items-center justify-between w-full px-10 py-3 cursor-pointer text-white'>

                <div className="flex items-center gap-2">

                    <Link
                        to="/"
                        className="text-base sm:text-xl font-extrabold tracking-wider"                    >
                        Boardly
                    </Link>
                </div>
                <div className='flex gap-3 items-center'>
                    {isAuthenticated ? (
                        <UserMenu />
                    ) : (
                        <Link
                            to="/login"
                            className="text-sm px-3 py-1.5 rounded hover:bg-options-button-hover transition duration-150"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}