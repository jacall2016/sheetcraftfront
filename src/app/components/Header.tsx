import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div>
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>
        </div>
        <div>
          <Link href="/custom-scripts" className="ml-4">
            Custom Scripts
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
