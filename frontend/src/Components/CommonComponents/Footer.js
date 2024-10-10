import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Footer = () => {
    return (
        <footer className="footer3422">
            <div className="container3422">
                <div className="row3422">
                    <div className="footer-col3422">
                        <h4>Company</h4>
                        <ul>
                            <li>
                                <Link to="/">about us</Link>
                            </li>
                            <li>
                                <Link to="/">our services</Link>
                            </li>
                            <li>
                                <Link to="/">privacy policy</Link>
                            </li>
                            <li>
                                <Link to="/feedbacks">feedbacks</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="footer-col3422">
                        <h4>Book Now</h4>
                        <ul>
                            <li>
                                <Link to="/rooms">Ticket</Link>
                            </li>
                            <li>
                                <Link to="/events">Events</Link>
                            </li>
                            <li>
                                <Link to="/parking">Parking</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col3422">
                        <h4>follow us</h4>
                        <div className="social-links3422">
                            <Link to="#">
                                <Icon icon="ic:baseline-facebook" />
                            </Link>
                            <Link to="#">
                                <Icon icon="mdi:instagram" />
                            </Link>
                            <Link to="#">
                                <Icon icon="mdi:twitter" />
                            </Link>
                            <Link to="#">
                                <Icon icon="mdi:linkedin" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
