import React from 'react';
import PropTypes from 'prop-types';

const Span = ({ children, className }) => <span className={className}>{children}</span>;

Span.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Span.defaultProps = {
	className: '',
	children: ''
};

export default Span;
