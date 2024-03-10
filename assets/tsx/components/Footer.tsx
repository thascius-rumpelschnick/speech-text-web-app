import React from "react";
import { User } from "../interfaces/ContainerProps";

type FooterProps = { user: User | null };

const Footer = ({ user }: FooterProps) => {
    return (
        <section className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                {user && (
                    <>
                        <li className="nav-item">
                            <a href="/" className="nav-link px-2 text-body-secondary">
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/upload" className="nav-link px-2 text-body-secondary">
                                Add
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/settings" className="nav-link px-2 text-body-secondary">
                                Settings
                            </a>
                        </li>
                    </>
                )}

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
