import React, { useState } from 'react';
import Modal from 'react-modal';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import { HEADER_ID } from '../config/constants';

import Layout from '../layout/Layout';
import Main from '../components/Main';

Modal.setAppElement('#root');

const Feedback = props => {
  const { title } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCloseModal = () => setModalIsOpen(false);
  const handleOpenModal = () => setModalIsOpen(true);

  return (
    <Layout headerText={title} title={title}>
      <Main headerId={HEADER_ID} headerText={title} setFocus>
        <p>Tell AnyCorp what you think!</p>
        <button onClick={handleOpenModal} type="button">
          Open our feedback form
        </button>
        {/* FE Talking Point - Modal Window Behavior and Labeling */}
        <Modal
          aria={{
            describedby: 'feedback_description',
            labelledby: 'feedback_heading',
            modal: modalIsOpen,
          }}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          shouldCloseOnOverlayClick={false}
          id="feedback_modal"
        >
          <div
            className="ac-layout--flex ac-layout--justify-between"
            id="feedback_header"
          >
            <h1 id="feedback_heading">AnyCorp Wants to Hear From You!</h1>
            <button
              aria-label="Close feedback modal"
              className="ac-form__button--close"
              onClick={handleCloseModal}
              type="button"
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>
          <div id="feedback_description">
            <p>
              AnyCorp values your opinion. Please take a moment to fill out our
              simple feedback form and let us know how we can improve your
              experience!
            </p>
          </div>
          <div id="feedback_form">
            <form action="#" className="ac-form">
              <fieldset className="ac-form__fieldset">
                <h2>Your Opinion Matters</h2>
                <h4>Tell us how we are doing!</h4>
                <FocusLock>
                <label className="ac-form__label" htmlFor="first_name">
                  Your first name
                </label>
                <input
                  aria-required="true"
                  className="ac-form__input"
                  type="text"
                  id="first_name"
                  required
                />
                <label className="ac-form__label" htmlFor="last_name">
                </label>
                <input
                  aria-required="true"
                  className="ac-form__input"
                  type="text"
                  id="last_name"
                  required
                />
                <label className="ac-form__label" htmlFor="email">
                  Your email address
                </label>
                <input
                  aria-required="true"
                  className="ac-form__input"
                  type="email"
                  id="email"
                  required
                />
                <label className="ac-form__label" htmlFor="feedback">
                  Your feedback
                </label>
                <textarea
                  aria-required="true"
                  className="ac-form__textarea"
                  id="feedback"
                  required
                />
                 </FocusLock>
                <h3 aria-owns="rate_excellent">How would you rank our website?</h3>
                <div id="radioGroup" role="radiogroup">
                  <input type="radio" value="excellent" id="rate_excellent"/>
                  <label for="rate_excellent">Excellent</label>

                  <input type="radio" value="good" id="rate_good"/>
                  <label for="rate_good">Good</label>
                  
                  <input type="radio" value="fair" id="rate_fair"/>
                  <label for="rate_fair">Fair</label>

                  <input type="radio" value="poor" id="rate_poor"/>
                  <label for="rate_poor">Poor</label>
                </div>

                <button
                  className="ac-form__button"
                  onClick={handleCloseModal}
                  type="button"
                  id="submitForm"
                  value="Fake submit and close"
                />
              </fieldset>
            </form>
          </div>
        </Modal>
      </Main>
    </Layout>
  );
};

Feedback.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Feedback;
