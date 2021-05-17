import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_ID } from '../config/constants';

import Layout from '../layout/Layout';
import Main from '../components/Main';
import lake from '../../img/lake.jpg';


const About = props => {
  const { title } = props;

  return (
    <Layout headerText={title} title={title}>
      <aside className="ac-layout--two-column__aside">
        {/* FE Talking Point - WCAG SC 2.4.3: Focus Order */}
        <div>  
          <span lang="iv">
            Este es el elemento <strong>"a un lado".</strong> Debe usarse 
            para contenido  relacionado con el área principal. Además,  
            incluye enlaces a otras secciones, llamadas de imágenes y texto citado.
          </span>
          <p>
            <a href="https://github.com">Github</a>
          </p>
        </div>
      </aside>
      <Main
        className="ac-layout--two-column__main"
        headerId={HEADER_ID}
        headerText={title}
        setFocus
      >
        {/* FE Talking Point - Linting */}
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <section aria-label="Company History" role="region">
          <h2>The things AnyCorp does!</h2>
          <p>
            We will tell you all there is to know about AnyCorp. We started in
            1999 during the Dot Com boom. We felt it was our time to do
            something spectacular and use the new power of the Internet to make
            it happen.
          </p>
          <h1>Some more things AnyCorp does!</h1>
          <p>
            This should be the next focusable elment after the skip link:
            {''}
            <a href="https://google.com">Google search!</a>
          </p>
          <p>
            We are located at the base of a beautiful mountain!
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={lake} aria-label = "lake" />
          </p>
        </section>
      </Main>
    </Layout>
  );
};

About.propTypes = {
  title: PropTypes.string.isRequired,
};

export default About;
