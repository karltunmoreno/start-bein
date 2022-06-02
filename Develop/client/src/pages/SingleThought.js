import React from 'react';
import { useParams } from 'react-router-dom';

import ContributeList from '../components/ContributeList';
import ContributeForm from '../components/ContributeForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_STARTBEIN } from '../utils/queries';

const SingleStartbein = (props) => {
  const { id: startbeinId } = useParams();

  const { loading, data } = useQuery(QUERY_STARTBEIN, {
    variables: { id: startbeinId },
  });

  const startbein = data?.startbein || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {startbein.username}
          </span>{' '}
          startbein on {startbein.createdAt}
        </p>
        <div className="card-body">
          <p>{startbein.startbeinText}</p>
        </div>
      </div>

      {startbein.contributeCount > 0 && (
        <ContributeList contributes={startbein.contributes} />
      )}

      {Auth.loggedIn() && <ContributeForm startbeinId={startbein._id} />}
    </div>
  );
};

export default SingleStartbein;
