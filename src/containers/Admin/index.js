import React from 'react';
import PropTypes from 'prop-types';
import { withAuthenticator } from 'aws-amplify-react';

import TabWidget from 'components/Widgets/TabWidget';
import SignOnModal from 'components/SignOnModal';

const Admin = props => (
  <React.Fragment>
    <SignOnModal />
    <TabWidget />
    {props.children}
  </React.Fragment>
);

Admin.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withAuthenticator(Admin);
