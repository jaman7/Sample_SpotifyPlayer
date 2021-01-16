import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick, type }) => (
	/* eslint-disable react/button-has-type */
	<button className={className} onClick={onClick} type={type !== null ? type : 'button'}>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string
};

Button.defaultProps = {
	className: '',
	type: 'button',
	children: '',
	onClick: null
};

export default Button;
