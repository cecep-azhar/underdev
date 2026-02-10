import React from 'react';

interface FooterProps {
  madeWith: string;
  by: string;
}

const Footer = ({ madeWith, by }: FooterProps) => {
  return (
    <footer className="footer">
      <p className="copyright">
        {madeWith} <span className="heart">❤️</span> {by} <a href="https://cecepazhar.com" target="_blank" rel="noopener noreferrer" className="name">Cecep Azhar</a> &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
