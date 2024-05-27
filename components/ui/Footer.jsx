// components/Footer.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center p-8 mt-8 w-full">
            <div className="container mx-auto">
                <div className="flex justify-center mb-4 space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                        <FaLinkedinIn />
                    </a>
                </div>
                <p>© {new Date().getFullYear()} Tech Gadget Hub. All rights reserved.</p>
                <p className="text-gray-400 text-sm mt-4">Crafted with care by Tech Gadget Hub Team</p>
            </div>
        </footer>
    );
};

export default Footer;
