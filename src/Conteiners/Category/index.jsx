import React from 'react';
import {getCategory} from '../../Store/Actions/categoryAction';
import {connect} from 'react-redux';
import style from '../../index.styl'; 

class Category extends React.Component {

    componentDidMount () {
        this.props.getCategory();
    }
    
    render () {
        const {category} = this.props;
        return (
            <div>
                <div className="header">
                    <input type="text"></input>
                    <button className={style.test}>Add</button>
                </div>
                <div className="category-content test">
                    {category && category.map((el) => {
                        return <div key={el.id}>{el.name}</div>
                    })}
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