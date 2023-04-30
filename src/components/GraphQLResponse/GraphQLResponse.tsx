import React, { useEffect, useState } from 'react';
import cl from './graphQLResponse.module.scss';

interface GraphQLResponseProps {
  response: string;
}
export default function GraphQLResponse({ response }: GraphQLResponseProps) {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    setData(response);
  }, [response]);
  return (
    <section className={cl.response}>
      <h4>GraphQLResponse</h4>
      <div>{data}</div>
    </section>
  );
}
