import React from "react";

const Footer = () => {
    return (
        <section className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item">
                    <a href="/" className="nav-link px-2 text-body-secondary">
                        Dashboard
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/settings" className="nav-link px-2 text-body-secondary">
                        Settings
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/about" className="nav-link px-2 text-body-secondary">
                        About
                    </a>
                </li>
            </ul>
            <p className="text-center text-body-secondary">© 2024 Florian Zapf</p>
        </section>
    );
};

export default Footer;
