import React from 'react';
import './SearchBar.css';

// const sortByOptions = {
//     'Best Match': 'best_match',
//     'Highest Rated': 'rating',
//     'Most Reviewd': 'review_count'
// } //* moved inside searchbar as member variable (this)

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.keyPress =this.keyPress.bind(this);
    }

    getSortByClass(sortByOption) {
        if(sortByOption === this.state.sortBy) {
            return 'active';
        } else {
            return '';
        }
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        })
    }

    handleTermChange(e) {
        this.setState({
            term: e.target.value
        });
    }

    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        });
    }

    handleSearch(e) {
            try {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            e.preventDefault(); 
            throw Error('pew')
        } catch(e) {
            
            
        }
    }

    keyPress(e) {
        if(e.keyCode == 13){
        
          this.handleSearch();
        } 
    }
    
    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return ( 
            <li 
            key={sortByOptionValue}
            className={this.getSortByClass(sortByOptionValue)}
            onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
           
            >
                <a onClick={this.handleSearch}>{sortByOption}</a>
            </li>
            )
        });
    }

    render() {
        return (
        <div className="SearchBar" onKeyDown={this.keyPress}>
            <div className="SearchBar-sort-options">
                <ul>
                    {this.renderSortByOptions()}
                </ul>
            </div>  
            <div className="SearchBar-fields">
                <input 
                placeholder="Search Businesses"
                onChange={this.handleTermChange}
                 />
                <input
                 placeholder="Where?"
                 onChange={this.handleLocationChange}
                 
                 />
            </div>
            <div className="SearchBar-submit">
                <a onClick={this.handleSearch}>Let's Go</a>
            </div>
        </div>
        )
    }
    
}

export default SearchBar;