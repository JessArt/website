import React, { Component } from 'react';

// components declaration
import { Link } from 'react-router';
import PageFrame from '../page';

export default class NotFound extends Component {
  render() {
    return (
      <PageFrame>
        <h2>
          Not found!
        </h2>
        <p>
          {'Unfortunately, your path leads to the nowhere. It happens with all of us at some point of our life – don\'t give up!'}
        </p>
        <Link to={{ pathname: '/' }}>
          {'Back to the main page'}
        </Link>
      </PageFrame>
    );
  }
}
