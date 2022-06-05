import React from 'react';

function NavTabs({ currentPage, handlePageChange}) {
    return (
        <ul className="nav nav-tabs">
            <l1 className="nav-items">
                <a 
                href="#About"
                onClick={() => handlePageChange('About')}
                className={currentPage === 'About' ? 'nav-link active' : 'nav-link'} 
                >
                    About
                </a>
            </l1>
            <l1 className="nav-items">
                <a 
                href="#Carbon"
                onClick={() => handlePageChange('Carbon')}
                className={currentPage === 'Carbon' ? 'nav-link active' : 'nav-link'} 
                >
                    Carbon
                </a>
            </l1>
            <l1 className="nav-items">
                <a 
                href="#Volunteer"
                onClick={() => handlePageChange('Volunteer')}
                className={currentPage === 'Volunteer' ? 'nav-link active' : 'nav-link'} 
                >
                    Volunteer
                </a>
            </l1>
            <l1 className="nav-items">
                <a 
                href="#Donate"
                onClick={() => handlePageChange('Donate')}
                className={currentPage === 'Donate' ? 'nav-link active' : 'nav-link'} 
                >
                    Donate
                </a>
            </l1>
        </ul>
    )
}

export default NavTabs;