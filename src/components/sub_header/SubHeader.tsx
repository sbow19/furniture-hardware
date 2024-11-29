import Link from "next/link";
import styles from "./SubHeader.module.scss";

type SubHeaderProps = {
    activePage: "/" | "/product_videos" | "/immersive_experience" | "/happiest_costumers";
}

export default function SubHeader({ activePage }: SubHeaderProps) {
    const navLinks = [
        { href: "/", label: "Product Images" },
        { href: "/product_videos", label: "Product Videos" },
        { href: "/immersive_experience", label: "Immersive Experience" },
        { href: "/happiest_costumers", label: "Happiest Costumers" },
    ];

    return (
        <header className={styles.subheader_container}>
            <h3 className={styles.subheader_heading}>
                Home Décor & Furniture
            </h3>
            <nav className={styles.subheader_nav}>
                {navLinks.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={
                            activePage === href
                                ? styles.subheader_nav_activated
                                : styles.subheader_nav_disabled
                        }
                    >
                        {label}
                    </Link>
                ))}
                <button>Book a demo</button>
            </nav>
        </header>
    );
}
