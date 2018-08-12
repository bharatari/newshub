import React, { PropTypes } from 'react';

export default class Paginator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    goToPage: PropTypes.func,
  };
  onLastPage = () => {
    if (this.props.currentPage === this.props.totalPages) {
      return true;
    } else {
      return false;
    }
  };
  onFirstPage = () => {
    if (this.props.currentPage === 1) {
      return true;
    } else {
      return false;
    }
  };
  pages = () => {
    let totalPages = this.props.totalPages;
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };
  previousFive = () => {
    let previousFive = [];
    
    for (let i = this.props.currentPage - 1; i > this.props.currentPage - 6; i--) {
      if (i < 2) {
        return previousFive.reverse();
      } else {
        previousFive.push(i);
      }
    }

    return previousFive.reverse();
  };
  nextFive = () => {
    let nextFive = [];

    for (let i = this.props.currentPage + 1; i < this.props.currentPage + 6; i++) {
      if (i >= this.props.totalPages) {
        return nextFive;
      } else {
        nextFive.push(i);
      }
    }

    return nextFive;
  };
  
  render() {
    const firstPage = () => {
      if (!this.onFirstPage()) {
        return <a className="item" onClick={this.props.goToPage.bind(this, 1)}>
                ...
               </a>;
      }

      return null;
    };
    const previousFive = () => {
      const pages = this.previousFive();
      let components = [];

      for (let i = 0; i < pages.length; i++) {
        const key = 'previousFive-' + i;

        components.push(
          <a key={key} className="item" onClick={this.props.goToPage.bind(this, pages[i])}>
            {pages[i]}
          </a>
        );
      }

      return components;
    };
    const nextFive = () => {
      const pages = this.nextFive();
      let components = [];

      for (let i = 0; i < pages.length; i++) {
        const key = 'nextFive-' + i;

        components.push(
          <a key={key} className="item" onClick={this.props.goToPage.bind(this, pages[i])}>
            {pages[i]}
          </a>
        );
      }

      return components;
    };
    const lastPage = () => {
      if (!this.onLastPage()) {
        return <a className="item" onClick={this.props.goToPage.bind(this, this.props.totalPages)}>
                ...
               </a>;
      }

      return null;
    };

    return (
      <div className="ui pagination menu">
        {firstPage()}
        {previousFive()}
        <a className="active item">
          {this.props.currentPage}
        </a>
        {nextFive()}
        {lastPage()}
      </div>
    );
  }
}
