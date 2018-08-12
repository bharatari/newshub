import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PageTransition extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="page"
        transitionAppear={true} transitionAppearTimeout={100} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {React.cloneElement(this.props.children, {
          key: this.props.currentUrl
        })}
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname
});

export default connect(mapStateToProps)(PageTransition);
