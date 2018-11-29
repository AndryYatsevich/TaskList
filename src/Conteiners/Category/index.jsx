import React from 'react';
import {getCategory} from '../../Store/Actions/categoryAction';
import {connect} from 'react-redux';

class Category extends React.Component {

    componentDidMount () {
        this.props.getCategory();
    }
    
    render () {
        
        return (
            <div>
                <div className="header">
                    <input type="text"></input>
                    <button>Add</button>
                </div>
                <div className="category-content">
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category
});

export default connect(mapStateToProps, {
    getCategory
})(Category);