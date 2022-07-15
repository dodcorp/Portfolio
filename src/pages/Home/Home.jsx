import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Hero, Content, CTA } from './components';
import { BackToTop } from '../../common/components/UIElements';
import useHttpClient from '../../common/hooks/http-hook';

const Home = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/project/projects`
        );
        setProjects(responseData);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <Helmet>
        <title>itswilly - Will Yamz</title>
        <meta
          name="description"
          content="Hi!"
        />
      </Helmet>
      <Hero />
      <Content projects={projects} isLoading={isLoading} error={error} />
      <CTA />
      <BackToTop />
    </React.Fragment>
  );
};

export default Home;
