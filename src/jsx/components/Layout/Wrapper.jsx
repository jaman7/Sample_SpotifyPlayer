import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children, className, id }) => (
	<div id={id} className={className}>
		{children}
	</div>
);

Wrapper.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.string
};

Wrapper.defaultProps = {
	children: '',
	className: '',
	id: ''
};

export default Wrapper;
