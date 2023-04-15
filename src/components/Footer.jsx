import React from 'react';
import "../components-css/Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-youtube"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                </div>

                <div className="row">
                    <ul>
                        <li><a href="#">Yen Shen </a></li>
                        <li><a href="#">Mitchell Stanley</a></li>
                        <li><a href="#">Nicholas Ahlman</a></li>
                        <li><a href="#">StrangerThings</a></li>
                        <li><a href="#">Love Coding</a></li>
                    </ul>
                </div>

                <div className="row">
                    StrangerThings Copyright © 2023 StrangerThings - All rights(are not)reserved || Man Yen Need Some Sleep 
                </div>
            </div>
        </footer>
    );
};

export default Footer;