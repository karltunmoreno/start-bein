import React, { useState } from "react";
// import Nav from './Nav/index';
import NavTabs from './NavTabs'
import About from './About/index';
import Carbon from './Carbon/index';
import Volunteer from './Volunteer/Page';
import Donate from './Donate/index';

export default function PageContainer() {
    const [currentPage, setCurrentPage] = useState('About');

    const renderPage = () => {
        if (currentPage === 'About') {
            return <About />;
        }
        if (currentPage === 'Carbon') {
            return <Carbon />;
        }
        if (currentPage === 'Volunteer') {
            return <Volunteer />;
        }
        if (currentPage === 'Donate') {
            return <Donate />;
        }
    }

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
        </div>
    )
}