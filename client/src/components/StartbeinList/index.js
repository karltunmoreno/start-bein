import React from 'react';

const StartbeinList = ({ startbeins, title }) => {
    if (!startbeins.length) {
        return <h3>No Starters Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {startbeins &&
                startbeins.map(startbein => (
                    <div key={startbein._id} className="card mb-3">
                        <p className="card-header">
                            {startbein.username}
                            startbein on {startbein.createdAt}
                        </p>
                        <div className="card-body">
                            <p>{startbein.startbeinText}</p>
                            <p className="mb-0">
                                Reactions: {startbein.reactionCount} || Click to{' '}
                                {startbein.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default StartbeinList;