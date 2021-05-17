import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_ID } from '../config/constants';

import Layout from '../layout/Layout';
import Main from '../components/Main';

const Awards = props => {
  const { title } = props;

  return (
    <Layout headerText={title} title={title}>
      <div headerId={HEADER_ID} headerText={title} setFocus>
        <p>These are our early wins!</p>
        <p>
          This should be the next focusable elment after the skip link:
          <br />
          <a href="https://google.com">Google search page</a>
          <a href="https://yahoo.com"></a>
        </p>
        <p>
          AnyCorp has received the industry&lsquo;s highest achievement in
          compliance several years in a row. AnyCorp was awarded the Excellence
          in trophy for 2016, 2017, 2018, and we anticipate 2019.
        </p>
        <p>
          The solution is a bit more complicated than I would like. It does seem
          to work tho.
        </p>

        <div id="employeeAwardsWrapper">
          <table id="employeeAwardsCerts">
            <caption>Certifications/Awards Earned by our Employees - Last 5 Years</caption>
            <thead>
                <tr>
                    <td class="headerStyle1">Employee Name</td>
                    <th scope="col">2015</th>
                    <th scope="col">2016</th>
                    <th scope="col">2017</th>
                    <th scope="col">2018</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Cynthia Williams</th>
                    <td>2</td>
                    <td>3</td>
                    <td>0</td>
                    <td>3</td>
                </tr>
                <tr>
                    <th scope="row">Trevor Holland</th>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>4</td>
                </tr>
                <tr>
                    <th scope="row">Chelsea Rowe</th>
                    <td>4</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th scope="row">Joseph P. Fleming Jr.</th>
                    <td>5</td>
                    <td>1</td>
                    <td>3</td>
                    <td>3</td>
                </tr>
            </tbody>
        </table>
        </div>

      </div>
    </Layout>
  );
};

Awards.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Awards;
